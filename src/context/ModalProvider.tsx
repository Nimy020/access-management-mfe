import React, { createContext, useState } from "react";

interface ModalContextType {
  modalState: { isOpen: boolean; action: string };
  openModal: (action: any) => void;
  closeModal: (action: any) => void;
  modalForm: any;
  setModalForm: (param: any) => void;
  error: string;
  setError: (param: any) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider: React.FC = ({ children }) => {
  const [modalState, setModalState] = useState({ isOpen: false, action: "" });
  const [modalForm, setModalForm] = useState({ refresh: true });
  const [error, setError] = useState("");

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
    modalForm,
    setModalForm,
    error,
    setError,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};
