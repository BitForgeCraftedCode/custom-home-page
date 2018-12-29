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

	render() {
		const lat                = this.state.lat;
		const lng                = this.state.lng;
		const locationAvail      = this.state.locationAvail;
		const weather            = this.props.currentWeatherData;
		const loaded             = this.props.loaded;
		let weatherIcons;

		// console.log(lat,lng);
		// console.log(weather);
		// console.log(loaded);

		if(lat !== null && lng !== null && weather.length !== 0) {
			weatherIcons = weather[1].map((data,index)=>{
				return(
					<div className="weather__icon-box" key={index}>
						<div className="weather__icon-desc">{data.description}</div>
						<div className="weather__icon">
							<img src={`https://openweathermap.org/img/w/${data.icon}.png`} alt='weather icon'/>
						</div>
					</div>
				);
			});
		}

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
					<p>Current Conditions: {`${weather[0]} ${weather[2][1]}`}</p>
					{weatherIcons}
					<p>Time: {weather[2][0]}</p>
					<p>Tempature: {weather[3]} &deg;F</p>
					<p>Humidity: {weather[4]}%</p>
					<p>Pressure: {weather[5]} mbar</p>
					<p>Wind Speed: {weather[6]} miles/hr</p>
					<p>Visibility: {weather[7]} miles</p>
					<p>Cloud Cover: {weather[8]}%</p>
					<p>Sunrise: {weather[9][0]}</p>
					<p>Sunset: {weather[10][0]}</p>
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