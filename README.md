#  Railway Management System

A full-stack railway ticket booking web application built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

##  Live Demo

| Service | URL |

| Frontend | [railway-management-three.vercel.app](https://railway-management-three.vercel.app) |

| Backend API | [railway-management-0pvq.onrender.com](https://railway-management-0pvq.onrender.com) |

---

##  Features

-  User Authentication (Register / Login / Logout)
-  Station Search with autocomplete
-  Train Search by route and date
-  Dynamic ticket pricing by category
-  Fake payment gateway integration
-  PNR Status Check
-  My Tickets dashboard
-  Contact / Query submission form
-  Admin panel for ticket categories

---

##  Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- Context API (Auth)
- Custom CSS (no UI library)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cookie-based sessions

### Deployment
- Frontend → **Vercel**
- Backend → **Render**
- Database → **MongoDB Atlas**

---

##  Project Structure

```
Railway/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── TrainResults.jsx
│   │   │   ├── TicketPage.jsx
│   │   │   ├── BookTicketPage.jsx
│   │   │   ├── TicketConfirm.jsx
│   │   │   ├── MyTickets.jsx
│   │   │   ├── Pnr.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   └── App.jsx
│   └── package.json
│
└── backend/
    ├── controllers/
    │   ├── authController.js
    │   ├── trainController.js
    │   ├── ticketController.js
    │   ├── stationController.js
    │   ├── contactController.js
    │   └── ticketCategoryController.js
    ├── models/
    │   ├── userModel.js
    │   ├── trainModel.js
    │   ├── ticketModel.js
    │   ├── stationModel.js
    │   ├── contactQueryModel.js
    │   └── ticketcategory.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── trainRoutes.js
    │   ├── ticketRoutes.js
    │   ├── stationRoutes.js
    │   ├── contactRoutes.js
    │   └── ticketCategoryRoutes.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── db.js
    ├── server.js
    └── package.json
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Stations
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/stations?q=delhi` | Search stations |

### Trains
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/trains?from=NDLS&to=BSB` | Search trains |
| GET | `/api/trains/tickets/:train_number?from=&to=` | Get ticket categories |

### Tickets
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tickets/verify-payment` | Book ticket after payment |
| GET | `/api/tickets/my-tickets` | Get user's tickets |
| GET | `/api/tickets/check-pnr?pnr=` | Check PNR status |

### Contact
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contact` | Submit contact query |

### Ticket Categories (Admin)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/ticket-categories` | Get all categories |
| POST | `/api/ticket-categories` | Create category |
| PUT | `/api/ticket-categories/:id` | Update category |
| DELETE | `/api/ticket-categories/:id` | Delete category |

---

##  Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Git

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/railway-management.git
cd railway-management
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/test
PORT=5000
```

Run backend:
```bash
nodemon server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5174`

---

##  Database Collections

| Collection | Description |
|---|---|
| `users` | Registered users |
| `trains` | Train details and routes |
| `tickets` | Booked tickets |
| `stations` | Railway stations |
| `contactqueries` | User contact queries |
| `ticketcategoryrates` | Pricing per km per category |

---

##  Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Push to GitHub → Import in Vercel
```

### Backend (Render)
- Connect GitHub repo to Render
- Set environment variables in Render Dashboard
- Build command: `npm install`
- Start command: `node server.js`

### MongoDB Atlas
- Create cluster on [cloud.mongodb.com](https://cloud.mongodb.com)
- Add `0.0.0.0/0` in Network Access for Render
- Copy connection string to `MONGODB_URI`

---

##  Environment Variables

### Backend `.env`
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

---

##  Developer

**Faiz Khan**

Built with ❤️ using React + Node.js + MongoDB

---

##  License

MIT License — free to use and modify.
