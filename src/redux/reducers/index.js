import { combineReducers } from 'redux';

import { formatDate } from '../../modules/formatDate';

const initialState = {
	currentWeatherData: [{ error: null, loaded: false, btnClicked: false, currentWeather: [] }],
	background: 'space',
	delay: 5,
	quickLinks: []
};

const currentWeatherData = (currentWeatherData = initialState.currentWeatherData, action) => {
	switch (action.type) {
		case 'FETCH_CURRENTWEATHERDATA':
			return [
				{
					error: null,
					loaded: action.payload.loaded,
					btnClicked: action.payload.btnClicked,
					currentWeather: currentWeatherData[0].currentWeather
				}
			];
		case 'FETCH_CURRENTWEATHERDATA_SUCCESS':
			console.log(action.payload.result);
			const weatherData = action.payload.result;
			//if api returns an error obj it will have a message (invalid api key or over api limit)
			if (!weatherData.message) {
				const town = weatherData.name;
				const weatherArray = weatherData.weather;
				//time of weather data calculation
				const unix_timestamp1 = weatherData.dt;
				const calcTime = formatDate(unix_timestamp1);
				//default Temp is Kelvin
				const tempF = Math.round(((weatherData.main.temp - 273.15) * (9 / 5) + 32) * 100) / 100;
				const humidity = weatherData.main.humidity;
				const mbar = weatherData.main.pressure;
				//convert meters per second to miles per hour
				const windSpeed = Math.round(((weatherData.wind.speed * 0.001 * 60 * 60) / 1.60934) * 100) / 100;
				//convert meters to miles
				const visibility = Math.round(((weatherData.visibility * 0.001) / 1.60934) * 100) / 100;
				//cloud cover %
				const clouds = weatherData.clouds.all;
				//sunrise time
				const unix_timestamp2 = weatherData.sys.sunrise;
				const sunrise = formatDate(unix_timestamp2);
				//sunset
				const unix_timestamp3 = weatherData.sys.sunset;
				const sunset = formatDate(unix_timestamp3);

				const weather = [
					town,
					weatherArray,
					calcTime,
					tempF,
					humidity,
					mbar,
					windSpeed,
					visibility,
					clouds,
					sunrise,
					sunset
				];
				//return weather Array
				return [
					{
						error: null,
						loaded: action.payload.loaded,
						btnClicked: action.payload.btnClicked,
						currentWeather: weather
					}
				];
			} else {
				//return error object
				return [
					{
						error: null,
						loaded: action.payload.loaded,
						btnClicked: action.payload.btnClicked,
						currentWeather: weatherData
					}
				];
			}
		case 'FETCH_ERROR':
			return [
				{
					error: action.payload.error,
					loaded: action.payload.loaded,
					btnClicked: action.payload.btnClicked,
					currentWeather: currentWeatherData[0].currentWeather
				}
			];
		default:
			return currentWeatherData;
	}
};

const background = (background = initialState.background, action) => {
	switch (action.type) {
		case 'SWITCH_BACKGROUNDS':
			return action.payload;
		default:
			return background;
	}
};

const delay = (delay = initialState.delay, action) => {
	switch (action.type) {
		case 'CHANGE_DELAY':
			return action.payload;
		default:
			return delay;
	}
};

const quickLinks = (quickLinks = initialState.quickLinks, action) => {
	switch (action.type) {
		case 'DISPLAY_QUICKLINKS':
			return action.payload;
		default:
			return quickLinks;
	}
};

export default combineReducers({
	currentWeatherData: currentWeatherData,
	background: background,
	delay: delay,
	quickLinks: quickLinks
});
