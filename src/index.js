import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './redux/reducers';
import { loadState, saveState } from './modules/localStorage';
import throttle from 'lodash/throttle';

import './styles/main.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';

/*
 If you produced reducer with combineReducers,
 persistedState must be a plain object with the same shape as the keys passed to it.
*/
const persistedState = loadState();

const store = createStore(
	reducers,
	persistedState,
	applyMiddleware(thunk)
);

store.subscribe(throttle(() => {
	//console.log(store.getState());
	saveState({
		currentWeatherData: store.getState().currentWeatherData,
		background: store.getState().background,
		delay: store.getState().delay,
		quickLinks: store.getState().quickLinks
	});
}, 1000));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
