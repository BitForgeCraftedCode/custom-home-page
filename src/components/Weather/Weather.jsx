import React from 'react';

class Weather extends React.Component {

	geolocation() {
		if('geolocation' in navigator) {
			console.log('geolocation available');
			navigator.geolocation.getCurrentPosition(function(position) {
  				console.log(position.coords.latitude, position.coords.longitude);
			});
		}
		else {
			console.log('geolocation Not available');
		}
	}
	render() {
		this.geolocation();
		return(
			<div>Weather Widget</div>
		);
	}
}

export default Weather;

// dfc30b68dd8ff6cb50db4fccc515107a

// http://api.openweathermap.org/data/2.5/weather?lat=40.951797899999995&lon=-74.1533448&APPID=dfc30b68dd8ff6cb50db4fccc515107a


// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=dfc30b68dd8ff6cb50db4fccc515107a



