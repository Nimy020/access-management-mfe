import { PillsProps } from "./Interface";
import closeIcon from "../assets/close.svg";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { NavigationContext } from "../context/NavigationProvider";

const Pills = ({
  label,
  isEditable,
  handleDelete,
  pillId,
  type,
  previousPage,
}: PillsProps): React.JSX.Element => {
  const navigate = useNavigate();
  const { setPreviousPageName, previousPageName } =
    useContext(NavigationContext);

  const handleDeleteClick = () => {
    handleDelete(pillId);
  };

  const handlePillClick = () => {
    if (type && !isEditable) {
      setPreviousPageName([...previousPageName, previousPage]);
      navigate(`/csc-agent-platform/admin/access-management/${type}/${pillId}`);
    }
  };
  return (
    <>
      <div
        className="tw-rounded-full tw-cursor-pointer hover:tw-bg-[#E5F2FD] tw-bg-[#eeeeee] tw-h-[33px] tw-px-[16px] tw-py-[7px] tw-my-[10px] tw-inline-block tw-align-middle tw-leading-none tw-mr-5 tw-w-auto tw-items-center tw-justify-center tw-mb-2"
        onClick={handlePillClick}
      >
        <span className="tw-text-sm">{label}</span>
        {isEditable && (
          <span className="tw-inline-block tw-ml-2" onClick={handleDeleteClick}>
            <img src={closeIcon} alt="" />
          </span>
        )}
      </div>
    </>
  );
};

export default Pills;
