import Header from './components/Header.js';
import Main from './components/Main.js';
import Component from './library/Component.js';
import { setState, loadState } from './state/localStorageState.js';

class App extends Component {
	constructor() {
		super();

		this.$dragTarget = null; // dragTarget

		this.state = loadState();
		console.log(`[state load]: ${this.state}`);
	}

	render() {
		const $header = new Header();
		const $main = new Main(this.state);

		return `${$header.render()}
		${$main.render()}`;
	}

	addEventListener() {
		return [
			{
				type: 'beforeunload',
				selector: 'window',
				handler: () => setState(this.state),
			},
		];
	}
}

export default App;
