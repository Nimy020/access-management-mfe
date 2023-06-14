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
  label?: string;
  onChange?: any;
  isEditable?: any;
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
}
export interface SubFeatureContentProps {
  //  Object type should be declared
  item?: any;
  featureName: string;
  handleChange?: any;
}
export type LocationState = {
  featureName: string;
};
