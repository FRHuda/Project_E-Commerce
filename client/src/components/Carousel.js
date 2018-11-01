import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

class CarouselProduct extends Component {

    render() {
        return (
            <div>
                <Carousel showThumbs={false} showIndicators={false} className="container kucing">
                    <div className="merdeka">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/41KIZ8g7gFL.jpg" alt="Movie 1" style={{height: "600px",width:"800px"}} />
                        <p className="legend">Legend 1</p>
                    </div>
                    <div className="merdeka">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/81g7AiqWrtL._SX425_.jpg" alt="Movie 2" style={{height: "600px",width:"800px"}} />
                        <p className="legend">Legend 2</p>
                    </div>
                    <div className="merdeka">
                        <img src="http://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/Acer_Predator_21_X/Acer_Predator_21_X_L_1.jpg" alt="Movie 3" style={{height: "600px",width:"800px"}}/>
                        <p className="legend">Legend 3</p>
                    </div>
                </Carousel>
            </div>
        )
    }
}

export default CarouselProduct;