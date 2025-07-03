/**
 * Admin routes for user management, content moderation, and system reports
 */

const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Book = require("../models/Book")
const Order = require("../models/Order")
const Complaint = require('../models/Complaint');
const { ensureAuthenticated, ensureAdmin } = require("../middleware/auth")

/**
 * @route   GET /admin/users
 * @desc    User management
 * @access  Private (Admin)
 */
router.get("/users", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })

    res.render("admin/users", {
      title: "User Management - Bookish",
      users,
      user: req.user,
    })
  } catch (err) {
    console.error(err)
    req.flash("error_msg", "Error fetching users")
    res.redirect("/admin/reports")
  }
})

/**
 * @route   POST /admin/users/:id/update-role
 * @desc    Update user role
 * @access  Private (Admin)
 */
router.post(
  "/users/:id/update-role",
  ensureAuthenticated,
  ensureAdmin,
  async (req, res) => {
    try {
      const { role } = req.body

      // Validate role
      const validRoles = ["buyer", "seller", "admin"]
      if (!validRoles.includes(role)) {
        req.flash("error_msg", "Invalid role")
        return res.redirect("/admin/users");
      }

      // Update user role
      await User.findByIdAndUpdate(req.params.id, { role })

      req.flash("success_msg", "User role updated successfully")
      res.redirect("/admin/users")
    } catch (err) {
      console.error(err)
      req.flash("error_msg", "Error updating user role")
      res.redirect("/admin/users")
    }
  }
)

/**
 * @route   POST /admin/users/:id/toggle-status
 * @desc    Toggle user active status
 * @access  Private (Admin)
 */
router.post(
  "/users/:id/toggle-status",
  ensureAuthenticated,
  ensureAdmin,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id)

      if (!user) {
        req.flash("error_msg", "User not found")
        return res.redirect("/admin/users");
      }

      // Toggle isVerified status
      user.isVerified = !user.isVerified
      await user.save()

      req.flash(
        "success_msg",
        `User ${user.isVerified ? "activated" : "deactivated"} successfully`
      )
      res.redirect("/admin/users")
    } catch (err) {
      console.error(err)
      req.flash("error_msg", "Error updating user status")
      res.redirect("/admin/users")
    }
  }
)

/**
 * @route   GET /admin/reports
 * @desc    System health reports
 * @access  Private (Admin)
 */
router.get("/reports", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    // Get counts
    const userCount = await User.countDocuments()
    const bookCount = await Book.countDocuments()
    const orderCount = await Order.countDocuments()

    // Get user distribution by role
    const buyerCount = await User.countDocuments({ role: "buyer" })
    const sellerCount = await User.countDocuments({ role: "seller" })
    const adminCount = await User.countDocuments({ role: "admin" })

    // Get book distribution by condition
    const newBookCount = await Book.countDocuments({ condition: "new" })
    const usedBookCount = await Book.countDocuments({ condition: "used" })

    // Get order distribution by status
    const processingOrderCount = await Order.countDocuments({ orderStatus: "processing" })
    const shippedOrderCount = await Order.countDocuments({ orderStatus: "shipped" })
    const deliveredOrderCount = await Order.countDocuments({ orderStatus: "delivered" })
    const cancelledOrderCount = await Order.countDocuments({ orderStatus: "cancelled" })

    // Get recent users
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5)

    // Get recent orders
    const recentOrders = await Order.find().populate("buyer", "name email").sort({ orderDate: -1 }).limit(5)

    // Mock system health data
    const systemHealth = {
      cpu: "32%",
      memory: "1.2GB / 4GB",
      disk: "12GB / 50GB",
      uptime: "7 days, 3 hours",
      lastRestart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    }

    res.render("admin/reports", {
      title: "System Reports - Bookish",
      counts: {
        users: userCount,
        books: bookCount,
        orders: orderCount,
      },
      userDistribution: {
        buyers: buyerCount,
        sellers: sellerCount,
        admins: adminCount,
      },
      bookDistribution: {
        new: newBookCount,
        used: usedBookCount,
      },
      orderDistribution: {
        processing: processingOrderCount,
        shipped: shippedOrderCount,
        delivered: deliveredOrderCount,
        cancelled: cancelledOrderCount,
      },
      recentUsers,
      recentOrders,
      systemHealth,
      user: req.user,
    })
  } catch (err) {
    console.error(err)
    req.flash("error_msg", "Error generating reports")
    res.redirect("/")
  }
})

/**
 * @route   GET /admin/content
 * @desc    Content moderation
 * @access  Private (Admin)
 */
