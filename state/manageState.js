const toggleIsCardCreatorOpen = (lists, listId) =>
	lists.map(list => (list.id === listId ? { ...list, isCardCreatorOpen: !list.isCardCreatorOpen } : list));

export { toggleIsCardCreatorOpen };
