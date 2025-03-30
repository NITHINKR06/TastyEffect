// ExampleCarouselImage.js
import React from 'react';
import imagePath from '../../assets/recipe1.jpg'

const ExampleCarouselImage = ({ text }) => {
//   const imagePath = require(`../assets/${text}.jpg`).default;

  return (
    <img
      className="d-block w-100"
      src={imagePath}
      alt={text}
    />
  );
};

export default ExampleCarouselImage;
