const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-z-50">
      <div className="tw-modal-overlay tw-fixed tw-inset-0 tw-bg-black tw-opacity-50"></div>
      <div className="tw-modal-container tw-bg-white tw-w-2/3 md:tw-max-w-md tw-mx-auto tw-rounded tw-shadow-lg tw-z-50 tw-overflow-y-auto">
        <div className="tw-modal-header tw-p-6">{title}</div>
        <div className="tw-modal-content tw-py-4 tw-text-left tw-px-6">
          <div
            className="tw-modal-close tw-cursor-pointer tw-flex tw-justify-end p-4"
            onClick={onClose}
          >
            <svg
              className="tw-fill-current tw-h-4 tw-w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                className="tw-text-gray-400"
                fillRule="evenodd"
                d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 11-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
