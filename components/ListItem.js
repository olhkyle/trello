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
					<div class="list-item-title-container">
						<textarea class="list-item-title">${title.trim()}</textarea>
						<button class="delete-list-btn bx bx-x"></button>
					</div>
					<div class="card-list-container">${new CardList({ cards }).render()}</div>
					<div class="card-creator-container">
						${isCardCreatorOpen ? 
							`<form class="card-creator">
								<textarea class="new-card-title" placeholder="Enter a title for this card!" autofocus></textarea>
								<div class="card-control">
									<button class="add-card-btn">Add Card</button>
									<button type="button" class="bx bx-x bx-md card-creator-close-btn"></button>
								</div>
							</form>` : 
							`<button class="card-creator-open-btn">Add a Card</button>`
						}
					</div>
				</div>
    `;
	}
}

export default ListItem;
