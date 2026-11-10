# Smart E-Commerce – End-to-End MERN Stack Platform

![React](https://img.shields.io/badge/React-Frontend-149ECA)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933)
![Express](https://img.shields.io/badge/Express-REST_API-333333)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000)

## Project Overview

Smart E-Commerce is an end-to-end MERN Stack E-Commerce application developed for Entri Elevate Module 5, Batch FN31.

The project integrates a React frontend with an existing Node.js, Express.js, and MongoDB Atlas backend.

It demonstrates user authentication, product browsing, shopping cart management, order placement, order history, and personalized product recommendations using RapidMiner.

**Program:** Entri Elevate – AI Enhanced Full Stack Development

**Module:** Module 5 – Frontend and Backend Integration

**Batch:** FN31

**Developer:** Nareshkumar S

## Live Application

**Frontend (Vercel):**

https://entri-elevate-module5-smart-e-comme.vercel.app/

**Backend Health Check (Render):**

https://entrielevate-ecommerce-backend.onrender.com/health

**Frontend GitHub Repository:**

https://github.com/nareshkumarshankarjo-ux/Entri-Elevate-Module5-Smart-ECommerce

**Backend GitHub Repository:**

https://github.com/nareshkumarshankarjo-ux/entrielevate-ecommerce-backend

## Technology Stack

### Frontend

- React.js
- Vite
- JavaScript (ES6+)
- React Router DOM
- Redux Toolkit
- Axios
- Bootstrap
- HTML5 and CSS3

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Zod Validation
- Helmet
- CORS
- Express Rate Limit

### Analytics and Recommendations

- RapidMiner / Altair AI Studio
- User behavior tracking
- Product recommendation scores
- MongoDB recommendation storage

### Deployment

- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database
- GitHub – Version Control

## Application Features

### 1. User Authentication

- User registration
- User login
- JWT-based authentication
- Password hashing using bcryptjs on the backend
- Authenticated navigation
- Logout functionality

### 2. Product Management

- Product listing using backend APIs
- Product details page
- Product search
- Category filtering
- Price sorting
- Product data retrieved from MongoDB Atlas

### 3. Shopping Cart

- Add products to cart
- Increase product quantity
- Decrease product quantity
- Remove products from cart
- Clear shopping cart
- Automatic subtotal calculation
- Automatic cart total calculation

### 4. Checkout and Orders

- Order summary
- Quantity and price calculation
- Order submission through backend API
- Backend product availability verification
- Order history
- Order status display
- Order information stored in MongoDB Atlas

The order-placement functionality is a demonstration workflow and does not process real payments.

### 5. Personalized Product Recommendations

- RapidMiner-based recommendation scoring
- MongoDB Atlas recommendation storage
- Authenticated recommendation API
- Recommendation score display
- Navigation to recommended products

Example verified recommendation:

**Product:** Men Running Shoes

**Recommendation Score:** 1.00

### 6. Contact Form

- Full Name
- Email Address
- Subject
- Message
- Required-field validation
- Email validation
- Success confirmation message

The Contact Form demonstrates frontend validation. It does not transmit messages to email or MongoDB.

## Application Architecture

```text
React + Vite Frontend
        |
        | Axios HTTP Requests
        v
Node.js + Express REST API
        |
        | Mongoose
        v
     MongoDB Atlas
        |
        +-- Users
        +-- Products
        +-- Orders
        +-- Behaviors
        +-- Recommendations

RapidMiner
    |
    v
Recommendation Scores
    |
    v
Admin Import API
    |
    v
MongoDB Atlas
    |
    v
React Recommendations Page
```

## Frontend Folder Structure

```text
frontend/
|
+-- public/
+-- src/
|   +-- api/
|   |   +-- axios.js
|   +-- assets/
|   +-- components/
|   |   +-- Navbar.jsx
|   +-- pages/
|   |   +-- Home.jsx
|   |   +-- Products.jsx
|   |   +-- ProductDetails.jsx
|   |   +-- Cart.jsx
|   |   +-- Checkout.jsx
|   |   +-- Orders.jsx
|   |   +-- Login.jsx
|   |   +-- Register.jsx
|   |   +-- Recommendations.jsx
|   |   +-- Contact.jsx
|   +-- redux/
|   |   +-- authSlice.js
|   |   +-- cartSlice.js
|   |   +-- store.js
|   +-- App.jsx
|   +-- main.jsx
|
+-- .gitignore
+-- index.html
+-- package.json
+-- vite.config.js
+-- vercel.json
+-- README.md
```

## Installation and Local Setup

### Prerequisites

- Node.js
- npm
- Git
- A running backend API

### 1. Clone the repository

```bash
git clone https://github.com/nareshkumarshankarjo-ux/Entri-Elevate-Module5-Smart-ECommerce.git
```

### 2. Navigate to the frontend directory

```bash
cd Entri-Elevate-Module5-Smart-ECommerce
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the frontend project root.

```env
VITE_API_URL=https://entrielevate-ecommerce-backend.onrender.com/api
```

### 5. Start the development server

```bash
npm run dev
```

Open:

http://localhost:5173/

### 6. Create a production build

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

## Backend API Integration

The frontend uses Axios to communicate with the deployed Express backend.

**Base API URL:**

```text
https://entrielevate-ecommerce-backend.onrender.com/api
```

### Main API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a user |
| POST | /api/auth/login | Authenticate a user |
| GET | /api/products | Retrieve products |
| GET | /api/products/:id | Retrieve product details |
| POST | /api/orders | Place an order |
| GET | /api/orders | Retrieve authenticated user's orders |
| GET | /api/users/profile | Retrieve user profile |
| POST | /api/analytics/events | Track product behavior |
| GET | /api/analytics/recommendations | Retrieve recommendations |
| POST | /api/analytics/recommendations/import | Import RapidMiner scores (admin) |

Protected API requests use JWT Bearer authentication.

## RapidMiner Recommendation Workflow

1. Export product and user behavior data.
2. Process the data using RapidMiner.
3. Assign behavior weights:
   - Product view: 1
   - Add to cart: 3
   - Purchase: 5
4. Aggregate behavioral scores by user and product.
5. Normalize recommendation scores to the range 0–1.
6. Import the scores using the admin recommendation endpoint.
7. Store recommendation records in MongoDB Atlas.
8. Display personalized recommendations in React.

The scoring workflow was completed as part of the backend recommendation integration.

## Testing and Verification

The application was tested locally and through the deployed frontend.

| Test Case | Result |
|---|---|
| User login | Passed |
| Authenticated navigation | Passed |
| Product listing | Passed |
| Product search | Passed locally |
| Category filtering | Passed locally |
| Price sorting | Passed locally |
| Product details | Passed |
| Add to cart | Passed |
| Cart quantity updates | Passed locally |
| Checkout | Passed |
| Order placement | Passed |
| Order history | Passed |
| Recommendation retrieval | Passed |
| Contact form validation | Passed locally |
| Backend health check | Passed |
| Vercel production deployment | Passed |

### Production Order Verification

A demonstration order was successfully placed on 10 November 2026.

- Product: Men Running Shoes
- Quantity: 1
- Total: INR 2,499
- Status: placed
- Order ID: `6af2b97b3e3018851a2601e1`

## Deployment

### Frontend – Vercel

The React application is deployed from the GitHub `main` branch.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Environment variable:

```text
VITE_API_URL
```

The Vercel configuration includes an SPA rewrite so direct navigation to React Router routes can work.

### Backend – Render

The Node.js and Express backend is hosted on Render.

The production backend uses MongoDB Atlas and environment variables for configuration.

### Database – MongoDB Atlas

MongoDB Atlas stores application users, products, orders, behavior events, and recommendation records.

## Security Features

- JWT Bearer authentication
- bcryptjs password hashing
- Backend input validation using Zod
- Role-based authorization on protected backend endpoints
- CORS origin configuration
- Helmet security headers
- Authentication rate limiting
- Environment-based configuration
- `.env` excluded from Git tracking

## Future Enhancements

- Online payment gateway integration
- Product images and image management
- Customer profile management interface
- Admin dashboard
- Inventory management interface
- Order tracking enhancements
- Contact form email delivery
- Automated recommendation model updates
- Improved responsive UI

## Project Information

**Project:** Smart E-Commerce

**Course:** AI Enhanced Full Stack Development

**Institution:** Entri Elevate

**Batch:** FN31

**Module:** Module 5 – End-to-End MERN Stack E-Commerce Platform Frontend Backend Integration

**Developer:** Nareshkumar S

**Submission Date:** 10 November 2026

---

Developed for educational and demonstration purposes.