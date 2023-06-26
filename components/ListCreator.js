import Component from '../library/Component.js';

class ListCreator extends Component {
	render() {
		const {
			listCreator: { isOpen },
		} = this.props;

		// prettier-ignore
		return `
      <div class="list-creator-container">
        ${isOpen ? 
            `<form class="list-creator">
              <input type="text" class="new-list-title" placeholder="Enter New List here!" autofocus maxLength="512"/>
              <div class="list-control">
								<button class="add-list-btn">Add List</button>
								<button type="button" class="bx bx-x bx-md list-creator-close-btn" ></button>
							</div>
            </form>` : 
            `<button class="list-creator-open-btn">+ Add another list</button>`}
      </div>
    `;
	}
}

export default ListCreator;
