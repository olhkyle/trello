const generateNextListId = lists => Math.max(...lists.map(({ id }) => id), 0) + 1;

const generateNextCardId = cards => Math.max(...cards.map(({ id }) => id), 0) + 1;

const toggleIsCardCreatorOpen = (lists, listId) =>
	lists.map(list => (list.id === listId ? { ...list, isCardCreatorOpen: !list.isCardCreatorOpen } : list));

const removeListByClickedId = (lists, listId) => lists.filter(({ id }) => id !== listId);

export { generateListNextId, generateCardNextId, toggleIsCardCreatorOpen, removeListByClickedId };
