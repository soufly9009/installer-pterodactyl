# 🚀 Pterodactyl Web Installer

Interface web permettant d'installer **Pterodactyl Panel**, **Wings Nodes** et **Cloudflare Tunnel** via une interface moderne **React + Tailwind** avec un backend **Node.js + Express**, et des **logs en temps réel** via WebSocket.

---

## ✨ Fonctionnalités

- 🖥️ Installation du **Panel Pterodactyl** (automatisée)
- 🐦 Installation de **Nodes Wings** (support multi-nœuds)
- 🗄️ **Base MySQL automatique** (création & configuration)
- ⚙️ **Génération automatique du `.env`**
- 🔒 **SSL automatique** via Let's Encrypt
- 🌐 **Cloudflare Tunnel** (cloudflared)
- 📡 **Logs en temps réel** via WebSocket
- 🔌 **API REST complète**
- 💅 **UI moderne** (React + Tailwind CSS)
- ⚡ **Backend Node.js** (Express)
- 🔧 **Scripts Bash robustes**
- 🐧 Compatible **Ubuntu 20.04 / 22.04 / 24.04**

---

## 📁 Structure du projet

```
ptero-web-installer/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── installPanel.js
│   │   ├── installNode.js
│   │   └── cloudflare.js
│   ├── services/
│   │   ├── shellRunner.js
│   │   ├── panelInstaller.sh
│   │   ├── nodeInstaller.sh
│   │   └── cloudflareInstaller.sh
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api.ts
│   │   ├── main.tsx
│   │   └── components/
│   │       ├── PanelForm.tsx
│   │       ├── NodeForm.tsx
│   │       └── LogsConsole.tsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── install.sh
└── README.md
```

---

## ⚙️ Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/TON_USER/ptero-web-installer.git
cd ptero-web-installer
```

### 2. Démarrer le backend

```bash
cd backend
npm install
node server.js
```

### 3. Démarrer le frontend

```bash
cd frontend
npm install
npm run dev
```

> 💡 **Tip :** Vous pouvez aussi utiliser le script `install.sh` à la racine pour tout installer en une seule commande.

---

## 🌐 Accès à l'interface

| Service       | URL                        |
|---------------|----------------------------|
| Frontend (Vite) | `http://localhost:5173`  |
| Backend API   | `http://localhost:4000`    |

---

## 🔌 API REST

### Installer le Panel

```http
POST /api/install/panel
Content-Type: application/json

{
  "domain": "example.com",
  "ssl": "yes",
  "cloudflareToken": "TOKEN_OPTIONNEL"
}
```

### Installer un Node Wings

```http
POST /api/install/node
Content-Type: application/json

{
  "nodeName": "node-1",
  "cloudflareToken": "TOKEN_OPTIONNEL"
}
```

---

## 📡 WebSocket — Logs en temps réel

Les logs sont diffusés en direct via WebSocket sur les canaux suivants :

| Canal              | Description                          |
|--------------------|--------------------------------------|
| `logs:panel`       | Logs d'installation du Panel         |
| `logs:node`        | Logs d'installation d'un Node Wings  |
| `logs:cloudflare`  | Logs de configuration Cloudflare     |

---

## 🔐 Cloudflare Tunnel

Le script `cloudflareInstaller.sh` gère automatiquement :

- ✅ Installation de `cloudflared`
- ✅ Activation et configuration du tunnel
- ✅ Création d'un service **systemd** pour le démarrage automatique

---

## 🧩 Scripts Bash inclus

| Script                    | Rôle                                            |
|---------------------------|-------------------------------------------------|
| `panelInstaller.sh`       | Installe le panel Pterodactyl complet           |
| `nodeInstaller.sh`        | Installe un node Wings                          |
| `cloudflareInstaller.sh`  | Configure cloudflared et le tunnel              |
| `shellRunner.js`          | Exécute les scripts Bash avec logs live (Node)  |

---

## 🖥️ Prérequis système

- **OS :** Ubuntu 20.04 / 22.04 / 24.04 (64-bit)
- **Node.js :** v18 ou supérieur
- **npm :** v8 ou supérieur
- **Accès root** (ou sudo) pour l'exécution des scripts d'installation

---

## 🛠️ Variables d'environnement

Le fichier `.env` est **généré automatiquement** lors de l'installation du Panel. Les variables principales incluent :

```env
APP_URL=https://example.com
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pterodactyl
DB_USERNAME=pterodactyl
DB_PASSWORD=<généré automatiquement>
```

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Forkez le dépôt
2. Créez une branche : `git checkout -b feature/ma-fonctionnalite`
3. Commitez vos modifications : `git commit -m "feat: ajout de ma fonctionnalité"`
4. Poussez : `git push origin feature/ma-fonctionnalite`
5. Ouvrez une **Pull Request**

---

## 📜 Licence

Ce projet est **libre d'utilisation, de modification et de distribution**.  
Aucune restriction — faites-en ce que vous souhaitez. 🎉

---

<p align="center">
  Fait avec ❤️ pour la communauté Pterodactyl
</p>
