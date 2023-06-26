import Header from './components/Header.js';
import Main from './components/Main.js';
import Component from './library/Component.js';
import { saveState, loadState } from './state/localStorageState.js';
import { generateListNextId, toggleIsCardCreatorOpen, removeListByClickedId } from './state/manageState.js';

class App extends Component {
	constructor() {
		super();

		this.$dragTarget = null; // dragTarget
		this.selectedListId = null;
		this.selectedCardId = null;
		this.dragStartId = null;

		this.state = loadState();
		console.log(`[state load]: ${JSON.stringify(this.state)}`);
	}

	render() {
		return `${new Header().render()}
		${new Main(this.state).render()}`;
	}

	addEventListener() {
		return [
			{
				type: 'beforeunload',
				selector: 'window',
				handler: () => saveState(this.state),
			},
			{
				type: 'keydown',
				selector: 'window',
				handler: e => {
					if (e.key !== 'Escape') return;

					if (this.state.modal.isOpen) {
						this.closeModal();
					} else if (this.state.listCreator.isOpen) {
						this.toggleListCreatorBtns();
					} else if (this.state.lists.some(({ isCardCreatorOpen }) => isCardCreatorOpen)) {
						this.closeListCardCreator(e);
					} else {
						this.closeAllCreator();
					}
				},
			},
			{ type: 'dragstart', selector: null, handler: this.onDragstart.bind(this) },
			{ type: 'dragend', selector: null, handler: this.onDragend.bind(this) },
			{ type: 'dragover', selector: null, handler: this.onDragover.bind(this) },
			{ type: 'drop', selector: null, handler: this.onDrop.bind(this) },
			{
				type: 'click',
				selector: null,
				handler: this.onClick.bind(this),
			},
			{
				type: 'keydown',
				selector: null,
				handler: this.onKeydown.bind(this),
			},
			{
				type: 'focusout',
				selector: null,
				handler: this.onFocusout.bind(this),
			},
			{ type: 'submit', selector: null, handler: this.onSubmit.bind(this) },
			{
				type: 'input',
				selector: null,
				handler: e => {
					if (e.target.matches('textarea')) {
						e.target.style.height = `${e.target.scrollHeight}px`;
						if (e.target.matches('.new-card-title')) {
							e.target.style.height = `${4 + e.target.scrollHeight}px`;
						}
					}
				},
			},
		];
	}

	// event Handler's Action
	toggleListCreatorBtns() {
		this.setState({ listCreator: { isOpen: !this.state.listCreator.isOpen } });
	}

	toggleCardCreatorBtns(target) {
		// eslint-disable-next-line no-unsafe-optional-chaining
		const lists = toggleIsCardCreatorOpen(this.state.lists, +target.closest('.list-item')?.dataset.listId);

		this.setState({ lists });
	}

	addNewList(value) {
		const list = { id: generateListNextId(this.state.lists), title: value, cards: [], isCardCreatorOpen: false };

		this.setState({ lists: [...this.state.lists, list] });
	}

	removeList(target) {
		const lists = removeListByClickedId(this.state.lists, +target.closest('.list-item').dataset.listId);

		this.setState({ lists });
	}

	closeAllCreator(e) {
		console.log('allCreator', e.target);
	}

	closeModal(e) {
		console.log('closemodal', e.target);
	}

	closeListCardCreator(e) {
		this.toggleCardCreatorBtns(e.target);
	}

	// event Handlers
	onDragstart() {}

	onDragend() {}

	onDragover() {}

	onDrop() {}

	onClick(e) {
		if (e.target.matches('.list-creator-open-btn') || e.target.matches('.list-creator-close-btn')) {
			this.toggleListCreatorBtns();
		}

		// TODO: list-item-container가 추가됨
		if (e.target.matches('.add-card-btn')) {
			console.log(this);
		}

		// 2. card-creator-open-btn
		// 3. card-creator-close-btn
		if (e.target.matches('.card-creator-open-btn') || e.target.matches('.card-creator-close-btn')) {
			this.toggleCardCreatorBtns(e.target);
		}

		// 4. add-list-btn
		if (e.target.matches('.add-list-btn')) {
			const [$textArea] = [...e.target.closest('.list-creator').children];

			const { value } = $textArea;
			$textArea.focus();

			if (value === '') {
				$textArea.blur();
				return;
			}

			this.addNewList(value);
		}

		// 5. delete click btn
		if (e.target.matches('.delete-list-btn')) {
			this.removeList(e.target);
		}

		// 6. card
	}

	onKeydown(e) {
		if (e.isComposing) return;
		if (e.key !== 'Enter' && e.key !== 'Escape') return;

		if (e.key === 'Enter') {
			if (e.target.matches('.list-item-title')) {
				console.log(e.target);
			}

			if (e.target.matches('.new-list-title')) {
				const { value } = e.target;
				if (value === '') return;

				this.addNewList(value);
			}
		}
	}

	onFocusout(e) {
		if (!e.target.matches('.list-item-title')) return;
		// listitemtitle의 상태 변경
	}

	onSubmit(e) {
		e.preventDefault();
		console.log(e.target);
	}
}

export default App;
