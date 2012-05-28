
/*
 * GET /
 */

exports.index = function(req, res) {
  res.render('index');
};

/**
 * GET /admin
 */

exports.admin = function(req, res) {
  res.render('admin');
};