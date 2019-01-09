

module.exports = function(app) {

const pug = require('pug');
var path = require('path');
const __basePath = path.resolve();
const VIEWS_DIR = path.join(__basePath,'\server\\views')

const compiledIndex = pug.compileFile(VIEWS_DIR+"/index.pug");
//app.set('views', path.join(__dirname, 'views'));
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var ONE_HOUR = 60 * 60 ;

// const googleMapsClient = require('@google/maps').createClient({
//   key: process.env.GOOGLE_API
// });

app.get('/login',  (req,res) => { 
  res.redirect('/login.html'); })
app.post('/login', function(req, res) {
    User.login({
      email: req.body.email,
      password: req.body.password,
      ttl:ONE_HOUR
    }, 'user', function(err, token) {

      if (err) {
        // res.render('response', { //render view named 'response.ejs'
        //   title: 'Login failed',
        //   content: err,
        //   redirectTo: '/',
        //   redirectToLinkText: 'Try again'
        // });
        console.log("Login failed: "+err);
        return;
      } 

      console.log(accessToken.id);      // => GOkZRwg... the access token
      console.log(accessToken.ttl);     // => 1209600 time to live
      console.log(accessToken.created); // => 2013-12-20T21:10:20.377Z
      console.log(accessToken.userId);  // => 1
      console.log("User logged in: "+req.body.email+"\nAccess Token: "+token.id);
      res.render('index', { user: req.user});

    });
  });




app.get('/logout', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401); //return 401:unauthorized if accessToken is not present
    User.logout(req.accessToken.id, function(err) {
      if (err) return next(err);
      res.redirect('/'); //on successful logout, redirect
    });
  });

  app.get('/auth/account', ensureLoggedIn('/login'), function(req, res, next) {

    res.render(VIEWS_DIR+"/index.pug", [{user: req.user},{ GOOGLE_API : process.env.GOOGLE_API }]);

    console.log("User: "+req.user);
      //   url: req.url,)
  });

  app.get('/', function (req, res) {


    if (process.env.NODE_ENV == 'production') {

    //USE COMPILED TEMPLATE FOR INCREASED PERFORMANCE
    res.send(compiledIndex( [{user:req.user},{ GOOGLE_API : process.env.GOOGLE_API }]));
   
  } else {
    
    //IF DEV JUST RENDER TO EASE TESTING
    res.render(VIEWS_DIR+"/index.pug", [{user:req.user},{ GOOGLE_API : process.env.GOOGLE_API }]);
  }

  });

};