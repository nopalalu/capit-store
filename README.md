# Capit Store

A fullstack e-commerce web application built with Next.js and MongoDB — with a customer storefront and a seller dashboard in one codebase.

> Team project. This repo is a personal fork for portfolio purposes; the original team repo lives at `Asyra20/Capit_Store`.

## Features

**Storefront**
- Product catalog with product detail pages
- Shopping cart (add / update / remove)
- Checkout flow with shipping address management
- Order history and order status tracking
- User authentication (sign in / sign up)
- About & contact pages

**Seller dashboard**
- Seller product management (add products, view own listings)
- Incoming order management

**Background & services**
- Background job processing with Inngest
- Image uploads via Cloudinary
- Contact form emails via EmailJS

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Styling | Tailwind CSS, Framer Motion, lucide-react |
| Auth | Clerk |
| Database | MongoDB + Mongoose |
| Images | Cloudinary |
| Background jobs | Inngest |
| Email | EmailJS |

## Project structure

```
app/                # Routes (App Router)
  api/              # API routes: cart, checkout, order, product, user, inngest
  seller/           # Seller dashboard pages
  cart/ my-orders/  # Customer pages
components/         # Reusable UI components
models/             # Mongoose models: User, Product, Order, Address
lib/ config/        # DB connection, app config
context/            # React context (app state)
middleware.ts       # Clerk auth middleware
```

## Getting started

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your own keys:

```bash
cp .env.example .env
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

| Variable | Used for |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `CLERK_SECRET_KEY` / `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk authentication |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Product image uploads |
| `INNGEST_SIGNING_KEY` / `INNGEST_EVENT_KEY` | Background jobs |
| `NEXT_PUBLIC_EMAILJS_*` | Contact form emails |

> Never commit your real `.env` — it's gitignored. See `.env.example` for the template.
