# Bookish — Unified Marketplace for Book Buyers, Sellers & Admins

A full-stack web platform that connects **buyers**, **sellers**, and **administrators** with role-based dashboards and features like browsing, selling, cart & orders, payment/subscriptions, video reviews, complaint resolution, and admin moderation. This README is crafted from your mid-review artifacts and demo plan to be copy-paste ready; placeholders are included where you may want to update project-specific links or secrets.

---

##  Quick links

* **Repository:** `https://github.com/Ayush-aps/books`
* **Demo video (Unlisted):** `https://www.youtube.com/watch?v=0gduV02pDyA`
* **SPOC / Team lead:** Ayush Pratap Singh — `ayushpratap.s23@iiits.in` — Roll: `S20230010033`

> If any of the links/contacts above should be changed, update them in the placeholders below.

---

##  Project Summary

**Bookish** is a unified platform providing:

* Buyer features: book browsing, cart, subscriptions, personal library, reading progress, video reviews, complaint/support.
* Seller features: upload/manage books, inventory, order management, analytics.
* Admin features: user management, content moderation (approve/reject books), system reports, complaint resolution.

(Feature list and per-role responsibilities referenced from the FFSD and mid-review artifacts.) 

---

##  Team & Responsibilities

| Name               | Roll Number  | Responsibilities                                              |
| ------------------ | ------------ | ------------------------------------------------------------- |
| Ayush Pratap Singh | S20230010033 | Payment gateway, buyer’s library, admin reports, video feed.  |
| Piyush Kumar       | (add roll)   | Buyer profile, homepage, seller upload, seller dashboard.     |
| Ujjwal Singh       | (add roll)   | Order tracking, seller inventory, admin moderation.           |
| Daivik Wadhwani    | (add roll)   | Complaint system, contact page, cart.                         |
| Gugulothu Nithin   | (add roll)   | Authentication, sessions, shared UI (header/footer).          |

> Please supply missing roll numbers and any preferred email addresses to include here.

---

##  Tech Stack

**Frontend**

* EJS templating (server-side rendered pages)
* HTML5, Vanilla JavaScript
* Tailwind CSS for styling

**Backend**

* Node.js + Express
* MongoDB (Mongoose ODM)
* JWT for authentication
* Cloudinary (image storage)
* Payment integration (e.g. Razorpay / chosen gateway)

(Tech stack clarified in project artifacts and project metadata.) 

---

##  Project Structure (typical)

```
bookish/
├── app.js                 # Express entry (or node server.js)
├── package.json
├── /config                # DB, cloudinary, payment keys
├── /controllers
├── /models                # Mongoose schemas
├── /routes
├── /views                 # EJS templates
├── /public                # static assets: css, js, images
├── /uploads               # if used
├── /artifacts             # network_evidence/, git-logs.txt, test_plan.md
└── README.md
```

(If your repo uses a `source/` subfolder or `backend/` + `frontend/` split, adapt commands below accordingly.) 

---

##  Features (high level)

* Buyer:

  * Browse & search books, add to cart, checkout (subscription & purchases)
  * Personal library, reading progress, video reviews/feed
  * Submit & track complaints/support tickets
  * Profile management (addresses, orders)
* Seller:

  * Upload books with metadata and images
  * Inventory & order management
  * Sales analytics on dashboard
* Admin:

  * Content moderation (approve/reject books)
  * User & role management
  * Reports: users, books, orders, complaints

(Design and demo flows documented in the demo script & mid-review docs.) 

---

## 🔧 Prerequisites

* Node.js v14+ and npm
* MongoDB (Local or Atlas)
* Git
* (Optional) nodemon for development
* Cloudinary account (if using image uploads)
* Payment gateway credentials (if payments implemented)

---

##  Environment Variables

Create a `.env` file in project root (or `backend/`) with the following keys (fill values):

```env
# Database
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/bookishdb

# Auth
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Cloudinary (images)
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Payment gateway (example Razorpay)
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...

# App
PORT=4000
```

---

## 🛠 Installation & Running (local)

1. **Clone**

```bash
git clone https://github.com/Ayush-aps/books.git
cd books
```

2. **Install**

```bash
npm install
```

3. **Set .env**
   Create `.env` with variables listed above.

4. **Run**

* Development with nodemon:

```bash
npx nodemon app.js
```

* Or:

```bash
node app.js
# or
npm start
```

5. **Open in browser**

```
http://localhost:4000
```

> If your project has `backend/` and `frontend/` subfolders, run `cd backend && npm install && npm start` instead.

---

##  Demo flows & testing checklist

The mid-review demo requires showing these flows — recommend verifying & recording them for evidence:

