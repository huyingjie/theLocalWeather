$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var weatherAPI = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
      var googleAPI = "https://maps.googleapis.com/maps/api/geocode/json?&latlng=" + latitude + "," + longitude;
      var freegeopip = "http://freegeoip.net/json/"
      //console.log("latitude: "+position.coords.latitude);
      console.log(weatherAPI);
      console.log(googleAPI);
      $.getJSON(weatherAPI, function(json){
        var windSpeed = json["wind"]["speed"];
        var windDegree = json["wind"]["deg"];
        var windDirection;
        if (windDegree >0 && windDegree <=90) windDirection = "NE";
        else if (windDegree > 90 && windDegree <= 180) windDirection = "SE";
        else if (windDegree > 180 && windDegree <= 270) windDirection = "SW";
        else windDirection = "NW";

        var temperature = json["main"]["temp"]
        var c = Math.round(temperature);
        var f = Math.round(temperature*9/5+32);
        $("#temperature-number").html(f);
        //$("#weatherIcon").html("<img src=" + json["weather"][0]["icon"] + ">");
        $("#temperature-f").click(function(){
          $("#temperature-number").html(f);
          $("#temperature-c").html("<a href='#'>¡ÆC</a>");
          $("#temperature-f").html("¡ÆF");
        });
        $("#temperature-c").click(function(){
          $("#temperature-number").html(c);
          $("#temperature-f").html("<a href='#'>¡ÆF</a>");
          $("#temperature-c").html("¡ÆC");
        });
        $("#weatherDescription").html(json["weather"][0]["description"].toUpperCase());
        $("#wind").html(windDirection + " "+ windSpeed + " knots");

        //console.log(json["weather"][0]["main"]);
        //console.log(json["wind"]["deg"]);

        switch(json["weather"][0]["main"].toLowerCase()){
          case "mist": $("body").css("background-image", 'url("img/mist.jpg")'); break;
          case "snow": $("body").css("background-image", 'url("img/snow.jpg")'); break;
          default: $("body").css("background-image", 'url("img/sunny.jpg")');
        }

      });

      $.getJSON(freegeoip, function(json){
        var city = json.city;
        var area = json.region_name;
        var country = json.country_code;
        for( var i = 0; i < addressInfo.length; i++){
          switch(addressInfo[i]["types"][0]){
            case "locality": city = addressInfo[i]["long_name"]; break;
            case "administrative_area_level_1": area = addressInfo[i]["long_name"]; break;
            case "country": country = addressInfo[i]["short_name"]; break;
            //case "postal_code": postalCode = addressInfo[i]["long_name"]; break;
          }
        }
        //console.log("city: "+city+" area: "+area+" country: "+country+" postal code: "+postalCode);
        $("#location").html(city + ", " + area + ", " + country);
      })

      // $.getJSON(googleAPI, function(json){
      //   //console.log(json.results[0]["address_components"]);
      //   var addressInfo = json.results[0]["address_components"];
      //   var city;
      //   var area;
      //   var country;
      //   //var postalCode;
      //   for( var i = 0; i < addressInfo.length; i++){
      //     switch(addressInfo[i]["types"][0]){
      //       case "locality": city = addressInfo[i]["long_name"]; break;
      //       case "administrative_area_level_1": area = addressInfo[i]["long_name"]; break;
      //       case "country": country = addressInfo[i]["short_name"]; break;
      //       //case "postal_code": postalCode = addressInfo[i]["long_name"]; break;
      //     }
      //   }
      //   //console.log("city: "+city+" area: "+area+" country: "+country+" postal code: "+postalCode);
      //   $("#location").html(city + ", " + area + ", " + country);
      // });
    });
  }
});
