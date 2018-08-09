
$('#isAdmin').change(function () {
    var table = $('#offerListTable').DataTable();
    if ($(this).is(':checked')) {
        table.column(5).visible(true);
    } else {
        table.column(5).visible(false);
    }
});

// функция для добавления ведущих 0 перед числомб например 005 вместо 5
//function pad(number, length) {
//    var str = '' + number;
//    while (str.length < length) {
//        str = '0' + str;
//    }
//    return str;
//}

// Общий телефонный номер для всех покупок
//var varPhoneNumber = "";

// Таймер для подсчета оставшегося до конца торгов времени
//function setTimer(finishTime, elemId) {
//    //var my_timer = document.getElementById("my_timer");
//   // var time = my_timer.innerHTML;
//    finishTime = finishTime + ":00";
//    var arr = finishTime.split(":");
//    var h = arr[0];
//    var m = arr[1];
//    var s = arr[2];

//    function instance()
//    {
//    if (s == 0) {
//        if (m == 0) {
//            if (h == 0) {
//                return "Торги оконченны!";
//            }
//            h--;
//            m = 60;
//            if (h < 10) h = "0" + h;
//        }
//        m--;
//        if (m < 10) m = "0" + m;
//        s = 59;
//    }
//    else s--;
//    if (s < 10) s = "0" + s;
//    $("#" + elemId).text(h + ":" + m + ":" + s);
//    }
//    setTimeout(instance(), 1000);
//}

// Поле с ценой, которое обновляется
function getFieldPrice(id)
{
    var status = "ok";
    var field;
    if ($('#mainCollapse' + id).parents('tr').children('td').length > 0 &&
        $('#mainCollapse' + id).parents('tr').children('td')[3].children.length > 0)
        field = $('#mainCollapse' + id).parents('tr').children('td')[3].children[0];
    else status = "error";
    return { field: field, status: status};
}

// Поле статуса, которое обновляется
//function getFieldStatus(id, lastPrice, statusName, statusId, PossibleFinishTime) {
//    elem = $($('#mainCollapse' + id).parents('tr').children('td')[4]);
//    if (document.contains($('#mainCollapse' + id).parents('tr').children('td')[4].children[0]))
//        $('#mainCollapse' + id).parents('tr').children('td')[4].children[0].remove();

//    if (statusId == 3) {
//        //("<span>" + statusName + " до " + PossibleFinishTime + "</span>");
//        var a = new Date(); 
//        var b = moment(PossibleFinishTime, "DD.MM.YYYY HH:mm");// new Date(PossibleFinishTime);
//        var d = a > b ? msToTime(a - b) : msToTime(b - a);

//        elem.append('<span id="popBtn' + id + '" rel="popover" style="color:red" data-original-title="Окончание" data-content="' + PossibleFinishTime + '">' + statusName + ' ' + d + '</span>');
//    }
//    if (statusId == 2) {
//        elem.append(
//            '<span id="popBtn' + id + '" rel="popover" style="color:green" data-original-title="Куплю дешевле" data-content="' + lastPrice + '">' + statusName + '</span>');
//    }
//    if (statusId == 3 || statusId == 2)
//    {
//        var $popover = $("#popBtn" + id).popover({
//            trigger: "hover"
//        }).click(function (e) {
//            e.preventDefault();
//        });
//    }

//    if (statusId == 1)
//        elem.append("<span>" + statusName + "</span>");
//}

// Обновить
//function refreshPrice(guid) {
//    $.ajax({
//        type: 'POST',
//        url: 'api/offerslist/PostRefresh',
//        data: JSON.stringify(guid),
//        contentType: "application/json",
//        success: function (data) {
//            var obj = jQuery.parseJSON(data)
//            getFieldPrice(guid).innerText = obj.CurrentPrice
//        },
//        error: function () {
//        }
//    });
//}

// Развернуть/Свернуть
function Click(elem) {
    var id = elem.id.replace("mainCollapse", "");
    if (jQuery(elem).hasClass('glyphicon-menu-down')) {
        jQuery(elem).removeClass('glyphicon-menu-down');
        jQuery(elem).addClass('glyphicon-menu-up');
        $(elem).parents('tr').after('<tr/>').next().append('<td class="additionalInfo" id = "mainCollapseDetail' + id + '" colspan="6"/>').children('td').append(GetAdditionalDatafromServer(id));
        CallQueryForDetails(id);
    } else {
        jQuery(elem).removeClass('glyphicon-menu-up');
        jQuery(elem).addClass('glyphicon-menu-down');
        $("#mainCollapseDetail" + id).remove();
    }
}

