import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  variant = 'basic',
  direction = 'vertical',
  elevated = false,
  interactive = false,
  className = '',
  header,
  media,
  title,
  subtitle,
  children,
  footer,
  actions,
  onClick,
  loading = false,
}) => {
  const baseClasses = 'overflow-hidden rounded-lg';
  const variantClasses = {
    basic: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
    interactive: 'hover:shadow-md transition-shadow duration-200',
  };
  const directionClasses = {
    vertical: 'flex flex-col',
    horizontal: 'flex flex-row',
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[elevated ? 'elevated' : variant]}
        ${directionClasses[direction]}
        ${interactive ? variantClasses.interactive : ''}
        ${loading ? 'animate-pulse' : ''}
        ${className}
      `}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : 'article'}
      tabIndex={interactive ? 0 : undefined}
    >
      {loading ? (
        <div className="space-y-4 p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      ) : (
        <>
          {header && <div className="p-4 border-b">{header}</div>}
          {media && (
            <div className={direction === 'horizontal' ? 'w-1/3' : 'w-full'}>
              {media}
            </div>
          )}
          <div className="p-4 flex-grow">
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {subtitle && <h4 className="text-sm text-gray-600">{subtitle}</h4>}
            {children}
          </div>
          {actions && (
            <div className="px-4 py-3 bg-gray-50 flex gap-2">{actions}</div>
          )}
          {footer && <div className="p-4 border-t">{footer}</div>}
        </>
      )}
    </div>
  );
};

Card.propTypes = {
  variant: PropTypes.oneOf(['basic', 'elevated', 'interactive']),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  elevated: PropTypes.bool,
  interactive: PropTypes.bool,
  className: PropTypes.string,
  header: PropTypes.node,
  media: PropTypes.node,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  actions: PropTypes.node,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default Card;
