import React, { createContext, useState } from "react";

interface ModalContextType {
  modalState: { isOpen: boolean; action: string };
  openModal: (action: any) => void;
  closeModal: (action: any) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider: React.FC = ({ children }) => {
  const [modalState, setModalState] = useState({ isOpen: false, action: "" });

  const openModal = (action) => {
    setModalState({ isOpen: true, action });
  };

  const closeModal = (action) => {
    setModalState({ isOpen: false, action });
  };

  const modalContextValue: ModalContextType = {
    modalState,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};
