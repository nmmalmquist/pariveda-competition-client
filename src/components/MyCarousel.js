import React from "react";
import { Carousel } from "react-bootstrap";





const MyCarousel = ({ imageLinks }) => {
  return (
    <Carousel>
      {imageLinks.map((link) => (
        <Carousel.Item key={link}>
          <img className="d-block w-100" src={link} alt="dog slide" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
