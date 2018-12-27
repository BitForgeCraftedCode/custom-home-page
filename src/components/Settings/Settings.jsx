import React from 'react';

import { connect } from 'react-redux';

import { switchBackgrounds } from '../../redux/actions';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			bgChoice: '--Please choose an option--'
		}
	}

	handleChange(e) {
		this.setState({bgChoice: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(this.state.bgChoice);
		if(this.state.bgChoice === '--Please choose an option--') {
			alert('Please choose a background category');
			return;
		}
		this.props.switchBackgrounds(this.state.bgChoice);
	}

	resetForm() {
		this.setState({
			bgChoice: '--Please choose an option--'
		});
	}

	render() {
		return(
			<form onSubmit={(e) => this.handleSubmit(e)}>
				<fieldset>
					<legend>Choose a background category</legend>
					<label htmlFor="backgrounds-select">Backgrounds:</label>
					<select
						id="backgrounds-select"
						value={this.state.bgChoice}
						onChange={(e) => this.handleChange(e)}
					>
					    <option value="--Please choose an option--" disabled>--Please choose an option--</option>
					    <option value="Nature">Nature</option>
					    <option value="Space">Space</option>
					    <option value="CitySkylines">CitySkylines</option>
					    <option value="Animals">Animals</option>
					    <option value="Ocean">Ocean</option>
					</select>
					<div>
						<button
							type="submit"
							value="Submit"
						>
							Switch Backgrounds
						</button>
						<button
							type="button"
							value="Reset"
							onClick={() => this.resetForm()}
						>
							Cancel
						</button>
					</div>
				</fieldset>
			</form>
		);
	}
}

const mapDispatchToProps = {
	switchBackgrounds: switchBackgrounds
};

export default connect(null, mapDispatchToProps)(Settings);

