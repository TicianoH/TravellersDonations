
$(document).ready(function ()
{
    // document.getElementById("uploadBtn").onchange = function () {
    //     document.getElementById("uploadFile").value = this.files[0].name;
    //     };
        fullfillForm();

    //     $('#submitForm').click(function (e) { 
    //         submitNewDonation();
    //        e.preventDefault();
           
    //    });

        });
       

function slideForm(){
    addDonationCard = document.getElementById("searchDiv");
    if (addDonationCard.style.visibility=='hidden'){
        addDonationCard.setAttribute("style", "visibility: visible; display:block");
    } else {
        addDonationCard.setAttribute("style", "visibility: hidden; display:none");
    }
}


  //TODO: MOVER A OTRO INIT
            //$('#newDonationButton').click(function(){ submitNewDonation(); return false; });
            
function submitNewDonation(){

    var formData = $('#newDonationForm').serializeArray();
    
    // $('#fileupload').fileupload({
    //     dataType: 'json',
    //     done: function (e, data) {
    //         //$.each(data.result.files, function (index, file) {
    //             // $('<p/>').text(file.name).appendTo(document.body);
    //              output = data.result.files;
    //             $.each(output,function(index,file){
    //                 console.log("File uploaded: "+file.name);
    //             });
    //         },
    //     progressall: function (e, data) {
    // var progress = parseInt(data.loaded / data.total * 100, 10);
    // $('#progress .bar').css(
    //     'width',
    //     progress + '%'
    // );
    // }
    // })

   
    

    //    $.ajax({
    //        type: "post",
    //        url: "/api/donationItems",
    //        //TODO agregar el file stream al objeto serialzied y debuggear
    //        data: $("#newDonationForm").serialize(),
    //        dataType: "json",
    //        success: function (response) {
    //            console.log("Request success: "+response)
    //        },
    //    });

    // $('#fileupload').fileupload({
    //     formData: {example: 'test'}
    // });

   // $("#newDonationForm").append("files",)
    //$("#newDonationForm").submit();
     

    // $('#newDonationForm').submit(function( event ) {
    //     console.log( $( this ).serializeArray() );
    //     event.preventDefault();
    //   });



;
        
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

function upload() {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: '/upload'
    });

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

    if (window.location.hostname === 'blueimp.github.io') {
        // Demo settings:
        $('#fileupload').fileupload('option', {
            url: '//jquery-file-upload.appspot.com/',
            // Enable image resizing, except for Android and Opera,
            // which actually support image resizing, but fail to
            // send Blob objects via XHR requests:
            disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),
            maxFileSize: 999000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        });
        // Upload server status check for browsers with CORS support:
        if ($.support.cors) {
            $.ajax({
                url: '/upload',
                type: 'HEAD'
            }).fail(function () {
                $('<div class="alert alert-danger"/>')
                    .text('Upload server currently unavailable - ' +
                            new Date())
                    .appendTo('#fileupload');
            });
        }
    } else {
        // Load existing files:
        $('#fileupload').addClass('fileupload-processing');
        $.ajax({
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            url: $('#fileupload').fileupload('option', 'url'),
            dataType: 'json',
            context: $('#fileupload')[0]
        }).always(function () {
            $(this).removeClass('fileupload-processing');
        }).done(function (result) {
            $(this).fileupload('option', 'done')
                .call(this, $.Event('done'), {result: result});
        });
    }

}