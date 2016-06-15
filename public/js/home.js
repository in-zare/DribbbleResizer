$(function(){
    $(".jscolor").on("click", function(){
        $("#r3").prop("checked", true)
    });

    $(".btn-size").on("click", function(e){
        $(".btn-size").removeClass("active");
        $(this).addClass("active");
        $("#image-size").val($(this).text());
    });

    $(".btn-browse, .info-text").on("click", function (e){
        $("#file").trigger("click");
    });

    var body = $("body");

    body.on("dragenter", function() {
        $(".drop-here").show();
    });

    $(".drop-here").on("click", function(e) {
        $(this).hide();
    });
});

Dropzone.options.dropzone = { // The camelized version of the ID of the form element
    maxFiles: 1,
    maxFilesize: 10, //mb
    acceptedFiles: 'image/*',
    autoDiscover: false,
    addRemoveLinks: false,
    autoProcessQueue: false,
    clickable: ".btn-browse",
    dictDefaultMessage: '',

    // The setting up of the dropzone
    init: function() {
        var myDropzone = this;

        myDropzone.on("drop", function(event) {
            $(".drop-here").hide();
        });

        myDropzone.on("addedfile", function(file) {
            var fileName = ellipsisInMiddle(file.name);
            var nameElement = $(".file-name");
            var uploadElement = $(".upload");
            var resizeBtn = $(".btn-resize");

            nameElement.html($("<span>").text(fileName));

            resizeBtn.addClass("active");
            uploadElement.hide();
            nameElement.show();
            // Create the remove button
            var removeButton = $('<button type="button" class="close remove-file" aria-label="Close"><span aria-hidden="true">&times;</span></button>');

            // Capture the Dropzone instance as closure.
            var _this = this;

            // Listen to the click event
            removeButton.on("click", function(e) {
                // Make sure the button click doesn't submit the form:
                e.preventDefault();
                e.stopPropagation();

                // Remove the file preview.
                _this.removeFile(file);
                uploadElement.show();
                nameElement.hide();
                resizeBtn.removeClass("active");
                // If you want to the delete the file on the server as well,
                // you can do the AJAX request here.
            });

            nameElement.append(removeButton);
        });
        // First change the button to actually tell Dropzone to process the queue.
        $(".btn-resize").on("click", function(e) {
            if (!$(this).hasClass("active")) {
                return false;
            }

            e.preventDefault();
            e.stopPropagation();
            myDropzone.processQueue();
        });

        // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
        // of the sending event because uploadMultiple is set to true.
        this.on("sending", function() {
            // Gets triggered when the form is actually being sent.
            // Hide the success button or the complete form.
        });
        this.on("success", function(files, response) {
            myDropzone.removeAllFiles();
            $(".btn-resize").removeClass("active");
            console.log(response);
            // Gets triggered when the files have successfully been sent.
            // Redirect user or notify of success.
        });
        this.on("error", function(files, response) {
            // Gets triggered when there was an error sending the files.
            // Maybe show form again, and notify user of error
        });
    }

};
//
// var myDropzone = new Dropzone("div#dropzone", {
//     url: "/file/post",
//     maxFiles: 1,
//     maxFilesize: 10, //mb
//     acceptedFiles: 'image/*',
//     autoDiscover: false,
//     addRemoveLinks: false,
//     autoProcessQueue: false,
//     clickable: ".btn-browse"
// });


function ellipsisInMiddle(str) {
    if (str.length > 25) {
        return str.substr(0, 15) + '…' + str.substr(str.length-7, str.length);
    }
    return str;
}




