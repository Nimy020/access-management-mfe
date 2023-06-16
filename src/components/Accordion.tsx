import { useEffect, useState } from "react";
import deleteIcon from "../assets/delete.svg";
import { AccordianProps } from "./Interface";
import editIcon from "../assets/view-edit.svg";
const Accordion = ({
  title,
  children,
  isEditable,
  handleDelete,
  handleLink,
  subTitle,
}: AccordianProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = (e): void => {
    if (isEditable) e.preventDefault();
    else setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isEditable) setIsOpen(false);
  }, [isEditable]);
  return (
    <div className=" tw-border-b tw-pt-6 tw-pb-6">
      <div className="tw-flex tw-justify-between tw-items-start">
        <h3
          className="tw-w-1/6 tw-text-sm tw-font-bold"
          onClick={toggleAccordion}
        >
          {title}
        </h3>
        {!isOpen && (
          <span className="tw-text-sm tw-font-normal tw-w-1/2 tw-truncate">
            {subTitle}
          </span>
        )}
        {isOpen && <div className="tw-w-1/2">{children}</div>}
        <div className="tw-flex tw-w-[74px] tw-gap-4 tw-justify-end">
          {isEditable && (
            <button
              onClick={handleDelete}
              className="tw-w-[74px] tw-h-[36px] tw-bg-[#EEEEEE] tw-text-sm tw-text-[#666666] tw-rounded-full"
            >
              Delete
            </button>
          )}

          {!isEditable && (
            <>
              <button onClick={handleLink} className="tw-w-[20px]">
                <img src={editIcon} alt="Edit"></img>
              </button>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Accordion;
