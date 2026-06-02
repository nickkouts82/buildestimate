#!/usr/bin/env python3
"""
BuildEstimate API — floor plan upload + Claude AI analysis
POST /analyze  → base64 image + rectangles → room sizes JSON
GET  /health   → uptime check
"""
import base64, json, os, re, sqlite3, uuid, urllib.request, urllib.error
from http.server import BaseHTTPRequestHandler, HTTPServer

PORT        = 3003
UPLOAD_DIR  = '/var/www/buildestimate.32blocks.com/uploads'
DB_PATH     = '/var/www/buildestimate.32blocks.com/api/estimates.db'
ANTHROPIC   = os.environ.get('ANTHROPIC_API_KEY', '')
BASE_URL    = 'https://buildestimate.32blocks.com'

os.makedirs(UPLOAD_DIR, exist_ok=True)

# ── DB init ──────────────────────────────────────────────────────────────────
def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute('''CREATE TABLE IF NOT EXISTS analyses (
        id       TEXT PRIMARY KEY,
        url      TEXT,
        result   TEXT,
        created  TEXT DEFAULT CURRENT_TIMESTAMP
    )''')
    conn.commit(); conn.close()

init_db()

# ── Prompts (same logic as original Supabase edge function) ──────────────────
ANNOTATED_PROMPT = """\
You are analysing a renovation floor plan image. The user has drawn coloured highlighted \
rectangles over the areas they want to renovate. The highlighted areas are visible as \
semi-transparent coloured fills in the image.

The user labelled the highlighted area(s) as: {room_types}.

Your task:
1. Look at the coloured/shaded regions — these show what the user wants to renovate.
2. Identify every room label WITH explicit dimension labels (e.g. "MEALS 5.3 x 5.9", \
"DINING 3.3 x 3.7") that falls fully or mostly within a highlighted area.
3. For each identified room, calculate: area = width × height.
4. For any highlighted area without explicit dimensions, estimate from proportions using \
nearby labeled rooms as scale reference.
5. Sum ALL room areas within the highlighted regions only.

Return ONLY valid JSON with no markdown or extra text:
{{
  "total_area_sqm": <number>,
  "rooms": [{{"type": "bathroom|kitchen|bedroom|living|deck|other", "area_sqm": <number>}}],
  "confidence": "high|medium|low",
  "notes": "<one sentence listing each labeled room found and their dimensions>"
}}

confidence: "high" = all areas had explicit labels · "medium" = mostly labels, some estimated \
· "low" = few or no labels, mostly estimated"""

WHOLE_PLAN_PROMPT = """\
You are analysing a renovation floor plan image from a real estate listing.

Analyse the entire floor plan and identify all rooms with their areas:
1. Find every dimension label (e.g. "LIVING 4.9 x 4.2m", "BEDROOM 3.5 x 3.1").
2. For each labeled room calculate area = width × height.
3. Sum all internal room areas.
4. Identify each room type: bathroom, kitchen, bedroom, living, deck, or other.

Return ONLY valid JSON with no markdown or extra text:
{{
  "total_area_sqm": <number>,
  "rooms": [{{"type": "bathroom|kitchen|bedroom|living|deck|other", "area_sqm": <number>}}],
  "confidence": "high|medium|low",
  "notes": "<brief summary of dimension labels found>"
}}"""


# ── Claude call ──────────────────────────────────────────────────────────────
def call_claude(image_b64, prompt):
    payload = json.dumps({
        'model': 'claude-sonnet-4-6',
        'max_tokens': 1024,
        'messages': [{'role': 'user', 'content': [
            {'type': 'image', 'source': {'type': 'base64', 'media_type': 'image/jpeg', 'data': image_b64}},
            {'type': 'text', 'text': prompt},
        ]}],
    }).encode()

    req = urllib.request.Request(
        'https://api.anthropic.com/v1/messages',
        data=payload,
        headers={'x-api-key': ANTHROPIC, 'anthropic-version': '2023-06-01', 'content-type': 'application/json'},
    )
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            data = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        raise RuntimeError(f'Claude API error {e.code}: {e.read().decode()[:200]}')

    text = data['content'][0]['text']
    match = re.search(r'\{[\s\S]*\}', text)
    if not match:
        raise ValueError(f'No JSON in Claude response: {text[:200]}')
    return json.loads(match.group())


# ── HTTP handler ─────────────────────────────────────────────────────────────
class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args): pass

    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def send_json(self, code, data):
        body = json.dumps(data).encode()
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self._cors()
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200); self._cors(); self.end_headers()

    def do_GET(self):
        if self.path == '/health':
            self.send_json(200, {'ok': True})
        else:
            self.send_json(404, {'error': 'not found'})

    def do_POST(self):
        length = int(self.headers.get('Content-Length', 0))
        try:
            body = json.loads(self.rfile.read(length))
        except Exception:
            self.send_json(400, {'error': 'invalid JSON'}); return

        if self.path == '/analyze':
            self.handle_analyze(body)
        else:
            self.send_json(404, {'error': 'not found'})

    def handle_analyze(self, body):
        image_b64     = body.get('imageBase64', '')
        rectangles    = body.get('rectangles', [])
        has_ann       = bool(body.get('hasAnnotations'))

        if not image_b64:
            self.send_json(400, {'error': 'imageBase64 required'}); return

        # Save image to disk
        filename = str(uuid.uuid4()) + '.jpg'
        fpath = os.path.join(UPLOAD_DIR, filename)
        try:
            with open(fpath, 'wb') as f:
                f.write(base64.b64decode(image_b64))
        except Exception as e:
            self.send_json(500, {'error': f'Save failed: {e}'}); return

        url = f'{BASE_URL}/uploads/{filename}'

        # Build prompt
        if has_ann and rectangles:
            room_types = ', '.join(sorted({r.get('type', '') for r in rectangles}))
            prompt = ANNOTATED_PROMPT.format(room_types=room_types)
        else:
            prompt = WHOLE_PLAN_PROMPT

        # Call Claude
        try:
            result = call_claude(image_b64, prompt)
        except Exception as e:
            self.send_json(500, {'error': str(e)}); return

        result['url'] = url

        # Persist to SQLite
        try:
            conn = sqlite3.connect(DB_PATH)
            conn.execute('INSERT INTO analyses (id, url, result) VALUES (?,?,?)',
                         (str(uuid.uuid4()), url, json.dumps(result)))
            conn.commit(); conn.close()
        except Exception:
            pass  # non-fatal

        self.send_json(200, result)


if __name__ == '__main__':
    server = HTTPServer(('127.0.0.1', PORT), Handler)
    print(f'BuildEstimate API listening on 127.0.0.1:{PORT}')
    server.serve_forever()
