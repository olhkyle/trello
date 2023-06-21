import Component from '../library/Component.js';
import ListItem from './ListItem.js';

class List extends Component {
	render() {
		const { lists } = this.props;

		// prettier-ignore
		return `
      <div class="lists-container">
        ${lists.map((list, idx) => `
					<div class="list-item" data-list-index="${idx}" data-list-id="${list.id}">
						${new ListItem({ list }).render()}
					</div>`,).join('')}
      </div>
    `;
	}
}

export default List;
