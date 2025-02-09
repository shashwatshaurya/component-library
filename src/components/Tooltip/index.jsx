import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({
  children,
  componentRef,
  toolMessage,
  messageWrapperClass,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const ownClass = `absolute transform transition-opacity duration-200 ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'} z-10 bg-secondary-200 text-text rounded px-2 py-1 mt-1 text-sm`;

  useEffect(() => {
    const component = componentRef.current;
    const handleMouseOver = () => {
      setIsHovered(true);
    };
    const handleMouseOut = () => {
      setIsHovered(false);
    };
    if (component) {
      component.addEventListener('mouseover', handleMouseOver);
      component.addEventListener('mouseout', handleMouseOut);
    }
    return () => {
      if (component) {
        component.removeEventListener('mouseover', handleMouseOver);
        component.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, [componentRef]);

  return (
    <div>
      {children}
      <div className={`${messageWrapperClass} ${ownClass}`}>{toolMessage}</div>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node,
  componentRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  toolMessage: PropTypes.node | PropTypes.string,
  messageWrapperClass: PropTypes.string,
};

export default Tooltip;
