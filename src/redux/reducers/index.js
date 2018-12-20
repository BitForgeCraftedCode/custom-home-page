import { combineReducers } from 'redux';

const initialState = {
	currentWeatherData: []
}

const currentWeatherData = (currentWeatherData = initialState.currentWeatherData, action) => {
	switch(action.type) {
		case 'FETCH_CURRENTWEATHERDATA':
			if(action.payload.loaded) {
				console.log(action.payload.result);
				return action.payload.result;
			}
			else {
				console.log(currentWeatherData);
				console.log(action.payload.error);
				return currentWeatherData;
			}
		default:
			return currentWeatherData;
	}
};

export default combineReducers({
	currentWeatherData: currentWeatherData
});