// Create page elements

for(var i = 0; i < 24; i++){
    var row = $("<div>")
        .addClass("row col time-block");

    var hour = $("<div>")
        .text(i)
        .addClass("hour col-1");

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
    console.log(currentHour)
}

setCurrentHour();