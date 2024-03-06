import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import "./home.css";
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
                        <h5>Gestiona tu negocio</h5>
                        <p>+10 servicios</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block mx-auto w-3/4 rounded-lg"
                        src={require( "../../../assets/image2.jpeg")}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h5>Clientes Reservan</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block mx-auto w-3/4 rounded-lg"
                        src={require( "../../../assets/image3.jpeg")}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h5>Third slide label</h5>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default HomeCarousel;