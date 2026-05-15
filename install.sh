#!/bin/bash

apt update -y && apt upgrade -y
apt install -y curl git

# Backend
cd /opt
https://github.com/soufly9009/installer-pterodactyl.git
cd ptero-web-installer/backend
apt install -y nodejs npm
npm install

cat > /etc/systemd/system/ptero-backend.service <<EOF
[Unit]
Description=Ptero Backend
After=network.target

[Service]
WorkingDirectory=/opt/ptero-web-installer/backend
ExecStart=/usr/bin/node server.js
Restart=always
User=root

[Install]
WantedBy=multi-user.target
EOF

systemctl enable ptero-backend
systemctl start ptero-backend

# Frontend (build + nginx si tu veux le servir en prod)
