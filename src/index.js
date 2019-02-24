// Code React.js
import React from 'react';
import {render} from 'react-dom';
// Import Components
import Connexion from './components/Connexion';
import App from './components/App';
import notFound from './components/notFound';
// Router
import {BrowserRouter, Match, Miss} from 'react-router';
// Import CSS
import './style.css';

const Route = () => {
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern='/' component={Connexion} />
				<Match pattern='/pseudo/:pseudo' component={App} />
				<Miss component={notFound} />
			</div>
		</BrowserRouter>
	)
} 

render(
	<Route />,
	document.getElementById("root")
);
