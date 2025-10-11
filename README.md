# Bookish — Group 53

*Project short:* Bookish is a unified web platform for book buyers, sellers, and administrators. The platform provides role-specific dashboards and features: browsing, subscriptions, personal libraries and progress tracking for buyers; upload, inventory and order management for sellers; and content moderation, reports and user management for admins.

---

## Project meta

* *Group ID:* 53
* *Project title:* Bookish
* *SPOC:*  — Ayush Pratap Singh , S20230010033 , ayushpratap.s23@iiits.in
* *Team members & roles (from project report):*

  * *Ayush Pratap Singh* — Payment gateway (subscriptions & paperback), Video feed, Buyer’s library, Admin dashboard, System reports.
  * *Piyush Kumar* — Buyer profile & edit, Home page (search/filter), Seller upload, Seller dashboard, Admin user management.
  * *Ujjwal Singh* — Order tracking, Seller inventory, Admin content moderation.
  * *Daivik Wadhwani* — Complaint registration & resolution, Contact page, Cart functionality, Seller dashboard (sales & orders).
  * *Gugulothu Nithin* — Authentication (register/login/logout), Session management, Header & footer, Contact Us & About pages.

---

## Tech stack (summary)

* *Backend:* Node.js + Express
* *Frontend:* HTML/CSS + Tailwind + client-side JS
* *DB:* MongoDB (Mongoose recommended)
* *Other:* Sessions / JWT (depending on code), Payment gateway integration (Razorpay/Stripe/etc. — implemented by team)

---

## How to run (local) — prerequisites & steps

### Prerequisites

* Node.js (v14+ recommended) and npm installed
* MongoDB server (local or remote) accessible via MONGODB_URI in .env
* (Optional) nodemon for development

### Steps

1. Clone repository and cd into project root.
2. Copy provided .env into project root (if present). If .env is not provided, create it with the variables below.
3. Install dependencies:

   bash
   npm install
   
4. Start the application:

   bash
   node app.js
   # or, for auto-reload during development
   nodemon app.js
   
5. Open the app in browser:

   
   http://localhost:3000
   

   (Default port: *3000*)

### Typical runtime checks

* On successful start, console should show a message similar to:

  
  Server running on port 3000
  Connected to MongoDB at mongodb://...
  
* If server fails to connect to MongoDB, check .env and Mongo service status.

---

## Environment variables (example .env entries)

> Use the .env included in the project if present. If you need to set up a local .env, use the following example placeholders:


PORT=3000
MONGODB_URI=mongodb://localhost:27017/bookishdb
SESSION_SECRET=some_random_secret_here
JWT_SECRET=some_jwt_secret_here
PAYMENT_KEY=your_payment_gateway_key_here   # if payment integration uses a key


> *Important:* Never commit real secrets to version control. Replace placeholders with actual values on the host running the app.

---

## If MongoDB is not available / mocking DB

If the included MONGODB_URI points to a remote DB that is not reachable, run a local MongoDB and update .env:

1. Install and start MongoDB (platform-specific). On many systems:

   bash
   # macOS with Homebrew
   brew tap mongodb/brew
   brew install mongodb-community@6.0
   brew services start mongodb-community@6.0
   
2. Update .env:

   
   MONGODB_URI=mongodb://localhost:27017/bookishdb
   
3. Seed minimal data using mongo shell or mongoimport (examples below).

### Example minimal seed (mongo shell)

bash
# open mongo shell:
mongo

# in mongo shell:
use bookishdb
db.users.insertOne({ username: "admin", email: "admin@example.com", role: "admin", password: "hashed_password_placeholder" })
db.books.insertOne({ title: "Sample Book", author: "Author A", price: 100, sellerId: null, approved: true })
db.orders.insertOne({ userId: 1, items: [{ bookId: 1, qty: 1 }], status: "placed" })


### Example mongoimport (JSON file)

Create users.json:

json
{ "username":"admin", "email":"admin@example.com", "role":"admin", "password":"<hash>" }


Then import:

bash
mongoimport --db bookishdb --collection users --file users.json --jsonArray


---

## Key files & demonstration pointers

> These are the main files/locations to point to during the demo. File names are typical for a Node/Express + Mongoose + static views architecture — please adjust if your code uses different naming.

* *Server entry*

  * app.js — Express app setup, middleware and server start.
  * Demo pointer: show the app.listen(PORT, ...) message and session middleware.

