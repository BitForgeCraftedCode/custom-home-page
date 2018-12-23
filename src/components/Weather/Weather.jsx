import React from 'react';
import { connect } from 'react-redux';

import { fetchCurrentWeatherData } from '../../redux/actions';

class Weather extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			lat:null,
			lng:null,
			locationAvail: null
		}
	}

	componentDidMount() {
		this.geolocation();
	}

	geolocation() {
		if('geolocation' in navigator) {
			// console.log('geolocation available');
			this.setState({locationAvail: true});
			navigator.geolocation.getCurrentPosition((position) => {
  				let latLong = [position.coords.latitude, position.coords.longitude];
  				this.setState({lat: latLong[0]});
  				this.setState({lng: latLong[1]});
			});
		}
		else {
			// console.log('geolocation Not available');
			this.setState({locationAvail: false});
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
		const locationAvail      = this.state.locationAvail;
		const currentWeatherData = this.props.currentWeatherData;
		const loaded             = this.props.loaded;
		let weather              = [];

		// console.log(lat,lng);
		// console.log(currentWeatherData);
		// console.log(loaded);

		if(lat !== null && lng !== null && currentWeatherData.length !== 0) {
			weather = this.extractWeatherData(currentWeatherData);
		}

		//console.log(weather);
		//conditional rendering
		if(locationAvail === false) {
			return(
				<div className="weather">
					<p>Weather Widget:</p>
					<p>Sorry location is not available. Please turn on your GPS and
					allow location access.</p>
				</div>
			);
		}
		else if(loaded === false) {
			return(
				<div className="weather">
					<p>Weather Widget:</p>
					<p>Sorry an error has occurred. Please refresh the page
					and try back later.</p>
				</div>
			);
		}
		else if(locationAvail === true && lat !== null && lng !== null && weather.length === 0) {
			return(
				<div className="weather">
	 				<button
						className="weather__btn"
						onClick={()=>this.props.fetchCurrentWeatherData(lat, lng)}
					>
						Get Weather
					</button>
 				</div>
			);
		}
		else if(locationAvail === true && lat !== null && lng !== null && weather.length !== 0) {
			return(
				<div className="weather">
					<p>Current Conditions: {weather[0]}</p>
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
			);
		}
		else {
			return(
				<div className="weather">
					<p>Fetching location...</p>
				</div>
			);
		}
	}
}


const mapStateToProps = (state) => {
	return {
		currentWeatherData: state.currentWeatherData,
		loaded: state.loaded
	};
};
const mapDispatchToProps = {
	fetchCurrentWeatherData: fetchCurrentWeatherData
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);