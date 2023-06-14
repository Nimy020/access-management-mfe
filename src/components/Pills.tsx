import { PillsProps } from "./Interface";
import closeIcon from "../assets/close.svg";

const Pills = ({ label, isEditable }: PillsProps): JSX.Element => {
  return (
    <>
      <div className="tw-rounded-full tw-bg-[#eeeeee] tw-h-[33px] tw-px-[16px] tw-py-[9px] tw-inline-block tw-align-middle tw-leading-none tw-mr-5 tw-w-auto tw-items-center tw-justify-center">
        {label}
        {isEditable && (
          <span className="tw-inline-block tw-ml-2">
            <img src={closeIcon} alt="" />
          </span>
        )}
      </div>
    </>
  );
};

export default Pills;
