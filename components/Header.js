import Component from '../library/Component.js';

class Header extends Component {
	render() {
		return `
      <header class="header">
        <a href="#" class="logo">
          <div class="logo-container">
            <img src="assets/logo.gif"/>
          </div>
        </a>
      </header>
    `;
	}
}

export default Header;
