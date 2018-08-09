// Автообновление
function AutoCallQueryForDetails() {
    var arrGuids = [];
    if ($('tbody>tr').length > 0) {
        $('tbody>tr').each(function (index) {
            if ($(this).find("span[id^='mainCollapse']").length > 0) {
                let id = $(this).find("span[id^='mainCollapse']")[0].id.replace("mainCollapse", "");
                arrGuids.push(id);
            }
        });
        if (arrGuids.length > 0) {
            //var res = JSON.stringify(arrGuids);
            $.ajax({
                type: 'POST',
                url: 'api/offerslist/PostUpdatePrices',
                data: JSON.stringify(arrGuids),
                contentType: "application/json",
                success: function (data) {
                    if (data && data != "null") {
                        var obj = jQuery.parseJSON(data)
                        obj.forEach(function (el, index, array) {
                            // заглушка для Random
                            if (el.currentPriceRnd != 0 && el.currentPriceRnd != el.currentPrice) {
                                el.currentPrice = el.currentPriceRnd;
                            }
                            //--------------------

                            if ($('#mainCollapse' + el.uniqueGuid)) {
                                var fieldPrice = getFieldPrice(el.uniqueGuid);
                                if (fieldPrice.status == "ok") {
                                    getFieldPrice(el.uniqueGuid).field.innerText = el.currentPrice;
                                    if (($("#iStatusGlifDown_" + el.uniqueGuid).is(":visible") && el.currentPrice == el.minPrice) ||
                                        ($("#iStatusGlifThumbsUp_" + el.uniqueGuid).is(":visible") && el.currentPrice != el.minPrice)) {
                                        var res = SetStatusText(el);
                                        $("#popBtn_" + el.uniqueGuid).attr("data-content", res.textInfo);
                                        $("#spanInfo_" + el.uniqueGuid).text(res.textStatus);
                                    }
                                }
                            }
                        })
                    }
                    setTimeout(AutoCallQueryForDetails, 1000);
                },
                error: function () {
                }
            });
        }
    }
}

//function AutoCallQueryForDetails() {
//    $.ajax({
//        type: 'GET',
//        url: 'api/offerslist',
//        contentType: "application/json",
//        success: function (data) {
//            var obj = jQuery.parseJSON(data)
//            obj.data.forEach(function (el, index, array) {
//                getFieldStatusAuto(el.UniqueGuid, el.lastPrice, el.statusName, el.statusId, el.PossibleFinishTime, el.CurrentPrice);
//            });
//            setTimeout(AutoCallQueryForDetails(), 1000);
//        },
//        error: function () {
//        }
//    });
//}

// Автообновление полей
//function getFieldStatusAuto(id, lastPrice, statusName, statusId, PossibleFinishTime, CurrentPrice) {
//    var elem = $('#popBtn' + id);
//    getFieldPrice(id).innerText = CurrentPrice;
//    if (statusId == 3) {
//        var a = new Date();
//        var b = moment(PossibleFinishTime, "DD.MM.YYYY HH:mm");
//        var d = a > b ? msToTime(a - b) : msToTime(b - a);
//        elem.text(statusName + ' ' + d);
//        elem.attr("data-content", PossibleFinishTime);
//        elem.css('color', 'red');
//    }

//    if (statusId == 2) {
//        elem.text(statusName);
//        elem.attr("data-content", lastPrice);
//        elem.css('color', 'green');
//    }

//    if (statusId == 1)
//    {
//        elem.text(statusName);
//    }
//}