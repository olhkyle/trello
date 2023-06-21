import Component from '../library/Component.js';
import Card from './Card.js';

class CardList extends Component {
	render() {
		const { cards } = this.props;

		// prettier-ignore
		return `
				${cards.map(card => `
					<div data-card-id="${card.id}" class="card" draggable="true">
						${new Card({ card }).render()}
					</div>`).join('')}
    `;
	}
}

export default CardList;
