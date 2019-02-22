import React from 'react';

import { connect } from 'react-redux';

import { switchBackgrounds, changeDelay } from '../../redux/actions';

class SliderSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bgChoice: '--Please choose an option--',
			delay: '--Please choose an option--'
		};
	}

	handleBgChange(e) {
		this.setState({ bgChoice: e.target.value });
	}

	handleDelayChange(e) {
		this.setState({ delay: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		if (
			this.state.bgChoice === '--Please choose an option--' ||
			this.state.delay === '--Please choose an option--'
		) {
			alert('Please select background category and delay');
			return;
		}
		this.props.switchBackgrounds(this.state.bgChoice);
		this.props.changeDelay(this.state.delay);
		this.resetForm();
	}

	resetForm() {
		this.setState({
			bgChoice: '--Please choose an option--',
			delay: '--Please choose an option--'
		});
	}

	render() {
		return (
			<form className="SliderSettings" onSubmit={e => this.handleSubmit(e)}>
				<fieldset className="SliderSettings__fieldset">
					<legend className="SliderSettings__legend">Choose Background Category:</legend>
					<label className="SliderSettings__label" htmlFor="backgrounds-select">
						Backgrounds:
					</label>
					<div className="SliderSettings__select-div">
						<select
							className="SliderSettings__select"
							id="backgrounds-select"
							value={this.state.bgChoice}
							onChange={e => this.handleBgChange(e)}
						>
							<option value="--Please choose an option--" disabled>
								--Please choose an option--
							</option>
							<option value="Nature">Nature</option>
							<option value="Space">Space</option>
							<option value="CitySkylines">CitySkylines</option>
							<option value="Animals">Animals</option>
							<option value="Ocean">Ocean</option>
						</select>
					</div>
				</fieldset>
				<fieldset className="SliderSettings__fieldset">
					<legend className="SliderSettings__legend">Choose Background Delay:</legend>
					<label className="SliderSettings__label" htmlFor="delay-select">
						Delay:
					</label>
					<div className="SliderSettings__select-div">
						<select
							className="SliderSettings__select"
							id="delay-select"
							value={this.state.delay}
							onChange={e => this.handleDelayChange(e)}
						>
							<option value="--Please choose an option--" disabled>
								--Please choose an option--
							</option>
							<option value="5">5 Seconds</option>
							<option value="10">10 Seconds</option>
							<option value="15">15 Seconds</option>
							<option value="20">20 Seconds</option>
							<option value="30">30 Seconds</option>
						</select>
					</div>
				</fieldset>
				<div className="SliderSettings__btnContainer">
					<button type="submit" value="Submit">
						Change Slideshow Settings
					</button>
					<button type="button" value="Reset" onClick={() => this.resetForm()}>
						Cancel
					</button>
				</div>
			</form>
		);
	}
}

const mapDispatchToProps = {
	switchBackgrounds: switchBackgrounds,
	changeDelay: changeDelay
};

export default connect(
	null,
	mapDispatchToProps
)(SliderSettings);
