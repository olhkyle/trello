import Component from '../library/Component.js';
import CardList from './CardList.js';

class ListItem extends Component {
	render() {
		const {
			list: { title, cards, isCardCreatorOpen },
		} = this.props;

		// prettier-ignore
		return `
				<div class="list-item-container" draggable="true">
					<textarea class="list-item-title">${title.trim()}</textarea>
					<div class="card-list-container">${new CardList({ cards }).render()}</div>
					${isCardCreatorOpen ? 
						`<form class="card-creator">
							<textarea class="new-card-title" placeholder="Enter a title for this card!" autofocus></textarea>
							<div class="card-control">
								<button class="add-list-btn">Add List</button>
								<button type="button" class="bx bx-x bx-md card-creator-close-btn"></button>
							</div>
						</form>` : 
						`<button class="card-creator-open-btn">
							<i class="bx bx-plus"></i>
							<span>Add a Card</span>
						</button>`
					}
				</div>
    `;
	}
}

export default ListItem;
