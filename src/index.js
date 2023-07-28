import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from './redux/departmentSlice';
import flickrReducer from './redux/flickrSlice';
import menuReducer from './redux/menuSlice';

const store = configureStore({
	reducer: {
		department: departmentReducer,
		flickr: flickrReducer,
		menu: menuReducer,
	},
});

ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
	document.getElementById('root')
);
