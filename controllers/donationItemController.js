var donationItem = require('../common/models/donation-item');

exports.getNearDonations = function (req,res){

    // lat=this.req.lat;
    // long=this.req.long;

    
    var here = new loopback.GeoPoint({lat: 10.32424, lng: 5.84978});
    donationItem.attachTo(items);
    donationItem.find( {where: {location: {near: here}}, limit:3}, function(err, nearbyDonations) {
           console.info(nearbyDonations); // [CoffeeShop, ...]
        });
    
    //return '{donationItem: [lala,lele}}';
    res.json(nearbyDonations);
    return nearbyDonations;

}

