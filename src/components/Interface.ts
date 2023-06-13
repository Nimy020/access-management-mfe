export interface AccordianProps {
  title?: string;
  children?: JSX.Element;
  isEditable?: boolean;
}
export interface ModalProps {
  isOpen?: boolean;
  onClose?: any;
  children?: JSX.Element;
  title?: string;
}
export interface PillsProps {
  label?: string;
}
export interface CreateNewFeatureProps {
  setModalState?: any;
  featureId?: string;
}
export interface FeatureHeadProps {
  setModalState?: any;
  //  Object type should be declared
  featureState?: any;
}
export interface SubFeatureContentProps {
  //  Object type should be declared
  item?: any;
}