1. **Form validation demo** (client-side DOM validation).
2. **Dynamic DOM update** — e.g., admin approves a book and the UI updates without reload.
3. **Three async flows (show DevTools Network tab):**

   * GET `/api/books` — Load books list.
   * POST `/api/cart` — Add to cart.
   * POST `/api/complaints` — Submit complaint.

(Demo script and timestamps prepared for a ~7-minute video — see `Demo Video Script and Plan`.) 

**Artifacts to collect**

* `network_evidence/` — screenshots of each network request in DevTools.
* `git-logs.txt` — git commits per author (or screenshots).
* `test_plan.md` — validated tests and results.
* `schema.sql` or Mongo dump (if required for submission). 

---

##  Key files & where to look (implementation notes)

* `app.js` — Express entry point; session and middleware setup.
* `routes/` — routes for books, users, orders, complaints, admin.
* `controllers/` — actual business logic (bookController, userController, orderController, complaintController).
* `models/` — Mongoose schemas: `User`, `Book`, `Order`, `Complaint`, etc.
* `views/` — EJS templates and partials (header, footer, dashboards).
* `public/js/` — client-side form validation, dynamic DOM, AJAX calls (fetch).
* `config/` — DB connection, cloudinary, payment config.

(Use these locations when you point to code in your demo video.) 

---

##  Authentication & Security

* JWT authentication for users, staff, and admin (role-based authorization).
* Protect API endpoints with middleware (e.g., `userAuth`, `staffAuth`, `adminAuth`).
* Store sensitive keys in `.env`. Do **not** commit `.env` or secrets to Git.

---

## 💳 Payments & Subscriptions

* Payment integration implemented for subscription/purchase flows (example: Razorpay).
* Ensure `RAZORPAY_*` keys are set in `.env` for live testing.

---

##  Status & Roadmap

**Current version:** 1.0 (Mid-review)
**Status:** Core features implemented as per FFSD; testing & final polish pending. 

**Planned / future enhancements**

* Real-time notifications (Socket.io)
* PWA / mobile app
* Redis caching & rate limiting
* 2FA, email/SMS notifications
* GPS-based lost item tracking (if applicable)
* Improved analytics & downloadable reports (PDF/Excel)

---

## 🧾 Contribution Guide

1. Fork the repo
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit & push: `git commit -m "feat: description"` then `git push origin feature/your-feature`
4. Open a Pull Request with description and testing notes

Please add `CONTRIBUTING.md` if you want stricter rules (branch naming, linting, testing).

---

## 🐞 Troubleshooting

**Backend not starting**

* Check `.env` variables and MongoDB URI.
* Ensure MongoDB server (local or Atlas) is reachable.

**Frontend errors**

* Open browser console for JS errors.
* Verify EJS variables passed from server.

**Authentication errors**

* Ensure `JWT_SECRET` matches in `.env`.
* Clear cookies/localStorage if tokens stale.

---

## 📦 Submission artifacts (for mid-review)

Include in your submission ZIP (`group53_bookish_midreview.zip`):

* `/source` — full source code
* `README_FULL.md` (this file)
* `demo_link.txt` — video URL + timestamps
* `test_plan.md` — validation & async tests with results
* `network_evidence/` — screenshots
* `git-logs.txt`
* `schema.sql` or Mongo dump
* `PPT.pdf`, `MidReview-Artifact.pdf`, etc. 

(See Mid Review artifact checklist for exact requirements.) 

---

## 📞 Contact & Support

* **SPOC / Team lead:** Ayush Pratap Singh — `ayushpratap.s23@iiits.in`. Roll: `S20230010033`
* For issues: open GitHub issues in the repository.

---

## 🧾 License

This project is released under the **MIT License**.

---

## 🎬 Demo Video Timestamps (suggested)

(Use `demo_link.txt` and include these timestamps in the YouTube description.)

```
0:00  - Title slide & business case
0:50  - Form validation demo (client-side)
2:00  - Dynamic DOM demo (admin approve -> UI update)
3:30  - Async flows: Load Books, Add to Cart, Submit Complaint (show DevTools)
6:00  - Team contributions (10–20s per member)
6:30  - Wrap-up & artifacts location
```

(Full script & shotlist available in `Demo Video Script and Plan`.) 

---

## ✍️ Notes & Placeholders to update

* [ ] Confirm **repo URL** and **demo video URL** if different.
* [ ] Confirm **entry point** (`app.js` vs `index.js`) and default **PORT**.
* [ ] Add missing roll numbers & emails for team members.
* [ ] Replace payment gateway placeholders with the actual provider & env keys.
* [ ] Add any screenshots or sample API endpoints you want included inline.

---
