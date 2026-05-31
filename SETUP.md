# CodeVerse Setup Documentation

This document provides step-by-step instructions to get the **CodeVerse** development environment set up and running locally.

---

## 🛠️ Prerequisites

Before you start, make sure you have the following installed on your machine:
* **Node.js** (v18.x or higher recommended)
* **npm** (v9.x or higher)
* **MongoDB** (running locally on port `27017` or a remote MongoDB Atlas URI)

---

## 📁 Project Structure

```text
CodeVerse/
├── backend/            # Express & Node.js Backend API
│   ├── config/         # Database configurations
│   ├── controllers/    # API Request Controllers
│   ├── models/         # Mongoose Schemas (User, etc.)
│   ├── routes/         # Express API Routes
│   ├── server.js       # Main server entrypoint
│   └── .env            # Environment configurations (ignored by git)
├── frontend/           # React + TypeScript + Vite Frontend
│   ├── src/
│   │   ├── pages/      # Home, Login, Register views
│   │   ├── providers/  # Global state/query providers
│   │   ├── router/     # React Router setup
│   │   └── shared/     # Component library (Tailwind CSS v4 & Radix)
│   └── package.json
└── SETUP.md            # This setup documentation
```

---

## 🚀 Backend Setup

1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `backend/` directory (if not already present) with the following content:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/codeverse
   JWT_SECRET=my_super_secret_key
   ```
   > [!NOTE]
   > Replace `mongodb://127.0.0.1:27017/codeverse` with your actual connection string if you are using MongoDB Atlas.

4. **Start the Development Server**:
   Runs the server with hot-reloading powered by `nodemon`:
   ```bash
   npm run dev
   ```
   *The console should output `Server Running On 5000` followed by `MongoDB Connected`.*

5. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 💻 Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Verify API Configuration**:
   The frontend is configured to connect to the backend at `http://localhost:5000/api` through the Axios utility located in `src/shared/api/axios.ts`.

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   *The server will start at `http://localhost:5173/`.*

5. **Build and Preview (Production Build Check)**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📡 API Endpoints

The backend currently exposes the following authentication endpoint:

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Registers a new user | `{ "name": "Name", "email": "user@example.com", "password": "securepassword" }` |

---

## 📦 Installed Packages & Re-installation Commands

If you ever need to set up the packages from scratch or install them individually, use the following commands:

### 🔌 Backend Packages

#### Core Dependencies
* **express**: Fast, unopinionated, minimalist web framework.
* **mongoose**: MongoDB object modeling tool.
* **dotenv**: Zero-dependency module that loads environment variables.
* **cors**: Cross-Origin Resource Sharing middleware.
* **cookie-parser**: Parse Cookie header and populate `req.cookies`.
* **bcryptjs**: Optimized bcrypt in JavaScript for secure password hashing.
* **jsonwebtoken**: JSON Web Token implementation for user authentication.
* **express-validator**: Set of express.js middlewares for validation and sanitization.
* **multer**: Middleware for handling `multipart/form-data` (file uploads).

```bash
npm install express mongoose dotenv cors cookie-parser bcryptjs jsonwebtoken express-validator multer
```

#### Dev Dependencies
* **nodemon**: Automatically restarts Node application when file changes are detected.

```bash
npm install --save-dev nodemon
```

---

### 🎨 Frontend Packages

#### Core Dependencies
* **react & react-dom**: Core UI library.
* **react-router-dom**: Declarative routing for React apps.
* **@tanstack/react-query**: Async state synchronization/data fetching library.
* **axios**: Promise-based HTTP client for API requests.
* **zustand**: Small, fast, and scalable barebones state-management.
* **zod & @hookform/resolvers & react-hook-form**: Modern schema validation and form handling.
* **react-hot-toast**: Beautiful, customizable toast notifications.
* **tailwindcss & @tailwindcss/vite**: Modern utility-first CSS framework (Tailwind CSS v4).
* **clsx & tailwind-merge & class-variance-authority**: Tools for composing and dynamic styling of components.
* **lucide-react**: Clean, consistent open-source icon set.
* **radix-ui & shadcn**: Accessibility-first UI primitives and components.
* **@fontsource-variable/geist**: Geist sans-serif font family.

```bash
npm install react react-dom react-router-dom @tanstack/react-query axios zustand zod react-hook-form @hookform/resolvers react-hot-toast clsx tailwind-merge class-variance-authority lucide-react @fontsource-variable/geist radix-ui shadcn tw-animate-css tailwindcss @tailwindcss/vite
```

#### Dev Dependencies
* **vite & @vitejs/plugin-react**: Highly optimized frontend tooling and React plugin.
* **typescript & @types/...**: Type safety checker and TypeScript type definitions.
* **eslint & eslint-plugins**: Code quality linting tool suite.

```bash
npm install --save-dev vite @vitejs/plugin-react typescript @types/react @types/react-dom @types/node eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals typescript-eslint @eslint/js
```

