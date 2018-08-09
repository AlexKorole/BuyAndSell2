(function () {
    "use strict";

    var uploader = new ImageUploader({
        inputElement: document.getElementById('imgupload'),
        uploadUrl: 'api/image',
        onProgress: function (event) {
            //$('#progress').text('Completed ' + event.done + ' files of ' + event.total + ' total.');
            //$('#progressbar').progressbar({ value: (event.done / event.total) * 100 })
        },
        onFileComplete: function (event, file) {
            //$('#fileProgress').append('Finished file ' + file.fileName + ' with response from server ' + event.target.status + '<br />');
        },
        onComplete: function (event) {
            //$('#progress').text('Completed all ' + event.done + ' files!');
            //$('#progressbar').progressbar({ value: (event.done / event.total) * 100 })
        },
        maxWidth: 800,//1024,
        quality: 0.9,
        //timeout: 5000,
        debug: true,
        //OutputImg: 'imgCarousel1',
        PicHeight: 228,
        PicWidth: 347,//221
        IMGType: "_Form",
        autoRotate: false
    });

    var uploaderSmall = new ImageUploader({
        inputElement: document.getElementById('imgupload'),
        uploadUrl: 'api/image',
        onProgress: function (event) {
        },
        onFileComplete: function (event, file) {
        },
        onComplete: function (event) {
        },
        maxWidth: 100,//1024,
        quality: 0.9,
        debug: true,
        IMGType: "_Small",
        autoRotate: false
    });

    //$("img").each(function () {
    //    if (this.complete) {
    //        var elem = document.getElementById('imgCarousel1');
    //        if (elem.naturalHeight < 228) {
    //            var elem = this;//document.getElementById('imgCarousel1');
    //            var newMarginTop = (228 - elem.naturalHeight) / 2;
    //            this.setAttribute('style', 'margin-top:' + newMarginTop + 'px !important');
    //        }
    //    }
    //});
    
    //if (document.getElementById('imgCarousel1').complete) {
    //    var elem = document.getElementById('imgCarousel1');
    //    if (elem.naturalHeight < 228) {
    //        var elem = this;//document.getElementById('imgCarousel1');
    //        var newMarginTop = (228 - elem.naturalHeight) / 2;
    //        this.setAttribute('style', 'margin-top:' + newMarginTop + 'px !important');
    //    }
    //}



    //function PositionedPhoto(elem) {
    //    $(elem.id).css("margin-top", "0");
    //    var height = elem.naturalHeight <= elem.height ? elem.naturalHeight : elem.height;
    //    var accHeight = $(".img_container").height();
    //    if (height < accHeight) {
    //        var newMarginTop = (accHeight - height) / 2;
    //        var oldStyle = elem.style.cssText;
    //        elem.setAttribute('style', oldStyle + ';margin-top:' + newMarginTop + 'px !important');
    //    } 
    //}

    //$(".carousel-indicators li").on("click", function () {
    //    PositionedPhoto(this);
    //})

    //$(".imgCarouselBtn").on("load", function () {
    //    PositionedPhoto(this);
    //})
    
    $('#imgupload').on("click", function (event, elem) {
        uploader.config.OutputImg = elem;
        uploaderSmall.config.OutputImg = elem;
    });
    
    $(".imgCarouselBtn").on("click", function () {
        $('#imgupload').trigger('click', $(this).attr('id')); 
    });

    //function ResizePhoto() {
    //    if ($('#dInfo').css('float') == 'left') {
    //        var size = $('#dInfo').height() - 2 * ($('#lblPhoto').height());
    //        $(".img_container").css("cssText", "height: " + size + "px !important;");
    //    }
    //    else {
    //        var size = $('#dInfo').height() - 2 * ($('#lblPhoto').height());
    //        $(".img_container").css("cssText", "height: 228px !important;");
    //    }
    //    PositionedPhoto(document.getElementById('imgCarousel1'));
    //    PositionedPhoto(document.getElementById('imgCarousel2'));
    //    PositionedPhoto(document.getElementById('imgCarousel3'));
    //}

    //$(function () {
    //    ResizePhoto();
    //});

    //$(window).resize(function () {
    //    ResizePhoto();
    //});

})();