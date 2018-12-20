
//using redux thunk the returned function has dispatch and getState
export const fetchCurrentWeatherData = () => {
	return (dispatch) => {
		fetch('https://jsonplaceholde.typicode.com/users')
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