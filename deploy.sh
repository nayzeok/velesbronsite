#!/bin/bash
set -e

echo "Building..."
npm run build -- --webpack

echo "Uploading..."
rsync -avz \
  -e "sshpass -p 'Jtn7H%EbFF9h' ssh -o StrictHostKeyChecking=no" \
  .next public content \
  root@159.194.202.41:/var/www/velesbron/

echo "Restarting..."
sshpass -p 'Jtn7H%EbFF9h' ssh -o StrictHostKeyChecking=no root@159.194.202.41 "pm2 restart velesbron"

echo "Done! Site updated."
