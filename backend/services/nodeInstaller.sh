#!/bin/bash
# Usage: nodeInstaller.sh NODE_NAME CF_TOKEN

NODE_NAME="$1"
CF_TOKEN="$2"

echo "🚀 Installation du node Wings: $NODE_NAME"

apt update -y
apt install -y curl

mkdir -p /etc/pterodactyl-$NODE_NAME
cd /etc/pterodactyl-$NODE_NAME

echo "📥 Téléchargement de Wings..."
curl -Lo wings https://github.com/pterodactyl/wings/releases/latest/download/wings_linux_amd64
chmod +x wings

cat > /etc/systemd/system/wings-$NODE_NAME.service <<EOF
[Unit]
Description=Pterodactyl Wings Node $NODE_NAME
After=network.target

[Service]
User=root
WorkingDirectory=/etc/pterodactyl-$NODE_NAME
ExecStart=/etc/pterodactyl-$NODE_NAME/wings
Restart=always

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable wings-$NODE_NAME
systemctl start wings-$NODE_NAME

if [[ ! -z "$CF_TOKEN" ]]; then
  echo "🔐 Configuration Cloudflare Tunnel pour le node $NODE_NAME..."
  mkdir -p /etc/cloudflared
  cloudflared service install --token "$CF_TOKEN"
  systemctl enable cloudflared
  systemctl start cloudflared
fi

echo "✅ Node $NODE_NAME installé."
