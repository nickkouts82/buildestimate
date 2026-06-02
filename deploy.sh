#!/usr/bin/env bash
# deploy.sh — Build, rsync to webserver, purge Cloudflare + nginx cache
# Usage: bash deploy.sh

set -e

source ~/.game-factory.env

DEPLOY_DIR="${WEBROOT}/buildestimate.32blocks.com"
SSH_OPTS="-p ${WEBSERVER_PORT} -i ~/.ssh/claude_agent_32blocks -o IdentitiesOnly=yes"

echo "=== Building ==="
npm run build

echo "=== Deploying to ${WEBSERVER_HOST}:${DEPLOY_DIR} ==="
rsync -avz --delete out/ ${WEBSERVER_USER}@${WEBSERVER_HOST}:${DEPLOY_DIR}/ -e "ssh ${SSH_OPTS}"

echo "=== Reloading nginx ==="
ssh ${SSH_OPTS} ${WEBSERVER_USER}@${WEBSERVER_HOST} "sudo systemctl reload nginx 2>/dev/null || true"

echo "=== Purging Cloudflare cache ==="
RESULT=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}')
echo "${RESULT}"

echo ""
echo "=== Done — live at https://buildestimate.32blocks.com ==="