router.get("/content", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    // Get pending books
    const pendingBooks = await Book.find({ isApproved: false }).populate("seller", "name email").sort({ createdAt: -1 })

    // Get approved books
    const approvedBooks = await Book.find({ isApproved: true })
      .populate("seller", "name email")
      .sort({ createdAt: -1 })
      .limit(10)

    res.render("admin/content", {
      title: "Content Moderation - Bookish",
      pendingBooks,
      approvedBooks,
      user: req.user, 
    })
  } catch (err) {
    console.error(err)
    req.flash("error_msg", "Error fetching content")
    res.redirect("/admin/reports")
  }
})

/**
 * @route   POST /admin/content/:id/approve
 * @desc    Approve book
 * @access  Private (Admin)
 */
router.post(
  "/content/:id/approve",
  ensureAuthenticated,
  ensureAdmin,
  async (req, res) => {
    try {
      await Book.findByIdAndUpdate(req.params.id, { isApproved: true })

      req.flash("success_msg", "Book approved successfully")
      res.redirect("/admin/content")
    } catch (err) {
      console.error(err)
      req.flash("error_msg", "Error approving book")
      res.redirect("/admin/content")
    }
  }
)

/**
 * @route   POST /admin/content/:id/reject
 * @desc    Reject book
 * @access  Private (Admin)
 */
router.post(
  "/content/:id/reject",
  ensureAuthenticated,
  ensureAdmin,
  async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id)

      req.flash("success_msg", "Book rejected and removed")
      res.redirect("/admin/content")
    } catch (err) {
      console.error(err)
      req.flash("error_msg", "Error rejecting book")
      res.redirect("/admin/content")
    }
  }
)

/**
 * @route   GET /admin/content/:id
 * @desc    View book details for moderation
 * @access  Private (Admin)
 */
router.get("/content/:id", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("seller", "name email")
      .populate("originalOwner", "name email")

    if (!book) {
      req.flash("error_msg", "Book not found")
      return res.redirect("/admin/content")
    }

    res.render("admin/view-book", {
      title: "View Book - Bookish Admin",
      book,
      user: req.user
    })
  } catch (err) {
    console.error(err)
    req.flash("error_msg", "Error fetching book details")
    res.redirect("/admin/content")
  }
})

/**
 * @route   GET /admin/complaints
 * @desc    View all complaints
 * @access  Private (Admin)
 */
router.get('/complaints', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    // Get query parameters for filtering
    const { status, role, source, search } = req.query;
    
    // Build filter object
    let filter = {};
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    if (role && role !== 'all') {
      filter.userRole = role;
    }
    
    if (source && source !== 'all') {
      filter.source = source;
    }
    
    if (search) {
      filter.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Get all complaints with user details when available
    const complaints = await Complaint.find(filter)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.render('admin/view-complaints', {
      title: 'Complaint Management - Bookish',
      user: req.user,
      complaints,
      activeFilters: {
        status: status || 'all',
        role: role || 'all',
        source: source || 'all',
        search: search || ''
      }
    });
  } catch (err) {
    console.error('Error loading complaints:', err);
    req.flash('error_msg', 'Error loading complaints');
    res.redirect('/admin/dashboard');
  }
});

/**
 * @route   POST /admin/complaints/:id/respond
 * @desc    Admin response to a complaint
 * @access  Private (Admin)
 */
router.post('/complaints/:id/respond', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { status, adminResponse } = req.body;
    const complaintId = req.params.id;
    
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      req.flash('error_msg', 'Complaint not found');
      return res.redirect('/admin/complaints');
    }
    
    // Update complaint with admin response
    complaint.status = status;
    complaint.adminResponse = adminResponse;
    complaint.updatedAt = Date.now();
    
    await complaint.save();
    
    req.flash('success_msg', 'Response submitted successfully');
    res.redirect(`/admin/complaints/${complaintId}`); // Redirect back to the individual complaint
  } catch (err) {
    console.error('Error responding to complaint:', err);
    req.flash('error_msg', 'Error submitting response');
    res.redirect('/admin/complaints');
  }
});

/**
 * @route   GET /seed-admin
 * @desc    Create initial admin account
 * @access  Public (only for initial setup)
 */
