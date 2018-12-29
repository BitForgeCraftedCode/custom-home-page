import React from 'react';

import twitter from '../../icons/twitter.png';
import pinterest from '../../icons/pinterest.png';
import facebook from '../../icons/facebook.png';
import linkedin from '../../icons/linkedin.png';
import youtube from '../../icons/youtube.png';
import gmail from '../../icons/gmail.png';
import google from '../../icons/google.png';
import google_maps from '../../icons/google_maps.png';

import amazon from '../../icons/amazon.png';
import ebay from '../../icons/ebay.png';
import weather from '../../icons/weather.png';
import netflix from '../../icons/Netflix.png';
import bing from '../../icons/bing.png';
import duckduckgo from '../../icons/duckduckgo.png';
import msn from '../../icons/MSN.png';
import github from '../../icons/github.png';

class QuickLinks extends React.Component {
	render() {
		return(
			<div className="shortcuts">
				<div className="shortcuts__one">
					<ul>
			  			<li>
			  				<a
			  					href="https://twitter.com/"
			  					target="_blank"
			  					rel="noopener noreferrer"
			  				>
			  					<img src={twitter} alt="Twitter" className="logo" />
			  				</a>
			  			</li>
			  			<li>
				  			<a
				  				href="https://www.pinterest.com/"
				  				target="_blank"
				  				rel="noopener noreferrer"
				  			>
				  				<img src={pinterest} alt="Pinterest" className="logo" />
				  			</a>
			  			</li>
			  			<li>
			  				<a
			  					href="https://www.facebook.com/"
			  					target="_blank"
			  					rel="noopener noreferrer"
			  				>
			  					<img src={facebook} alt="Facebook" className="logo" />
			  				</a>
			  			</li>
			  			<li>
			  				<a
			  					href="https://www.linkedin.com/"
			  					target="_blank"
			  					rel="noopener noreferrer"
			  				>
			  					<img src={linkedin} alt="Linkedin" className="logo" />
			  				</a>
			  			</li>
					</ul>
				</div>

				<div className="shortcuts__two">
					<ul>
						<li>
			  				<a
			  					href="https://www.youtube.com/"
			  					target="_blank"
			  					rel="noopener noreferrer"
			  				>
			  					<img src={youtube} alt="YouTube" className="logo" />
			  				</a>
			  			</li>
			  			<li>
			  				<a
			  					href="https://www.google.com/gmail/"
			  					target="_blank"
			  					rel="noopener noreferrer"
			  				>
			  					<img src={gmail} alt="Gmail" className="logo" />
			  				</a>
			  			</li>
			  			<li>
			  				<a
			  					href="https://www.google.com/"
			  					target="_blank"
			  					rel="noopener noreferrer"
			  				>
			  					<img src={google} alt="Google" className="logo" />
			  				</a>
			  			</li>
			  			<li>
			  				<a
			  					href="https://www.google.com/maps"
			  					target="_blank"
			  					rel="noopener noreferrer"
			  				>
			  					<img src={google_maps} alt="Google Maps" className="logo" />
			  				</a>
			  			</li>
					</ul>
				</div>
				<div className="shortcuts__three">
					<ul>
						<li>
							<a
								href="https://www.amazon.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img src={amazon} alt="Amazon" className="logo" />
							</a>
						</li>
						<li>
							<a
								href="https://www.ebay.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img src={ebay} alt="ebay" className="logo" />
							</a>
						</li>
						<li>
							<a
								href="https://weather.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img src={weather} alt="Weather" className="logo" />
							</a>
						</li>
						<li>
							<a
								href="https://www.netflix.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img src={netflix} alt="Netflix" className="logo" />
							</a>
						</li>
					</ul>
				</div>
				<div className="shortcuts__four">
					<ul>
						<li>
							<a
								href="https://www.bing.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img src={bing} alt="Bing" className="logo" />
							</a>
						</li>
			  			<li>
			  				<a
			  					href="https://duckduckgo.com/"
			  					target="_blank"
			  					rel="noopener noreferrer"
			  				>
			  					<img src={duckduckgo} alt="DuckDuckGo" className="logo" />
			  				</a>
			  			</li>
			  			<li>
			  				<a
			  					href="https://www.msn.com/"
			  					target="_blank"
			  					rel="noopener noreferrer"
			  				>
			  					<img src={msn} alt="MSN" className="logo" />
			  				</a>
			  			</li>
			  			<li>
			  				<a
			  					href="https://github.com/"
			  					target="_blank"
			  					rel="noopener noreferrer"
			  				>
			  					<img src={github} alt="Github" className="logo" />
			  				</a>
			  			</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default QuickLinks;
