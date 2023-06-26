const generateListNextId = lists => Math.max(...lists.map(({ id }) => id), 0) + 1;

const toggleIsCardCreatorOpen = (lists, listId) =>
	lists.map(list => (list.id === listId ? { ...list, isCardCreatorOpen: !list.isCardCreatorOpen } : list));

const removeListByClickedId = (lists, listId) => lists.filter(({ id }) => id !== listId);

export { generateListNextId, toggleIsCardCreatorOpen, removeListByClickedId };
