import React from "react";

/*** Types ***/
type Roles = {
  roleId?: string;
  roleName?: string;
  roleDescription?: string;
};

export type FeatureState = {
  featureId?: string;
  featureName?: string;
  featureDescription?: string;
  roles?: Roles[];
  subFeatures?: FeatureState[];
};

export type pageHeader = {
  seachItem?: string;
  label?: string;
  searchId?: string;
  searchBy?: string;
};
/***  ***/

/*** Interfaces ***/
export interface AccordianProps {
  title?: string;
  subTitle?: string;
  children?: React.JSX.Element;
  isEditable?: boolean;
  handleDelete?: () => void;
  handleLink?: () => void;
}

export interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.JSX.Element;
  title?: string;
}

export interface PillsProps {
  handleDelete?: (id: string) => void;
  label?: string;
  isEditable?: boolean;
  pillId?: string;
  type?: string;
  previousPage?: string;
}

export interface FeatureHeadProps {
  handleSaveChanges?: (params: any) => void;
  handleCancel?: () => void;
}
export interface SubFeatureContentProps {
  item?: FeatureState;
  previousPage: string;
}

export interface RoleProps {
  initialValues?: any;
}
/***  ***/
