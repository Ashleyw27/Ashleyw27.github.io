$(document).ready(function() {

//Global variables//
var currentHour = moment().hour();
console.log(currentHour);




//Current Date//
var newDate = moment().format('LL');
console.log(newDate);
$("#currentDay").html(newDate);



//Saving tasks by clicking the save button//
// $("body").on("click", "button", function(event) {
//     event.preventDefault();

//     var task = $("textarea").val();
//     localStorage.setItem("task", JSON.stringify(task));
    
//     setTask();
// });

// function setTask() {
//     var task = JSON.parse(localStorage.getItem("task"));
//     $("textarea").html(task);
  
// }



//Time slots changing color based on current time//
if (9 === currentHour) {
      $(".9").attr("class", "present");
  }
else if (9 < currentHour) {
      $(".9").attr("class", "past");
  }
else {
      $(".9").attr("class", "future");
  }



if (10 === currentHour) {
    $(".10").attr("class", "present");
}
else if (10 < currentHour) {
    $(".10").attr("class", "past");
}
else {
    $(".10").attr("class", "future");
}



if (11 === currentHour) {
    $(".11").attr("class", "present");
}
else if (11 < currentHour) {
    $(".11").attr("class", "past");
}
else {
    $(".11").attr("class", "future");
}


if (12 === currentHour) {
    $(".12").attr("class", "present");
}
else if (12 < currentHour) {
    $(".12").attr("class", "past");
}
else {
    $(".12").attr("class", "future");
}


if (13 === currentHour) {
    $(".13").attr("class", "present");
}
else if (13 < currentHour) {
    $(".13").attr("class", "past");
}
else {
    $(".13").attr("class", "future");
}


if (14 === currentHour) {
    $(".14").attr("class", "present");
}
else if (14 < currentHour) {
    $(".14").attr("class", "past");
}
else {
    $(".14").attr("class", "future");
}


if (15 === currentHour) {
    $(".15").attr("class", "present");
}
else if (15 < currentHour) {
    $(".15").attr("class", "past");
}
else {
    $(".15").attr("class", "future");
}


if (16 === currentHour) {
    $(".16").attr("class", "present");
}
else if (16 < currentHour) {
    $(".16").attr("class", "past");
}
else {
    $(".16").attr("class", "future");
}


if (17 === currentHour) {
    $(".17").attr("class", "present");
}
else if (17 < currentHour) {
    $(".17").attr("class", "past");
}
else {
    $(".17").attr("class", "future");
}

});

