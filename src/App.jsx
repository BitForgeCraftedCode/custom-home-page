import React, { Component } from 'react';
import Slider from "react-slick";

import wp1 from './images/wp1.jpg';
import wp2 from './images/wp2.jpg';
import wp3 from './images/wp3.jpg';
import wp4 from './images/wp4.jpg';
import wp5 from './images/wp5.jpg';
import wp6 from './images/wp6.jpg';

class App extends Component {

    componentDidMount() {
        var req = require.context("./images", false, /.*\.jpg$/);
        console.log(req.keys());
        req.keys().forEach(function(key){
            req(key);
            console.log(req(key));
        });
    }
    render() {
        const settings = {
            arrows: true,
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className="App">
                <Slider className="slider" {...settings}>
                    <div>
                        <img src={wp1} className="slider__img" alt="wall paper" />
                    </div>
                    <div>
                        <img src={wp2} className="slider__img" alt="wall paper" />
                    </div>
                    <div>
                        <img src={wp3} className="slider__img" alt="wall paper" />
                    </div>
                    <div>
                        <img src={wp4} className="slider__img" alt="wall paper" />
                    </div>
                    <div>
                        <img src={wp5} className="slider__img" alt="wall paper" />
                    </div>
                    <div>
                        <img src={wp6} className="slider__img" alt="wall paper" />
                    </div>
                </Slider>
            </div>
        );
    }
}

export default App;
