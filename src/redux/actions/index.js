import throttle from 'lodash/throttle';
/*30min throttle
define the throttled fetch outside the action creator otherwise
everytime the action creator gets called it will retrun a new throttle function
and throttle will not work as intended
*/
const fetchWeather = throttle((dispatch, lat, lng) => {
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=dfc30b68dd8ff6cb50db4fccc515107a`)
			.then(res => res.json())
			.then(
				(result) => {
					dispatch({
						type: 'FETCH_CURRENTWEATHERDATA',
						payload: {
							result: result,
							loaded: true
						}
					});
				},
				(error) => {
					dispatch({
						type: 'FETCH_ERROR',
						payload: {
							error: error,
							loaded: false
						}
					});
				}
			)
},1800000);

/*
export const fetchCurrentWeatherData = (lat,lng) => dispatch => fetchWeather(dispatch, lat,lng);
'https://jsonplaceholder.typicode.com/users'

action creator returns a function with dispatch which then returns the outer fetchWeather function
with dispatch and the arguments (thunk can now execute this throttled function properly).

Alt short hand syntax above as well as a test json placeholder endpoint
see https://gist.github.com/krstffr/245fe83885b597aabaf06348220c2fe9
*/
export const fetchCurrentWeatherData = (lat,lng) => {
	return (dispatch) => {
		return fetchWeather(dispatch, lat,lng);
	}
};

export const switchBackgrounds = (folder) => {
	return {
		type: 'SWITCH_BACKGROUNDS',
		payload: folder
	};
};

export const changeDelay = (delay) => {
	return {
		type: 'CHANGE_DELAY',
		payload: delay
	};
};


