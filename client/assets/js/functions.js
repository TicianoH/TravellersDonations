
$(document).ready(function (mapObject) {
    
    fullfillForm();
});

function displayMarkers(data,textStatus,jqXHR) {
   
if (data.length) {
    for(i=0;i<data.results.length;i++){

        let donation = data.results[i];
        console.log("Nearby donation found: "+donation.name+"\n"+"location: "+donation.location.lat+","+donation.location.lng);
        marker = new google.maps.Marker({
            map: map,
            position: donation.location,
            title: donation.name,
            animation: google.maps.Animation.DROP,
        });
        
        }
    } else {

        //MOSTRAR MENSAJE QUE NO HAY DONACIONES AL USUARIO.
        console.log("No donations found nearby, adding sample donation");
        addSampleDonation();
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

    function fullfillForm() {

        document.getElementById("userName").value = "jmojico";
        // document.getElementById("email").value = "jmojico@gmail.com";
        document.getElementById("donationName").value = "Carpa";
        document.getElementById("description").value = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        document.getElementById("placeInfo").value = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        document.getElementById("pac-input").value = "Direccion 123 Reloca";
        

    }

    function addSampleDonation(){

        // var sampleDonation = {
        //     userName: "Juan",
        //     donationName: "Carpa de Camping",
        //     description: "Esta es una preciosa carpa de camping para 4 personas, tiene algun tiempo de uso pero esta en buen estado. Como observaciones, faltan 3 estacas",
        //     locationInfo: "La direccion de ubicacion corresponde a mi casa, es un edificio y vivo en el departamento 7-C",
        //     address: "Pedernera 2295, B1607APG Villa Adelina, Buenos Aires, Argentina",
        //     location: { lat:window.pos.lat+0.01, lng:window.pos.lng+0.01 },
        //     files: "[sampleDonation.jpg]"
        // }

        // $.ajax({
        //     type: "POST",
        //     url: "/api/donationItems",
        //     data: JSON.stringify(sampleDonation),
        //     dataType: "json",
        //     contentType: 'application/json',
        //     success: function() {
            
        //     },
        //     timeout: 5000
        // });

        marker = new google.maps.Marker({
            map: map,
            position:  { lat:window.pos.lat+0.004, lng:window.pos.lng+0.005 },
            title: "Sample Donation",
            animation: google.maps.Animation.DROP,
        });

        //Mostrar datos de donacion de ejemplo en el panel correspondiente.
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