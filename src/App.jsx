import React, { Component } from 'react';
import Slider from "react-slick";

import SearchBars from './components/SearchBars/SearchBars';
import Clock from './components/Clock/Clock';
import Weather from './components/Weather/Weather';

class App extends Component {
    buildImages() {
        let folderChoice = 'nature';
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
        const images = this.buildImages();
        const settings = {
            arrows: false,
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className="App">
                <SearchBars />
                <Clock />
                <Weather />
                <Slider className="slider" {...settings}>
                    {images}
                </Slider>
            </div>
        );
    }
}

export default App;
