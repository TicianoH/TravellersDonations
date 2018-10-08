
$(document).ready(function ()
{
    // document.getElementById("uploadBtn").onchange = function () {
    //     document.getElementById("uploadFile").value = this.files[0].name;
    //     };
        fullfillForm();
});

function slideForm(){
    addDonationCard = document.getElementById("searchDiv");
    if (addDonationCard.style.visibility=='hidden'){
        addDonationCard.setAttribute("style", "visibility: visible; display:block");
    } else {
        addDonationCard.setAttribute("style", "visibility: hidden; display:none");
    }
}

function submitNewDonation(){
let a = a;
       $.ajax({
           type: "post",
           url: "/api/donationItems",
           //TODO agregar el file stream al objeto serialzied y debuggear
           data: $("#newDonationForm").serialize(),
           dataType: "json",
           success: function (response) {
               console.log("Request success: "+response)
           },
       });
        
       event.preventDefault();

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