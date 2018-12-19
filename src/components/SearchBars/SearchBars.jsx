import React from 'react';

class SearchBars extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchGoogle: '',
			searchBing: ''
		}
	}

	handleSearchGoogleChange(e) {
		this.setState({searchGoogle: e.target.value});
	}

	handleSeachBingChange(e) {
		this.setState({searchBing: e.target.value});
	}

	clearSearch() {
		this.setState({searchGoogle: ''});
		this.setState({searchBing: ''});
	}
	render() {
		return(
			<div className="searchBars">
				<iframe
					src="https://duckduckgo.com/search.html?duck=yes&prefill=Search DuckDuckGo"
					className="searchBars__DuckDuck"
					title="Search DuckDuckGo"
				>
				</iframe>

				<form
					action="http://www.google.com/search"
					className="searchBars__searchform"
					method="get"
					target="_blank"
					autoComplete="on"
				>
					<input
						autoComplete="on"
						className="searchBars__form-controls searchBars__search"
						name="q"
						value={this.state.searchGoogle}
						placeholder="Search Google"
						onChange={(e)=>this.handleSearchGoogleChange(e)}
						required="required"
						type="text"
					/>
				</form>

				<form
					action="http://www.bing.com/search"
					className="searchBars__searchform"
					method="get"
					target="_blank"
					autoComplete="on"
				>
					<input
						autoComplete="on"
						className="searchBars__form-controls searchBars__search"
						name="q"
						value={this.state.searchBing}
						placeholder="Search Bing"
						onChange={(e)=>this.handleSeachBingChange(e)}
						required="required"
						type="text"
					/>
				</form>
				<button
					onClick={()=>this.clearSearch()}
					className="searchBars__btn"
				>
					Clear Search
				</button>
			</div>
		);
	}
}

export default SearchBars;