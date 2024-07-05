import React from 'react';
import './stars.css';

const Stars = ({ popularity }) => {

    const maxStars = 5;
    
    const starsCount = Math.min(Math.round(popularity / 100), maxStars);

    const stars = Array.from({ length: starsCount }, (_, index) => (
        <span key={index} className="star">&#9733;</span>
    ));

    return <div className="stars">{stars}</div>;
};

export default Stars;
