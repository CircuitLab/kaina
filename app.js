
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

// Configuration

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
 * Boot.
 */

arm.board.on('ready', function() {
  var io = socket(app, arm);
  app.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  });
});
