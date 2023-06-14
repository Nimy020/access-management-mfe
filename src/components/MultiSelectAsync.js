import React, { useState, useEffect } from "react";

const CustomMultiSelectDropdown = ({
  apiUrl,
  placeholder,
  onChange,
  defaultValue,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(defaultValue || []);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (inputValue) {
      fetchOptions(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  const fetchOptions = async (inputValue) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}?search=${inputValue}`);
      const data = await response.json();
      const options = data.options.map((option) => ({
        value: option.id,
        label: option.name,
      }));
      setOptions(options);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching options:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const handleOptionSelect = (option) => {
    const selectedOption = options.find((o) => o.value === option.value);
    if (!selectedOptions.includes(selectedOption)) {
      const updatedSelectedOptions = [...selectedOptions, selectedOption];
      setSelectedOptions(updatedSelectedOptions);
      if (onChange) {
        onChange(updatedSelectedOptions);
      }
    }
    setInputValue("");
  };

  const handleOptionRemove = (option) => {
    const updatedSelectedOptions = selectedOptions.filter(
      (o) => o.value !== option.value
    );
    setSelectedOptions(updatedSelectedOptions);
    if (onChange) {
      onChange(updatedSelectedOptions);
    }
  };

  return (
    <div>
      <div>
        {selectedOptions.map((option) => (
          <span key={option.value} className="pill">
            {option.label}
            <button
              type="button"
              className="pill-close"
              onClick={() => handleOptionRemove(option)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder || "Type to search..."}
      />
      {isLoading ? (
        <p>Loading options...</p>
      ) : (
        <ul>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomMultiSelectDropdown;
