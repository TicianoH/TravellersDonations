'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

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


app.use('/express-status', function (req, res, next) {
    res.json({ running: true });
})

//Load Jquery File Upload handler
var upload = require('jquery-file-upload-middleware'),
bodyParser = require('body-parser');

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


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module)
        app.start();
    // app.set('views',__dirname+'views');
});
