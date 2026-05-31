# CodeVerse Project Setup Guide

## Project Overview
CodeVerse is a MERN (MongoDB, Express, React, Node.js) stack application with a backend API server and a React frontend with TypeScript.

---

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git
- MongoDB (local or Atlas connection)
- VS Code (recommended)

---

## Project Structure
```
CodeVerse/
├── backend/          # Express.js API server
├── frontend/         # React + TypeScript frontend
├── .gitignore        # Git ignore configuration
└── README.md         # Project documentation
```

---

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codeverse
NODE_ENV=development
```

### 4. Update package.json (if needed)
Add scripts to `backend/package.json`:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 5. Start Backend Server
```bash
npm run dev
```
Server will run on `http://localhost:5000`

---

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
Create a `.env.local` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Frontend Development Server
```bash
npm run dev
```
Frontend will run on `http://localhost:5173` (or next available port)

---

## Full Project Setup (One Command)

### From Project Root:
```bash
# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### Start Both Services:

**Terminal 1 - Backend:**
```bash
cd backend && npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend && npm run dev
```

---

## Git Setup (Already Completed)

### Initial Setup Commands
```bash
echo "# codeverse" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/karangarle/codeverse.git
git push -u origin main
```

### Add .gitignore
```bash
git add .gitignore
git commit -m "add .gitignore"
git push
```

---

## Common Commands

### Development
```bash
# Start backend with hot reload
cd backend && npm run dev

# Start frontend with hot reload
cd frontend && npm run dev

# Build frontend for production
cd frontend && npm run build
```

### Git Workflow
```bash
# Check status
git status

# Stage changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to main branch
git push origin main

# Pull latest changes
git pull origin main
```

### Database
```bash
# MongoDB local connection
mongodb://localhost:27017/codeverse

# MongoDB Atlas connection (update in .env)
mongodb+srv://username:password@cluster.mongodb.net/codeverse
```

---

## Troubleshooting

### Port Already in Use
- Backend (5000): `netstat -ano | findstr :5000`
- Frontend (5173): Change port in `vite.config.ts`

### Database Connection Issues
- Ensure MongoDB is running
- Check `.env` file configuration
- Verify MongoDB connection string

### Module Not Found Errors
- Delete `node_modules` folder
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

---

## Project Links
- **GitHub Repository:** https://github.com/karangarle/codeverse.git
- **Local Backend:** http://localhost:5000
- **Local Frontend:** http://localhost:5173

---

## Additional Resources
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Vite Documentation](https://vitejs.dev/)
