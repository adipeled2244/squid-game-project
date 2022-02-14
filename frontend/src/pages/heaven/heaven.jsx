import React from 'react';

import './heaven.css'

// import pageNotFoundImg from './404.png'

import img1 from './cloud1.png'
import img2 from './cloud2.png'
import img3 from './cloud3.png'
import img4 from './cloud4.png'
import img5 from './cloud5.png'

export function Heaven() {
    return (
        <div className='heaven-page'>
        <div className="container">
        <div className="banner">
            <h2 id="text">Heaven</h2>
            <div className="clouds">
                <img src={img1} alt="" style={{'--i':1}} />
                <img src={img2} alt="" style={{'--i':2}} />
                <img src={img3} alt="" style={{'--i':3}} />
                <img src={img4} alt="" style={{'--i':4}} />
                <img src={img5} alt="" style={{'--i':5}} />
                <img src={img1} alt="" style={{'--i':10}}  />
                <img src={img2} alt="" style={{'--i':9}} />
                <img src={img3} alt="" style={{'--i':8}} />
                <img src={img4} alt="" style={{'--i':7}} />
                <img src={img5} alt="" style={{'--i':6}} />
            </div>
        </div>
    </div>
    </div>
    );
}