// Назначить цену (пока непонятно что делать)
//function ClickBuy(elem) {
    //var id = elem.id.replace("btnBuy", "");
    //var currPrice = getFieldPrice(id).innerText;
    //var sendObj = {
    //    guid: id,
    //    phone: $('#inpPhone' + id).val(),
    //    offerPrice: $('#inpPrice' + id).val(),
    //    currentPrice: currPrice
    //}
    //$.ajax({
    //    type: 'POST',
    //    url: 'api/offerslist/PostBid',
    //    data: JSON.stringify(sendObj),
    //    contentType: "application/json",
    //    success: function (data) {
    //        var obj = jQuery.parseJSON(data);
    //        getFieldPrice(id).innerText = obj.CurrentPrice;
    //        getFieldStatus(id, obj.lastPrice, obj.statusName, obj.statusId, obj.PossibleFinishTime);
    //    },
    //    error: function () {
    //    }
    //});
//}


// Показать телефон продавца
function ClickShowPhone(elem) {
    var id = elem.id.replace("btnShowPhone_", "");
    $.ajax({
        type: 'POST',
        url: 'api/offerslist/PostGetPhone',
        data: JSON.stringify(id),
        contentType: "application/json",
        success: function (data) {
            var obj = jQuery.parseJSON(data);
            var elemName = "#divShowPhone_" + id;
            $("#" + elem.id).remove();
            $(elemName).append(`<span>` + obj.phone + `</span>`);
        },
        error: function () {
        }
    });
}

// Запрос на Развернуть/Свернуть
function CallQueryForDetails(id) {
    $.ajax({
        type: 'POST',
        url: 'api/offerslist/PostDetail',
        data: JSON.stringify(id),
        contentType: "application/json",
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            $('#img' + id).attr("src", obj.smallPhoto1);
            $('#pre' + id).text(obj.text);
        },
        error: function () {
        }
    });
}

// Открытие диалога с фото
function openPhotoDialog(id) {
    $.ajax({
        type: 'POST',
        url: 'api/offerslist/PostBigPhoto',
        data: JSON.stringify(id),
        contentType: "application/json",
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            if (obj.bigPhoto1 != "") $('#imgCarousel1').attr("src", obj.bigPhoto1);
            if (obj.bigPhoto1 != "") $('#imgCarousel2').attr("src", obj.bigPhoto2);
            if (obj.bigPhoto1 != "") $('#imgCarousel3').attr("src", obj.bigPhoto3);
            if (obj.bigPhoto1 != "") $('#imgCarousel4').attr("src", obj.bigPhoto4);
            $('.carousel').carousel(0);
            $('#photoModal').modal('show'); 
        },
        error: function () {
        }
    });
}

// Запоминаем телефон пользователя, чтобы автоматически его подставлять в другие объявления
//function phoneChange(event, elem) {
//    varPhoneNumber = $(elem).val();
//    $('input[id^="inpPhone"]').each(function (el) {
//        if (elem.id != this.id) $(this).val(varPhoneNumber);
//    });
//};

// Отображение дополнительной информации с сервера
function GetAdditionalDatafromServer(id) {
    var inputPrice = getFieldPrice(id).field.innerText;
    return `<div style='display:inline-block; min-height:60px'> 
                   <img class="pull-left img-thumbnail img-responsive" onclick="openPhotoDialog('` + id + `')" data-target="#photoModal" style="margin-right: 5px; cursor:pointer" id="img` + id + `"/>
                   <span style='display:table' id="pre` + id + `"></span>
                </div>`;
                //<div class="input-group">
                //    <span class="input-group-addon" id="basic-addon1">Куплю за:</span>
                //    <input id='inpPrice` + id + `' type="text" value='` + inputPrice + `' class="form-control" aria-describedby="basic-addon1">
                //    <span class="input-group-addon" id="basic-addon1">Ваш телефон:</span>
                //    <input id='inpPhone` + id + `' type="text" class="form-control" aria-describedby="basic-addon1" oninput = 'phoneChange(event, this)' value='` + varPhoneNumber + `'>
                //    <span class="input-group-btn">
                //        <button id='btnBuy` + id + `' onclick='ClickBuy(this)' class="btn btn-default outline" type="button">Отправить заявку!</button>
                //    </span>
                //</div>
                //`;
}

