const API = '/api';

export async function analyzeFloorPlan(imageBase64, rectangles, hasAnnotations) {
    const res = await fetch(`${API}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, rectangles, hasAnnotations }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Server error ${res.status}`);
    return data;
}
