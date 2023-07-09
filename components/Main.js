import Component from '../library/Component.js';
import List from './List.js';
import ListCreator from './ListCreator.js';

class Main extends Component {
	render() {
		const { lists, listCreator } = this.props;

		const $list = new List({ lists });
		const $listCreator = new ListCreator({ listCreator, lists });

		return `
      <main class="main">
        ${$list.render()}
				${$listCreator.render()}
			</main>
    `;
	}
}

export default Main;
