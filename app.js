import Header from './components/Header.js';
import Main from './components/Main.js';
import Component from './library/Component.js';
import { saveState, loadState } from './state/localStorageState.js';
import {
	generateNextListId,
	toggleIsCardCreatorOpen,
	removeListByClickedId,
	generateNextCardId,
} from './state/manageState.js';

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
					if (!e.target.matches('textarea')) return;

					e.target.style.height = '0px';
					e.target.style.height = `${e.target.scrollHeight}px`;
					e.target.style.overflow = 'hidden';
				},
			},
		];
	}

	getListId($element) {
		return +$element.closest('.list-item').dataset.listId;
	}

	getCardId($element) {
		return +$element.closest('.card').dataset.cardId;
	}

	findListTitle({ lists, listId }) {
		return lists.find(list => list.id === listId).title;
	}

	/**
	 * Event Handler's Action
	 */
	updateListTitle({ listId, value }) {
		const lists = this.state.lists.map(list => (list.id === listId ? { ...list, title: value } : list));

		this.setState({ lists });
	}

	toggleListCreatorBtns() {
		this.setState({ listCreator: { isOpen: !this.state.listCreator.isOpen } });
	}

	toggleCardCreatorBtns(target) {
		// eslint-disable-next-line no-unsafe-optional-chaining
		const lists = toggleIsCardCreatorOpen(this.state.lists, +target.closest('.list-item')?.dataset.listId);

		this.setState({ lists });
	}

	addNewList(value) {
		const list = { id: generateNextListId(this.state.lists), title: value, cards: [], isCardCreatorOpen: false };

		this.setState({ lists: [...this.state.lists, list] });
	}

	removeList(target) {
		const lists = removeListByClickedId(this.state.lists, this.getListId(target));

		this.setState({ lists });
	}

	addCard({ target, value }) {
		const cardId = generateNextCardId(this.state.lists.map(list => list.cards).flat());
		const newCard = { id: cardId, title: value, description: '' };

		this.setState({
			lists: this.state.lists.map(list =>
				list.id === this.getListId(target) ? { ...list, cards: [...list.cards, newCard] } : list,
			),
		});
	}

	removeCard(target) {
		const cardId = this.getCardId(target);
		const filterCard = list => list.cards.filter(({ id }) => id !== cardId);

		const lists = this.state.lists.map(list => ({ ...list, cards: filterCard(list) }));

		this.setState({ lists });
	}

	// because of event delegation and dynamic DOM Creation, form's focus event temporarily maintains and we can't close form ($card-creator or $list-creator)
	// It means we have to close all creators at the same time
	closeAllCreator() {
		if (this.state.lists.filter(list => list.isCardCreatorOpen).length === 0 && !this.state.listCreator.isOpen) {
			return;
		}

		this.setState({
			lists: this.state.lists.map(list => ({ ...list, isCardCreatorOpen: false })),
			listCreator: { isOpen: false },
		});
	}

	closeListCardCreator(e) {
		this.toggleCardCreatorBtns(e.target);
	}

	closeModal(e) {
		console.log('closemodal', e.target);
	}

	// event Handlers
	onDragstart() {}

	onDragend() {}

	onDragover() {}

	onDrop() {}

	onClick(e) {
		// 1. click list-creator-open-btn & list-creator-close-btn
		if (e.target.matches('.list-creator-open-btn') || e.target.matches('.list-creator-close-btn')) {
			this.toggleListCreatorBtns();
		}

		// 2. click card-creator-open-btn & card-creator-close-btn
		if (e.target.matches('.card-creator-open-btn') || e.target.matches('.card-creator-close-btn')) {
			this.toggleCardCreatorBtns(e.target);
		}

		// 3. click add-list-btn
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

		// 4. click delete-list-btn
		if (e.target.matches('.delete-list-btn')) {
			this.removeList(e.target);
		}

		// 5. click delete-card-card
		if (e.target.matches('.delete-card-btn')) {
			this.removeCard(e.target);
		}
	}

	onKeydown(e) {
		if (e.isComposing) return;
		if (e.key !== 'Enter' && e.key !== 'Escape') return;

		if (e.key === 'Escape') {
			// window keydown bind Event Handler -> event propagation works
			e.stopPropagation();

			if (e.target.matches('.new-list-title')) {
				this.toggleListCreatorBtns();
				return;
			}

			if (e.target.matches('.new-card-title')) {
				this.closeListCardCreator(e);
				return;
			}

			if (e.target.matches('.list-item-title')) {
				const listId = this.getListId(e.target);

				e.target.value = this.findListTitle({ lists: this.state.lists, listId });

				e.target.blur();
			}
		}

		if (e.key === 'Enter') {
			const value = e.target.value.trim();

			if (e.target.matches('.list-item-title')) {
				const listId = this.getListId(e.target);

				const currentValue = this.findListTitle({ lists: this.state.lists, listId });

				if (value === '') {
					e.target.value = currentValue;

					e.target.blur();
					return;
				}

				if (value !== currentValue) {
					this.updateListTitle({ listId, value });
				}

				e.target.blur();
			}

			if (e.target.matches('.new-list-title')) {
				if (value === '') return;

				this.addNewList(value);
			}

			if (e.target.matches('.new-card-title')) {
				e.preventDefault(); // block new line

				if (value !== '') this.addCard({ target: e.target, value });
			}
		}
	}

	onFocusout(e) {
		if (!e.target.matches('.list-item-title')) return;
		// listitemtitle의 상태 변경
	}

	onSubmit(e) {
		e.preventDefault();

		const $textArea = e.target.querySelector('textarea');
		const value = $textArea?.value.trim();

		if (e.target.matches('.card-creator')) {
			if (value === '') return;

			this.addCard({ target: e.target, value });
		}
	}
}

export default App;