(function () {
    var obj = [];

    // Инициализация дополнительных параметров
    $('#offerListTable')
        .on('init.dt', function () {
            setTimeout(AutoCallQueryForDetails(), 1000);
        });

    //$('#offerListTable')
    //    .on('init.dt', function () {
    //        obj.forEach(function (el, index, array) {
    //            getFieldStatus(el.UniqueGuid, el.lastPrice, el.statusName, el.statusId, el.PossibleFinishTime);
    //        });

    //        if (obj.length > 0)
    //        {
    //         //   AutoCallQueryForDetails();
    //        }
    //    });

    $(document).ready(function () {
        //https: //datatables.net/manual/styling/bootstrap
        $('#offerListTable').DataTable({
            width: "100%",
            language: {
                "processing": "Подождите...",
                "search": "Поиск в найденном:",
                "lengthMenu": "Показать _MENU_ записей",
                "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
                "infoEmpty": "Записи с 0 до 0 из 0 записей",
                "infoFiltered": "(отфильтровано из _MAX_ записей)",
                "infoPostFix": "",
                "loadingRecords": "Загрузка записей...",
                "zeroRecords": "Записи отсутствуют.",
                "emptyTable": "В таблице отсутствуют данные",
                "paginate": {
                    "first": "Первая",
                    "previous": "Предыдущая",
                    "next": "Следующая",
                    "last": "Последняя"
                }
            },
            aria: {
                "sortAscending": ": активировать для сортировки столбца по возрастанию",
                "sortDescending": ": активировать для сортировки столбца по убыванию"
            },
            destroy: true,
            //"processing": true,
            //"serverSide": true,
            "ajax": "api/offerslist",
            "type": "GET",
            "order": [[3, "desc"]],
            "columnDefs": [
                { "type": 'any-number', targets: 3 }
            ],
            "columns": [
                {
                    "data": null,
                    //rowNum
                    render: function (data, type, row) {
                        return "<span class='glyphicon glyphicon-menu-down' id = 'mainCollapse" + row.uniqueGuid + "' onclick='Click(this)'></span>"
                    }
                    //"defaultContent": "<span id = 'mainCollapse1' >V</span>"
                    , "targets": 'no-sort'
                    , "orderable": false
                },
                { "data": "advName" },
                { "data": "address" },
                {
                    "data": "currentPrice"
                    , render: function (data, type, row) {
                        //if (row.statusId == 3)
                        //    return "<span>" + row.currentPrice + `</span>&nbsp;
                        //            <span class="btn btn-default btn-xs pull-right glyphicon glyphicon-refresh" onclick='refreshPrice("` + row.uniqueGuid + `")' aria-hidden="true"></span>
                        //            `;
                        //else
                        return '<div style="width:100%;text-align:right"> <span>' + row.currentPrice + '</span></div>';
                    }
                    , "width": "85px"
                },
                {
                    "data": null//"statusName"
                    , render: function (data, type, row) {
                        // obj.push({ "UniqueGuid": row.uniqueGuid, "lastPrice": row.lastPrice, "statusName": row.statusName, "statusId": row.statusId, "PossibleFinishTime": row.PossibleFinishTime });
                        return `<div id='divShowPhone_` + row.uniqueGuid + `' style="width:100%; text-align:center"><button id='btnShowPhone_` + row.uniqueGuid + `' onclick='ClickShowPhone(this)' class="btnShowPhone btn btn-xs btn-default outline" type="button">Показать телефон!</button></div>`;
                    }
                },
                {
                    "data": null
                    , render: function (data, type, row) {
                        var glifconI = initStatusGlif(row);
                        var res = SetStatusText(row);
                        SetPopover(row.uniqueGuid);
                        return `<div style="width:100%;text-align:left">
                            <span id="popBtn_` + row.uniqueGuid + `" rel="popover" data-original-title="Информация" data-content="` + res.textInfo + `">` + glifconI + `</span>
                            <span id="spanInfo_` + row.uniqueGuid + `">` + res.textStatus + `</span>`;
                    }
                }
            ]
        });
    });

    // При сортировке и фильтрах вызывается эта функция,чтобы корректно схлопывались строки во время сортировки
    $("#offerListTable").DataTable().on('draw', function () {
        $('span[id^="mainCollapse"]').each(function (el) {
            if ($(this).hasClass('glyphicon-menu-up')) {
                $(this).removeClass('glyphicon-menu-up');
                $(this).addClass('glyphicon-menu-down');
            }
        });
        $('td[id^=mainCollapseDetail]').each(function (el) {
            $(this).remove();
        });
    });
})();