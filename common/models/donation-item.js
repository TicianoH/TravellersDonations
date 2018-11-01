'use strict';

module.exports = function (Donationitem) {

    //Donationitem.nearbydonationsFunc = async function (geoposition){
    Donationitem.nearbydonationsFunc = function (geoposition, callback) {
        Donationitem.find({ where: { location: { near: geoposition } }, limit: 1 }, function (err, dbresult) {
            //agregar cosas? exceptions try catch ex

            callback(null, dbresult);
            console.info(dbresult);
        });
    };

Donationitem.remoteMethod('nearbydonationsFunc', {
    http: { path: '/nearbydonations', verb: "get" },
    description: "Get method to obtain nearby donations using GeoPoint as input",
    accepts: { arg: 'geoposition', type: 'GeoPoint' },
    returns: { arg: 'results', type: "Object" }
});

}
