// WordPress dependencies
import domReady from '@wordpress/dom-ready';

// Internal dependencies
import Scrollage from './modules/scrollage.esm.js';

domReady( function () {
    const settings = window.tzmScrollageSettings || {};
    const selector = settings.selector || '.scrollage';
    const options = settings.options || {};
    
    window.tzmScrollageInstance = new Scrollage(selector, options);
} );
