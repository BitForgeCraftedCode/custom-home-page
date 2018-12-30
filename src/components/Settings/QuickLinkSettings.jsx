import React from 'react';

import { connect } from 'react-redux';

import { displayQuickLinks } from '../../redux/actions';

class QuickLinkSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			QLChoice: []
		}
	}

	handleQLChange(e) {
		let links = this.state.QLChoice;
		links.push(e.target.value);
		//let uniqueLinks = Array.from(new Set(links));
		let uniqueLinks = links.filter((link, i) => links.indexOf(link) === i);
		this.setState({QLChoice: uniqueLinks});
	}

	handleSubmit(e) {
		e.preventDefault();
		if(this.state.QLChoice.length === 0) {
			alert('Please select quick links');
			return;
		}
		console.log(this.state.QLChoice);
		this.props.displayQuickLinks(this.state.QLChoice);
		this.resetForm();
	}

	resetForm() {
		this.setState({
			QLChoice: []
		});
	}

	render() {
		return(
			<form className="QLsettings" onSubmit={(e) => this.handleSubmit(e)}>
				<fieldset className="QLsettings__fieldset">
					<legend className="QLsettings__legend">Choose Quick Links:</legend>
					<label className="QLsettings__label" htmlFor="QL-select">Quick Links:</label>
					<select
						className="QLsettings__select"
						id="QL-select"
						value={this.state.QLChoice}
						onChange={(e) => this.handleQLChange(e)}
						multiple={true}
						size="6"
					>
						<optgroup label="Social Media">
						    <option value="twitter">Twitter</option>
						    <option value="pinterest">Pinterest</option>
						    <option value="facebook">FaceBook</option>
						    <option value="linkedin">LinkedIn</option>
						    <option value="github">Github</option>
						</optgroup>
						<optgroup label="Search Engines">
						    <option value="google">Google</option>
						    <option value="google_maps">Google Maps</option>
						    <option value="bing">Bing</option>
						    <option value="msn">MSN</option>
						    <option value="yahoo">Yahoo</option>
						    <option value="duckduckgo">DuckDuckGo</option>
						</optgroup>
						<optgroup label="Email">
						    <option value="gmail">Gmail</option>
						</optgroup>
						<optgroup label="Shopping">
						    <option value="amazon">Amazon</option>
						    <option value="ebay">Ebay</option>
						    <option value="etsy">Etsy</option>
						</optgroup>
						<optgroup label="Entertainment">
						    <option value="netflix">Netflix</option>
						    <option value="youtube">Youtube</option>
						</optgroup>
					</select>
				</fieldset>

				<div className="QLsettings__btnContainer">
					<button
						type="submit"
						value="Submit"
					>
						Add Links
					</button>
					<button
						type="button"
						value="Reset"
						onClick={() => this.resetForm()}
					>
						Cancel
					</button>
				</div>
			</form>
		);
	}
}

const mapDispatchToProps = {
	displayQuickLinks: displayQuickLinks,
};

export default connect(null, mapDispatchToProps)(QuickLinkSettings);