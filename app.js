/**
 * Module dependencies`
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
var store = require('./routes/store');
var inventory = require('./routes/inventory');
var tutorial = require('./routes/tutorial');
var profile = require('./routes/profile');
var friends = require('./routes/friends');
var checkin = require('./routes/checkin');
var friendsCheckin = require('./routes/friendsCheckin');
// Example route
// var user = require('./routes/user');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.viewIndex);
app.get('/store', store.viewStore);
app.get('/inventory', inventory.viewInventory);
app.get('/tutorial', tutorial.viewTutorial);
app.get('/profile', profile.viewProfile);
app.get('/friends', friends.viewFriends);
app.get('/checkin', checkin.viewCheckIn);
app.get('/friendsCheckin', friendsCheckin.viewFriendsCheckIn);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
