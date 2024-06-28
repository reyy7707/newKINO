import React from 'react';
import './Dino.css';

const Dino = ({ isJumping }) => {
    return <div className={`dino ${isJumping ? 'jump' : ''}`}></div>;
};

export default Dino;
