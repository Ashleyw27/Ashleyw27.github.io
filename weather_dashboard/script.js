$(document).ready(function() {

//Global variables//
var currentDay = $(".current-weather");
currentDay.attr("class", "remove");

var forecast = $(".forecast");
forecast.attr("class", "remove");

var futureDay = $(".future");
futureDay.attr("class", "remove");

var rightNow = $(".right-now");
rightNow.attr("class", "remove");

var cities = [];
console.log(cities);

//Getting cities from local storage//
if (localStorage.getItem("place")) {
  var cities = JSON.parse(localStorage.getItem("place")); 
}
else {
 cities = []
}


//Render Cities function adds the search history buttons to the page//
function renderCities() {
  $(".city-list").empty();

  for (var i = 0; i < cities.length; i++) {

    var a = $("<button>");
    a.addClass("city-btn");
    a.attr("data-name", cities[i]);
    a.text(cities[i]);
    $(".city-list").append(a);
  }

}



//When the "search" button is clicked the weather data for the city input appends to the page//
$("#search-btn").on("click", function(event) {
    event.preventDefault();

    currentDay.attr("class", "current-weather");
    forecast.attr("class", "forecast");
    futureDay.attr("class", "future");
    rightNow.attr("class", "right-now");

    //If the city input is empty the user will be prompted to add a city//
    var city = $("#city-input").val().trim();
    if (city === "") {
      alert("Please enter a city and state. Ex: minneapolis,mn.");
      currentDay.attr("class", "remove");
      forecast.attr("class", "remove");
      futureDay.attr("class", "remove");
      rightNow.attr("class", "remove");

    }
  
    //Pushing the city names to an empty array//
    cities.push(city);
    
    //Saving the city names to local storage//
    localStorage.setItem("place", JSON.stringify(cities));
    console.log(cities);
    
    //calling the render cities function//
    renderCities();
 

    //Forecast, current, and UV index - AerisWeather API//
    var queryURLfor = "https://api.aerisapi.com/forecasts/closest?&limit=6&p=" + city + "&client_id=68k8fqLVknO7EC2KJGe8G&client_secret=6JibjlamIuHUguCmY4XHTjC7q1gyt1BOEaBnjtNi";
    var queryURLnow = "https://api.aerisapi.com/observations/closest?&filter=allstations,interp,hasprecip&limit=1&query=temp:!NULL,rh:!NULL,wind:!NULL,winddir:!NULL&p=" + city + "&client_id=68k8fqLVknO7EC2KJGe8G&client_secret=6JibjlamIuHUguCmY4XHTjC7q1gyt1BOEaBnjtNi";
    var queryURLuv = "https://api.aerisapi.com/forecasts/closest?filter=1hr&from=now&fields=periods.uvi&limit=1&p=" + city + "&client_id=68k8fqLVknO7EC2KJGe8G&client_secret=6JibjlamIuHUguCmY4XHTjC7q1gyt1BOEaBnjtNi";
    var queryURLname = "https://api.aerisapi.com/places/closest?&p=" + city + "&client_id=68k8fqLVknO7EC2KJGe8G&client_secret=6JibjlamIuHUguCmY4XHTjC7q1gyt1BOEaBnjtNi";

    //Calling the city name//
    $.ajax({
      url: queryURLname,
      method: "GET"
    }).then(function(response) {
      console.log(queryURLnow);
      console.log(response);
        $(".city-weather").text(response.response[0].place.name + " (" + moment().format('L') + ")");
      });

      //Calling the current weather observations//
      $.ajax({
        url: queryURLnow,
        method: "GET"
      }).then(function(response) {
        console.log(queryURLnow);
        console.log(response);
        var icon = response.response[0].ob.icon;
        $(".weather-icon").attr("src", "assets/images/" + icon);
        $(".temp").text("Tempurature: " + response.response[0].ob.tempF + "\xB0F");
        $(".humid").text("Humidity: " + response.response[0].ob.humidity + "%");
        $(".wind-speed").text("Wind Speed: " + response.response[0].ob.windSpeedMPH + " MPH");
      });

      //Calling the 5-day forecast weather observations//
      $.ajax({
        url: queryURLfor,
        method: "GET"
      }).then(function(response) {
        console.log(queryURLfor);
        console.log(response);

        //5-day Forecast Days//
        $(".day-one").text(moment().add(1, 'days').format('L'));
        $(".day-two").text(moment().add(2, 'days').format('L'));
        $(".day-three").text(moment().add(3, 'days').format('L'));
        $(".day-four").text(moment().add(4, 'days').format('L'));
        $(".day-five").text(moment().add(5, 'days').format('L'));

        //Weather icon images//
        var iconOne = response.response[0].periods[1].icon;
        $(".icon-one").attr("src", "assets/images/" + iconOne);

        var iconTwo = response.response[0].periods[2].icon;
        $(".icon-two").attr("src", "assets/images/" + iconTwo);

        var iconThree = response.response[0].periods[3].icon;
        $(".icon-three").attr("src", "assets/images/" + iconThree);

        var iconFour = response.response[0].periods[4].icon;
        $(".icon-four").attr("src", "assets/images/" + iconFour);

        var iconFive = response.response[0].periods[5].icon;
        $(".icon-five").attr("src", "assets/images/" + iconFive);

        
        //Max/Min tempurature per day//
        $(".temp-one").text("Tempurature:");
        $(".temp-max-one").text("Max: " + response.response[0].periods[1].maxTempF + "\xB0F");
        $(".temp-min-one").text("Min: " + response.response[0].periods[1].minTempF + "\xB0F");

        $(".temp-two").text("Tempurature:");
        $(".temp-max-two").text("Max: " + response.response[0].periods[2].maxTempF + "\xB0F");
        $(".temp-min-two").text("Min: " + response.response[0].periods[2].minTempF + "\xB0F");

        $(".temp-three").text("Tempurature:");
        $(".temp-max-three").text("Max: " + response.response[0].periods[3].maxTempF + "\xB0F");
        $(".temp-min-three").text("Min: " + response.response[0].periods[3].minTempF + "\xB0F");

        $(".temp-four").text("Tempurature:");
        $(".temp-max-four").text("Max: " + response.response[0].periods[4].maxTempF + "\xB0F");
        $(".temp-min-four").text("Min: " + response.response[0].periods[4].minTempF + "\xB0F");

        $(".temp-five").text("Tempurature:")
        $(".temp-max-five").text("Max: " + response.response[0].periods[5].maxTempF + "\xB0F");
        $(".temp-min-five").text("Min: " + response.response[0].periods[5].minTempF + "\xB0F");

        //Humidity per day//
        $(".humid-one").text("Humidity: " + response.response[0].periods[1].humidity + "%");
        $(".humid-two").text("Humidity: " + response.response[0].periods[2].humidity + "%");
        $(".humid-three").text("Humidity: " + response.response[0].periods[3].humidity + "%");
        $(".humid-four").text("Humidity: " + response.response[0].periods[4].humidity + "%");
        $(".humid-five").text("Humidity: " + response.response[0].periods[5].humidity + "%");

      });

      //Calling the current Weather UV index//
      $.ajax({
        url: queryURLuv,
        method: "GET"
      }).then(function(response) {
        console.log(queryURLuv);
        console.log(response);
        $(".uvi").text("UV index: " + response.response[0].periods[0].uvi);

      });
    });
   
  



    function displayCityInfo(){

    //Forecast, current, and UV index - AerisWeather API//
    var city = $(this).attr("data-name");
        console.log($(this).attr("data-name"));
        console.log($(this));

    //Changing div class from "remove" to their original classes to display on page//
    currentDay.attr("class", "current-weather");
    forecast.attr("class", "forecast");
    futureDay.attr("class", "future");
    rightNow.attr("class", "right-now");
    
    var queryURLfor = "https://api.aerisapi.com/forecasts/closest?&limit=6&p=" + city + "&client_id=68k8fqLVknO7EC2KJGe8G&client_secret=6JibjlamIuHUguCmY4XHTjC7q1gyt1BOEaBnjtNi";
    var queryURLnow = "https://api.aerisapi.com/observations/closest?&filter=allstations,interp,hasprecip&limit=1&query=temp:!NULL,rh:!NULL,wind:!NULL,winddir:!NULL&p=" + city + "&client_id=68k8fqLVknO7EC2KJGe8G&client_secret=6JibjlamIuHUguCmY4XHTjC7q1gyt1BOEaBnjtNi";
    var queryURLuv = "https://api.aerisapi.com/forecasts/closest?filter=1hr&from=now&fields=periods.uvi&limit=1&p=" + city + "&client_id=68k8fqLVknO7EC2KJGe8G&client_secret=6JibjlamIuHUguCmY4XHTjC7q1gyt1BOEaBnjtNi";
    var queryURLname = "https://api.aerisapi.com/places/closest?&p=" + city + "&client_id=68k8fqLVknO7EC2KJGe8G&client_secret=6JibjlamIuHUguCmY4XHTjC7q1gyt1BOEaBnjtNi";

    //Calling the city name//
    $.ajax({
      url: queryURLname,
      method: "GET"
    }).then(function(response) {
      console.log(queryURLnow);
      console.log(response);
        $(".city-weather").text(response.response[0].place.name + " (" + moment().format('L') + ")");
      });

    //Calling the current weather observations//
    $.ajax({
        url: queryURLnow,
        method: "GET"
      }).then(function(response) {
        console.log(queryURLnow);
        console.log(response);
        var icon = response.response[0].ob.icon;
        $(".weather-icon").attr("src", "assets/images/" + icon);
        $(".temp").text("Tempurature: " + response.response[0].ob.tempF + "\xB0F");
        $(".humid").text("Humidity: " + response.response[0].ob.humidity + "%");
        $(".wind-speed").text("Wind Speed: " + response.response[0].ob.windSpeedMPH + " MPH");
      });

      //Calling the 5-day forecast weather observations//
      $.ajax({
        url: queryURLfor,
        method: "GET"
      }).then(function(response) {
        console.log(queryURLfor);
        console.log(response);

        //5-day Forecast Days//
        $(".day-one").text(moment().add(1, 'days').format('L'));
        $(".day-two").text(moment().add(2, 'days').format('L'));
        $(".day-three").text(moment().add(3, 'days').format('L'));
        $(".day-four").text(moment().add(4, 'days').format('L'));
        $(".day-five").text(moment().add(5, 'days').format('L'));

        //Weather icon images//
        var iconOne = response.response[0].periods[1].icon;
        $(".icon-one").attr("src", "assets/images/" + iconOne);

        var iconTwo = response.response[0].periods[2].icon;
        $(".icon-two").attr("src", "assets/images/" + iconTwo);

        var iconThree = response.response[0].periods[3].icon;
        $(".icon-three").attr("src", "assets/images/" + iconThree);

        var iconFour = response.response[0].periods[4].icon;
        $(".icon-four").attr("src", "assets/images/" + iconFour);

        var iconFive = response.response[0].periods[5].icon;
        $(".icon-five").attr("src", "assets/images/" + iconFive);

        
        //Max/Min tempurature per day//
        $(".temp-one").text("Tempurature:");
        $(".temp-max-one").text("Max: " + response.response[0].periods[1].maxTempF + "\xB0F");
        $(".temp-min-one").text("Min: " + response.response[0].periods[1].minTempF + "\xB0F");

        $(".temp-two").text("Tempurature:");
        $(".temp-max-two").text("Max: " + response.response[0].periods[2].maxTempF + "\xB0F");
        $(".temp-min-two").text("Min: " + response.response[0].periods[2].minTempF + "\xB0F");

        $(".temp-three").text("Tempurature:");
        $(".temp-max-three").text("Max: " + response.response[0].periods[3].maxTempF + "\xB0F");
        $(".temp-min-three").text("Min: " + response.response[0].periods[3].minTempF + "\xB0F");

        $(".temp-four").text("Tempurature:");
        $(".temp-max-four").text("Max: " + response.response[0].periods[4].maxTempF + "\xB0F");
        $(".temp-min-four").text("Min: " + response.response[0].periods[4].minTempF + "\xB0F");

        $(".temp-five").text("Tempurature:")
        $(".temp-max-five").text("Max: " + response.response[0].periods[5].maxTempF + "\xB0F");
        $(".temp-min-five").text("Min: " + response.response[0].periods[5].minTempF + "\xB0F");

        //Humidity per day//
        $(".humid-one").text("Humidity: " + response.response[0].periods[1].humidity + "%");
        $(".humid-two").text("Humidity: " + response.response[0].periods[2].humidity + "%");
        $(".humid-three").text("Humidity: " + response.response[0].periods[3].humidity + "%");
        $(".humid-four").text("Humidity: " + response.response[0].periods[4].humidity + "%");
        $(".humid-five").text("Humidity: " + response.response[0].periods[5].humidity + "%");
      });

      //Calling current Weather UV index//
      $.ajax({
        url: queryURLuv,
        method: "GET"
      }).then(function(response) {
        console.log(queryURLuv);
        console.log(response);
        $(".uvi").text("UV index: " + response.response[0].periods[0].uvi);
      });
    }

   
    //Clicking on a previously searched city will then display the weather data for that city//
    $(document).on("click", ".city-btn", displayCityInfo);

    // Calling the renderButtons function to display the initial buttons
    renderCities();

});