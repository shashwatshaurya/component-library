import React, { useRef, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';
import './index.css';

const TimelineItem = ({
  id,
  icon,
  title,
  content,
  hasTooltip,
  tooltipContent,
  tooltipWrapperClass,
  alignment,
  isLast,
}) => {
  const [contentWidth, setContentWidth] = useState();
  const [contentHeight, setContentHeight] = useState();
  const componentRef = useRef(null);
  const contentContainerRef = useRef(null);

  const styleProp =
    alignment === 'horizontal'
      ? { width: contentWidth + 'px' }
      : { height: contentHeight + 'px' };

  useLayoutEffect(() => {
    const container = contentContainerRef.current;

    if (container) {
      const updateWidthAndHeight = () => {
        const containerWidth = container.getBoundingClientRect().width;
        const containerHeight = container.getBoundingClientRect().height;
        setContentWidth(containerWidth);
        setContentHeight(containerHeight);
      };

      // Initial width calculation
      updateWidthAndHeight();

      // Create ResizeObserver for dynamic updates
      const resizeObserver = new ResizeObserver(updateWidthAndHeight);
      resizeObserver.observe(container);

      // Cleanup
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [contentContainerRef]);

  const alignmentClasses = {
    horizontal: 'flex-col items-center',
    vertical: 'flex-row items-start',
  };

  const renderContent = () => {
    return (
      <div
        ref={componentRef}
        id={id}
        className={`timeline-item relative flex gap-4 ${alignmentClasses[alignment]}`}
      >
        <div
          className={`icon-container ${alignment === 'horizontal' ? 'mb-4' : ''}`}
        >
          {icon ? (
            <div className="timeline-icon w-5 h-5 rounded-full flex items-center justify-center">
              {icon}
            </div>
          ) : (
            <div className="w-3 h-3 p-2 relative rounded-full bg-primary" />
          )}
          {!isLast && (
            <div
              className={`
                absolute bg-gray-200 transition-all duration-300 ${
                  alignment === 'horizontal'
                    ? `h-[2px] left-full top-1/2 -translate-y-1/2`
                    : `w-[2px] left-1/2 top-full -translate-x-1/2`
                }`}
              style={styleProp}
            />
          )}
        </div>

        <div
          ref={contentContainerRef}
          className={`timeline-content flex-grow ${alignment === 'horizontal' ? 'text-center' : ''}`}
        >
          <h3 className="font-bold">{title}</h3>
          <p>{content}</p>
        </div>
      </div>
    );
  };

  return hasTooltip ? (
    <Tooltip
      toolMessage={tooltipContent}
      componentRef={componentRef}
      messageWrapperClass={tooltipWrapperClass}
    >
      {renderContent()}
    </Tooltip>
  ) : (
    renderContent()
  );
};

const Timeline = ({ alignment = 'vertical', timelineItems }) => {
  return (
    <div
      className={`timeline-container flex ${alignment === 'vertical' ? 'flex-col' : 'flex-row'} gap-6 relative`}
    >
      {timelineItems.map((item, index) => {
        return (
          <TimelineItem
            {...item}
            alignment={alignment}
            isLast={timelineItems.length === index + 1}
          />
        );
      })}
    </div>
  );
};

Timeline.propTypes = {
  alignment: PropTypes.oneOf(['vertical', 'horizontal']),
  timelineItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.node,
      title: PropTypes.string,
      content: PropTypes.string,
      hasTooltip: PropTypes.bool,
      tooltipContent: PropTypes.string,
      tooltipWrapperClass: PropTypes.string,
    })
  ),
};

export default Timeline;
