#!/usr/bin/env bash
set -euo pipefail

# Authenticate with an SSH key or ssh-agent; never store passwords here.
# Verify and add the server host key to known_hosts before deploying.
VPS_HOST="${VPS_HOST:-159.194.222.126}"
VPS_USER="${VPS_USER:-root}"
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

[[ "$VPS_HOST" =~ ^[a-zA-Z0-9][a-zA-Z0-9.-]*$ ]] || { echo "Invalid VPS_HOST" >&2; exit 1; }
[[ "$VPS_USER" =~ ^[a-zA-Z_][a-zA-Z0-9_-]*$ ]] || { echo "Invalid VPS_USER" >&2; exit 1; }
TARGET="$VPS_USER@$VPS_HOST"
SSH_OPTIONS=(-o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15)

ssh "${SSH_OPTIONS[@]}" "$TARGET" 'test -d /var/www/velesbron && command -v node && command -v npm && command -v pm2 && command -v rsync'

echo "Uploading source to $VPS_HOST..."
rsync -az --itemize-changes \
  -e 'ssh -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15' \
  --exclude='/data/' \
  --exclude='.env*' \
  --exclude='/node_modules/' \
  --exclude='/.next/' \
  --exclude='/.git/' \
  --exclude='/.github/' \
  --exclude='/.codex/' \
  --exclude='/.claude/' \
  --exclude='/.idea/' \
  --exclude='.DS_Store' \
  --exclude='*.tsbuildinfo' \
  ./ "$TARGET:/var/www/velesbron/"

echo "Building on the server..."
ssh "${SSH_OPTIONS[@]}" "$TARGET" 'bash -se' <<'REMOTE'
cd /var/www/velesbron
npm ci
npm run build -- --webpack
pm2 restart velesbron
pm2 save
for attempt in {1..15}; do
  if curl --fail --silent --output /dev/null http://127.0.0.1:3000/; then
    echo "Deployment complete; application responds successfully."
    exit 0
  fi
  sleep 2
done
echo "Application health check failed." >&2
exit 1
REMOTE
