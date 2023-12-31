import React, { useState } from 'react';

const Carousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <div className="carousel">
      <div className="slides">
          <div
            className={`slide ${currentSlide >=0 ? 'active' : ''}`}
            style={{ backgroundImage: `url(${images[currentSlide]})` }}
          />
      </div>
      <button className="prev-btn" onClick={handlePrevSlide}>
        &lt;
      </button>
      <button className="next-btn" onClick={handleNextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
