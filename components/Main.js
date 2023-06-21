import Component from '../library/Component.js';
import List from './List.js';

class Main extends Component {
	render() {
		const { lists, listcomposer } = this.props;

		const $list = new List({ lists });

		return `
      <main class="main">
        ${$list.render()}
      </main>
    `;
	}
}

export default Main;
