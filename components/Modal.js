import Component from '../library/Component.js';

class Modal extends Component {
	render() {
		const {
			lists,
			listCreator,
			modal: { isOpen, isCardDescCreatorOpen, listId, cardId },
		} = this.props;

		return `${
			isOpen
				? `<div class="modal-container">
						<button class="bx bx-x modal-close-btn"></button>
						<div class="modal-header">
							<i class='bx bx-window-alt'></i>
							<div class="modal-card-title">
								<textarea class="modal-card-title-textarea">${lists[0].cards[0].title.trim()}</textarea>
								<div>in list <a href="#" class="modal-list-title">${lists[0].title}</a></div>
							</div>
						</div>
						<div class="divider"></div>
						<div class="modal-main">
							<i class="bx bx-water"></i>
							<div class="modal-card-content">
								<div class="modal-card-content-header">
									<div class="content-title-wrapper">
										<div class="content-title">Description</div>
										<span class="caution">Please save your change 👉</span>
									</div>
									${
										isCardDescCreatorOpen
											? `<div class="description-control">
													<button class="save-btn">Save</button>
													<button class="bx bx-x description-close-btn"></button>
												</div>`
											: ''
									}
								</div>
								<textarea class="modal-card-content-textarea" placeholder="Add a more detailed description"></textarea>
							</div>
						</div>
					</div>
					<div class="overlay"></div>`
				: ''
		}`;
	}
}

export default Modal;
