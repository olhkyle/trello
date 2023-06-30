import eventCollection from './eventCollection.js';
import renderDOM from './renderDOM.js';

class Component {
	constructor(props) {
		this.props = props;
		this.#applyEvents();
	}

	setState(newState) {
		this.state = { ...this.state, ...newState };
		console.log(`[Rerender with STATE]:`, this.state);

		renderDOM();
	}

	#applyEvents() {
		const events = this.addEventListener?.();
		if (!events) return;

		for (const event of events) {
			if (event.selector === 'window' || event.selector === null) {
				eventCollection.push(event);
				// eslint-disable-next-line no-continue
				continue;
			}

			const checkDuplicate = eventCollection.find(
				({ type, selector }) => type === event.type && selector === event.selector,
			);

			if (!checkDuplicate) {
				const { selector, handler } = event;

				event.handler = e => {
					if (e.target.matches(selector) || e.target.closest(selector)) handler(e);
				};

				eventCollection.push(event);
			}
		}
	}

	render() {
		throw new Error(`Sub Class of Component should implement 'Render' method which returns DOMString`);
	}
}

export default Component;
