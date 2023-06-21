import { useEffect, useState, useRef } from "react";
import { SearchDropDownProps } from "./Interface";
import customStyles from "./customStyles";
import tickMark from "./tickMark.svg";
import blackArrow from "./select-arrow-black.svg";
import greyArrow from "./select-arrow-grey.svg";
import downArrow from "./down-arrow.svg";
import debounce from "lodash.debounce";
import axios from "axios";

const SearchDropDown = (props: SearchDropDownProps) => {
  const [optionsHeight, setOptionsHeight] = useState("auto");
  const optionsRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setfiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      const visibleHeight =
        window.innerHeight -
        (optionsRef?.current?.getBoundingClientRect()?.top ?? 0);
      setOptionsHeight(`${visibleHeight - 64}px`);
    } else {
      setOptionsHeight("auto");
    }
  }, [isOpen]);

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref?.current && !ref?.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const debouncedChangeHandler = debounce(async (value) => {
    await handleDropDownChange(value);
  }, 300); // Set the desired debounce delay (e.g., 300 milliseconds)

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    debouncedChangeHandler(value);
  };

  const handleAsyncDropDownChange = async (inputValue) => {
    try {
      if (inputValue?.name) {
        const response = await axios.get(props.apiUrl + inputValue.name);
        if (response?.data) {
          return response?.data;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  const handleDropDownChange = async (inputValue) => {
    const filterdOptions = await handleAsyncDropDownChange({
      code: "",
      name: inputValue,
    });
    setIsOpen(true);
    setfiltered(filterdOptions);
  };

  const [tick, setTick] = useState(props.defaultValue);
  const images = {
    blackArrow: { src: blackArrow, alt: "blackArrow" },
    greyArrow: { src: greyArrow, alt: "greyArrow" },
  };

  const handleValue = (nameWithCode) => {
    props.setSelectedOption(nameWithCode);
    setTick(nameWithCode[props.name]);
    setIsOpen(false);
  };

  const renderOptionLabel = (option, inputValue) => {
    const lowerCaseOption = option?.toLowerCase();
    const lowerCaseInputValue = inputValue?.toLowerCase();
    let inputIndex = 0;
    let formattedOption = "";

    for (let i = 0; i < option?.length; i += 1) {
      if (
        inputIndex < inputValue?.length &&
        lowerCaseOption[i] === lowerCaseInputValue[inputIndex]
      ) {
        formattedOption += `<span class=${customStyles.dropdown.typingBold}>${option[i]}</span>`;
        inputIndex += 1;
      } else {
        formattedOption += option.slice(i);
        break;
      }
    }
    return <div dangerouslySetInnerHTML={{ __html: formattedOption }} />;
  };

  const inputField = (
    <div ref={ref} data-testid="text-options">
      <input
        id={props?.id}
        data-testid={props?.id}
        onChange={handleChange}
        onFocus={
          props?.onFocus &&
          ((e) => {
            props.onFocus(e);
            setIsOpen(true);
          })
        }
        className={`${customStyles.textBox.base} ${customStyles.dropdown.outlineBorder}`}
        value={searchValue}
        onClick={() => {
          setIsOpen(!isOpen);
          setfiltered([]);
        }}
        contentEditable={true}
        ref={props.dropDownRef}
      />
      {props.disabledSelect && (
        <div
          className={customStyles.dropdown.selectInputToggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <img
              src={images[props?.selectArrow]?.src || images.greyArrow.src}
              alt={props.selectArrow}
            ></img>
          ) : (
            <img src={downArrow} alt="downArrow" />
          )}
        </div>
      )}
      {(filtered?.length > 0 || props.options?.length > 0) && isOpen && (
        <ul
          className={customStyles.dropdown.optionListParent}
          style={{ maxHeight: optionsHeight }}
          ref={optionsRef}
          data-testid="list-options"
        >
          {(filtered?.length > 0 ? filtered : props.options).map((option) => (
            <li
              key={option[props.code]}
              value={option[props.name]}
              className={customStyles.dropdown.optionsList}
              id={option[props.code]}
              onClick={() => {
                handleValue(option);
              }}
            >
              <div>
                {renderOptionLabel(option[props.name], props.defaultValue)}
              </div>
              {tick === option[props.name] && props.defaultValue !== "" && (
                <div>
                  <img
                    className=""
                    src={tickMark}
                    alt={"tick"}
                    role="presentation"
                    data-testid={"tick"}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className={`${customStyles.dropdown.labelParent} ${props.className}`}>
      {inputField}
      {props.label && (
        <span
          className={` ${
            props.defaultValue || isOpen
              ? customStyles.textBox.label.base
              : customStyles.dropdown.labelClass
          } ${customStyles.textBox.label.success}   `}
          onClick={() => setIsOpen(!isOpen)}
        >
          {props.label}
        </span>
      )}
    </div>
  );
};

export default SearchDropDown;
