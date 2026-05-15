#!/bin/bash

echo "🔄 Mise à jour du système..."
apt update -y && apt upgrade -y

echo "📦 Installation des dépendances..."
apt install -y curl wget git

echo "🧹 Suppression des anciennes versions de Node.js..."
apt remove -y nodejs npm
rm -f /etc/apt/sources.list.d/nodesource.list
apt update -y

echo "🟩 Installation de Node.js 18 LTS (compatible npm)..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

echo "📌 Vérification des versions :"
node -v
npm -v

echo "📁 Installation du backend..."
cd /opt
git clone https://github.com/soufly9009/installer-pterodactyl.git
cd installer-pterodactyl/backend
npm install

echo "⚙️ Création du service systemd..."
cat > /etc/systemd/system/ptero-backend.service <<EOF
[Unit]
Description=Ptero Backend
After=network.target

[Service]
WorkingDirectory=/opt/installer-pterodactyl/backend
ExecStart=/usr/bin/node server.js
Restart=always
User=root

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable ptero-backend
systemctl start ptero-backend

echo "🎉 Installation terminée !"
echo "🌐 Backend disponible sur : http://$(hostname -I | awk '{print $1}'):4000"
