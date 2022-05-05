// Create page elements
for(var i = 0; i < 24; i++){
    var row = $("<div>")
        .addClass("row time-block")
        .attr("id", i);

    var currentDate = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATE_FULL);
    var dateTitle = $(".current-date")
                    .text(currentDate);

    var currentHour = luxon.DateTime.fromObject({hour: i}).toLocaleString(luxon.DateTime.TIME_SIMPLE);

    var hour = $("<div>")
        .addClass("hour col-1")
        .text(currentHour);

    var input = $("<textarea>")
        .addClass("description col-10 past")
        .attr("id", "input");

    var saveButton = $("<button>")
        .addClass("btn saveBtn col-1")
        .text("save");

    row.append(hour, input, saveButton);
    $(".container").append(row);
}

function setCurrentHour(){
    var currentHour = luxon.DateTime.now().hour;
    
    var currTextAreaEl = $("#" + currentHour).children("textarea");
    currTextAreaEl.removeClass("past")
                    .addClass("present");

    for(var i = currentHour + 1; i < 24; i++){
        var row = $("#" + i);
        row.children("textarea").removeClass("past")
                                .addClass("future");
    }
}

setCurrentHour();