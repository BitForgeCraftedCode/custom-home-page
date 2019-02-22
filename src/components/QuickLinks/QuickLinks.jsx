import React from 'react';

import { connect } from 'react-redux';
//Social Media
import twitter from '../../icons/twitter.png';
import pinterest from '../../icons/pinterest.png';
import facebook from '../../icons/facebook.png';
import linkedin from '../../icons/linkedin.png';
import tumblr from '../../icons/tumblr.png';
import snapchat from '../../icons/snapchat.png';
import instagram from '../../icons/instagram.png';
import meetup from '../../icons/meetup.png';

//search engines and Email
import google from '../../icons/google.png';
import gmail from '../../icons/gmail.png';
import google_maps from '../../icons/google_maps.png';
import bing from '../../icons/bing.png';
import msn from '../../icons/msn.png';
import yahoo from '../../icons/yahoo.png';
import yahoo_mail from '../../icons/yahoo_mail.png';
import duckduckgo from '../../icons/duckduckgo.png';

//Shopping
import amazon from '../../icons/amazon.png';
import ebay from '../../icons/ebay.png';
import etsy from '../../icons/etsy.png';

//Entertainment
import netflix from '../../icons/netflix.png';
import hulu from '../../icons/hulu.png';
import youtube from '../../icons/youtube.png';
import reddit from '../../icons/reddit.png';
import imgur from '../../icons/imgur.png';
import ninegag from '../../icons/9gag.png';

//other
import weather from '../../icons/weather.png';
import github from '../../icons/github.png';
import slack from '../../icons/slack.png';

class QuickLinks extends React.Component {
	chunkArray(array, chunk_size) {
		let chunkArray = [];
		let length = array.length;

		for (let i = 0; i < length; i = i + chunk_size) {
			let temp = array.slice(i, i + chunk_size);
			chunkArray.push(temp);
		}

		return chunkArray;
	}

	render() {
		const links = [
			{ icon: twitter, url: 'https://twitter.com/', name: 'twitter' },
			{ icon: pinterest, url: 'https://www.pinterest.com/', name: 'pinterest' },
			{ icon: facebook, url: 'https://www.facebook.com/', name: 'facebook' },
			{ icon: linkedin, url: 'https://www.linkedin.com/', name: 'linkedin' },
			{ icon: tumblr, url: 'https://www.tumblr.com/', name: 'tumblr' },
			{ icon: snapchat, url: 'https://www.snapchat.com/', name: 'snapchat' },
			{ icon: instagram, url: 'https://www.instagram.com/', name: 'instagram' },
			{ icon: meetup, url: 'https://www.meetup.com/', name: 'meetup' },

			{ icon: google, url: 'https://www.google.com/', name: 'google' },
			{ icon: gmail, url: 'https://www.google.com/gmail/', name: 'gmail' },
			{ icon: google_maps, url: 'https://www.google.com/maps', name: 'google_maps' },
			{ icon: bing, url: 'https://www.bing.com/', name: 'bing' },
			{ icon: msn, url: 'https://www.msn.com/', name: 'msn' },
			{ icon: yahoo, url: 'https://www.yahoo.com/', name: 'yahoo' },
			{ icon: yahoo_mail, url: 'https://mail.yahoo.com/', name: 'yahoo_mail' },
			{ icon: duckduckgo, url: 'https://duckduckgo.com/', name: 'duckduckgo' },

			{ icon: amazon, url: 'https://www.amazon.com/', name: 'amazon' },
			{ icon: ebay, url: 'https://www.ebay.com/', name: 'ebay' },
			{ icon: etsy, url: 'https://www.etsy.com/', name: 'etsy' },

			{ icon: netflix, url: 'https://www.netflix.com/', name: 'netflix' },
			{ icon: hulu, url: 'https://www.hulu.com/', name: 'hulu' },
			{ icon: youtube, url: 'https://www.youtube.com/', name: 'youtube' },
			{ icon: reddit, url: 'https://www.reddit.com/', name: 'reddit' },
			{ icon: imgur, url: 'https://imgur.com/', name: 'imgur' },
			{ icon: ninegag, url: 'https://9gag.com/', name: 'ninegag' },

			{ icon: weather, url: 'https://weather.com/', name: 'weather' },
			{ icon: github, url: 'https://github.com/', name: 'github' },
			{ icon: slack, url: 'https://slack.com/', name: 'slack' }
		];
		/*
		filter links against each quickLink chosen in settings to build the shortcuts array
		(shortcuts is now an array of link objects)

		chunk shortcuts array to size 4
		build the DOM for each chunk array
		*/
		const quickLinks = this.props.quickLinks;
		const QLlength = quickLinks.length;
		let shortcuts = [];
		for (let i = 0; i < QLlength; i++) {
			let shortcut = links.filter(link => link.name === quickLinks[i]);
			shortcuts.push(shortcut[0]);
		}
		let chunkShortcuts = this.chunkArray(shortcuts, 4);

		let shortCutDOM = [];
		for (let i = 0; i < chunkShortcuts.length; i++) {
			//console.log(chunkShortcuts[i]);
			shortCutDOM.push(
				<div className={`shortcuts__${i}`} key={i}>
					<ul>
						{chunkShortcuts[i].map((link, index) => {
							return (
								<li key={index}>
									<a href={link.url} target="_blank" rel="noopener noreferrer">
										<img src={link.icon} alt={link.name} className="logo" />
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			);
		}

		return <div className="shortcuts">{shortCutDOM}</div>;
	}
}

const mapStateToProps = state => {
	return {
		quickLinks: state.quickLinks
	};
};

export default connect(
	mapStateToProps,
	null
)(QuickLinks);
