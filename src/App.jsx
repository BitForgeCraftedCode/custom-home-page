import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Slider from "react-slick";

import Navigation from './components/Navigation/Navigation';
import SearchBars from './components/SearchBars/SearchBars';
import QuickLinks from './components/QuickLinks/QuickLinks';
import Clock from './components/Clock/Clock';
import Weather from './components/Weather/Weather';
import SliderSettings from './components/Settings/SliderSettings';
import QuickLinkSettings from './components/Settings/QuickLinkSettings';

class App extends Component {
    buildImages(folder) {
        let folderChoice = folder;
        /*https://webpack.js.org/guides/dependency-management/
        require.context() function takes 3 args
        1. a directory to search
        2. a flag whether subdirectories should be searched
        3. a regular expression to match files against

        A context module exports a (require) function that takes one argument: the request.
        The exported function has 3 properties: resolve, keys, id
            // console.log(typeof req);
            // console.log(req);
            // console.log(req.keys);
            // //pass the key back into require to get the import
            // console.log(req(req.keys()[0]));
            // req.keys().forEach(function(key){
            //     req(key);
            //     console.log(req(key));
            // });

            once we have all import paths we can filter based
            on a RegExp and build the DOM img elements
        */
        var req = require.context("./images", true, /.*\.jpg$/);

        // console.log(req.keys());
        const regex1 = new RegExp(/\.\//,'gi');
        const regex2 = new RegExp(`${folderChoice}`, 'gi');
        const regex3 = new RegExp(regex1.source + regex2.source, 'gi');

        const filteredKeys = req.keys().filter(key => key.match(regex3));
        // console.log(filteredKeys);
        const imagePaths = filteredKeys.map(key => req(key));
        //console.log(imagePaths);
        return imagePaths.map((path,index) => {
            return(
                <div key={index}>
                    <img src={path} className="slider__img" alt="wall paper" />
                </div>
            );
        });
    }

    render() {
        const folder = this.props.background;
        const images = this.buildImages(folder);
        const delay = (this.props.delay)*1000;
        const settings = {
            arrows: false,
            dots: false,
            infinite: true,
            autoplay: true,
            fade: true,
            autoplaySpeed: delay,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className="App">
                <Route exact path='/' render={() => (
                    <div>
                        <SearchBars />
                        <Clock />
                        <QuickLinks />
                        <Navigation />
                        <Slider className="slider" {...settings}>
                            {images}
                        </Slider>
                    </div>
                )}/>
                <Route path='/weather' render={() => (
                    <div>
                        <Weather />
                        <Navigation />
                        <Slider className="slider" {...settings}>
                            {images}
                        </Slider>
                    </div>

                )}/>
                <Route path='/settings' render={() => (
                    <div>
                        <SliderSettings />
                        <QuickLinkSettings />
                        <Navigation />
                    </div>
                )}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        background: state.background,
        delay: state.delay
    };
};


export default withRouter(connect(mapStateToProps, null)(App));

