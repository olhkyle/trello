const findListTitle = ({ lists, listId }) => lists.find(({ id }) => id === listId).title;

const findCardTitle = ({ lists, listId, cardId }) => {
	const targetList = lists.find(list => list.id === listId);
	return targetList?.cards.find(card => card.id === cardId)?.title;
};

const generateNextListId = lists => Math.max(...lists.map(({ id }) => id), 0) + 1;

const generateNextCardId = cards => Math.max(...cards.map(({ id }) => id), 0) + 1;

const toggleIsCardCreatorOpen = (lists, listId) =>
	lists.map(list => (list.id === listId ? { ...list, isCardCreatorOpen: !list.isCardCreatorOpen } : list));

const removeListByClickedId = (lists, listId) => lists.filter(({ id }) => id !== listId);

const moveList = (lists, dropFromIdx, dropToIdx) => {
	const filteredLists = [...lists].filter((_, idx) => idx !== dropFromIdx);
	filteredLists.splice(dropToIdx, 0, lists[dropFromIdx]);

	return filteredLists;
};

const moveCard = ({ lists, cardId, prevDropFromId, currentDropToId, cardIndex }) => {
	const card = lists
		.map(list => list.cards)
		.flat()
		.find(({ id }) => id === +cardId);

	const listsOfRemovedCard = lists.map(list =>
		list.id === +prevDropFromId ? { ...list, cards: list.cards.filter(({ id }) => id !== card.id) } : list,
	);

	return listsOfRemovedCard.map(list =>
		list.id === +currentDropToId
			? { ...list, cards: [...list.cards.slice(0, cardIndex), card, ...list.cards.slice(cardIndex)] }
			: list,
	);
};

export {
	findListTitle,
	findCardTitle,
	generateNextListId,
	generateNextCardId,
	toggleIsCardCreatorOpen,
	removeListByClickedId,
	moveList,
	moveCard,
};
