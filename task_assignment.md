# Task Assignment

**Project:** Bookstore Platform

**Last Updated:** 2025-10-12

---

## 👥 Team & Individual Contributions

This document assigns features to individual team members and explains each responsibility in detail — what to build, suggested file structure, key endpoints/components, test/acceptance criteria, and helpful implementation notes. Copy this into your GitHub repo (as `task_assignment.md`) so contributors and maintainers can quickly pick up tasks.

---

### Ayush Pratap Singh (S20230010033)

**Contributions (implemented)**

* Implemented payment gateway integration (subscriptions & paperback purchases), video review feed, buyer’s library, admin dashboard, and system reports.

**What was built**

* **Payment gateway** — Recurring subscription flow and one-time paperback checkout using a payment provider. Webhook handler included to reconcile payment status and issue receipts.
* **Video review feed** — Paginated feed of short video reviews/trailers with signed URL playback for protected content.
* **Buyer’s library** — Persistent library page listing purchased ebooks and videos with access control.
* **Admin dashboard** — Panels for user, order, and content management plus quick actions for moderation.
* **System reports** — Sales, subscriptions, and activity reports.

**Key files / endpoints**

* `routes/payments.js`, `views/payments.ejs`
* `routes/videos.js`, `views/Videos.ejs`
* `routes/library.js`, `views/Library.ejs`
* `admin/views/Dashboard.ejs`, `views/reports.ejs`

---

### Piyush Kumar (S20230010186)

**Contributions (implemented)**

* Developed buyer's profile page with edit functionality, homepage with search and filter features, seller upload book interface, and admin user management.

**What was built**

* **Buyer profile** — View and edit flows (avatar upload, address, preferences) with server-side validation.
* **Homepage** — Hero, featured books, and full-text search + category filters with efficient API queries.
* **Seller upload interface** — Metadata form, cover & ebook upload (signed URLs), and content validation.
* **Admin user management** — Admin panel to view, suspend, and change user roles.

**Key files / endpoints**

* `routes/users.js`, `views/Profile.ejs`
* `routes/search.js`, `views/Home.ejs`
* `routes/seller.js`, `views/SellerUpload.ejs`
---

### Ujjwal Singh (S20230010245)

**Contributions (implemented)**

* Order tracking system for all roles, seller dashboard with analytics, and admin content moderation.

**What was built**

* **Order tracking** — Timeline-style order status visible to buyers, sellers, and admins; status update endpoints with role-based authorization.
* **Seller dashboard** — Sales analytics, top-sellers list, and inventory health indicators.
* **Admin moderation** — Queue for reported content with actions: remove, warn seller, reinstate; moderation logs retained.

**Key files / endpoints**

* `controllers/orderController.js`, `views/Order.ejs`
* `routes/sellerDashboard.js`, `views/SellerDashboard.ejs`
* `routes/moderation.js`, `views/Moderation.ejs`.

---

### Daivik Wadhwani (S20230010064)

**Contributions (implemented)**

* Complaint registration and resolution for all roles, cart functionality for buyers, and seller inventory page displaying book approval status.

**What was built**

* **Complaint system** — Users and sellers can register a complaint, which then can be resolved by admin.
* **Cart** — Persistent cart for logged-in users with guest-to-user merge, quantity updates, linked with payment gateway.
* **Seller inventory page** — Shows seller items and approval status (approved/pending/rejected), with quick actions.

**Key files / endpoints**

* `routes/complaint.js`, `views/complaint.ejs`
* `/routes/cart.js`, `views/Cart.ejs`
* `views/SellerInventory.ejs`, `routes/sellerInventory.js`

---

### Gugulothu Nithin (S20230010099)

**Contributions (implemented)**

* Implemented login and register pages, logout functionality, contact and about pages, and designed responsive headers and footers.

**What was built**

* **Auth pages** — Register/login/logout flows with validation and friendly error messaging.
* **Contact & About** — about us, contact us pages.
* **Header & Footer** — Responsive site-wide components reflecting user state (signed out / user / seller / admin).

**Key files / endpoints**

* `routes/auth.js`, `views/Login.ejs`, `views/Register.ejs`
* `views/Contact.ejs`, `views/About.ejs`
* `views/Header.ejs`, `views/Footer.ejs`


---

