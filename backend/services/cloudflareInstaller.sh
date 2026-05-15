#!/bin/bash
# Usage: cloudflareInstaller.sh CF_TOKEN

CF_TOKEN="$1"

if [[ -z "$CF_TOKEN" ]]; then
  echo "❌ Aucun token Cloudflare fourni."
  exit 1
fi

echo "🔐 Installation Cloudflare Tunnel..."

apt update -y
apt install -y cloudflared

mkdir -p /etc/cloudflared
echo "$CF_TOKEN" > /etc/cloudflared/token.txt

cloudflared service install --token "$CF_TOKEN"
systemctl enable cloudflared
systemctl start cloudflared

echo "✅ Cloudflare Tunnel configuré."
