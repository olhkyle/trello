import Component from '../library/Component.js';
import CardList from './CardList.js';

class ListItem extends Component {
	render() {
		const {
			list: { title, cards, isOpenCardComposer },
		} = this.props;

		return `
				<div class="list-item-container">
					<textarea class="list-item-title">
						${title}
					</textarea>
					<div class="cards-container">${new CardList({ cards }).render()}</div>
					${
						isOpenCardComposer
							? `
								<form>
									<textarea class="new-card-title" placeholder="Enter a title for this card..." autofocus></textarea>
									<div class="card-control">
									<button class="add-list-button">Add List</button>
									<a class="bx bx-x bx-md card-composer-closer"></a>
									</div>
								</form>
					`
							: `<button>+ Add a Card</button>`
					}
				</div>
    `;
	}
}

export default ListItem;