router.get("/seed-admin", async (req, res) => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ role: "admin" })

    if (adminExists) {
      req.flash("error_msg", "Admin account already exists")
      return res.redirect("/");
    }

    // Create admin account
    const admin = new User({
      name: "Admin",
      email: "admin@bookish.in",
      password: "admin123",
      role: "admin",
      isVerified: true,
    })

    await admin.save()

    req.flash("success_msg", "Admin account created successfully")
    res.redirect("/auth/login")
  } catch (err) {
    console.error(err)
    req.flash("error_msg", "Error creating admin account")
    res.redirect("/")
  }
})

/**
 * @route   GET /admin/orders
 * @desc    View all orders for admin
 * @access  Private (Admin)
 */
router.get("/orders", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};
    
    // Apply status filter
    if (status && status !== 'all') {
      query.orderStatus = status;
    }
    
    // Apply search filter
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { 'shippingAddress.name': { $regex: search, $options: 'i' } }
      ];
    }
    
    // Get all orders with user and book details
    const orders = await Order.find(query)
      .populate('buyer', 'name email')
      .populate('items.book', 'title author coverImage')
      .populate('items.seller', 'name email')
      .sort({ orderDate: -1 });
    
    res.render("admin/orders", {
      title: "Order Management - Bookish",
      user: req.user,
      orders: orders,
      activeFilters: {
        status: status || 'all',
        search: search || ''
      }
    });
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Error loading orders");
    res.redirect("/admin/dashboard");
  }
});

/**
 * @route   POST /admin/orders/update/:id
 * @desc    Update order status and delivery info
 * @access  Private (Admin)
 */
router.post("/orders/update/:id", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { orderStatus, expectedDelivery, trackingNumber, carrier, trackingUrl, adminNotes } = req.body;
    const orderId = req.params.id;
    
    const order = await Order.findById(orderId);
    if (!order) {
      req.flash("error_msg", "Order not found");
      return res.redirect("/admin/orders");
    }
    
    // Check if status changed
    const statusChanged = order.orderStatus !== orderStatus;
    
    // Update order details
    order.orderStatus = orderStatus;
    order.adminNotes = adminNotes || order.adminNotes;
    
    if (expectedDelivery) {
      order.expectedDelivery = new Date(expectedDelivery);
    }
    
    // Update tracking information
    if (trackingNumber || carrier) {
      order.trackingInfo = order.trackingInfo || {};
      if (trackingNumber) order.trackingInfo.trackingNumber = trackingNumber;
      if (carrier) order.trackingInfo.carrier = carrier;
      if (trackingUrl) order.trackingInfo.trackingUrl = trackingUrl;
    }
    
    await order.save();
    
    req.flash("success_msg", "Order updated successfully");
    res.redirect("/admin/orders");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Error updating order");
    res.redirect("/admin/orders");
  }
});

/**
 * @route   GET /admin/complaints/:id
 * @desc    View individual complaint details
 * @access  Private (Admin)
 */
router.get('/complaints/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('user', 'name email');
    
    if (!complaint) {
      req.flash('error_msg', 'Complaint not found');
      return res.redirect('/admin/complaints');
    }
    
    res.render('admin/view-complaint', {
      title: 'View Complaint - Bookish',
      user: req.user,
      complaint
    });
  } catch (err) {
    console.error('Error viewing complaint:', err);
    req.flash('error_msg', 'Error loading complaint details');
    res.redirect('/admin/complaints');
  }
});

/**
 * @route   GET /admin/books
 * @desc    Browse all books with filtering and sorting options
 * @access  Private (Admin)
 */
router.get("/books", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { search, genre, condition, minPrice, maxPrice, sort, approvalStatus } = req.query;
    
    // Build query
    const query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (genre) {
      query.genres = genre;
    }
    
    if (condition) query.condition = condition;
    if (approvalStatus) query.isApproved = approvalStatus === 'approved';
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Build sort options
    let sortOptions = {};
    switch (sort) {
      case 'price-asc':
        sortOptions = { price: 1 };
        break;
      case 'price-desc':
        sortOptions = { price: -1 };
        break;
      case 'rating':
        sortOptions = { rating: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 }; // newest first
    }
    
    // Get all unique genres for filter dropdown
    const genres = await Book.distinct('genres');
    
    // Get books with populated seller info
    const books = await Book.find(query)
      .populate('seller', 'name email')
      .sort(sortOptions);
    
    res.render('admin/books', {
      title: 'Browse Books - Bookish Admin',
      books,
      genres,
      filters: {
        search,
        genre,
        condition,
        minPrice,
        maxPrice,
        sort,
        approvalStatus
      },
      user: req.user
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error fetching books');
    res.redirect('/admin/reports');
  }
});

module.exports = router

