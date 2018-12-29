import React from 'react';
import { connect } from 'react-redux';

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			date: '',
			time: '',
			temp: '',
			humidity: ''
		}
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.clockLocal(), 1000);
		this.getDate();
		const weather = this.props.currentWeatherData;
		if(weather.length !== 0) {
			this.setState({temp: weather[3]});
			this.setState({humidity: weather[4]});
		}
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	getDate() {
		let dateNow = new Date();

		let dayOfMonth = dateNow.getDate();
		let year = dateNow.getFullYear();

		let monthArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		let month = monthArray[dateNow.getMonth()];
		let todayArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
		let today = todayArray[dateNow.getDay()];

		let date = today + ', ' + month + ' ' + dayOfMonth + ', ' + year;

		this.setState({date: date});

		// console.log(today + ', ' + month + ' ' + dayOfMonth + ', ' + year);
	}

	clockLocal() {
		let dateNow = new Date();
		//console.log(dateNow);

		let suffix;

		let hour = dateNow.getHours();
		let minute = dateNow.getMinutes();
		let second = dateNow.getSeconds();

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

		let time = hour + ':' + minute + ':' + second + ' '+ suffix;

		this.setState({time: time});

		// console.log(hour + ':' + minute + ':' + second + ' '+ suffix);
	}

	render() {
		return(
			<div className="dateTime">
				<div id="time" className="dateTime">
					{this.state.time}
				</div>
				<div id="date" className="dateTime">
					{this.state.date}
					<p>Tempature: {this.state.temp} &deg;F</p>
					<p>Humidity: {this.state.humidity}%</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentWeatherData: state.currentWeatherData
	};
};

export default connect(mapStateToProps, null)(Clock);
