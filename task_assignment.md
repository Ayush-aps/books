# Task Assignment

**Project:** Bookstore Platform

**Last Updated:** 2025-10-12

---

## 👥 Team & Individual Contributions

This document assigns features to individual team members and explains each responsibility in detail — what to build, suggested file structure, key endpoints/components, test/acceptance criteria, and helpful implementation notes.

---

### Ayush Pratap Singh (S20230010033)

**Primary areas:** Payment gateway, Video feed, Buyer’s Library, Admin dashboard, System reports

**Responsibilities (detailed)**

* **Payment gateway (subscription & paperback)**

  * Implement secure payment flows for:

    * Recurring subscriptions (monthly/annual) using a payment provider (Stripe).
    * One-time purchases for paperback books.
  * Key endpoints (backend):

    * `POST /api/payments/create-session` — create checkout session
    * `POST /api/payments/webhook` — handle payment events (webhooks)
    * `GET /api/payments/status/:orderId` — query payment status
  * Frontend pieces:

    * Checkout page (billing form + review order)
    * Subscription management (cancel, upgrade/downgrade)
  * Acceptance criteria:

    * Successful payment creates an order record and grants access (digital or fulfillment flow for paperback).
    * Webhook handling is idempotent and verifies signatures.
  * Implementation notes:

    * Use environment variables for API keys and signatures. Store receipts and payment metadata in DB.
    * Add tests for webhook signature verification and retry-safe handlers.

* **Video feed**

  * Build a streaming/listing component for course or book trailers:

    * Video listing endpoint: `GET /api/videos` with pagination
    * Streaming or signed URL generation for protected content.
  * Frontend components:

    * `VideoCard`, `VideoPlayer` (with captions, seek, playback speed)
  * Acceptance criteria:

    * Videos load reliably; protected videos require auth and expire signed URLs.
  * Implementation notes:

    * Consider using cloud storage + signed URLs (S3/GCS) or a video hosting provider (Mux, Cloudflare Stream).

* **Buyer’s Library**

  * Implement a personalized library page showing purchased/accessible books and videos.
  * Endpoints:

    * `GET /api/users/:id/library`
    * `POST /api/library/add` (when purchase completes)
  * Acceptance criteria:

    * Items appear immediately after purchase; access control checks prevent unauthorized access.

* **Admin dashboard**

  * Build admin UI to manage users, orders, content, and reports.
  * Components:

    * User list / detail, Order list, Content moderation quick actions.
  * Acceptance criteria:

    * Admin role gates access; dashboard shows live metrics and search/filter capabilities.

* **System reports**

  * Implement reporting APIs for sales, subscriptions, and user activity.
  * Endpoints:

    * `GET /api/reports/sales?from=&to=`
    * `GET /api/reports/subscriptions?interval=monthly`
  * Acceptance criteria:

    * Reports return correct aggregates and are exportable (CSV).

---

### Piyush Kumar (S20230010186)

**Primary areas:** Buyer’s Profile & Edit, Home page, Seller upload book option, Seller dashboard

**Responsibilities (detailed)**

* **Buyer’s profile page & edit feature**

  * Build profile view and edit flows:

    * `GET /api/users/:id/profile`
    * `PUT /api/users/:id/profile` (with validation)
  * Frontend features:

    * Profile picture upload (signed URL), address and preferences form, saved payment methods view.
  * Acceptance criteria:

    * Profile updates persist and reflect across site (name, address, avatar).

* **Home page**

  * Create a responsive and attractive landing page highlighting categories, featured books, and CTAs.
  * Suggested components: Hero carousel, Featured sellers, Trending books, Newsletter signup.
  * Acceptance criteria:

    * Loads under performance budget (Lighthouse score target), mobile-friendly layout.

* **Seller’s upload book option**

  * Build a seller-facing upload flow including metadata, categories, cover upload, and file upload for ebooks.
  * Endpoints:

    * `POST /api/seller/books` — create book metadata
    * `POST /api/seller/books/:id/upload` — upload files (cover/ebook)
  * Acceptance criteria:

    * Uploaded books are stored with correct ownership and appear in seller dashboard.

* **Seller dashboard**

  * Provide dashboard for sellers to manage listings, view sales, and edit books.
  * Acceptance criteria:

    * Sellers can CRUD books; metrics show sales and inventory status.


---

### Ujjwal Singh (S20230010245)

**Primary areas:** Order tracking (for all roles), Seller inventory, Admin content moderation

**Responsibilities (detailed)**

* **Order tracking (for all roles)**

  * Implement order status pipeline and tracking timeline for buyers, sellers, and admins.
  * Endpoints:

    * `GET /api/orders/:id/status`
    * `POST /api/orders/:id/update-status` (admin/seller)
  * Frontend features:

    * Timeline component showing order events (ordered, processing, shipped, delivered, canceled).
  * Acceptance criteria:

    * Status updates are auditable, time-stamped, and visible to relevant roles only.

* **Seller inventory**

  * Inventory management APIs for sellers to update stock counts and view low-stock alerts.
  * Endpoints:

    * `GET /api/seller/:id/inventory`
    * `PUT /api/seller/:id/inventory/:bookId`
  * Acceptance criteria:

    * Inventory changes trigger notifications when stock falls below threshold.

* **Admin content moderation**

  * Tools for reviewing reported books and taking actions (remove, warn, reinstate).
  * Endpoints:

    * `GET /api/moderation/reports`
    * `POST /api/moderation/action` — (action: remove/warn)
  * Acceptance criteria:

    * Moderation actions are logged and reversible by super-admin if needed.

---

### Daivik Wadhwani (S20230010064)

**Primary areas:** Complaint register & resolution system, Contact page (all roles), Cart functionality

**Responsibilities (detailed)**

* **Complaint register & resolution system**

  * Build a support ticketing flow where users can file complaints and staff can respond.
  * Endpoints:

    * `POST /api/complaints`
    * `GET /api/complaints/:id`
    * `POST /api/complaints/:id/respond`
  * Acceptance criteria:

    * Tickets have status (open/in-progress/resolved), responses are auditable, and users receive notifications.

* **Contact page (all roles)**

  * Single contact page component that changes based on role (quick links for sellers/admins).
  * Acceptance criteria:

    * Contact submissions persist and result in a support ticket or email notification.

* **Cart functionality**

  * Implement client cart UX and server-side cart storage for logged-in users:

    * `GET /api/cart`
    * `POST /api/cart/add`
    * `DELETE /api/cart/remove`
  * Acceptance criteria:

    * Cart merges on login (guest -> user), quantities respected, coupon/promo hooks available.


---

### Gugulothu Nithin (S20230010099)

**Primary areas:** Authentication (register/login/logout), Session management, Header and footer

**Responsibilities (detailed)**

* **Authentication (register/login/logout)**

  * Implement secure auth with password hashing, input validation, and error handling.
  * Endpoints:

    * `POST /api/auth/register`
    * `POST /api/auth/login`
    * `POST /api/auth/logout`
  * Acceptance criteria:

    * User can register and login; tokens/sessions are created securely and sensitive errors are not leaked.


* **Header and footer**

  * Build responsive header and footer components containing nav, search, user menu, and links.
  * Acceptance criteria:

    * Header shows contextual links (Sign in / Profile / Admin) based on user role.



---

