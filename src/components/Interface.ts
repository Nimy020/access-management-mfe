import React from "react";

export interface AccordianProps {
  title?: string;
  subTitle?: string;
  children?: React.JSX.Element;
  isEditable?: boolean;
  handleDelete?: any;
  handleLink?: any;
}
export interface ModalProps {
  isOpen?: boolean;
  onClose?: any;
  children?: React.JSX.Element;
  title?: string;
}
export interface PillsProps {
  handleDelete?: any;
  label?: string;
  isEditable?: any;
  pillId?: string;
  type?: string;
  previousPage?:string;
}
export interface CreateNewFeatureProps {
  setModalState?: any;
  featureId?: string;
}
export interface FeatureHeadProps {
  setIsEditable?: any;
  isEditable?: boolean;
  handleChange?: any;
  handleSaveChanges?: any;
  //  Object type should be declared
  featureState?: any;
  handleCancel?: any;
}
export interface SubFeatureContentProps {
  //  Object type should be declared
  item?: any;
  previousPage:string;
}

export interface RoleProps {
  setModalState?: any;
  initialValues?: any;
}
export type pageHeader = {
  seachItem?: string;
  label?: string;
  searchId?: any;
  searchBy?: string;
};
