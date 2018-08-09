(function () {

    // Отключить Enter на submit
    $('#mainForm').on('keyup keypress', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });

    var $sentAlert = $("#sentAlert");
    $sentAlert.on("close.bs.alert", function () {
        $sentAlert.hide();
        return false;
    });

    function hideMsg() {
        //$sentAlert.fadeTo(500, 500).slideUp(500, function () {
        //    $sentAlert.slideUp(500);
        //});
        $sentAlert.hide();
    }

    $("#drpDownAllAdvts").ready(function () {
        $.ajax({
            type: 'GET',
            url: 'api/seller',
            contentType: "application/json",
            success: function (data) {
                var obj = jQuery.parseJSON(data)
                var dropdown = $("#drpDownAllAdvts");
                dropdown.append($("<option />").val("").text(""));
                var i = 1;
                $.each(obj, function () {
                    dropdown.append($("<option />").val(this.toString()).text(i.toString() + " " + this.toString()));
                    i++;
                });
            },
            error: function () {
            }
        });
    })

    $("#btnLoadItem").click(function () {
        if ($("#inputFIeldLoadItem").val() == "" && $("#drpDownAllAdvts option:selected").val() == "")
            return;
        var guid = $("#inputFIeldLoadItem").val() == "" ? $("#drpDownAllAdvts option:selected").val() : $("#inputFIeldLoadItem").val();
        $.ajax({
            type: 'GET',
            url: 'api/seller/' + guid,
            contentType: "application/json",
            success: function (data) {
                var obj = jQuery.parseJSON(data)
                $("[name='inpSAddress']").val(obj.address);
                $("[name='inpSFullAddress']").val(obj.address);
                $("[name='sCategory']").val(obj.category);
                $("[name='inpSAdvertName']").val(obj.advName);
                $("[name='taSAdvertName']").val(obj.advName);
                $("[name='taSText']").val(obj.text);
                $("[name='inpSPhone']").val(obj.phone);
                $("[name='inpUserName']").val(obj.userName);
                $("[name='inpStartPrice']").val(obj.startPrice);
                $("[name='inpMinPrice']").val(obj.minPrice);
                $("[name='inpStepDown']").val(obj.stepDown);
                $("[name='selDurationPerTimeDown']").val(obj.periodDuration);
                $("[name='selPerTimeDown']").val(obj.perTimeDown);
                $("[name='inSHidGuid']").val(obj.uniqueGuid);

                if (obj.bigPhoto1 != "") $('#imgCarousel1').attr("src", obj.bigPhoto1);
                if (obj.bigPhoto2 != "") $('#imgCarousel2').attr("src", obj.bigPhoto2);
                if (obj.bigPhoto3 != "") $('#imgCarousel3').attr("src", obj.bigPhoto3);
                if (obj.bigPhoto4 != "") $('#imgCarousel4').attr("src", obj.bigPhoto4);

                if (obj.sellerPhoto1_H != "0") $('#imgCarousel1').attr("heigh", obj.sellerPhoto1_H);
                if (obj.sellerPhoto1_W != "0") $('#imgCarousel1').attr("width", obj.sellerPhoto1_W);

                if (obj.sellerPhoto2_H != "0") $('#imgCarousel2').attr("heigh", obj.sellerPhoto2_H);
                if (obj.sellerPhoto2_W != "0") $('#imgCarousel2').attr("width", obj.sellerPhoto2_W);

                if (obj.sellerPhoto3_H != "0")  $('#imgCarousel3').attr("heigh", obj.sellerPhoto3_H);
                if (obj.sellerPhoto3_W != "0") $('#imgCarousel3').attr("width", obj.sellerPhoto3_W);

                if (obj.sellerPhoto4_H != "0")  $('#imgCarousel4').attr("heigh", obj.sellerPhoto4_H);
                if (obj.sellerPhoto4_W != "0") $('#imgCarousel4').attr("width", obj.sellerPhoto4_W);
                
                if (obj.sellerPhoto1_H != "0") $("[name='imgCarousel1_Seller_H']").val(obj.sellerPhoto1_H);
                if (obj.sellerPhoto1_W != "0") $("[name='imgCarousel1_Seller_W']").val(obj.sellerPhoto1_W);

                if (obj.sellerPhoto2_H != "0") $("[name='imgCarousel2_Seller_H']").val(obj.sellerPhoto2_H);
                if (obj.sellerPhoto2_W != "0") $("[name='imgCarousel2_Seller_W']").val(obj.sellerPhoto2_W);

                if (obj.sellerPhoto3_H != "0") $("[name='imgCarousel3_Seller_H']").val(obj.sellerPhoto3_H);
                if (obj.sellerPhoto3_W != "0") $("[name='imgCarousel3_Seller_W']").val(obj.sellerPhoto3_W);

                if (obj.sellerPhoto4_H != "0") $("[name='imgCarousel4_Seller_H']").val(obj.sellerPhoto4_H);
                if (obj.sellerPhoto4_W != "0") $("[name='imgCarousel4_Seller_W']").val(obj.sellerPhoto4_W);
              
                $("[name='imgCarousel1_Form']").val(obj.bigPhoto1);
                $("[name='imgCarousel2_Form']").val(obj.bigPhoto2);
                $("[name='imgCarousel3_Form']").val(obj.bigPhoto3);
                $("[name='imgCarousel4_Form']").val(obj.bigPhoto4);

                $("[name='imgCarousel1_Small']").val(obj.smallPhoto1);
                $("[name='imgCarousel2_Small']").val(obj.smallPhoto2);
                $("[name='imgCarousel3_Small']").val(obj.smallPhoto3);
                $("[name='imgCarousel4_Small']").val(obj.smallPhoto4);
                $("[name='priceBehavior']").val(obj.priceBehavior);

                SetCreateEditLabels($('#inSHidGuid').val());
            },
            error: function () {
            }
        });
    })
         
    $("#mainForm").submit(function () {
        var s = "sds";
        $.ajax({
            type: 'POST',
            url: 'api/seller',
            data: $('#mainForm').serialize(),
            //beforeSend: function () {
            //    //alert('Fetching....');
            //},
            success: function (guid) {
                $('#inSHidGuid').val(guid);
                $sentAlert.removeClass('alert-danger');
                $sentAlert.addClass('alert-success');
                $('#pMsg').text('Данные успешно отправленны на сервер!')
                $sentAlert.show();
                SetCreateEditLabels(guid);
                setTimeout(hideMsg,1000);
            },
            error: function () {
                $sentAlert.removeClass('alert-success');
                $sentAlert.addClass(' alert-danger');
                $('#pMsg').text('Error')
                $sentAlert.show();
            }//,
            //complete: function () {
            //    $('#pMsg').text('Complete')
            //    $sentAlert.show();
            //}
        });
        
        return false;
    });

    function SetCreateEditLabels(guid) {
        if (guid) {
            $('#sendBtn').html('Сохранить изменения');
            $('#lblHeader').text("Объявление № '" + guid);
            $('#lblHeaderXS').text(guid);
            $("#drpDownAllAdvts option[value='" + guid + "']").prop('selected', true);
        } else {
            $('#sendBtn').html('Создать объявление');
            $('#lblHeader').text("Новое объявлление!");
            $('#lblHeaderXS').text("Новое объявлление!");
        }
    }

})();



