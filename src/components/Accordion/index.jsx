import React, { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown } from 'react-icons/fa';

const AccordionItem = memo(
  ({
    item,
    index,
    isOpen,
    onToggle,
    icon = <FaChevronDown className="text-secondary-500" />,
    iconClass = '',
    fontSize,
  }) => (
    <div className="width-full py-4">
      <button
        className={`w-full flex justify-between items-center border-b shadow-sm border-gray-200 p-2 mb-3 cursor-pointer focus:outline-none`}
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${index}`}
        style={{ fontSize }}
      >
        <h3 className="text-left">{item.title}</h3>
        <span
          className={`transform transition-transform duration-200 ease-in-out ${
            isOpen ? 'rotate-180' : ''
          } ${iconClass}`}
        >
          {icon}
        </span>
      </button>
      <div
        id={`accordion-content-${index}`}
        role="region"
        aria-labelledby={`accordion-header-${index}`}
        className={`transition-all duration-200 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {item.content}
      </div>
    </div>
  )
);

const Accordion = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  fontSize,
  icon,
  iconClass,
}) => {
  const [openSections, setOpenSections] = useState(defaultOpen);

  const toggleSection = useCallback(
    (index) => {
      setOpenSections((prev) => {
        const isOpen = prev.includes(index);
        if (allowMultiple) {
          return isOpen ? prev.filter((i) => i !== index) : [...prev, index];
        }
        return isOpen ? [] : [index];
      });
    },
    [allowMultiple]
  );

  return (
    <div className="accordion" role="tablist">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id || index}
          item={item}
          fontSize={fontSize}
          index={index}
          isOpen={openSections.includes(index)}
          onToggle={toggleSection}
          icon={icon}
          iconClass={iconClass}
        />
      ))}
    </div>
  );
};

AccordionItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    id: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  icon: PropTypes.node,
  iconClass: PropTypes.string,
  fontSize: PropTypes.string,
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
      id: PropTypes.string,
    })
  ).isRequired,
  allowMultiple: PropTypes.bool,
  defaultOpen: PropTypes.arrayOf(PropTypes.number),
  icon: PropTypes.node,
  iconClass: PropTypes.string,
  fontSize: PropTypes.string,
};

export default memo(Accordion);
