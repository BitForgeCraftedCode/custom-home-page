

export const formatDate = (unix_timestamp) => {
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	const date = new Date(unix_timestamp*1000);

	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();
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
		minute = '0' + minute;
	}
	if(second < 10){
		second = '0' + second;
	}

	const time = hour + ':' + minute + ':' + second + ' '+ suffix;
	const monthDayYear = `${month+1}/${day}/${year}`;

	return [time,monthDayYear];
};