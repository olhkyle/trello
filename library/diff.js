const propertyList = ['checked', 'value', 'selected'];

const updateAttributes = (oldNode, newNode) => {
	if (oldNode.tagName === newNode.tagName) {
		// check attribute
		if (!(oldNode instanceof Text) && !(newNode instanceof Text)) {
			// replace attribute
			for (const { name, value } of [...newNode.attributes]) {
				if (value !== oldNode.getAttribute(name)) oldNode.setAttribute(name, value);
			}

			// remove attribute
			for (const { name } of [...oldNode.attributes]) {
				if (!newNode.getAttribute(name) === undefined || newNode.getAttribute(name) === null)
					oldNode.removeAttribute(name);
			}
		}

		// check property
		for (const property of propertyList) {
			if (oldNode[property] !== newNode[property]) oldNode[property] = newNode[property];
		}
	}
};

const diff = (oldNode, newNode, parent = null) => {
	if (parent) {
		// add new Node
		if (!oldNode && newNode) {
			parent.appendChild(newNode);
			return;
		}

		// remove old Node
		if (oldNode && !newNode) {
			parent.removeChild(oldNode);
			return;
		}

		// Text Node
		if (oldNode instanceof Text && newNode instanceof Text) {
			if (oldNode.nodeValue.trim() === '') return;
			if (oldNode.nodeValue !== newNode.nodeValue) oldNode.nodeValue = newNode.nodeValue;

			return;
		}

		// Comment Node
		if (oldNode.nodeType === Node.COMMENT_NODE || newNode.nodeType === Node.COMMENT_NODE) return;

		// node's tagName
		if (oldNode.tagName !== newNode.tagName) {
			parent.replaceChild(newNode, oldNode);
			return;
		}

		// update Attribute Nodes
		updateAttributes(oldNode, newNode);
	}

	const [oldNodes, newNodes] = [[...oldNode.childNodes], [...newNode.childNodes]];
	const maxLength = Math.max(oldNodes.length, newNodes.length);

	for (let i = 0; i < maxLength; i++) {
		diff(oldNodes[i], newNodes[i], oldNode);
	}
};

export default diff;
