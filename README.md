# MediConnect

MediConnect is a full-stack doctor appointment booking system built using React, Node.js, Express, and MongoDB. It provides a structured platform for patients to book appointments, doctors to manage schedules, and administrators to oversee users and system activity. The application includes secure authentication, role-based access control, and integrated online payments.

Live Application: [https://medi-connect-henna.vercel.app/](https://medi-connect-henna.vercel.app/)

---

## Features

* JWT-based authentication and protected routes
* Role-based access for patients, doctors, and admins
* Doctor browsing with detailed profiles
* Appointment booking with date and time selection
* Payment integration using Razorpay
* Patient dashboard with appointment history and cancellation
* Doctor dashboard for viewing and managing appointments
* Admin dashboard for user management

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* CSS

### Backend

* Node.js
* Express
* MongoDB with Mongoose
* JWT Authentication
* bcryptjs
* Razorpay API

---

## Project Structure

```
MediConnect/
├── client/        # Frontend (React)
├── server/        # Backend (Node + Express)
└── package.json
```

---

## Setup and Installation

### Prerequisites

* Node.js (v18 or higher)
* MongoDB (local or cloud instance)
* Razorpay account for payment testing

### Installation

```bash
npm install
npm install --prefix client
npm install --prefix server
```

### Environment Variables

Create a `.env` file inside the `server` directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

### Running the Application

```bash
npm run dev
```

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:5000](http://localhost:5000)

---

## API Overview

Base URL: `/api`

### Authentication

* POST `/auth/register`
* POST `/auth/login`

### Users

* GET `/users`
* GET `/users/doctors`
* GET `/users/patients`

### Appointments

* POST `/appointments`
* GET `/appointments`
* PUT `/appointments/:id`

### Payments

* POST `/payments/create-order`

---

## Application Workflow

1. User registers or logs in
2. Patient selects a doctor and appointment slot
3. Payment is initiated through Razorpay
4. Appointment is created after successful payment
5. Dashboards display role-specific data

---

## Deployment Notes

* Update `CLIENT_URL` in backend environment variables after deployment
* Recommended to use MongoDB Atlas for production
* Frontend can be deployed on platforms like Vercel

---

## Future Improvements

* Real-time notifications
* Doctor availability management system
* Reviews and ratings
* Email or SMS confirmations

---

## License

No license specified.

