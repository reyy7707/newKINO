import React, { useState, useEffect } from 'react';
import Dino from './Dino';
import Obstacle from './Obstacle';
import './Game.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((obs) => [...obs, { id: Date.now(), left: 100 }]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setScore((prevScore) => prevScore + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    const checkCollision = () => {
      obstacles.forEach((obstacle) => {
        if (obstacle.left >= 10 && obstacle.left <= 30) {
          if (!isJumping && obstacle.left <= 10) {
            setGameOver(true);
          }
        }
      });
    };

    if (!gameOver) {
      const interval = setInterval(() => {
        setObstacles((obs) =>
          obs.map((obstacle) => ({
            ...obstacle,
            left: obstacle.left - 1,
          }))
        );
        checkCollision();
      }, 30);
      return () => clearInterval(interval);
    }
  }, [obstacles, isJumping, gameOver]);

  const handleJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 500);
    }
  };

  const handleRestart = () => {
    setIsJumping(false);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <>
      <div className="game" onClick={handleJump}>
        {gameOver ? (
          <div className="game-over">Game Over! Score: {score}
            <button className="restart-button" onClick={handleRestart}>
              Restart
            </button>
          </div>
        ) : (
          <>
            <div className="score">Score: {score}</div>
            <div className='rounded-[999px] bg-yellow-500 w-[50px] h-[50px] absolute right-4 top-4'></div>
            <Dino isJumping={isJumping} />
            {obstacles.map((obs) => (
              <Obstacle key={obs.id} left={obs.left} />
            ))}
          </>
        )}
      </div>
      <div className='flex items-center justify-center flex-col pt-28 gap-y-6'>
        <p className='text-xl text-white'>Похоже что такой страницы не существует {`:(`}</p>
        <p className='text-xl text-white'>Можете поиграть в мини-игру {`:>`}</p>
        <Link to={'/'}><p className='text-xl text-white'>Либо вернуться на главную страницу {`:)`}</p></Link>
      </div>
    </>

  );
};

export default ErrorPage
