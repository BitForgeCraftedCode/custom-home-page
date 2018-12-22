import React from 'react';
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
	componentDidMount() {
		this.geolocation();
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

	extractWeatherData(currentWeatherData) {
		const town = currentWeatherData.name;
		//default Temp is Kelvin
		const tempF = Math.round((((currentWeatherData.main.temp - 273.15)*(9/5))+32)*100)/100;
		const humidity = currentWeatherData.main.humidity;
		const mbar = currentWeatherData.main.pressure;
		//convert meters per second to miles per hour
		const windSpeed = Math.round(((currentWeatherData.wind.speed*0.001*60*60)/1.60934)*100)/100;
		//convert meters to miles
		const visibility = Math.round(((currentWeatherData.visibility*0.001)/1.60934)*100)/100;


		// console.log('current conditions for: ', town);
		// console.log(tempF,'degF');
		// console.log('humidity',humidity, '%');
		// console.log(mbar, 'mbar');
		// console.log('windSpeed',windSpeed, 'miles/hr');
		// console.log('visibility',visibility, 'miles');

		// console.log(currentWeatherData.rain['1h']);
		// console.log(currentWeatherData.snow);
		const weather = [town,tempF,humidity,mbar,windSpeed,visibility];

		return weather ;

	}

	render() {
		const lat                = this.state.lat;
		const lng                = this.state.lng;
		const currentWeatherData = this.props.currentWeatherData;
		let weather              = [];

		console.log(lat,lng);
		console.log(currentWeatherData);

		if(lat !== null && lng !== null && currentWeatherData.length !== 0 ) {
			weather = this.extractWeatherData(currentWeatherData);
		}

		console.log(weather);
		return(
			<div className="weather">
				{(weather.length === 0) ? (
						<div>
							<button
								className="weather__btn"
								onClick={()=>this.props.fetchCurrentWeatherData(lat, lng)}
							>
								Get Weather
							</button>
						</div>

					):(
						<div>
							<p>Current Conditions for: {weather[0]}</p>
							<p>Tempature: {weather[1]} &deg;F</p>
							<p>Humidity: {weather[2]} %</p>
							<p>Pressure: {weather[3]} mbar</p>
							<p>Wind Speed: {weather[4]} miles/hr</p>
							<p>Visibility: {weather[5]} miles</p>
							<button
								className="weather__btn"
								onClick={()=>this.props.fetchCurrentWeatherData(lat, lng)}
							>
								Update Weather
							</button>
						</div>
					)
				}
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		currentWeatherData: state.currentWeatherData,
	};
};
const mapDispatchToProps = {
	fetchCurrentWeatherData: fetchCurrentWeatherData
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);