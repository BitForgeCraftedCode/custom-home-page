import React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import { fetchCurrentWeatherData } from '../../redux/actions';

class Weather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: null,
			lng: null,
			locationAvail: null
		};
	}

	componentDidMount() {
		this.geolocation();
	}

	geolocation() {
		if ('geolocation' in navigator) {
			//console.log('geolocation available');
			this.setState({ locationAvail: true });
			navigator.geolocation.getCurrentPosition(
				position => {
					let latLong = [position.coords.latitude, position.coords.longitude];
					this.setState({ lat: latLong[0] });
					this.setState({ lng: latLong[1] });
				},
				error => {
					//console.log(error);
					this.setState({ locationAvail: false });
				}
			);
		} else {
			//console.log('geolocation Not available');
			this.setState({ locationAvail: false });
		}
	}

	renderLocationError = () => {
		return (
			<div className="weather">
				<p>Weather Widget:</p>
				<br />
				<p>Sorry location is not available. Please turn on your GPS and allow location access.</p>
				<br />
				<p>
					If you previously denied access and would now like to see the weather conditions for your area.
					Follow the steps below:
				</p>
				<br />
				<p>Clear browser data, refresh the page, and click allow location access.</p>
				<br />
			</div>
		);
	};

	renderGettingLocation = () => {
		return (
			<div className="weather">
				<div className="weather__loader">
					<div>
						<p>Getting Location!</p>
						<Loader type="Puff" color="#00BFFF" height="100" width="100" />
					</div>
				</div>
			</div>
		);
	};

	renderError = (lat, lng) => {
		return (
			<div className="weather">
				<p>Weather Widget:</p>
				<p>Sorry an error has occurred. Please refresh the page and try back later.</p>
				<button className="weather__btn" onClick={() => this.props.fetchCurrentWeatherData(lat, lng)}>
					Get Weather
				</button>
			</div>
		);
	};

	renderInitial = (lat, lng) => {
		return (
			<div className="weather">
				<button className="weather__btn" onClick={() => this.props.fetchCurrentWeatherData(lat, lng)}>
					Get Weather
				</button>
			</div>
		);
	};

	renderGettingWeather = () => {
		return (
			<div className="weather">
				<div className="weather__loader">
					<div>
						<p>Getting Weather!</p>
						<Loader type="Puff" color="#00BFFF" height="100" width="100" />
					</div>
				</div>
			</div>
		);
	};

	buildWeatherIcons = weather => {
		let weatherIcons = weather[1].map((data, index) => {
			return (
				<div className="weather__icon-box" key={index}>
					<div className="weather__icon-desc">{data.description}</div>
					<div className="weather__icon">
						<img src={`https://openweathermap.org/img/w/${data.icon}.png`} alt="weather icon" />
					</div>
				</div>
			);
		});
		return weatherIcons;
	};

	render() {
		const lat = this.state.lat;
		const lng = this.state.lng;
		const locationAvail = this.state.locationAvail;
		const weather = this.props.currentWeatherData[0].currentWeather;
		const error = this.props.currentWeatherData[0].error;
		const loaded = this.props.currentWeatherData[0].loaded;
		const btnClicked = this.props.currentWeatherData[0].btnClicked;

		// console.log('locationAvail ',locationAvail);
		// console.log('lat long ', lat,lng);
		// console.log(weather);
		// console.log(error);

		//conditional rendering
		//display this if user denied access or location is not available
		if (locationAvail === false && lat === null && lng === null) {
			return this.renderLocationError();
		}
		//display this spinner while location is being fetched
		else if (locationAvail === true && lat === null && lng === null) {
			return this.renderGettingLocation();
		}
		//display this if an error occured
		//weather will be an object if the api returned an error obj
		else if (error || (typeof weather === 'object' && weather.constructor === Object)) {
			return this.renderError(lat, lng);
		}
		//initial state before btn click and no saved weather
		else if (loaded === false && btnClicked === false && weather.length === 0) {
			return this.renderInitial(lat, lng);
		}
		//display getting weather spinner
		else if (loaded === false && btnClicked === true) {
			return this.renderGettingWeather();
		}
		//display fetched or saved weather
		else if (loaded === true && btnClicked === false && weather.length !== 0) {
			return (
				<div className="weather">
					<p>Current Conditions: {`${weather[0]} ${weather[2][1]}`}</p>
					{this.buildWeatherIcons(weather)}
					<p>Time: {weather[2][0]}</p>
					<p>Tempature: {weather[3]} &deg;F</p>
					<p>Humidity: {weather[4]}%</p>
					<p>Pressure: {weather[5]} mbar</p>
					<p>Wind Speed: {weather[6]} miles/hr</p>
					<p>Visibility: {weather[7]} miles</p>
					<p>Cloud Cover: {weather[8]}%</p>
					<p>Sunrise: {weather[9][0]}</p>
					<p>Sunset: {weather[10][0]}</p>
					<button className="weather__btn" onClick={() => this.props.fetchCurrentWeatherData(lat, lng)}>
						Update Weather
					</button>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		currentWeatherData: state.currentWeatherData
	};
};
const mapDispatchToProps = {
	fetchCurrentWeatherData: fetchCurrentWeatherData
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Weather);
