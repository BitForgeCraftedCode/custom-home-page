
//using redux thunk the returned function has dispatch and getState
export const fetchCurrentWeatherData = (lat, lng) => {
	return (dispatch) => {
		fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=dfc30b68dd8ff6cb50db4fccc515107a`)
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
						type: 'FETCH_CURRENTWEATHERDATA',
						payload: {
							error: error,
							loaded: false
						}
					});
				}
			)
	};
};