# 🍽️ CRAVING – Food Delivery Web Application

**Live Link:** [https://craving-six.vercel.app](https://craving-six.vercel.app)

Craving is your ultimate destination for delicious meals delivered straight to your door. Whether you're in the mood for comforting classics or exciting new flavors, Craving connects you with a wide range of restaurants ready to satisfy every appetite.

<br>
<br>

---

## 📝 Description

Craving is a modern full-stack food delivery platform built with Next.js, TypeScript, and MongoDB. It allows users to browse restaurants and meals, place and track orders, donate to causes, and much more. With role-based access control and a clean UI, it’s designed to offer a seamless experience for customers, restaurant owners, riders, and admins.

<br>
<br>

---

## 🚀 Features

### ✅ Key Features
- **Food Browsing** by category and restaurant
- **Quick and Secure Ordering**
- **User Authentication** with NextAuth
- **Role-Based Access Control**:
  - **Admin**: Full platform access, manage users, items, orders, and donations
  - **Owner**: Manage their restaurant's menu, orders, and donations
  - **User**: Browse food, place orders, donate, manage profile
  - **Rider**: View assigned orders and update delivery status
- **Order Management**:
  - Real-time order tracking
  - Order history & delivery updates
  - Rider order assignment
- **Donation System**:
  - Create/manage donation campaigns
  - Support community or delivery workers
  - Track donation history

<br>
<br>

---

## 📑 Key Pages

1. **Home Page** – Highlights featured restaurants, categories, banners, campaigns, FAQs, and contact info.
2. **Food Page** – Lists all food items and restaurants with filters, description, price, and cart options.
3. **About Page** – Describes the platform’s mission, vision, and team.
4. **Contact Page** – Includes support form and contact details.
5. **Profile Page** – Allows users to manage their personal info, orders, and addresses.
6. **Dashboard** – Dynamic dashboard based on user roles (admin, owner, rider, user).

<br>
<br>

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, Tailwind CSS, Shadcn, TypeScript, Next.js
- **Authentication:** NextAuth
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Deployment:** Vercel


<br>
<br>

---

## 📦 Dependencies


### Core Dependencies:
```json
{
  "@radix-ui/react-*": "^1.x.x",
  "@types/next-auth": "^3.15.0",
  "aos": "^2.3.4",
  "axios": "^1.8.4",
  "bcryptjs": "^3.0.2",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "express": "^5.1.0",
  "lottie-react": "^2.4.1",
  "lucide-react": "^0.479.0",
  "mongodb": "^6.14.2",
  "mongoose": "^8.12.1",
  "next": "^15.2.3",
  "next-auth": "^4.24.11",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-fast-marquee": "^1.6.5",
  "react-hook-form": "^7.54.2",
  "react-icons": "^5.5.0",
  "react-is": "^19.0.0",
  "react-loading-skeleton": "^3.5.0",
  "react-spinners": "^0.16.1",
  "react-toastify": "^11.0.5",
  "recharts": "^2.15.1",
  "sslcommerz": "^1.7.0",
  "sslcommerz-lts": "^1.1.0",
  "sweetalert2": "^11.17.2",
  "tailwind-merge": "^3.0.2",
  "tailwindcss-animate": "^1.0.7"
}
```

### Dev Dependencies:
```json
{
  "@eslint/eslintrc": "^3",
  "@tailwindcss/postcss": "^4.0.15",
  "@types/aos": "^3.0.7",
  "@types/lodash": "^4.17.16",
  "@types/node": "^20",
  "@types/nodemailer": "^6.4.17",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "15.2.2",
  "tailwindcss": "^4.0.15",
  "typescript": "^5.8.2"
}
```
<br>
<br>

---

## 🔐 Environment Variables
NEXTAUTH_PUBLIC_MONGODB_URI="mongodb+srv://craving:xvho15QFnWY2BrAq@cluster0.gv7qc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

DB_USER="craving"
DB_PASSWORD="xvho15QFnWY2BrAq"
DB_NAME="CRAVING"

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sfdlksfdlk-dskfdlksf-dsfldkjj

GOOGLE_CLIENT_ID=456747794380-hos6n6q4oqsrthno40lnqbgvklpbir0o.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

SSLCOMMERZ_STORE_ID=cravi67f759bca951d
SSLCOMMERZ_STORE_PASSWORD=cravi67f759bca951d@ssl

<br>
<br>

---

## 🧑‍💻 How to Run Locally
### 1. Clone the repository:
`git clone https://github.com/your-username/craving.git`

`cd craving`

### 2. Install dependencies:
`npm install`
### 3. Configure environment variables:
- Create a `.env.local` file

- Copy and paste the environment variables from the section above
### 4. Run the development server:
`npm run dev`
### 5. Open in browser:
http://localhost:3000
<br>
<br>

---
## 📸 Screenshots

![Home page of Craving](https://i.ibb.co.com/j964Zz2C/craving-pied-vercel-app.png)



