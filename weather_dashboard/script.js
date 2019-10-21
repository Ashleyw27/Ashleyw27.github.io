$(document).ready(function() {



$("#search-btn").on("click", function(event) {
    event.preventDefault();

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

      });

      $.ajax({
        url: queryURLfor,
        method: "GET"
      }).then(function(response) {
        console.log(queryURLfor);
        console.log(response);

      });

      $.ajax({
        url: queryURLuv,
        method: "GET"
      }).then(function(response) {
        console.log(queryURLuv);
        console.log(response);

      });
});

});