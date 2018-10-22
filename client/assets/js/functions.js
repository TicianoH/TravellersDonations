
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

    //chequear que todos los campos esten llenos, incluso imagenes.
    

// 'use strict';
//$('#inputFiles').val('{ files: [' + window.uploadedFiles.toString() + ']}');
$('#inputFiles').val(JSON.stringify(window.uploadedFiles));
var formData = $('#newDonationForm').serializeArray();

//agregar array de archivos en el hidden input, con callback del plugin o desde el DOM con el display del filename?

    
//     // Change this to the location of your server-side upload handler:
//     var url = window.location.hostname === 'blueimp.github.io' ?
//                 '//jquery-file-upload.appspot.com/' : '/upload',
//         uploadButton = $('<button/>')
//             .addClass('btn btn-primary')
//             .prop('disabled', true)
//             .text('Processing...')
//             .on('click', function () {
//                 var $this = $(this),
//                     data = $this.data();
//                 $this
//                     .off('click')
//                     .text('Abort')
//                     .on('click', function () {
//                         $this.remove();
//                         data.abort();
//                     });
//                 data.submit().always(function () {
//                     $this.remove();
//                 });
//             });
//     $('#fileupload').fileupload({
//         url: url,
//         dataType: 'json',
//         autoUpload: false,
//         acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
//         maxFileSize: 999000,
//         // Enable image resizing, except for Android and Opera,
//         // which actually support image resizing, but fail to
//         // send Blob objects via XHR requests:
//         disableImageResize: /Android(?!.*Chrome)|Opera/
//             .test(window.navigator.userAgent),
//         previewMaxWidth: 100,
//         previewMaxHeight: 100,
//         previewCrop: true
//     }).on('fileuploadadd', function (e, data) {
//         data.context = $('<div/>').appendTo('#files');
//         $.each(data.files, function (index, file) {
//             var node = $('<p/>')
//                     .append($('<span/>').text(file.name));
//             if (!index) {
//                 node
//                     .append('<br>')
//                     .append(uploadButton.clone(true).data(data));
//             }
//             node.appendTo(data.context);
//         });
//     }).on('fileuploadprocessalways', function (e, data) {
//         var index = data.index,
//             file = data.files[index],
//             node = $(data.context.children()[index]);
//         if (file.preview) {
//             node
//                 .prepend('<br>')
//                 .prepend(file.preview);
//         }
//         if (file.error) {
//             node
//                 .append('<br>')
//                 .append($('<span class="text-danger"/>').text(file.error));
//         }
//         if (index + 1 === data.files.length) {
//             data.context.find('button')
//                 .text('Upload')
//                 .prop('disabled', !!data.files.error);
//         }
//     }).on('fileuploadprogressall', function (e, data) {
//         var progress = parseInt(data.loaded / data.total * 100, 10);
//         $('#progress .progress-bar').css(
//             'width',
//             progress + '%'
//         );
//     }).on('fileuploaddone', function (e, data) {
//         $.each(data.result.files, function (index, file) {
//             if (file.url) {
//                 var link = $('<a>')
//                     .attr('target', '_blank')
//                     .prop('href', file.url);
//                 $(data.context.children()[index])
//                     .wrap(link);
//             } else if (file.error) {
//                 var error = $('<span class="text-danger"/>').text(file.error);
//                 $(data.context.children()[index])
//                     .append('<br>')
//                     .append(error);
//             }
//         });
//     }).on('fileuploadfail', function (e, data) {
//         $.each(data.files, function (index) {
//             var error = $('<span class="text-danger"/>').text('File upload failed.');
//             $(data.context.children()[index])
//                 .append('<br>')
//                 .append(error);
//         });
//     }).prop('disabled', !$.support.fileInput)
//         .parent().addClass($.support.fileInput ? undefined : 'disabled');





//         upload();
    
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

    $("#newDonationForm").append("files","asdasdad")
    $("#newDonationForm").submit();
     

    // $('#newDonationForm').submit(function( event ) {
    //     console.log( $( this ).serializeArray() );
    //     event.preventDefault();
    //   });



;
        
      // event.preventDefault();

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