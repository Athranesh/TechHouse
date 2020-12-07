import React from 'react';
import PropTypes from 'prop-types';

function Rating({ value, text, color }) {
  const maxStars = 5;

  let starCount = value;

  const uiStarClasses = [];

  while (uiStarClasses.length < maxStars) {
    const uiStar =
      starCount >= 1
        ? 'fas fa-star'
        : starCount >= 0.5
        ? 'fas fa-star-half-alt'
        : 'far fa-star';
    starCount -= 1;
    uiStarClasses.push(uiStar);
  }

  return (
    <div className="rating">
      {uiStarClasses.map((uiStarClass, index) => {
        return (
          <span key={index}>
            <i style={{ color }} className={uiStarClass}></i>
          </span>
        );
      })}{' '}
      <span>{text && text}</span>
    </div>
  );
}

Rating.defaultProps = {
  color: '#f8e825',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
