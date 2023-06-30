import Component from '../library/Component.js';

class Card extends Component {
	render() {
		const { card } = this.props;

		return `
				<div class="card-title">
					<p class="card-content">${card.title}</p>
					<button class="delete-card-btn bx bx-x"></button>
				</div>
				${card.description ? `<i class="bx bx-menu-alt-left has-desc"></i>` : ''}
		`;
	}
}

export default Card;
