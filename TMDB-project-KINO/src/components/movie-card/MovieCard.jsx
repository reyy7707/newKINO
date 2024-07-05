// MovieCard.js
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { category } from '../../api/tmdb';
import './MovieCard.css';
import Stars from '../stars/stars';

const MovieCard = (props) => {
    const item = props.item;
    const link = '/' + category[props.category] + '/' + item.id;
    const bg = 'https://image.tmdb.org/t/p/w500' + item.poster_path;
    console.log(item);

    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
                <div className="movie-card__overlay">
                    <h3>{item.title || item.name}</h3>
                </div>
                <div className="movie-card__ratings">
                    <span className="movie-card__vote-count">
                        {item.popularity}
                    </span>
                </div>
            </div>
        </Link>
    );
};

MovieCard.propTypes = {
    item: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired,
    isActor: PropTypes.bool,
};

export default MovieCard;
