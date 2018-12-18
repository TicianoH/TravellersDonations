
module.exports = function(app) {

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var ONE_HOUR = 60 * 60 ;

app.get('/login', (req,res) => { res.redirect('/login.html'); })
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
    // res.render('pages/loginProfiles', {
    //   user: req.user,
    //   url: req.url,
    // });
    console.log("User: "+req.user);
      //   url: req.url,)
  });

  app.get('/', function (req, res) {
    res.render('index', { user: req.user});
  });

};