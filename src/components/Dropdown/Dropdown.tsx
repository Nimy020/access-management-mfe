/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useRef } from "react";
import customStyles from "./customStyles";
import tickMark from "./tickMark.svg";
import blackArrow from "./select-arrow-black.svg";
import greyArrow from "./select-arrow-grey.svg";
import downArrow from "./down-arrow.svg";

const Dropdown = (props) => {
  const [optionsHeight, setOptionsHeight] = useState("auto");
  const optionsRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setfiltered] = useState([]);
  const filteredOptionsMethod = () => {
    const filteredCountries = props.options?.filter((countryState) => {
      const lowerCaseCountryState = countryState?.[props.name]?.toLowerCase();
      const lowerCaseInputValue = props.defaultValue?.toLowerCase();
      return lowerCaseCountryState?.includes(lowerCaseInputValue);
    });
    return filteredCountries;
  };

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

  const [tick, setTick] = useState(props.defaultValue);
  const images = {
    blackArrow: { src: blackArrow, alt: "blackArrow" },
    greyArrow: { src: greyArrow, alt: "greyArrow" },
  };

  const handleValue = (nameWithCode) => {
    props.setSelectedOption({
      code: nameWithCode[props.code],
      name: nameWithCode[props.name],
    });

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
        onChange={(e) => {
          props.setSelectedOption({ code: "", name: e.target.value });
          setIsOpen(true);
          setfiltered(filteredOptionsMethod);
          props?.onChange;
        }}
        onFocus={
          props?.onFocus &&
          ((e) => {
            props.onFocus(e);
            setIsOpen(true);
          })
        }
        className={`${customStyles.textBox.base} ${customStyles.dropdown.outlineBorder}`}
        value={props.defaultValue}
        defaultValue={props.defaultValue}
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
            <img src={downArrow} alt="downArrow" />
          ) : (
            <img
              src={images[props?.selectArrow]?.src || images.greyArrow.src}
              alt={props.selectArrow}
            ></img>
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
          {(filtered?.length > 0 ? filtered : props.options).map(
            (option, index) => (
              <li
                key={index}
                value={option}
                className={customStyles.dropdown.optionsList}
                id={index}
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
            )
          )}
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

export default Dropdown;
