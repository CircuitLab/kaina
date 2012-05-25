
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Robot Arm' });
};

exports.admin = function(req, res) {
  res.render('admin', { title: 'Robot Arm' });
};