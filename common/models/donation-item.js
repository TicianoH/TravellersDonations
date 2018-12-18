'use strict';
var loopback = require('loopback');


module.exports = function (Donationitem) {

    //https://loopback.io/doc/en/lb2/Where-filter.html#near
    //Donationitem.nearbydonationsFunc = async function (geoposition){
    Donationitem.nearbydonationsFunc = function (lat,lng,km , callback) {
     
        //limit donations search by km parameter

        if (km>100) {
            km = 100
        }
        
        var geoposition = new loopback.GeoPoint({
            lat: lat,
            lng: lng
          });

        Donationitem.find({ where: { location: { near: geoposition,  limit: 100, maxDistance:km, unit:'kilometers' } }, }, function (err, dbresult) {
            //agregar cosas? exceptions try catch ex

            callback(null, dbresult);
            console.info(dbresult);
        });

    };

Donationitem.remoteMethod('nearbydonationsFunc', {
    http: { path: '/nearbydonations', verb: "get" },
    description: "Get method to obtain nearby donations using GeoPoint as input",
    accepts: [{ arg: 'lat', type: 'number' },
    { arg: 'lng', type: 'number' },
    { arg: 'km', type: 'number'}],
    returns: { arg: 'results', type: "Object" }
});

}
