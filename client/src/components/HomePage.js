import React, { Component } from 'react';
import CarouselProduct from './Carousel';
import { connect } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';
import imageasus from '../Supports/image/asus_logo.png';
import imageacer from '../Supports/image/acer_logo.png';
import imagelenovo from '../Supports/image/lenovo_logo.png';
import imagehp from '../Supports/image/hp_logo.png';
import imagemsi from '../Supports/image/msi_logo.png';
import imagedell from '../Supports/image/dell_logo.png';

// IMPORT CSS
import '../Supports/css/components/scrollup.css';


class HomePage extends Component {

    scrollToTop() {
        scroll.scrollToTop();
    }


    render() {
        return (
            <div>
                <div className="welcome-image">
                    <section className="welcome_area">
                        <div className="container h-100">
                            <div style={{ marginRight: "650px" }} className="row h-100 align-items-center">
                                <div className="col-12">
                                    <div className="hero-content">
                                        <h6>asoss</h6>
                                        <h2>New Collection</h2>
                                        <a href="/shop" className="btn essence-btn">Shop Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div>
                    <div className="top_catagory_area section-padding-80 clearfix">
                        <div className="container">
                            <div className="row justify-content-center">
                                {/* <!-- Single Catagory --> */}
                                <div className="col-12 col-sm-6 col-md-4">
                                    <a href="/shop?category=Laptop">
                                        <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img blaptop">
                                            <div className="catagory-content">
                                                <a href="/shop?category=Laptop">Laptop</a>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                {/* <!-- Single Catagory --> */}
                                <div className="col-12 col-sm-6 col-md-4">
                                    <a href="/shop?category=Component">
                                        <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img bcomponents" >
                                            <div className="catagory-content">
                                                <a href="/shop?category=Component">Component</a>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                {/* <!-- Single Catagory --> */}
                                <div className="col-12 col-sm-6 col-md-4">
                                    <a href="/shop?category=Accesories">
                                        <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img baccesories">
                                            <div className="catagory-content">
                                                <a href="/shop?category=Accesories">Accesories</a>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Popular Product</h1>
                    <CarouselProduct />
                </div>

                {/* <!-- ##### Brands Area Start ##### --> */}
                <div class="brands-area d-flex align-items-center justify-content-between">
                    {/* <!-- Brand Logo --> */}
                    <div class="single-brands-logo">
                        <img src={imageasus} alt="" />
                    </div>
                    {/* <!-- Brand Logo --> */}
                    <div class="single-brands-logo">
                        <img src={imageacer} alt="" />
                    </div>
                    {/* <!-- Brand Logo --> */}
                    <div class="single-brands-logo">
                        <img src={imagelenovo} alt="" />
                    </div>
                    <div className="single-brands-logo">
                        <img src={imagehp} alt="" />
                    </div>
                    <div className="single-brands-logo">
                        <img src={imagemsi} alt="" />
                    </div>
                    <div className="single-brands-logo">
                        <img src={imagedell} alt="" />
                    </div>
                </div>
                {/* <!-- ##### Brands Area End ##### --> */}

                <footer className="footer_area clearfix">
                    <div class="container">
                        <div class="row">
                            {/* <!-- Single Widget Area --> */}
                            <div class="col-12 col-md-6">
                                <div class="single_widget_area d-flex mb-30">
                                    {/* <!-- Logo --> */}
                                    <div class="footer-logo mr-50">
                                        <a href="#"><img src="img/core-img/logo2.png" alt="" /></a>
                                    </div>
                                    {/* <!-- Footer Menu --> */}
                                    <div class="footer_menu">
                                        <ul>
                                            <li><a href="shop.html">Shop</a></li>
                                            <li><a href="blog.html">Blog</a></li>
                                            <li><a href="contact.html">Contact</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Single Widget Area --> */}
                            <div class="col-12 col-md-6">
                                <div class="single_widget_area mb-30">
                                    <ul class="footer_widget_menu">
                                        <li><a href="#">Order Status</a></li>
                                        <li><a href="#">Payment Options</a></li>
                                        <li><a href="#">Shipping and Delivery</a></li>
                                        <li><a href="#">Guides</a></li>
                                        <li><a href="#">Privacy Policy</a></li>
                                        <li><a href="#">Terms of Use</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="row align-items-end">
                            {/* <!-- Single Widget Area --> */}
                            <div class="col-12 col-md-6">
                                <div class="single_widget_area">
                                    <div class="footer_heading mb-30">
                                        <h6>Subscribe</h6>
                                    </div>
                                    <div class="subscribtion_form">
                                        <form action="#" method="post">
                                            <input type="email" name="mail" class="mail" placeholder="Your email here" />
                                            <button type="submit" class="submit"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Single Widget Area --> */}
                            <div class="col-12 col-md-6">
                                <div class="single_widget_area">
                                    <div class="footer_social_area">
                                        <a href="#" data-toggle="tooltip" data-placement="top" title="Facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                                        <a href="#" data-toggle="tooltip" data-placement="top" title="Instagram"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                                        <a href="#" data-toggle="tooltip" data-placement="top" title="Twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                                        <a href="#" data-toggle="tooltip" data-placement="top" title="Pinterest"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
                                        <a href="#" data-toggle="tooltip" data-placement="top" title="Youtube"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

                <div id="floating-action-button" onClick={this.scrollToTop}>
                    <i class="material-icons"><span className="fa fa-arrow-up"></span></i>
                </div>

            </div>
        )
    }


}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps)(HomePage);