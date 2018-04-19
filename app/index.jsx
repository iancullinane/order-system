
 
/**
 * @module app
 */


/*
	Vendor Imports
*/
// import $ from 'jquery';
// import jQuery from 'jquery';
import _ from 'underscore';
import React    from 'react';
import ReactDOM from 'react-dom';

import PestoApp from 'main'


var DEBUG = true;
const loadedStates = ['complete', 'loaded', 'interactive'];

/*
	Set up window for DOM manipulation and bootstrap
	TODO possibly remove completely, use templates and native DOM calls
*/


/*
	Wait until the page is ready
*/
if (loadedStates.includes(document.readyState) && document.body) {
	launch(window.location.pathname);
} else {
  window.addEventListener('DOMContentLoaded', determinePath, false);
}

/**
 * Load your route specific JS when needed
 */
function determinePath() {
	var routes_map = {
		'/':		 		() => { launch(urlTokens) },
		'/dist':		 		() => { launch(urlTokens) },
	}
	
	let urlTokens = window.location.pathname.match(/[^\/]+/g);		
	console.log(`Url Tokens: ${urlTokens}`);

	urlTokens !== null 
		? routes_map["/" + urlTokens[0]]() 
		: routes_map["/"]();
}

/**
 * Initiate the charts with data.
 * @name launch
 */

function launch(urlTokens){
	ReactDOM.render(
		<PestoApp urlTokens={urlTokens} />, document.getElementById('root')
	);
}
