export interface DropDownProps {
  id: string;
  label: string;
  className?: string;
  onChange?: Function;
  onFocus?: Function;
  defaultValue?: string;
  type?: string;
  options?: any;
  setSelectedOption?: any;
  dropDownRef?: any;
  disabledSelect?: boolean;
  name?: string;
  code?: string;
  selectArrow?: string;
  optionValue?:string;
}
