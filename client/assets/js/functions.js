
$(document).ready(function () {
    
    fullfillForm();
    
});


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

        

        submitForm(document.getElementById('newDonationForm'), showSnackBar());

        event.preventDefault();

    }

    function showSnackBar(){
        
            'use strict';
            var snackbarContainer = document.querySelector('#demo-toast-example');
            var handler = function(event) {
                $('#submitForm').style.backgroundColor = 'lightgreen';
              };

            var data = {
                message: 'Your donation was submitted. Thanks',
                timeout: 2000,
                actionHandler: handler,
                actionText: 'Undo'
              };
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

    function submitForm(form, successFn) {

        if (form.getAttribute("id") != '' || form.getAttribute("id") != null) {
            var id = form.getAttribute("id");
        } else { console.log("Form id attribute was not set; the form cannot be serialized") }

        $.ajax({
            type: form.method,
            url: form.action,
            data: $(id).serializeArray(),
            dataType: "json",
            success: successFn
            //error: errorFn(data)
        });
    }