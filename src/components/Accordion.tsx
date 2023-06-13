import React, { useState } from "react";
import deleteIcon from "../assets/delete.svg";
import { AccordianProps } from "./Interface";

const Accordion = ({
  title,
  children,
  isEditable,
}: AccordianProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = (): void => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="tw-border-t-2 tw-border-b tw-pt-5 tw-pb-8">
      <div className="tw-flex tw-justify-between tw-items-start">
        <h3 className="tw-text-normal tw-font-bold" onClick={toggleAccordion}>
          {title}
        </h3>
        {isOpen && <div className="tw-w-1/2">{children}</div>}
        <div className="tw-flex tw-w-[55px] tw-gap-4 tw-justify-end">
          {isEditable && (
            <img className="tw-w-[20px]" src={deleteIcon} alt="" />
          )}
          <div
            className={`tw-accordion-icon tw-transition-transform tw-duration-300 ${
              isOpen ? "tw-rotate-180" : ""
            }`}
            onClick={toggleAccordion}
          >
            <svg
              className="tw-w-6 tw-h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Accordion;
