import React from 'react';
import throttle from 'lodash/throttle';
import { connect } from 'react-redux';

import { fetchCurrentWeatherData } from '../../redux/actions';

class Weather extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			lat:null,
			lng:null
		}
	}

	geolocation() {
		if('geolocation' in navigator) {
			console.log('geolocation available');
			navigator.geolocation.getCurrentPosition((position) => {
  				let latLong = [position.coords.latitude, position.coords.longitude];
  				this.setState({lat: latLong[0]});
  				this.setState({lng: latLong[1]});
			});
		}
		else {
			console.log('geolocation Not available');
		}
	}

	render() {
		this.geolocation();
		let lat = this.state.lat;
		let lng = this.state.lng;
		console.log(lat,lng);
		return(

			<div className="weather">Weather Widget
				<button
					//only allow an weather api call once every 30 min
					onClick={
						throttle(() => {
							this.props.fetchCurrentWeatherData(lat,lng);
						}, 1800000)
					}
				>
					Fetch weather
				</button>
			</div>
		);
	}
}

const mapDispatchToProps = {
	fetchCurrentWeatherData: fetchCurrentWeatherData
};

export default connect(null, mapDispatchToProps)(Weather);



// dfc30b68dd8ff6cb50db4fccc515107a

// http://api.openweathermap.org/data/2.5/weather?lat=40.951797899999995&lon=-74.1533448&APPID=dfc30b68dd8ff6cb50db4fccc515107a


// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=dfc30b68dd8ff6cb50db4fccc515107a



