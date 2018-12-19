import React from 'react';

class Clock extends React.Component {

	clockLocal() {
		let dateNow = new Date();
		//console.log(dateNow);

		let suffix;

		let dayOfMonth = dateNow.getDate();
		let year = dateNow.getFullYear();
		let hour = dateNow.getHours();
		let minute = dateNow.getMinutes();
		let second = dateNow.getSeconds();

		let monthArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		let month = monthArray[dateNow.getMonth()];
		let todayArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
		let today = todayArray[dateNow.getDay()];


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

		let date = today + ', ' + month + ' ' + dayOfMonth + ', ' + year;
		let time = hour + ':' + minute + ':' + second + ' '+ suffix;

		document.getElementById('date').innerHTML = date;
		document.getElementById('time').innerHTML = time;

		//console.log(today + ', ' + month + ' ' + dayOfMonth + ', ' + year);
		//console.log(hour + ':' + minute + ':' + second + ' '+ suffix);
	}

	render() {
		setInterval(this.clockLocal, 1000);
		return(

			<div className="dateTime">
				<div id="time" className="dateTime">

				</div>
				<div id="date" className="dateTime">

				</div>
			</div>

		);
	}
}

export default Clock;