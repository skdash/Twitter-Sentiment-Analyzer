//Server
//include necessary packages
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//web framework 'express' to support MVC
var app = express();

//http server created; listening on port 3000
var server = require('http').createServer(app);
var port = 3000;
server.listen(port);
console.log("Socket.io server listening at http://127.0.0.1:" + port);

var sio = require('socket.io').listen(server);

var love_tweet=0;
var hate_tweet=0;
var total=0;
var love_percent=0;
var hate_percent=0;

//include the twitter Node package 'twit'
var Twit = require('twit');

//access keys need to accessed as environment variables
var T = new Twit({
    consumer_key:         process.env.TWITTER_CONSUMER_KEY
  , consumer_secret:      process.env.TWITTER_CONSUMER_SECRET
  , access_token:         process.env.TWITTER_ACCESS_TOKEN
  , access_token_secret:  process.env.TWITTER_ACCESS_SECRET
});

//on connection with web browser client
sio.sockets.on('connection', function(socket){

   console.log('Web client connected');
   var stream = T.stream('statuses/filter', { track: ['love', 'hate'] }); //establish filter
   stream.on('tweet', function (tweet) {
		//display tweets with words: love/hate
	    console.log(tweet.text);
		if (tweet.text.indexOf('love') != -1)
		{
			//twitter counter for love
			love_tweet++;
		}
		if (tweet.text.indexOf('hate') != -1)
		{
			//twitter counter for hate
			hate_tweet++;
		}
		total=love_tweet + hate_tweet;		//total number of tweets containing love/hate
		love_percent=love_tweet*100/total;  //percentage of tweets containing love
		hate_percent=hate_tweet*100/total;  //percentage of tweets containing hate
		
		//emit the meaningful data to the web browser client
		socket.volatile.emit('ss-tweet', {	user: tweet.user.screen_name , 
										  	text: tweet.text,
										  	love: love_percent.toFixed(3),
										  	hate: hate_percent.toFixed(3),
										  	total: total
		});
	});
	
    //on disconnection from client
   	socket.on('disconnect', function() {
    console.log('Web client disconnected');
   });
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
