/**
 * Authentication middleware for role-based access control
 */

/**
 * Ensures user is authenticated
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please log in to view this resource');
  res.redirect('/auth/login');
};

/**
 * Ensures user has buyer role
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.ensureBuyer = function(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'buyer') {
    return next();
  }
  
  if (req.isAuthenticated()) {
    if (req.user.role === 'seller') {
      req.flash('error_msg', 'This section is only accessible to buyers. Please use the seller dashboard to manage your books.');
      res.redirect('/');
    } else if (req.user.role === 'admin') {
      req.flash('error_msg', 'This section is only accessible to buyers. Please use the admin dashboard to manage the platform.');
      res.redirect('/');
    }
  } else {
    req.flash('error_msg', 'Please log in as a buyer to access this section.');
    res.redirect('/');
  }
};

/**
 * Ensures user has seller role
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.ensureSeller = function(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'seller') {
    return next();
  }
  req.flash('error_msg', 'Access denied. This page is only for sellers.');
  res.redirect('/seller/dashboard');
};

/**
 * Ensures user has admin role
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.ensureAdmin = function(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  req.flash('error_msg', 'Access denied. This page is only for admins.');
  res.redirect('/admin/dashboard');
};

/**
 * Forwards authenticated users away from the login page
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.forwardAuthenticated = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  // Redirect based on user role
  if (req.user.role === 'buyer') {
    res.redirect('/buyer/dashboard');
  } else if (req.user.role === 'seller') {
    res.redirect('/seller/dashboard');
  } else if (req.user.role === 'admin') {
    res.redirect('/admin/dashboard');
  } else {
    res.redirect('/');
  }
};

