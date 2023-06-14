import { PillsProps } from "./Interface";
import closeIcon from "../assets/close.svg";

const Pills = ({
  label,
  isEditable,
  handleDelete,
}: PillsProps): JSX.Element => {
  return (
    <>
      <div className="tw-rounded-full tw-bg-[#eeeeee] tw-h-[33px] tw-px-[16px] tw-py-[7px] tw-my-[10px] tw-inline-block tw-align-middle tw-leading-none tw-mr-5 tw-w-auto tw-items-center tw-justify-center tw-mb-2">
        <span className="tw-text-sm">{label}</span>
        {isEditable && (
          <span className="tw-inline-block tw-ml-2" onClick={handleDelete}>
            <img src={closeIcon} alt="" />
          </span>
        )}
      </div>
    </>
  );
};

export default Pills;
