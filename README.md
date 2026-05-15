
<div align="center">

<img src="FrontendCode/src/assets/Tasty Effect.png" alt="TastyEffect Logo" width="180"/>

# 🍽️ TastyEffect

**A full-stack recipe discovery & management platform**

*Explore recipes by meal type and season · Save your favourites · Admin-powered content management*

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![MUI](https://img.shields.io/badge/MUI-v5-007FFF?style=flat-square&logo=mui)](https://mui.com/)

</div>

---

## 📖 About

TastyEffect is a recipe web application where users can browse, save, and manage recipes organised by **meal type** (Breakfast, Lunch, Dinner, Snacks) and **season** (Summer, Winter, Rainy). Admins can upload, edit, and delete recipes through a dedicated dashboard. Users can register, build a profile, write reviews, and save their favourite dishes.

---

## ✨ Features

### 👤 Users
- Register and log in with JWT-based authentication
- Browse recipes filtered by **meal type** and **season**
- View full recipe details — ingredients, steps, prep time, and YouTube video
- Rate and review recipes
- Save recipes to a personal collection
- Update profile info, change password, manage reviews
- Submit feedback via the contact/about page

### 🔐 Admins
- Separate admin login with protected routes
- Upload new recipes with image, ingredients, steps, video link
- Edit or delete existing recipes
- View all registered users
- Manage feedback submissions
- View subscriber notifications

### 🌐 Public
- Hero section with featured recipes
- Search recipes by name
- Browse by category (Veg, seasonal, meal-based)
- FAQs page
- Newsletter subscription via email

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Tailwind CSS, MUI v5 |
| UI Components | MUI Data Grid, MUI Charts, Framer Motion, Swiper, Flowbite |
| Backend | Node.js, Express 4 |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT (JSON Web Tokens), bcrypt |
| File Uploads | Multer |
| Email | Nodemailer |
| HTTP Client | Axios |
| Notifications | React Toastify |

---

## 📁 Project Structure

```
TastyEffect/
├── FrontendCode/          # React app (CRA)
│   ├── public/
│   └── src/
│       ├── assets/        # Images and static files
│       ├── components/    # Shared components (Navbar, Hero, Footer, FAQs)
│       ├── routes/        # Top-level page routes (Home, About, Profile, etc.)
│       └── Pages/
│           ├── Admin-profile/   # Admin dashboard, recipe management, notifications
│           ├── Recipes/         # Recipe browsing pages (by season, meal type)
│           └── User-profile/    # User profile, saved items, settings
│
└── BackendCode/           # Express REST API
    ├── Models/            # Mongoose schemas (User, Recipe, Review, Feedback…)
    ├── Routes/            # API route definitions
    ├── controllers/       # Business logic
    └── Middleware/        # JWT auth guards
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 16
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))

---

### 1. Clone the repo

```bash
git clone https://github.com/NITHINKR06/TastyEffect.git
cd TastyEffect
```

---

### 2. Backend setup

```bash
cd BackendCode
npm install
```

Create a `.env` file in `BackendCode/`:

```env
MONGO_URI=mongodb://localhost:27017/Recipe_App
JWT_SECRET=your_jwt_secret_here
PORT=7000
FRONTEND_URL=http://localhost:3000
```

Create the upload directories:

```bash
mkdir -p uploads/User uploads/recipeImage uploads/Admin
```

Start the server:

```bash
# Development (with auto-reload)
npx nodemon index.js

# Production
node index.js
```

The API will run at `http://localhost:7000`.

---

### 3. Frontend setup

```bash
cd FrontendCode
npm install --legacy-peer-deps
```

Create a `.env` file in `FrontendCode/`:

```env
REACT_APP_API_URL=http://localhost:7000
REACT_APP_RECAPTCHA_SITE_KEY=your_google_recaptcha_site_key
```

Start the dev server:

```bash
npm start
```

The app will open at `http://localhost:3000`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/user/register` | Register new user | — |
| POST | `/api/user/login` | User login | — |
| GET | `/api/user/getAllUsers` | List all users | Admin |
| POST | `/api/recipe/insertRecipe` | Upload new recipe | Admin |
| GET | `/api/recipe/getAllRecipes` | Get all recipes | — |
| GET | `/api/recipe/getRecipe/:name` | Get recipe by name | — |
| PUT | `/api/recipe/updateRecipe/:id` | Update recipe | Admin |
| DELETE | `/api/recipe/deleterecipe/:id` | Delete recipe | Admin |
| POST | `/api/reviews` | Add a review | User |
| GET | `/api/savedrecipe` | Get saved recipes | User |
| POST | `/api/feedback/submit` | Submit feedback | — |
| GET | `/api/feedback/all` | View all feedback | Admin |
| POST | `/api/userresponse/addresponse` | Subscribe to newsletter | — |

Static file serving:
- Recipe images → `/uploads/recipe/:filename`
- User avatars → `/uploads/user/:filename`

---

## 🌍 Deployment

### Frontend → [Vercel](https://vercel.com)

1. Import the repo on Vercel, set **Root Directory** to `FrontendCode`
2. Add environment variables:
   - `REACT_APP_API_URL` = your deployed backend URL
   - `REACT_APP_RECAPTCHA_SITE_KEY` = your reCAPTCHA key
3. Deploy — Vercel auto-detects Create React App

### Backend → [Railway](https://railway.app) or [Render](https://render.com)

1. Connect the repo, set root to `BackendCode`
2. Build command: `npm install`
3. Start command: `node index.js`
4. Add env variables: `MONGO_URI`, `JWT_SECRET`, `PORT`, `FRONTEND_URL`

### Database → [MongoDB Atlas](https://cloud.mongodb.com)

1. Create a free M0 cluster
2. Copy the connection string as your `MONGO_URI`
3. Add your server's IP (or `0.0.0.0/0`) to Network Access

> ⚠️ Before deploying, make sure you've replaced all `http://localhost:7000` references in the frontend with `process.env.REACT_APP_API_URL`. See [Fix Guide](TastyEffect_Fix_Guide.md) for details.

---

## 📸 Pages Overview

| Route | Description |
|-------|-------------|
| `/` | Home — hero section, featured recipes |
| `/allrecipe` | Recipe browser with category navigation |
| `/allrecipe/breakfast` | Breakfast recipes |
| `/allrecipe/lunch` | Lunch recipes |
| `/allrecipe/dinner` | Dinner recipes |
| `/allrecipe/snacks` | Snack recipes |
| `/allrecipe/summer` | Summer season recipes |
| `/allrecipe/winter` | Winter season recipes |
| `/allrecipe/rainny` | Rainy season recipes |
| `/userlogin` | User login |
| `/usersignup` | User registration |
| `/user-profile` | User profile page |
| `/saved-items` | Saved recipes |
| `/adminlogin` | Admin login |
| `/adminProfile` | Admin dashboard |
| `/aboutus` | About page with feedback form |
| `/FAQs` | Frequently asked questions |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**NITHINKR06** — [GitHub](https://github.com/NITHINKR06)

---

<div align="center">
Made with ❤️ and good food
</div>