import React from 'react';
import './error-indicator.css';
import image from './death-star.png';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <div className="boom">BOOM!</div>
      <img src={image} alt="death star" />
      <div>something has gone terribly wrong</div>
      <div>(but we have already sent droids to fix it)</div>
    </div>
  )
};

export default ErrorIndicator;
