# 🚀 CRM API - Customer Relationship Management System

A **production-ready** RESTful API built with **TypeScript, Express, MongoDB, and JWT authentication** for managing **Organisations, Customers, and Users** with **Role-Based Access Control (RBAC).**

---

## 📌 **Features**

✅ Secure Authentication & Authorization (JWT)  
✅ Role-Based Access Control (`admin`, `user`)  
✅ Full CRUD Operations for **Users, Organisations, Customers**  
✅ Password Hashing & Verification (Bcrypt.js)  
✅ MongoDB Integration with Mongoose  
✅ Middleware for Error Handling & Authentication  
✅ Optimized API Routes

---

## ⚙️ **Installation & Setup**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/D-4-DIBAKAR/CRM-API.git
cd CRM-API
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Configure `.env` File**

Create a `.env` file in the root directory and add the following:

```sh
PORT=8000
MONGO_URI=mongodb://localhost:27017/CRM-Database
JWT_SECRET=your_secret_key
```

### **4️⃣ Start the Server**

#### ➤ Development Mode (Auto Restart)

```sh
npm run dev
```

#### ➤ Production Mode

```sh
npm start
```

---

## 🔑 **Authentication & Authorization**

- **JWT-based Authentication**: Users get a token upon login, which is required for protected routes.
- **Roles:**
  - `admin`: Can manage **Users, Organisations, and Customers**.
  - `user`: Can only **view** Organisations & Customers.

---

## 📂 **Folder Structure**

```
CRM-API
│── src
│   ├── db            # Database connection
│   ├── middlewares   # Authentication & error handling
│   ├── repository    # Database queries (Mongoose models)
│   ├── routing       # Express route handlers
│   ├── schemas       # Mongoose Schemas
│   ├── services      # Business logic for API routes
│   ├── utils         # Helper functions (password hashing, JWT)
│   ├── app.ts        # Express server configuration
│── .env              # Environment variables
│── package.json      # Project dependencies
│── tsconfig.json     # TypeScript configuration
│── README.md         # Project documentation
```

---

## 🚀 **API Endpoints**

### 🏢 **Organisation Routes**

| Method   | Endpoint                 | Description            | Access     |
| -------- | ------------------------ | ---------------------- | ---------- |
| `POST`   | `/api/organisations`     | Create an organisation | Admin      |
| `GET`    | `/api/organisations`     | Get all organisations  | User/Admin |
| `PUT`    | `/api/organisations/:id` | Update organisation    | Admin      |
| `DELETE` | `/api/organisations/:id` | Delete organisation    | Admin      |

---

### 👤 **User Authentication**

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| `POST` | `/api/users/register` | Register new user |
| `POST` | `/api/users/login`    | Login & get token |

---

### 👥 **Customer Routes**

| Method   | Endpoint             | Description       | Access     |
| -------- | -------------------- | ----------------- | ---------- |
| `POST`   | `/api/customers`     | Create a customer | Admin      |
| `GET`    | `/api/customers`     | Get all customers | User/Admin |
| `PUT`    | `/api/customers/:id` | Update customer   | Admin      |
| `DELETE` | `/api/customers/:id` | Delete customer   | Admin      |

---

## 📡 **Testing with Postman**

1. Open **Postman**
2. Set **Authorization** → `Bearer Token` from `/api/users/login`
3. Test API endpoints using **correct role permissions**
4. Check responses for **error handling & data validation**

---

## ⚖️ **License**

This project is licensed under the **MIT License**.

---

## 💡 **Contributions**

✅ Fork the repo  
✅ Create a new branch (`feature-name`)  
✅ Commit changes (`git commit -m "Add new feature"`)  
✅ Push to GitHub & create a **Pull Request**

---

## 🎯 **Future Enhancements**

🚀 API Rate Limiting (to prevent abuse)  
🚀 Unit Testing (Jest)  
🚀 Admin Dashboard for managing data

---

## 📞 **Support**

For queries, reach out via [GitHub Issues](https://github.com/D-4-DIBAKAR/CRM-API).
