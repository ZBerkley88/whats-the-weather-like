var apiKey = '44b7a2530fc38f6834d04bd0e3d9e4b6';

// var apiWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey
// var apiGeocode = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey

$('#searchBtn').on('click', function() {
    // stores the user search query in the variable 'cityName'
    var cityName = $('#searchBox').val();
    // concatenates the API call, the cityName variable, and the apiKey variable into the apiGeocode variable
    var apiGeocode = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
    // fetch request for the lat and lon of the user's requested city
    fetch(apiGeocode)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json()
        
        // logs relevant data to console
        .then(function (data) {
            console.log(data);
            console.log(data[0].lat);
            console.log(data[0].lon);

            // concatenates the API call, the lon and lat variables, and the apiKey variable into the apiWeather variable
            var lat = data[0].lat;
            var lon = data[0].lon;
            var apiWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&cnt=5&units=imperial&appid=' + apiKey;
        
        // fetch request for weather data of the user's requested city
        fetch(apiWeather)
            .then(function(response) {
                if (response.ok) {
                    console.log(response);
                    response.json()
                            
            .then(function (data) {
                console.log(data);
                var city = 'City: ' + data.city.name;
                var temp = 'Average temperature: ' + data.list[0].main.temp + '°F';
                var wind = 'Wind speed: ' + data.list[0].wind.speed + ' mph';
                var humidity = 'Humidity: ' + data.list[0].main.humidity + '%';
                console.log(city);
                console.log(temp);
                console.log(wind);
                console.log(humidity);


                var items = [];
                $.each(data, function() {
                    items.push("<article>" + temp + wind  + humidity + "</article>");

                });
                
                $("<article/>", {
                    "class": "my-new-list",
                    html: items.join ("")
                }).appendTo("body");
           
                   
                        })
                    }
                })
            })
        }
    })
})
  




// .catch()
// handle the error 




// test
// https://api.openweathermap.org/geo/1.0/direct?q=london&limit=1&appid=44b7a2530fc38f6834d04bd0e3d9e4b6
