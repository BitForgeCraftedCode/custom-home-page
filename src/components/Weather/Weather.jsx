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

	formatDate(unix_timestamp) {
		// Create a new JavaScript Date object based on the timestamp
		// multiplied by 1000 so that the argument is in milliseconds, not seconds.
		const date = new Date(unix_timestamp*1000);

		let hour = date.getHours();
		let minute = date.getMinutes();
		let second = date.getSeconds();

		let suffix;
		//convert to 12 hr format
		if(hour === 0){
			hour = hour + 12;
			suffix = 'AM';
		}
		else if(hour >= 1 && hour <= 11){
			suffix = 'AM';
		}
		else if(hour === 12){
			suffix = 'PM';
		}
		else if(hour >= 13 && hour <= 23){
			hour = hour - 12;
			suffix = 'PM';
		}
		//format minute and second if less than 10
		if(minute < 10 ){
			minute = '0'+minute;
		}
		if(second < 10){
			second = '0'+second;
		}

		const time = hour + ':' + minute + ':' + second + ' '+ suffix;

		return time;
	}

	extractWeatherData(currentWeatherData) {
		const town = currentWeatherData.name;
		const weatherArray = currentWeatherData.weather;
		//time of weather data calculation
		const unix_timestamp1 = currentWeatherData.dt;
		const calcTime = this.formatDate(unix_timestamp1);

		//default Temp is Kelvin
		const tempF = Math.round((((currentWeatherData.main.temp - 273.15)*(9/5))+32)*100)/100;
		const humidity = currentWeatherData.main.humidity;
		const mbar = currentWeatherData.main.pressure;
		//convert meters per second to miles per hour
		const windSpeed = Math.round(((currentWeatherData.wind.speed*0.001*60*60)/1.60934)*100)/100;
		//convert meters to miles
		const visibility = Math.round(((currentWeatherData.visibility*0.001)/1.60934)*100)/100;
		//sunrise time
		const unix_timestamp2 = currentWeatherData.sys.sunrise;
		const sunrise = this.formatDate(unix_timestamp2);
		//sunset
		const unix_timestamp3 = currentWeatherData.sys.sunset;
		const sunset = this.formatDate(unix_timestamp3);

		const weather = [town,weatherArray,calcTime,tempF,humidity,mbar,windSpeed,visibility,sunrise,sunset];

		return weather ;

	}

	render() {
		const lat                = this.state.lat;
		const lng                = this.state.lng;
		const locationAvail      = this.state.locationAvail;
		const currentWeatherData = this.props.currentWeatherData;
		const loaded             = this.props.loaded;
		let weather              = [];
		let weatherIcons;

		// console.log(lat,lng);
		console.log(currentWeatherData);
		// console.log(loaded);

		if(lat !== null && lng !== null && currentWeatherData.length !== 0) {
			weather = this.extractWeatherData(currentWeatherData);
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
					{weatherIcons}
					<p>Time: {weather[2]}</p>
					<p>Tempature: {weather[3]} &deg;F</p>
					<p>Humidity: {weather[4]} %</p>
					<p>Pressure: {weather[5]} mbar</p>
					<p>Wind Speed: {weather[6]} miles/hr</p>
					<p>Visibility: {weather[7]} miles</p>
					<p>Sunrise: {weather[8]}</p>
					<p>Sunset: {weather[9]}</p>
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