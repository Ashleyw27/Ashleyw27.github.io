$(document).ready(function() {
var currentDay = $(".current-weather");
currentDay.attr("class", "remove");

var forecast = $(".forecast");
forecast.attr("class", "remove");

var futureDay = $(".future");
futureDay.attr("class", "remove");

var rightNow = $(".right-now");
rightNow.attr("class", "remove");



$("#search-btn").on("click", function(event) {
    event.preventDefault();

    currentDay.attr("class", "current-weather");
    forecast.attr("class", "forecast");
    futureDay.attr("class", "future");
    rightNow.attr("class", "right-now");

    var city = $("#city-input").val().trim();
    if (city === "") {
      alert("Please enter a city and state. Ex: minneapolis,mn.");
      currentDay.attr("class", "remove");
      forecast.attr("class", "remove");
      futureDay.attr("class", "remove");
      rightNow.attr("class", "remove");

    }

    //Forecast, current, and UV index - AerisWeather API//
    var queryURLfor = "https://api.aerisapi.com/forecasts/closest?&limit=6&p=" + city + "&client_id=68k8fqLVknO7EC2KJGe8G&client_secret=6JibjlamIuHUguCmY4XHTjC7q1gyt1BOEaBnjtNi";
    var queryURLnow = "https://api.aerisapi.com/observations/closest?&filter=allstations,interp,hasprecip&limit=1&p=" + city + "&client_id=68k8fqLVknO7EC2KJGe8G&client_secret=6JibjlamIuHUguCmY4XHTjC7q1gyt1BOEaBnjtNi";
    var queryURLuv = "https://api.aerisapi.com/forecasts/closest?filter=1hr&from=now&fields=periods.uvi&limit=1&p=" + city + "&client_id=68k8fqLVknO7EC2KJGe8G&client_secret=6JibjlamIuHUguCmY4XHTjC7q1gyt1BOEaBnjtNi";

    $.ajax({
        url: queryURLnow,
        method: "GET"
      }).then(function(response) {
        console.log(queryURLnow);
        console.log(response);
        $(".city-weather").text(response.response[0].place.city + " (" + moment().format('L') + ")");
        var icon = response.response[0].ob.icon;
        $(".weather-icon").attr("src", "assets/images/" + icon);
        $(".temp").text("Tempurature: " + response.response[0].ob.tempF + "\xB0F");
        $(".humid").text("Humidity: " + response.response[0].ob.humidity + "%");
        $(".wind-speed").text("Wind Speed: " + response.response[0].ob.windSpeedMPH + " MPH");

      });

      $.ajax({
        url: queryURLfor,
        method: "GET"
      }).then(function(response) {
        console.log(queryURLfor);
        console.log(response);
        //Forecast Days//
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

      $.ajax({
        url: queryURLuv,
        method: "GET"
      }).then(function(response) {
        console.log(queryURLuv);
        console.log(response);
        $(".uvi").text("UV index: " + response.response[0].periods[0].uvi);

      });
});

});