/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useRef } from "react";
import closeIcon from "../assets/close.svg";
import { ModalProps } from "./Interface";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps): JSX.Element => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-z-50">
      <div className="tw-modal-overlay tw-fixed tw-inset-0 tw-bg-black tw-opacity-50"></div>
      <div
        ref={modalRef}
        className="tw-modal-container tw-bg-white tw-w-[440px] tw-h-[607px] md:tw-max-w-md tw-mx-auto tw-rounded tw-shadow-lg tw-z-50 tw-overflow-y-auto"
      >
        <div className="tw-py-5 tw-modal-header tw-flex tw-items-center">
          <div className="tw-flex-grow tw-text-center tw-font-bold tw-text-lg">
            {title}
          </div>
          <div className="tw-pr-4">
            <div
              className="tw-modal-close tw-cursor-pointer tw-flex tw-justify-end"
              onClick={onClose}
            >
              <img src={closeIcon} alt="close icon"></img>
            </div>
          </div>
        </div>
        <div>
          <hr className="tw-border-[#EEEEEE] tw-w-full" />
        </div>
        <div className="tw-mx-[30px]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
