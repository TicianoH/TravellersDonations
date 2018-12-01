
$(document).ready(function () {
    
    fullfillForm();
    
});

function displayMarkers(data,textStatus,jqXHR) {
            
    for(i=0;i<data.results.length;i++){

        test=3;
        let donation = data.results[i];
        console.log("Nearby donation found: "+donation.name+"\n"+"location: "+donation.location.lat+","+donation.location.lng);
        marker = new google.maps.Marker({
            map: map,
            position: donation.location,
            title: donation.name,
            animation: google.maps.Animation.DROP,
        });
        
    }   
}

function showNearbyDonations(){
 
    var  geoposition = {
        
        lat: window.pos.lat,
        lng: window.pos.lng
    };

    km = fixKmAccordingZoom();
    console.log("Searching nearby donations to this location: "+geoposition.lat+", "+geoposition.lng+" up to km= "+km)

    $.ajax({
        type: "get",
        url: "/api/donationItems/nearbydonations",
        data: {
           lat:geoposition.lat,
           lng:geoposition.lng,
           km: km,
        },// "{geoposition:",
        dataType: "json",
        success: displayMarkers,
        error: function() {},
        // statusCode: {
        //     404: function() {
        //       alert( "page not found" );
        //     },
        //     500: function() {
        //         alert( "500 server error" );
        //       }},
        timeout: 5000
    });

    

}

function fixKmAccordingZoom(){
    zoom = map.getZoom();
    switch(true) {
        case (zoom>17 && zoom<23): res = 2; break;
        case (zoom>14 && zoom<=17): res = 5; break;
        case (zoom>12 && zoom<=14): res = 15; break;
        case (zoom>10 && zoom<=12): res = 50; break;
        case (zoom>=23): res = 2; break;
        case (zoom<=10): res = 50; break;
        default:50;
    }
    return res;
}


    function slideForm() {
        addDonationCard = document.getElementById("searchDiv");
        if (addDonationCard.style.visibility == 'hidden') {
            addDonationCard.setAttribute("style", "visibility: visible; display:block");
        } else {
            addDonationCard.setAttribute("style", "visibility: hidden; display:none");
        }
    }

   
    function submitNewDonation() {

        //chequear que todos los campos esten llenos, incluso imagenes.


        
        $('#inputFiles').val(JSON.stringify(window.uploadedFiles));
        //var formData = $('#newDonationForm').serializeArray();

        

        submitForm(document.getElementById('newDonationForm'), function (){showSnackBar('lightgreen',"Donation succesfully submitted")} ,function () {showSnackBar("red","Donation submission failed. Please try again later")});

        event.preventDefault();
    }

    function showSnackBar(color,msj){
        
            'use strict';
            var snackbarContainer = document.querySelector('#demo-toast-example');
            var handler = function(event) {
                $('#submitForm').style.backgroundColor = color;
              };

            var data = {
                message: msj,
                timeout: 5000,
                actionHandler: handler,
                actionText: 'Done'
            }
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
            
           

    }

    function toBuffer(ab) {
        var buf = new Buffer(ab.byteLength);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buf.length; ++i) {
            buf[i] = view[i];
        }
        return buf;
    }

    function toArrayBuffer(buf) {
        var ab = new ArrayBuffer(buf.length);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buf.length; ++i) {
            view[i] = buf[i];
        }
        return ab;
    }

    function fullfillForm() {

        document.getElementById("userName").value = "jmojico";
        document.getElementById("email").value = "jmojico@gmail.com";
        document.getElementById("donationName").value = "Carpa";
        document.getElementById("description").value = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        document.getElementById("placeInfo").value = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        document.getElementById("pac-input").value = "Direccion 123 Reloca";
        

    }

    function submitForm(form, successFn, errorFn) {

        if (form.getAttribute("id")) {
        //if (form.getAttribute("id") != '' || form.getAttribute("id") != null) {
            var id = form.getAttribute("id");
        } else { console.log("Form id attribute was not set; the form cannot be serialized") }

        $.ajax({
            type: form.method,
            url: form.action,
            data: $("#"+id).serializeArray(),
            dataType: "json",
            success: successFn,
            error: errorFn,
            // statusCode: {
            //     404: function() {
            //       alert( "page not found" );
            //     },
            //     500: function() {
            //         alert( "500 server error" );
            //       }},
            timeout: 5000
        });
    }