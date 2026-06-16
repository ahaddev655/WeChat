<div align="center">

# 💬 WeChat

### *Modern Real-Time Communication Platform*

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-blue?style=for-the-badge)](CONTRIBUTING.md)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)]()

<br/>

> **WeChat** is a modern real-time communication platform that enables users to connect, collaborate, and engage in communities — seamlessly and securely.

<br/>

[🚀 Getting Started](#-installation) · [✨ Features](#-features) · [🛠 Tech Stack](#-tech-stack) · [🤝 Contributing](#-contributing)

</div>

---

## 📖 Overview

WeChat is a full-stack, production-grade real-time messaging application built for individuals and communities. Whether you're having a private conversation or engaging in a large group discussion, WeChat delivers instant, secure, and smooth communication powered by WebSockets.

Designed with a modern, responsive UI and enriched by fluid animations, WeChat is as delightful to use as it is powerful under the hood. It supports Google OAuth for frictionless onboarding, community spaces for group engagement, and message bookmarking so nothing important gets lost.

---

## ✨ Features

### 🔐 Authentication & Security
- **Google OAuth Integration** — Sign in instantly with your Google account
- **JWT-based Authorization** — Secure, stateless session management
- **Protected Routes** — Role-aware access control throughout the app

### 💬 Messaging
- **Real-Time Direct Messaging** — Instant user-to-user chat powered by WebSockets
- **Community Conversations** — Group-based discussions in dedicated community spaces
- **Message Bookmarking** — Save and revisit important messages with a single click

### 👥 Communities
- **Create & Join Communities** — Build or discover public and private groups
- **Community Management** — Organize members, topics, and conversations
- **Live Member Presence** — See who's online in real time

### 🎨 User Experience
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile
- **Smooth Animations** — Powered by Framer Motion for fluid, native-like transitions
- **Modern UI** — Clean, intuitive interface built with Tailwind CSS
- **Real-Time Updates** — No page refreshes needed — everything updates live

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| ⚛️ **React** | Component-based UI library |
| 🎨 **Tailwind CSS** | Utility-first styling framework |
| 🎞️ **Framer Motion** | Animations and transitions |
| 🔀 **React Router DOM** | Client-side routing |
| 📡 **Axios** | HTTP client for API communication |
| 🖼️ **Lucide React** | Modern icon library |
| 🔣 **React Icons** | Extended icon collection |

### Backend
| Technology | Purpose |
|---|---|
| 🟢 **Node.js** | JavaScript runtime environment |
| 🚂 **Express.js** | Web application framework |
| 🔌 **WebSocket (ws)** | Real-time bidirectional communication |

### Database & Auth
| Technology | Purpose |
|---|---|
| 🐬 **MySQL** | Relational database for persistent storage |
| 🔑 **Google OAuth 2.0** | Secure third-party authentication |

---

## 🏗 Architecture & Workflow

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                           │
│   React App  ──►  React Router  ──►  Component Tree    │
│       │                                     │           │
│    Axios (REST)                    WebSocket Client     │
└───────┼─────────────────────────────────────┼───────────┘
        │                                     │
        ▼                                     ▼
┌─────────────────────────────────────────────────────────┐
│                       SERVER                            │
│   Express.js  ──►  REST API Routes  ──►  Controllers   │
│       │                                     │           │
│   WebSocket Server ◄────────────────── WS Manager      │
│       │                                     │           │
│   Google OAuth                          JWT Auth        │
└───────┼─────────────────────────────────────┼───────────┘
        │                                     │
        ▼                                     ▼
┌─────────────────────────────────────────────────────────┐
│                      DATABASE                           │
│              MySQL  ──►  Data Models                    │
│   Users | Messages | Communities | Bookmarks           │
└─────────────────────────────────────────────────────────┘
```

**Communication Flow:**
1. User authenticates via Google OAuth → receives JWT
2. Frontend connects to WebSocket server with the JWT
3. Messages are broadcast in real time to all connected participants
4. REST API handles non-real-time operations (profile, history, communities)
5. MySQL persists all data for retrieval across sessions

---

## 📁 Project Structure

```
wechat/
├── client/                       # React frontend
│   ├── public/                   # Static assets
│   └── src/
│       ├── components/           # Reusable UI components
│       │   ├── auth/             # Login, OAuth buttons
│       │   ├── chat/             # Message bubbles, input, window
│       │   ├── community/        # Community cards, sidebar
│       │   └── shared/           # Navbar, modals, loaders
│       ├── pages/                # Route-level page components
│       │   ├── Home.jsx
│       │   ├── Chat.jsx
│       │   ├── Community.jsx
│       │   └── Bookmarks.jsx
│       ├── context/              # React Context (auth, socket, theme)
│       ├── hooks/                # Custom React hooks
│       ├── services/             # Axios API service layer
│       ├── utils/                # Helper functions
│       ├── App.jsx
│       └── main.jsx
│
├── server/                       # Node.js backend
│   ├── config/                   # DB and environment config
│   ├── controllers/              # Route handler logic
│   │   ├── authController.js
│   │   ├── messageController.js
│   │   ├── communityController.js
│   │   └── bookmarkController.js
│   ├── middleware/               # Auth, error handling
│   ├── models/                   # MySQL data models
│   ├── routes/                   # Express route definitions
│   ├── socket/                   # WebSocket server logic
│   ├── utils/                    # Server-side helpers
│   └── index.js                  # Entry point
│
├── .env.example                  # Environment variable template
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/) `v9+` or [yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com/) `v8+`
- A [Google Cloud Console](https://console.cloud.google.com/) project with OAuth 2.0 credentials

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/wechat.git
cd wechat
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### 3. Configure the Database

Log into MySQL and create the application database:

```sql
CREATE DATABASE wechat_db;
```

Then import the schema (if provided):
```bash
mysql -u root -p wechat_db < server/config/schema.sql
```

### 4. Set Up Environment Variables

Copy the example environment files and fill in your values:

```bash
# In /server
cp .env.example .env

# In /client
cp .env.example .env
```

See the [Environment Variables](#-environment-variables) section below for details.

---

## 🔐 Environment Variables

### Server (`server/.env`)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=wechat_db

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Client
CLIENT_URL=http://localhost:5173
```

### Client (`client/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

> ⚠️ **Never commit `.env` files to version control.** They are listed in `.gitignore` by default.

---

## 🚀 Running the Application

### Development Mode

**Start the backend server:**
```bash
cd server
npm run dev
```

**Start the frontend dev server:**
```bash
cd client
npm run dev
```

The app will be available at:
- 🌐 **Frontend:** `http://localhost:5173`
- 🔧 **Backend API:** `http://localhost:5000/api`
- 🔌 **WebSocket:** `ws://localhost:5000`

---

### Production Mode

**Build the frontend:**
```bash
cd client
npm run build
```

**Start the production server:**
```bash
cd server
npm start
```

---

## 🖼️ Screenshots

> 📸 *Screenshots coming soon — the application is actively being developed.*

| Feature | Preview |
|---|---|
| 🏠 Home / Dashboard | *(screenshot placeholder)* |
| 💬 Real-Time Chat | *(screenshot placeholder)* |
| 👥 Community Page | *(screenshot placeholder)* |
| 🔖 Bookmarks | *(screenshot placeholder)* |
| 🔐 Login / Auth | *(screenshot placeholder)* |

---

## 🔮 Future Improvements

Here's what's on the roadmap for WeChat:

- [ ] 📎 **File & Media Sharing** — Send images, documents, and videos in chats
- [ ] 🔔 **Push Notifications** — Real-time browser and mobile notifications
- [ ] 🌙 **Dark Mode** — System-aware and user-toggled theme switching
- [ ] 📞 **Voice & Video Calls** — WebRTC-powered audio/video communication
- [ ] 🔍 **Global Search** — Search across messages, users, and communities
- [ ] 😄 **Emoji Reactions** — React to messages with emoji responses
- [ ] 🧵 **Threaded Replies** — Reply to specific messages in a thread
- [ ] 📱 **Mobile App** — React Native companion app for iOS and Android
- [ ] 🌍 **Internationalization (i18n)** — Multi-language support
- [ ] 🛡️ **End-to-End Encryption** — Enhanced privacy for direct messages

---

## 🤝 Contributing

Contributions are what make open-source amazing! All contributions — bug fixes, features, documentation improvements — are warmly welcome.

### How to Contribute

1. **Fork** the repository
2. **Create** your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with a descriptive message:
   ```bash
   git commit -m "feat: add emoji reactions to messages"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** and describe what you've changed and why

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Purpose |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation update |
| `style:` | Code formatting (no logic change) |
| `refactor:` | Code restructuring |
| `test:` | Adding or updating tests |
| `chore:` | Build process or tooling changes |

### Code of Conduct

Please be respectful and constructive. All contributors are expected to adhere to a standard of professional and inclusive conduct.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for full details.

```
MIT License

Copyright (c) 2025 WeChat Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👤 Author

<div align="center">

**Built with ❤️ by the WeChat Team**

If you found this project helpful, please consider giving it a ⭐ on GitHub — it helps others discover it!

[![GitHub stars](https://img.shields.io/github/stars/your-username/wechat?style=social)](https://github.com/your-username/wechat)

</div>

---

<div align="center">
  <sub>© 2025 WeChat · Open Source · MIT Licensed</sub>
</div>
