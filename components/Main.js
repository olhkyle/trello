import Component from '../library/Component.js';
import List from './List.js';
import ListCreator from './ListCreator.js';
import Modal from './Modal.js';

class Main extends Component {
	render() {
		const { lists, listCreator, modal } = this.props;

		const $list = new List({ lists });
		const $listCreator = new ListCreator({ listCreator, lists });
		const $modal = new Modal({ modal });

		return `
      <main class="main">
        ${$list.render()}
				${$listCreator.render()}
				${$modal.render()}
      </main>
    `;
	}
}

export default Main;
