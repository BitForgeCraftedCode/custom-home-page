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

	render() {
		const lat = this.state.lat;
		const lng = this.state.lng;
		const currentWeatherData = this.props.currentWeatherData;
		console.log(lat,lng);
		console.log(currentWeatherData);
		return(
			<div className="weather">Weather Widget
				<button
					className="weather__btn"
					onClick={()=>this.props.fetchCurrentWeatherData(lat, lng)}
				>
					Get Weather
				</button>
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
