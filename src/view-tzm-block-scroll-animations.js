// WordPress dependencies
import domReady from '@wordpress/dom-ready';

// Internal dependencies
import Scrollage from './modules/scrollage.esm.js';

domReady( function () {
	window.scrollageInstance = new Scrollage();
} );
