var apiKey = ''
// var apiWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey
// var apiGeocode = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey

$('#searchBtn').on('click', function() {
    // stores the user search query in the variable 'cityName'
    var cityName = $('#searchBox').val();
    // concatenates the API call, the cityName variable, and the apiKey variable in the apiGeocode variable
    var apiGeocode = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
    // fetch request for the lat and lon of the user's requested city
    fetch(apiGeocode).then(function(res) {
        // console.log($(this).get();
        console.log(res.json());
    


    }) .then(function(data) {
        console.log(data);


    }) 
})

// test
// https://api.openweathermap.org/geo/1.0/direct?q=london&limit=1&appid=44b7a2530fc38f6834d04bd0e3d9e4b6
