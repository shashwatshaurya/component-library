import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaXmark } from 'react-icons/fa6';

const Chip = memo(
  ({
    closable = false,
    onClick = () => {},
    onCloseClick = () => {},
    wrapperClass = '',
    children,
  }) => {
    const handleClose = useCallback(
      (e) => {
        e.stopPropagation();
        onCloseClick(e);
      },
      [onCloseClick]
    );

    const baseClasses =
      'bg-primary-400 text-nowrap flex items-center justify-center p-2 text-sm rounded-full';
    const closeIconClasses = 'pl-1 border-l border-current ml-1 cursor-pointer';

    return (
      <div
        className={`${baseClasses} ${wrapperClass}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        <span>{children}</span>
        {closable && (
          <span
            onClick={handleClose}
            className={closeIconClasses}
            role="button"
            aria-label="remove"
            tabIndex={0}
          >
            <FaXmark className="w-4 h-4 text-current" />
          </span>
        )}
      </div>
    );
  }
);

Chip.propTypes = {
  closable: PropTypes.bool,
  onClick: PropTypes.func,
  onCloseClick: PropTypes.func,
  wrapperClass: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Chip.displayName = 'Chip';

export default Chip;
