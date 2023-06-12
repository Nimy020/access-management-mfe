import React, { useState } from "react";

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="tw-border-t-2 tw-border-b-2 tw-border-gray-3 tw-py-4">
      <div
        className="tw-flex tw-justify-between tw-items-start"
        onClick={toggleAccordion}
      >
        <h3 className="tw-text-lg tw-font-bold">{title}</h3>
        {isOpen && <div>{children}</div>}
        <div
          className={`tw-accordion-icon tw-transition-transform tw-duration-300 ${
            isOpen ? "tw-rotate-180" : ""
          }`}
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
  );
}
