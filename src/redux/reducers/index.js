import { combineReducers } from 'redux';

const initialState = {
	currentWeatherData: [],
	loaded: true
}

const currentWeatherData = (currentWeatherData = initialState.currentWeatherData, action) => {
	switch(action.type) {
		case 'FETCH_CURRENTWEATHERDATA':
			console.log(action.payload.result);
			return action.payload.result;
		default:
			return currentWeatherData;
	}
};

const loaded = (loaded = initialState.loaded, action) => {
	switch(action.type) {
		case 'FETCH_ERROR':
			console.log(action.payload.error);
			return action.payload.loaded;
		default:
			return loaded;
	}
};

export default combineReducers({
	currentWeatherData: currentWeatherData,
	loaded: loaded
});