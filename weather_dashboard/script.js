$(document).ready(function() {
var currentDay = $(".current-weather");
currentDay.attr("class", "remove");

var forecast = $(".forecast");
forecast.attr("class", "remove");

var futureDay = $(".future");
futureDay.attr("class", "remove");



$("#search-btn").on("click", function(event) {
    event.preventDefault();

    currentDay.attr("class", "current-weather");
    forecast.attr("class", "forecast");
    futureDay.attr("class", "future");

    var city = $("#city-input").val().trim();

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
        $(".temp").text("Tempurature: " + response.response[0].ob.tempF + " \xB0F");
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

        //Icon placeholder//
        
        //High tempurature per day//
        $(".temp-one").text("Tempurature: " + response.response[0].periods[1].maxTempF + " \xB0F");
        $(".temp-two").text("Tempurature: " + response.response[0].periods[2].maxTempF + " \xB0F");
        $(".temp-three").text("Tempurature: " + response.response[0].periods[3].maxTempF + " \xB0F");
        $(".temp-four").text("Tempurature: " + response.response[0].periods[4].maxTempF + " \xB0F");
        $(".temp-five").text("Tempurature: " + response.response[0].periods[5].maxTempF + " \xB0F");

        //High humidity per day//
        $(".humid-one").text("Humidity: " + response.response[0].periods[1].maxHumidity + "%");
        $(".humid-two").text("Humidity: " + response.response[0].periods[2].maxHumidity + "%");
        $(".humid-three").text("Humidity: " + response.response[0].periods[3].maxHumidity + "%");
        $(".humid-four").text("Humidity: " + response.response[0].periods[4].maxHumidity + "%");
        $(".humid-five").text("Humidity: " + response.response[0].periods[5].maxHumidity + "%");


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