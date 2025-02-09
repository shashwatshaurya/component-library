import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  label,
  defaultChecked = true,
  onChange = () => {},
  id,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  return (
    <label htmlFor={id} className="text-center">
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          setIsChecked((prev) => !prev);
          onChange(e);
        }}
        className="mr-1"
      />
      {label}
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired || PropTypes.node.isRequired,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired,
};

export default Checkbox;
