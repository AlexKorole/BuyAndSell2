// Настройка всплывающего окна с подсказкой
function SetPopover(uniqueGuid) {
    var $popover = $("#popBtn_" + uniqueGuid).popover({
        trigger: "hover"
    }).click(function (e) {
        e.preventDefault();
    });
}

// init Status glif
function initStatusGlif(row) {
    var glifDown = `<i id="iStatusGlifDown_` + row.uniqueGuid + `" style='display:` + (row.priceBehavior != "MaxToMin" ? "none" : "inline") + `' class="glyphicon glyphicon-circle-arrow-down"></i>`;
    var glifUp = `<i id="iStatusGlifUp_` + row.uniqueGuid + `" style='display:` + (row.priceBehavior != "MinToMax" ? "none" : "inline") + `' class="glyphicon glyphicon-circle-arrow-up"></i>`;
    var glifRnd = `<i id="iStatusGlifRnd_` + row.uniqueGuid + `" style='display:` + (row.priceBehavior != "Random" ? "none" : "inline") + `' class="glyphicon glyphicon-exclamation-sign"></i>`;
    var glifThumbsUp = `<i id="iStatusGlifThumbsUp_` + row.uniqueGuid + `" style='display:` + (row.priceBehavior != "FixedMax" || row.priceBehavior != "FixedMin" ? "none" : "inline") + `' class="glyphicon glyphicon-thumbs-up"></i>`;
    var glifconI = glifDown + glifUp + glifRnd + glifThumbsUp;
    return glifconI;
}

// Заполнение поля Статус
function SetStatusText(row) {
    var resObj;
    switch (row.priceBehavior) {
        case "MaxToMin":
            resObj = MaxToMin(row);
            break;
        case "MinToMax":
            resObj = MinToMax(row);
            break;
        case "Random":
            resObj = Random(row);
            break;
        default:
            resObj = StatusDefault(row);
            break;
    }
    return resObj;
}

// Status default
function StatusDefault(row) {
    var textStatus = "Окончательная цена";
    var textInfo = "Цена дальше меняется";
    if (!$("#iStatusGlifDown_" + row.uniqueGuid)) return { textInfo: textInfo, textStatus: textStatus };
    $("#iStatusGlifDown_" + row.uniqueGuid).hide();
    $("#iStatusGlifUp_" + row.uniqueGuid).hide();
    $("#iStatusGlifRnd_" + row.uniqueGuid).hide();
    $("#iStatusGlifThumbsUp_" + row.uniqueGuid).show();
    return { textInfo: textInfo, textStatus: textStatus };
}

// MaxToMin
function MaxToMin(row) {
    var stepDown = row.stepDown;
    var periodDuration = row.periodDuration;

    var textInfo = "Цена уменьшается на " + stepDown + " руб. в " + periodDuration + " " + (row.perTimeDown.length > 4 ? (row.perTimeDown.substring(0, 3) + ". ") : row.perTimeDown);
    var textStatus = stepDown + ` руб. в ` + periodDuration + ` ` + (row.perTimeDown.length > 4 ? (row.perTimeDown.substring(0, 3) + ".") : row.perTimeDown);
    var resObj = { textInfo: textInfo, textStatus: textStatus };

    if (row.currentPrice == row.minPrice) {
        resObj = StatusDefault(row);
    } else {
        if (!$("#iStatusGlifDown_" + row.uniqueGuid)) return { textInfo: textInfo, textStatus: textStatus };
        $("#iStatusGlifDown_" + row.uniqueGuid).show();
        $("#iStatusGlifThumbsUp_" + row.uniqueGuid).hide();
    }
    return resObj;
}

// MinToMax
function MinToMax(row) {
    var stepDown = row.stepDown;
    var periodDuration = row.periodDuration;

    var textInfo = "Цена увеличивается на " + stepDown + " руб. в " + periodDuration + " " + (row.perTimeDown.length > 4 ? (row.perTimeDown.substring(0, 3) + ". ") : row.perTimeDown);
    var textStatus = stepDown + ` руб. в ` + periodDuration + ` ` + (row.perTimeDown.length > 4 ? (row.perTimeDown.substring(0, 3) + ".") : row.perTimeDown);
    var resObj = { textInfo: textInfo, textStatus: textStatus };
    if (row.currentPrice == row.startPrice) {
        resObj = StatusDefault(row);
    } else {
        if (!$("#iStatusGlifDown_" + row.uniqueGuid)) return { textInfo: textInfo, textStatus: textStatus };
        $("#iStatusGlifUp_" + row.uniqueGuid).show();
        $("#iStatusGlifThumbsUp_" + row.uniqueGuid).hide();
    }
    return resObj;
}

// Random
function Random(row) {
    var stepDown = row.stepDown;
    var periodDuration = row.periodDuration;

    var textInfo = "Cлучайная цена от " + row.minPrice + " до " + row.startPrice;
    var textStatus = `случайно, раз в ` + periodDuration + ` ` + (row.perTimeDown.length > 4 ? (row.perTimeDown.substring(0, 3) + ".") : row.perTimeDown);
    var resObj = { textInfo: textInfo, textStatus: textStatus };
    //if (row.currentPrice == row.startPrice) {
    //    resObj = StatusDefault(row);
    //} else
    {
        if (!$("#iStatusGlifDown_" + row.uniqueGuid)) return { textInfo: textInfo, textStatus: textStatus };
        $("#iStatusGlifRnd_" + row.uniqueGuid).show();
        $("#iStatusGlifThumbsUp_" + row.uniqueGuid).hide();
    }
    return resObj;
}