$(document).ready(function() {
    //Getting the text from local storage and adding it to the textarea//
    if (localStorage.getItem("9")) {
        var task =  JSON.parse(localStorage.getItem("9"));
        $("#nineAm").val(task);
        console.log(task);
     }
    
    if (localStorage.getItem("10")) {
        var task =  JSON.parse(localStorage.getItem("10"));
        $("#tenAm").val(task);
        console.log(task);
     }

     if (localStorage.getItem("11")) {
        var task =  JSON.parse(localStorage.getItem("11"));
        $("#elevenAm").val(task);
        console.log(task);
     }

     if (localStorage.getItem("12")) {
        var task =  JSON.parse(localStorage.getItem("12"));
        $("#twelvePm").val(task);
        console.log(task);
     }

     if (localStorage.getItem("1")) {
        var task =  JSON.parse(localStorage.getItem("1"));
        $("#onePm").val(task);
        console.log(task);
     }

     if (localStorage.getItem("2")) {
        var task =  JSON.parse(localStorage.getItem("2"));
        $("#twoPm").val(task);
        console.log(task);
     }

     if (localStorage.getItem("3")) {
        var task =  JSON.parse(localStorage.getItem("3"));
        $("#threePm").val(task);
        console.log(task);
     }

     if (localStorage.getItem("4")) {
        var task =  JSON.parse(localStorage.getItem("4"));
        $("#fourPm").val(task);
        console.log(task);
     }

     if (localStorage.getItem("5")) {
        var task =  JSON.parse(localStorage.getItem("5"));
        $("#fivePm").val(task);
        console.log(task);
     }


    //Global variables//
    var currentHour = moment().hour();
    console.log(currentHour);
    var clearScores = $(".clear");
    
    
    //Current Date//
    var newDate = moment().format('LL');
    $("#currentDay").html(newDate);
    
    
    //Set task for time block//
    $(".saveBtn").on("click", function(event) {
        event.preventDefault();   
        
        var task = $(this).prev().val();
        console.log($(this).prev());

        var hour = $(this).parent().attr("id");
        localStorage.setItem(hour, JSON.stringify(task));
        JSON.parse(localStorage.getItem(task));
    });
    
    
    
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

    //Clearing local storage and clearing schedule //
    $(".clear").on("click", function(event) {
        event.preventDefault();
        window.localStorage.clear();
        window.location.reload();
  });
    
    });

