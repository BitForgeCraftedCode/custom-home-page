import React from 'react';

class SearchBars extends React.Component {
	render() {

		return(
			<div className="searchBars">
				<iframe
					src="https://duckduckgo.com/search.html?duck=yes&prefill=Search DuckDuckGo"
					className="searchBars__DuckDuck"
				>
				</iframe>

				<form
					action="http://www.google.com/search"
					className="searchBars__searchform"
					method="get"
					name="searchform"
					target="_blank"
				>
					<input
						name="sitesearch"
						type="hidden"
						value=""
					/>
					<input
						autoComplete="on"
						className="searchBars__form-controls searchBars__search"
						name="q"
						placeholder="Search Google"
						required="required"
						type="text"
					/>
				</form>

				<form
					action="http://www.bing.com/search"
					className="searchBars__searchform"
					method="get"
					name="searchform"
					target="_blank"
				>
					<input
						name="sitesearch"
						type="hidden"
						value=""
					/>
					<input
						autoComplete="on"
						className="searchBars__form-controls searchBars__search"
						name="q"
						placeholder="Search Bing"
						required="required"
						type="text"
					/>
				</form>

			</div>
		);
	}
}

export default SearchBars;