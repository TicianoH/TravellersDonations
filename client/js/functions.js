
$(document).ready(function ()
{
    document.getElementById("uploadBtn").onchange = function () {
        document.getElementById("uploadFile").value = this.files[0].name;
        };
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
    // myForm = document.forms.newDonationForm;
    
   $('#newDonationForm')[0].submit(function(event) {
      
       var formdata = new FormData(this);
        
       console.log(formdata);
       event.preventDefault();

   }
   
   )
    
}

function toBuffer(ab) {
    var buf = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}