/*
localStorage can fail if the user provacy mode does not allow the use of localStorage
thus if catch an error return undefined so the reducers can initialize the state instead
also return undefined if localStorage is null
*/

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if(serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	}
	catch(err) {
		return undefined;
	}
};

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	}
	catch(err) {
		console.log(err);
	}

};