# Amazon Clone – Full Stack E-Commerce Application

This project is a **full-stack Amazon-like e-commerce platform** built as part of an **SDE Intern Fullstack Assignment**.
It replicates core Amazon functionalities such as product browsing, cart management, and order placement with a clean, familiar UI.

---

##  Live Deployment

The Amazon Clone application is deployed and accessible online:

###  Frontend (Vercel)
🔗 https://scalar-ai-kappa.vercel.app/

###  Backend (Render – FastAPI)
🔗 https://scalar-ai.onrender.com

###  API Documentation (Swagger)
🔗 https://scalar-ai.onrender.com/docs

---

## Tech Stack Used

### Frontend

* **React.js**
* React Router DOM
* Axios
* CSS (custom Amazon-style UI)

### Backend

* **Python – FastAPI**
* SQLAlchemy ORM
* PostgreSQL
* RESTful APIs

### Tools

* Node.js & npm
* Uvicorn
* Git & GitHub

---

## Core Features Implemented

### 1️⃣ Product Listing Page

* Grid-based layout similar to Amazon
* Product cards with:

  * Image
  * Name
  * Price
  * Add to Cart button
* Search products by name
* Filter products by category

### 2️⃣ Product Detail Page

* Multiple product images
* Product description
* Price & stock availability
* Add to Cart
* Buy Now button

### 3️⃣ Shopping Cart

* View cart items
* Increase / decrease quantity
* Remove items from cart
* Dynamic subtotal & total calculation

### 4️⃣ Order Placement

* Checkout page with shipping address
* Order summary before placing order
* Place order functionality
* Order confirmation page with Order ID

---

## Project Structure

```
amazon-clone/
│
├── amazon-clone-backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
│
├── amazon-clone-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## Setup Instructions (Run Locally)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/amazon-clone.git
cd amazon-clone
```

---

## Backend Setup (FastAPI)

### 2️⃣ Create Virtual Environment

```bash
cd amazon-clone-backend
python -m venv venv
venv\Scripts\activate    # Windows
# source venv/bin/activate   # Mac/Linux
```

### 3️⃣ Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Database Setup (PostgreSQL)

* Create a PostgreSQL database named:

```
amazon_db
```

* Update **database.py** with your credentials:

```python
DATABASE_URL = "postgresql://postgres:password@localhost/amazon_db"
```

---

### 5️⃣ Start Backend Server

```bash
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

Swagger API Docs:

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup (React)

### 6️⃣ Install Frontend Dependencies

```bash
cd amazon-clone-frontend
npm install
```

### 7️⃣ Start Frontend Server

```bash
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## API Endpoints Overview

### Products

* `GET /products`
* `GET /products/{id}`
* `POST /products`

### Cart

* `POST /cart/add`
* `GET /cart`
* `PUT /cart/update`
* `DELETE /cart/remove/{id}`

### Orders

* `POST /order/place`
* `GET /order/{id}`

---

## Sample Product Payload

```json
{
  "name": "Apple iPhone 15",
  "price": 79999,
  "category": "Electronics",
  "description": "Latest Apple iPhone",
  "stock": 10,
  "image_urls": [
    "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_SL1500_.jpg"
  ]
}
```

---

## Assumptions Made (IMPORTANT)

* No authentication/login system is implemented (as per assignment instruction).
* A **single default user** is assumed to be logged in.
* Payments are **not integrated** (order placement is simulated).
* Product images are loaded using external image URLs.
* Cart and orders are maintained at the backend level.
* Inventory stock is not reduced after order placement (can be extended).
* Email notifications are not implemented (bonus feature skipped).

---

## Design & Implementation Notes

* Backend handles all cart and order calculations for reliability.
* Clean REST APIs with proper separation of concerns.
* Simple database schema designed manually using SQLAlchemy.
* UI intentionally kept simple but Amazon-like.

---

## 👨‍💻 Author

**Sumit Beniwal**
B.Tech – Electronics & Communication Engineering
SDE Intern Fullstack Assignment

