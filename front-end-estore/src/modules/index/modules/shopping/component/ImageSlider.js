import React from 'react';
import slider1 from '../../../../../images/slider1.jpg'
import slider2 from '../../../../../images/slider2.jpg'
import slider3 from '../../../../../images/slider3.png'
import { Carousel } from 'antd';
class ImageSlider extends React.Component {
    constructor() {
        super();
    }



    render() {
        const styleImage = { width :'100%', height : '300px' }
        return (
           
                <Carousel effect="fade" style={{ position : 'relative', zIndex : 200}} autoplay>
                    <img src={slider1}/>
                    <img src={slider2} />
                    <img src={slider3} />
                </Carousel>
     
        );
    }
};

export default ImageSlider;