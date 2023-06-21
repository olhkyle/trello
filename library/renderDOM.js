/* eslint-disable import/extensions */
import diff from './diff.js';
import eventCollection from './eventCollection.js';

let $root = null; // root container
let component = null; // component instance

/**
 * - Apply all Event Handlers based on Event Object which are saved on eventCollection array
 * - All Event Handlers are delegate registered on root container($root)
 * - But, if the 'selector' property's value is 'window', Event Handler would be applied on window
 * @type {($root: HTMLElement) => void}
 */
const bindEventHandler = $root => {
	for (const { type, selector, handler } of eventCollection) {
		(selector === 'window' ? window : $root).addEventListener(type, handler);
	}
};

const renderDOM = (Component, $container) => {
	if ($container) $root = $container;
	if (Component) {
		component = new Component({ $root: $container });
		$root.innerHTML = component.render();
	}

	const createNewTree = () => {
		const cloned = $root.cloneNode(true);
		const domString = component.render();

		cloned.innerHTML = domString;
		return cloned;
	};

	// reconciliation
	diff($root, createNewTree());

	// bind Events
	bindEventHandler($root);
};

export default renderDOM;
