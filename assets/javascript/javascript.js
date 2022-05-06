// Create save data variable
var currSaveData = [];
for(var i = 0; i < 24; i++){
    currSaveData.push("");
}

// Get data from local storage
var storageData = JSON.parse(localStorage.getItem("hourlyTasks"));

// If storage data exists, write it to currSaveData for use on page
if(storageData){
    currSaveData = storageData;
}

console.log(currSaveData);

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
        .attr("id", "input")
        .attr("data-id", i)
        .val(currSaveData[i]);

    var saveButton = $("<button>")
        .addClass("btn saveBtn col-1")
        .text("save")
        .attr("data-id", i);

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

function saveInput(saveId){
    var saveString = $("textarea[data-id='" + saveId + "']").val();

    currSaveData[saveId] = saveString;
    localStorage.setItem("hourlyTasks", JSON.stringify(currSaveData));
}

$("textarea").on("blur", function(event){
    var textAreaId = $(this).attr("data-id");

    console.log(event.relatedTarget);

    if(event.relatedTarget){
        if(event.relatedTarget.dataset.id === $("button[data-id='" + textAreaId + "']").attr("data-id")){
            saveInput(textAreaId);
        } else {
            $(this).val(currSaveData[textAreaId]);
        }   
    } else {
        $(this).val(currSaveData[textAreaId]);
    }
});

setCurrentHour();