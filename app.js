
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , arduino = require('duino')
  , socket = require('./socket')
  , Arm = require('./lib/arm');

var app = module.exports = express.createServer()
  , arm = new Arm(null, 'production' !== process.env.NODE_ENV);

// Configuration.

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// Helpers.

app.helpers({
    title: 'kaina'
});

// Routes.

app.get('/', routes.index);
app.all('/admin', express.basicAuth(function(user, pass) {
  return user === (process.env.ADMIN_USER || 'admin')
    && pass === (process.env.ADMIN_PASS || 'pass');
}));
app.get('/admin', routes.admin);

/**
 * Web API.
 */

app.get('/arm/elbow', function(req, res) {
  arm.servo.elbow.once('read', function(err, val) {
    res.send({ val: parseInt(val, 10) });
  });
  arm.servo.elbow.read();
});

app.post('/arm/elbow', function(req, res) {
  var val = req.body.val;
  arm.servo.elbow.once('write', function() {
    res.send({ res: 'success' });
  });
  arm.wrist(val);
});

app.get('/arm/wrist', function(req, res) {
  arm.servo.wrist.once('read', function(err, val) {
    res.send({ val: parseInt(val, 10) });
  });
  arm.servo.wrist.read();
});

app.post('/arm/wrist', function(req, res) {
  var val = req.body.val;
  arm.servo.wrist.once('write', function() {
    res.send({ res: 'success' });
  });
  arm.wrist(val);  
});

/**
 * Boot.
 */

arm.board.on('ready', function() {
  var io = socket(app, arm);
  
  app.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  });
});
