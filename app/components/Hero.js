'use client';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
const Hero = () => {
  return (
    <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
    <div className="bg-blue-500 py-36 text-white text-center h-500">
    </div>
    </CSSTransition>
  );
};

export default Hero;