* *Routes / Controllers (API endpoints)*

  * routes/auth.js or controllers/authController.js — register(), login(), logout() functions (authentication + session).
  * routes/books.js / controllers/bookController.js — getBooks(), createBook(), approveBook() (dynamic book flows).
  * routes/cart.js / controllers/cartController.js — addToCart(), removeFromCart().
  * routes/orders.js / controllers/orderController.js — getOrders(), updateOrderStatus().
  * routes/complaints.js / controllers/complaintController.js — createComplaint(), resolveComplaint().
  * routes/payments.js / controllers/paymentController.js — processPayment(), createSubscription().

* *Models*

  * models/User.js, models/Book.js, models/Order.js, models/Complaint.js — Mongoose schemas and field definitions.

* *Public / Client-side JS*

  * public/js/validation.js — form validation functions (e.g., validateForm()).
  * public/js/books.js or public/js/home.js — dynamic loading and rendering of book lists (loadBooks()).
  * public/js/cart.js — addToCart() uses fetch() to POST to /api/cart.
  * public/js/admin.js — admin DOM updates and moderation handlers (e.g., approveBook() that does DOM changes without page reload).

* *Views / Templates*

  * views/ or public/ HTML files: registration, login, home, seller dashboard, admin panel, contact, about, etc.
  * Demo pointer: open the registration page and show the DOM validation; open admin moderation and show dynamic DOM updates.

> If any of the above file paths do not exist in the project, search for keywords in the repo (e.g., payment, validateForm, approveBook, fetch('/api')) and use the actual file names present.

---

## Demo link & suggested timestamps (placeholders)

Create demo_link.txt with the Unlisted YouTube link and timestamps in this format:


https://youtu.be/<VIDEO_ID>
00:00 - Title slide & business case
00:50 - Form validation demo + show code
02:00 - Dynamic HTML demo + show code
03:30 - Async data handling demos (3 flows) + DevTools
06:00 - Per-member contributions (10–20s each)
06:30 - Wrap-up & artifact locations


> Replace the placeholder URL and timestamps after recording.

---

## Evidence & artifact locations (what to include in submission zip)

* /source/ — full front-end + back-end source code.
* README_FULL.md — this file (finalized).
* demo_link.txt — video URL + timestamps (Unlisted YouTube preferred).
* test_plan.md — test cases and results (validation & async).
* network_evidence/ — screenshots of DevTools Network tab for each async call (suggested filenames below).
* git-logs.txt — commit history exported or filtered by author (e.g., git log --pretty=format output or screenshots).
* schema_dump/ — MongoDB dump (mongodump output) or JSON exports via mongoexport.
* PPT.pdf — slide deck used for presentation (PDF).
* task_assignment.md + task_assignment.csv — team tasks and spoken lines.
* SUBMISSION_CHECKLIST.md — checklist confirming all required files are included.

**Suggested filenames for network screenshots (place under network_evidence/):**

* 01_get_books_GET.png
* 02_add_to_cart_POST.png
* 03_submit_complaint_POST.png
* 04_process_payment_POST.png
* 05_approve_book_PUT.png

---

## Submission checklist (brief)

* [ ] source/ (complete code)
* [ ] README_FULL.md (this file)
* [ ] demo_link.txt (YouTube Unlisted link + timestamps)
* [ ] test_plan.md (with evidence or notes)
* [ ] network_evidence/ (screenshots of each async call)
* [ ] git-logs.txt (author-filtered commit log)
* [ ] schema_dump/ or collection JSON exports (mongodump/mongoexport)
* [ ] PPT.pdf (presentation slides)
* [ ] task_assignment.md and task_assignment.csv
* [ ] SUBMISSION_CHECKLIST.md (all items ticked)

---

## Troubleshooting & common errors

* *Mongo connection error:* check MONGODB_URI. If the URI in .env points to a remote host that is unreachable, switch to a local MongoDB instance and update the .env accordingly. See If MongoDB is not available / mocking DB above.
* *Port already in use:* change PORT in .env or kill the process using that port (e.g., lsof -i :3000 / kill on UNIX).
* *Missing env variables:* check .env for SESSION_SECRET, JWT_SECRET, PAYMENT_KEY and other values. Add placeholders locally and restart.
* *Frontend JS errors:* open browser DevTools Console. Missing API endpoints often indicate the backend is not running or the DB connection failed.

---
