const KEY = 'state';

// mock
const initialState = {
	lists: [
		{
			id: 1,
			title: 'Tasks to Do',
			cards: [
				{ id: 1, title: 'React', description: 'my task' },
				{ id: 2, title: 'Angular', description: '' },
			],
			isCardCreatorOpen: false,
		},
		{
			id: 2,
			title: 'Doing Tasks',
			cards: [{ id: 3, title: 'Algorithm', description: '' }],
			isCardCreatorOpen: false,
		},
		{
			id: 3,
			title: 'Completed Tasks',
			cards: [
				{ id: 4, title: 'HTML', description: '' },
				{ id: 5, title: 'CSS', description: '' },
				{ id: 6, title: 'JavaScript', description: '' },
			],
			isCardCreatorOpen: false,
		},
	],
	listCreator: {
		isOpen: false,
	},
	modal: {
		isOpen: false,
		isCardDescCreatorOpen: false,
		listId: null,
		cardId: null,
	},
};

const loadState = () => JSON.parse(localStorage.getItem(KEY)) || initialState;

const saveState = newState => localStorage.setItem(KEY, JSON.stringify(newState));

export { loadState, saveState };
