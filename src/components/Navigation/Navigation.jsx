import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {

	toggleNav() {
		const toggleNav = document.getElementById('navi-toggle').checked;
		//console.log(toggleNav);
		if(toggleNav === false) {
			document.getElementById('navi-toggle').checked = true;
		}
		else {
			document.getElementById('navi-toggle').checked = false;
		}
	}

	hideNav() {
		document.getElementById('navi-toggle').checked = false;
	}

	render() {
		return(
			<nav className="nav">
				<input
					type="checkbox"
					className="nav__checkbox"
					id="navi-toggle"
				/>
				<label
					htmlFor="navi-toggle"
					className="nav__button"
					aria-haspopup="true"
					role="button"
					tabIndex="0"
					aria-label="navigation menu"
					onKeyPress={() => this.toggleNav()}
				>
					<span className="nav__icon">&nbsp;</span>
				</label>
				<ul className="nav__list">
					<div className="nav__item-container">
						<li className="nav__item-1">
							<Link
								to="/"
								className="nav__link"
								onClick={() => this.hideNav()}
							>
								Home
							</Link>
						</li>
						<li className="nav__item-2">
							<Link
								to="/weather"
								className="nav__link"
								onClick={() => this.hideNav()}
							>
								Weather
							</Link>
						</li>
					</div>
				</ul>
			</nav>
		);
	}
}

export default Navigation;