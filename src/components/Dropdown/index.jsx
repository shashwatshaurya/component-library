import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from 'react';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';
import Chip from '../Chip';

const Option = memo(({ option, isSelected, onSelect }) => (
  <li
    role="option"
    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center
      ${isSelected ? 'bg-primary-50' : ''}`}
    aria-selected={isSelected}
    onClick={() => onSelect(option)}
  >
    {option.label}
    {isSelected && <FaCheck className="text-secondary-400 text-sm" />}
  </li>
));

const Dropdown = memo(
  ({
    options,
    value,
    onChange,
    isMultiple = false,
    isSearchable = false,
    disabled = false,
    placeholder = 'Select...',
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);

    const filteredOptions = useMemo(
      () =>
        options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      [options, searchTerm]
    );

    const selectedValues = useMemo(
      () =>
        isMultiple
          ? value?.reduce((acc, i) => [...acc, i?.value ?? ''], []) || []
          : [value?.value],
      [value, isMultiple]
    );

    const handleClickOutside = useCallback((event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }, []);

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);

    const handleSelect = useCallback(
      (option) => {
        if (isMultiple) {
          const isSelected = selectedValues.includes(option.value);
          onChange(
            isSelected
              ? value.filter((v) => v.value !== option.value)
              : [...(value || []), option]
          );
        } else {
          onChange(option);
          setIsOpen(false);
        }
      },
      [isMultiple, onChange, selectedValues, value]
    );

    const handleKeyDown = useCallback(
      (e) => {
        switch (e.key) {
          case 'Escape':
            setIsOpen(false);
            break;
          case 'ArrowDown':
            if (!isOpen) {
              setIsOpen(true);
              e.preventDefault();
            }
            break;
          default:
            break;
        }
      },
      [isOpen]
    );

    return (
      <div
        ref={dropdownRef}
        className="relative w-full"
        onKeyDown={handleKeyDown}
      >
        {
          <button
            type="button"
            className={`
          w-full px-4 py-2 text-left bg-white border rounded-md flex overflow-x-scroll scrollbar-none
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-primary'}
        `}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            disabled={disabled}
          >
            {value ? (
              isMultiple ? (
                value.length ? (
                  value.map((v) => (
                    <Chip closable wrapperClass="text-white mr-1 text-xs">
                      {v.label}
                    </Chip>
                  ))
                ) : (
                  <span className="text-gray-400">{placeholder}</span>
                )
              ) : (
                value.label
              )
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </button>
        }
        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
            {isSearchable && (
              <input
                ref={searchRef}
                type="text"
                className="w-full p-2 border-b"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
              />
            )}
            <ul
              className="max-h-60 overflow-auto"
              role="listbox"
              aria-multiselectable={isMultiple}
            >
              {filteredOptions.map((option) => (
                <Option
                  key={option.value}
                  option={option}
                  isSelected={selectedValues.includes(option.value)}
                  onSelect={handleSelect}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

Option.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
  ]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isSearchable: PropTypes.bool,
  isMultiple: PropTypes.bool,
  disabled: PropTypes.bool,
};

Dropdown.displayName = 'Dropdown';
Option.displayName = 'Option';

export default Dropdown;
