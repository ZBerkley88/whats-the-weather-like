var searchHistory = [];
var apiKey = '44b7a2530fc38f6834d04bd0e3d9e4b6';

var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('#forecast');
var historyContainer = document.querySelector('#history');

$('#searchBtn').on('click', function() {

    // stores the user search query in the variable 'cityName'
    var cityName = $('#searchBox').val();

    fetchGeocode(cityName);

    document.getElementById('weather-blocks').style.display = 'block';
})


// function to retrieve the latitude and longitude for the user's requested city
var fetchGeocode = function(cityName) {

    // concatenates the API call, the cityName variable, and the apiKey variable into the apiGeocode variable
    var apiGeocode = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
    
    // fetch request for the lat and lon of the user's requested city
    fetch(apiGeocode)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json()
        
        .then(function (data) {
            console.log(data);
            fetchWeatherData(data);

        })

        .catch((error) => console.error('Fetch Error:', error));
        
        }
    })
}


// function to retrieve the weather data for the user's requested city
var fetchWeatherData = function(data) {

    // concatenates the API call, the lon and lat variables, and the apiKey variable into the apiWeather variable
    var lat = data[0].lat;
    var lon = data[0].lon;
    var apiWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&cnt=6&units=imperial&appid=' + apiKey;

    // fetch request for weather data of the user's requested city
    fetch(apiWeather)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json()

        .then(function (data) {
            console.log(data);

            //save city name to search history
            printTodaysData(data);
            printForecastData(data);

            // save search information to array
            var previousSearch = {}
            previousSearch["city"] = data.city.name;
            previousSearch["fetch"] = apiWeather;
            searchHistory.push(previousSearch);

            // save search information to local storage
            // NOTE: couldn't get this to work
            // localStorage.setItem('city', data.city.name);
            // localStorage.setItem('fetch', apiWeather);
            
            previousSearches(data);

            
            })
        }
    })
}

var printTodaysData = function(data) {

    forecastContainer.innerHTML = '';

    var city = data.city.name;
    var temp = 'Average temperature: ' +  Math.round(data.list[0].main.temp) + '°F';
    var wind = 'Wind speed: ' + Math.round(data.list[0].wind.speed) + ' mph';
    var humidity = 'Humidity: ' + data.list[0].main.humidity + '%';
    var date = moment().format('ddd, MMM Do');
    var iconUrl = 'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png';
    var iconDescription = data.list[0].weather[0].description

    var col = document.createElement('div');
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var cardTitle = document.createElement('h5');
    var weatherIcon = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    col.append(card);
    card.append(cardBody);
    cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

    col.setAttribute('class', 'col-12');
    col.classList.add('five-day-card');
    card.setAttribute('class', 'card bg-primary h-100 text-white');
    cardBody.setAttribute('class', 'card-body p-2');
    cardTitle.setAttribute('class', 'card-title');
    tempEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', iconDescription);

    // Add content to elements
    cardTitle.textContent = date;
    tempEl.textContent = temp;
    windEl.textContent = wind;
    humidityEl.textContent = humidity;

    forecastContainer.append(col);

}

            
var printForecastData = function(data) {

    // Create elements for a card
    for (var i = 1; i <= 5; i++) {

        var temp = 'Average temperature: ' + Math.round(data.list[i].main.temp) + '°F';
        var wind = 'Wind speed: ' + Math.round(data.list[i].wind.speed) + ' mph';
        var humidity = 'Humidity: ' + data.list[i].main.humidity + '%';
        var date = moment().add(i, 'days').format('ddd, MMM Do');
        var iconUrl = 'https://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png';
        var iconDescription = data.list[i].weather[0].description

        var col = document.createElement('div');
        var card = document.createElement('div');
        var cardBody = document.createElement('div');
        var cardTitle = document.createElement('h5');
        var weatherIcon = document.createElement('img');
        var tempEl = document.createElement('p');
        var windEl = document.createElement('p');
        var humidityEl = document.createElement('p');
        col.append(card);
        card.append(cardBody);
        cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

        col.setAttribute('class', 'col-md');
        col.classList.add('five-day-card');
        card.setAttribute('class', 'card bg-primary h-100 text-white');
        cardBody.setAttribute('class', 'card-body p-2');
        cardTitle.setAttribute('class', 'card-title');
        tempEl.setAttribute('class', 'card-text');
        windEl.setAttribute('class', 'card-text');
        humidityEl.setAttribute('class', 'card-text');
        weatherIcon.setAttribute('src', iconUrl);
        weatherIcon.setAttribute('alt', iconDescription);
        
        // Add content to elements
        cardTitle.textContent = date;
        tempEl.textContent = temp;
        windEl.textContent = wind;
        humidityEl.textContent = humidity;

        forecastContainer.append(col);


    }
}


var previousSearches = function(data) {

    

    for (var i = 0; i <= searchHistory.length; i++) {

        var historyList = document.createElement('li');
        var historyBtn = document.createElement('button');
        // var cardBody = document.createElement('div');
        // var cityNameEl = document.createElement('button');
        historyList.append(historyBtn);
        // card.append(cardBody);
        // cardBody.append(cityNameEl);

        // historyBtn.setAttribute('class', 'col-sm');
        // card.setAttribute('class', 'card bg-primary h-100 text-white');
        // cardBody.setAttribute('class', 'card-body p-2');
        // cityNameEl.setAttribute('class', 'card-text');

        historyBtn.textContent = searchHistory[i].city;

        historyContainer.append(historyBtn);


    }
}

