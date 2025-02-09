import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ size = 'md', color = 'primary' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center justify-center"
    >
      <div
        className={`
          animate-spin rounded-full border-4 
          border-gray-200
          border-t-primary
          ${sizes[size]}
        `}
      />
      <span className="sr-only" role="status">
        Loading...
      </span>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.string,
};

export default Loader;
