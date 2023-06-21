import Component from '../library/Component.js';

class Modal extends Component {
	render() {
		const { isOpen, isCardDescCreatorOpen, listId, cardId } = this.props;
		return `
      <div class="modal"></div>
			<div class="overlay"></div>
    `;
	}
}

export default Modal;
