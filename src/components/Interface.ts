export interface AccordianProps {
  title?: string;
  subTitle?: string;
  children?: JSX.Element;
  isEditable?: boolean;
  handleDelete?: any;
  handleLink?: any;
}
export interface ModalProps {
  isOpen?: boolean;
  onClose?: any;
  children?: JSX.Element;
  title?: string;
}
export interface PillsProps {
  handleDelete?: any;
  label?: string;
  onChange?: any;
  isEditable?: any;
  pillId?: string;
  type?: string;
}
export interface CreateNewFeatureProps {
  setModalState?: any;
  featureId?: string;
}
export interface FeatureHeadProps {
  setModalState?: any;
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
  featureName: string;
  handleChange?: any;
}
export type LocationState = {
  name: string;
  id?: string;
  type?: string;
};
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
