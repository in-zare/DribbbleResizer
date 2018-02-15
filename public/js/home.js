$(function(){
    $(".jscolor").on("click", function(){
        $("#r3").prop("checked", true).trigger("change");
    });

    $(".btn-size").on("click", function(e){
        $(".btn-size").removeClass("active");
        $(this).addClass("active");
        $("#image-size").val($(this).text());
        updatePreview();
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

    $('input[type=radio][name=bgColor]').change(function(e) {
        var color = "#fff";
        if (this.value == 'black') {
            color = "#000";
        }
        else if (this.value == 'custom') {
            color = "#" + $(".jscolor").val();
        }

        $(".bg").css("background-color", color);
    });

    $(".margin-input").keyup(function(e) {
        updatePreview();
    });

});

var preview = $("#preview");
previewTemplate = preview[0].outerHTML;
preview.remove();

Dropzone.options.dropzone = { // The camelized version of the ID of the form element
    maxFiles: 1,
    maxFilesize: 10, //mb
    acceptedFiles: 'image/*',
    autoDiscover: false,
    addRemoveLinks: false,
    autoProcessQueue: false,
    clickable: ".btn-browse",
    dictDefaultMessage: '',
    previewsContainer: "#preview-container",
    previewTemplate: previewTemplate,
    thumbnailWidth: null,
    thumbnailHeight: null,

    // The setting up of the dropzone
    init: function() {
        var myDropzone = this;

        myDropzone.on("drop", function(event) {
            $(".drop-here").hide();
        });

        myDropzone.on("addedfile", function(file) {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Upload',
                eventAction: 'addedfile',
                eventLabel: 'Just Checking'
            });

            myDropzone.on("thumbnail", function(file){
                setTimeout(function(){
                    updatePreview();
                }, 100);
                
                $(".panel-preview").show();
            });

            var fileName = ellipsisInMiddle(file.name);
            var nameElement = $(".file-name");
            var uploadElement = $(".upload");

            nameElement.html($("<span>").text(fileName));

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
                $(".panel-preview").hide();
                nameElement.hide();
                // If you want to the delete the file on the server as well,
                // you can do the AJAX request here.
            });

            nameElement.append(removeButton);
        });
        // First change the button to actually tell Dropzone to process the queue.
        $(".btn-resize").on("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            myDropzone.processQueue();
        });

        // Update the total progress bar
        myDropzone.on("totaluploadprogress", function(progress) {
            $(".progress-inner").css("height", progress + "%");
            //document.querySelector("#total-progress .progress-bar").style.width = progress + "%";
        });
        // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
        // of the sending event because uploadMultiple is set to true.
        this.on("sending", function() {
            new ProgressButton(document.querySelector(".progress-button"));
            // Gets triggered when the form is actually being sent.
            // Hide the success button or the complete form.
        });
        this.on("success", function(files, response) {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Upload',
                eventAction: 'fileconverted',
                eventLabel: 'Just Checking'
            });

            $(".remove-file").trigger("click");
            $(".btn-resize")
                .addClass("active ready")
                .removeClass("progress-button")
                .text("Download");

            var file = response.file;
            $(".btn-resize.ready").one("click", function(e){
                e.preventDefault();
                e.stopPropagation();

                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Upload',
                    eventAction: 'filedownloaded',
                    eventLabel: 'Just Checking'
                });

                var form = $('<form id="download-form" action="/done" method="POST">' +
                    '<input type="hidden" name="file" value="' + file + '">' +
                    '</form>');

                $(document.body).append(form);
                $("#download-form").submit();

               $(this).text("Resize").removeClass("active ready").addClass("progress-button");
            });
            // Gets triggered when the files have successfully been sent.
            // Redirect user or notify of success.
        });
        this.on("error", function(files, response) {
            // Gets triggered when there was an error sending the files.
            // Maybe show form again, and notify user of error
        });
    }

};

function updatePreview()
{
    var preview = $("#preview");
    var img = preview.find("img")[0];
    var imgHeight = img.naturalHeight;
    var imgWidth = img.naturalWidth;

    var canvas = getCanvasSize();
    var imageMargin = parseInt($(".margin-input").val());

    if (canvas.width == 800) {
        imgWidth = imgWidth/2;
        imgHeight = imgHeight/2;

        img.style.width = imgWidth;
        img.style.height = imgHeight;

        imageMargin = imageMargin/2;
    } else {
        img.style.width = "";
        img.style.height = "";
    }

    if (imgWidth < 400 && imgHeight < 300) {
        img.style.marginTop = (300-imgHeight)/2;
    } else if (imgWidth > imgHeight) {
        img.style.width = 400 - (imageMargin*2);
        img.style.height = "";
        //couldn't get the height of the image for just 1 image
        setTimeout(function(){
            img.style.marginTop = (300-img.height)/2;
        }, 100);
    } else {
        img.style.height = 300 - (imageMargin*2);
        img.style.width = "";
        img.style.marginTop = imageMargin;
    }
}

function getCanvasSize()
{
    var sizes = $(".btn-size.active").text();
    sizes = sizes.split("x");
    return {
        'width': parseInt(sizes[0]),
        'height': parseInt(sizes[1])
    };
}

function updateBg(jscolor) {
    $(".bg").css("background-color", "#" + jscolor);
}

function ellipsisInMiddle(str)
{
    if (str.length > 25) {
        return str.substr(0, 15) + '…' + str.substr(str.length-7, str.length);
    }
    return str;
}




