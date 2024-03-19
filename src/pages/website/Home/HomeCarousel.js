import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import "./home.css";
import { FormattedMessage } from "react-intl";

const HomeCarousel = () => {

    return (
        <>
            <Carousel className={"carousel"} variant="light">
                <Carousel.Item>
                    <img
                        className="d-block mx-auto w-3/4 rounded-lg"
                        src= {require( "../../../assets/image1.jpeg")}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h5><FormattedMessage id="homecarousel.gestiona"/></h5>
                        <p><FormattedMessage id="homecarousel.servicios"/></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block mx-auto w-3/4 rounded-lg"
                        src={require( "../../../assets/image2.jpeg")}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h5><FormattedMessage id="homecarousel.clientes"/></h5>
                        <p><FormattedMessage id="homecarousel.clientes2"/></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block mx-auto w-3/4 rounded-lg"
                        src={require( "../../../assets/image3.jpeg")}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h5><FormattedMessage id="homecarousel.third"/></h5>
                        <p>
                            <FormattedMessage id="homecarousel.third2"/>
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default HomeCarousel;