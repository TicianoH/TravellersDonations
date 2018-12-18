'use strict';


var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var session = require('express-session');

//AUTH PROVIDERS SETUP
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);
//var cookiePonarser = require('cookie-parser');

//Security
var helmet = require('helmet');


//Load Jquery File Upload handler
var upload = require('jquery-file-upload-middleware'),
    bodyParser = require('body-parser');

    /**
 * Flash messages for passport
 *
 * Setting the failureFlash option to true instructs Passport to flash an
 * error message using the message given by the strategy's verify callback,
 * if any. This is often the best approach, because the verify callback
 * can make the most accurate determination of why authentication failed.
 */
var flash = require('express-flash');

//load enviroment variables
require('dotenv').config();


app.use(helmet());

app.use('/express-status', function (req, res, next) {
    res.json({ running: true });
})

// configure upload middleware
upload.configure({
    uploadDir: __dirname + '/public/uploads',
    uploadUrl: '/uploads',
    imageVersions: {
        thumbnail: {
            width: 80,
            height: 80
        }
    },
    imageTypes: /\.(gif|jpe?g|png|bmp)$/i,
    accessControl: {
        // allowOrigin: '*',
        allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE'
    },
    maxPostSize: '600,228',
    minFileSize: '100',
    maxFileSize: '524,228', // 512 kb
    acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp)$/i,
    disableImageResize: "false",
});


app.use('/upload', upload.fileHandler());
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))


// Setup the view engine (jade)
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
    if (err) throw err;
});


// to support JSON-encoded bodies
app.middleware('parse', bodyParser.json());
// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({
  extended: true,
}));


// Enable http session
//app.use(loopback.session({ secret: 'keyboard cat' }));

// // The access token is only available after boot
// app.middleware('auth', loopback.token({
//     model: app.models.accessToken,
//   }));
  
//app.middleware('session:before', cookieParser(app.get('process.env.COOKIE_SECRET')));
var secure = false

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    var secure = true // serve secure cookies
  };
app.middleware('session', session({
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: true,
  resave: true,
  secure: secure,
  name: "tdconnect.sid",
}));

// Load the provider configurations
var config = {};


try {
 config = require('../providers.json');
 
} catch(err) {
//  console.error('Please configure your passport strategy in `providers.json`.');
//  console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
 console.trace(err);
 process.exit(1);
}

// Initialize passport
passportConfigurator.init();


// We need flash messages to see passport errors
app.use(flash());


// Set up related models
passportConfigurator.setupModels({
 userModel: app.models.user,
 userIdentityModel: app.models.userIdentity,
 userCredentialModel: app.models.userCredential
});
// Configure passport strategies for third party auth providers
for(var s in config) {
 var c = config[s];
 c.session = c.session !== false;

 if (s=="facebook-login"){
 c.clientID = process.env.FB_API_KEY;
 c.clientSecret = process.env.FB_API_SECRET;
 }

 passportConfigurator.configureProvider(s, c);
}


app.start = function () {
    // start the web server
    return app.listen(function () {
        app.emit('started');
        var baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Web server listening at: %s', baseUrl);
        if (app.get('loopback-component-explorer')) {
            var explorerPath = app.get('loopback-component-explorer').mountPath;
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
        }
    });
};

// start the server if `$ node server.js`
if (require.main === module)
app.start();