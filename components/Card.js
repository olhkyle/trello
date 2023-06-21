import Component from '../library/Component.js';

class Card extends Component {
	render() {
		const { card } = this.props;

		return `
				<div>
					<p>${card.title}</p>
					<i class="bx bx-pencil card-menu"></i>
				</div>
				${card.description ? `<i class="bx bx-menu-alt-left has-desc"></i>` : ''}
		`;
	}
}

export default Card;
