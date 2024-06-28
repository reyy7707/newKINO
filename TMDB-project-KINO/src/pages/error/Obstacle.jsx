import React from 'react';
import './Obstacle.css';

const Obstacle = ({ left }) => {
  return <div className="obstacle" style={{ left: `${left}%` }}></div>;
};

export default Obstacle;
