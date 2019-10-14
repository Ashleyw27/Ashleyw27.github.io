$(document).ready(function() {

// var task = $("textarea");
var d = new Date();
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


//Current Date//
var newDate = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
console.log(newDate);
$("#currentDay").html(newDate);


$("body").on("click", "button", function(event) {
    event.preventDefault();

});



});

