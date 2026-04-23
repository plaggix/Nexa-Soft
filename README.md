# Nexa Soft — Agence de Services Numériques

Application fullstack SPA haut de gamme : React (Vite) + Node.js (Express) + PostgreSQL (Prisma).

## Architecture

```
/
├── frontend/          # React + Vite + Tailwind CSS + Framer Motion
│   └── src/
│       ├── components/   # Navbar, Hero, ServiceCard, Services, WhyUs, ContactForm, Footer
│       ├── pages/        # HomePage, AdminDashboard
│       └── lib/          # api.js (axios)
│
└── backend/           # Express + Prisma + PostgreSQL
    ├── src/
    │   ├── routes/       # contact.js, services.js, projects.js, admin.js
    │   └── lib/          # prisma.js
    └── prisma/
        ├── schema.prisma # Modèles Service, Contact, Project
        └── seed.js       # Données initiales
```

## Prérequis

- Node.js >= 18
- PostgreSQL avec la base `nexasoft_db` créée

## Installation

### 1. Créer la base de données PostgreSQL

```sql
CREATE DATABASE nexasoft_db;
```

### 2. Configurer le backend

```bash
cd backend
# Éditer .env avec vos credentials PostgreSQL
# DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/nexasoft_db"

npm install
npx prisma db push        # Crée les tables dans nexasoft_db
node prisma/seed.js       # Peuple la DB avec les données initiales
npm run dev               # Lance le serveur sur http://localhost:5000
```

### 3. Lancer le frontend

```bash
cd frontend
npm install
npm run dev               # Lance sur http://localhost:5173
```

## API Endpoints

| Méthode | Route                    | Description                        |
|---------|--------------------------|------------------------------------|
| GET     | /api/health              | Health check                       |
| GET     | /api/services            | Liste tous les services            |
| GET     | /api/services/:id        | Détail d'un service                |
| GET     | /api/projects            | Liste tous les projets             |
| POST    | /api/contact             | Soumettre un formulaire de contact |
| GET     | /api/admin/stats         | Stats dashboard (auth requise)     |
| GET     | /api/admin/contacts      | Liste des messages (auth requise)  |
| DELETE  | /api/admin/contacts/:id  | Supprimer un message (auth requise)|

## Dashboard Admin

Accès : `http://localhost:5173/admin`  
Token par défaut (dev) : `nexasoft_admin_2024`  
⚠️ Changer `ADMIN_SECRET` dans `backend/.env` en production.

## Variables d'environnement (backend/.env)

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/nexasoft_db"
PORT=5000
NODE_ENV=development
ADMIN_SECRET="nexasoft_admin_2024"
```
