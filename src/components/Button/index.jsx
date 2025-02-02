import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  customClass,
  variant,
  onClick,
  loading,
  disable,
  children,
  size,
  type = 'button',
  ariaLabel,
}) => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    'outlined-primary': 'bg-white text-primary border border-primary',
    'outlined-secondary': 'bg-white text-secondary border border-secondary',
  };
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  const disableClass = 'bg-gray-300 text-gray-500 cursor-not-allowed';
  const commonClass = 'rounded-md';
  const variantClass = variants[variant];
  const sizeClass = sizes[size];

  if (loading) {
    return (
      <button
        className={`${variantClass} ${sizeClass} ${commonClass} cursor-wait relative`}
        disabled
        aria-busy="true"
        aria-label={loading ? 'Loading' : null}
      >
        <span className="opacity-1">{children}</span>
        <span
          className="absolute inset-0 flex items-center justify-center"
          role="status"
          aria-label="Loading"
        >
          <span className="h-full w-full absolute animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </span>
      </button>
    );
  }
  const buttonClass = `${disable ? disableClass : variantClass} ${sizeClass} ${commonClass}`;
  const finalClass = customClass ? customClass : buttonClass;
  return (
    <button
      type={type}
      className={finalClass}
      onClick={onClick}
      disabled={disable}
      aria-disabled={disable}
      aria-label={ariaLabel}
      role="button"
      tabIndex={disable ? -1 : 0}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  customClass: '',
  onClick: () => {},
  loading: false,
  disable: false,
  variant: 'primary',
  size: 'md',
  type: 'button',
};

Button.propTypes = {
  customClass: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disable: PropTypes.bool,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'outlined-primary',
    'outlined-secondary',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
