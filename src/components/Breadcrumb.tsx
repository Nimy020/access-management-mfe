import { Link, useNavigate } from "react-router-dom";
import leftArrow from "../assets/leftArrow.svg";
import { NavigationContext } from "../context/NavigationProvider";
import { useContext } from "react";
import homeIcon from "../assets/home.svg";

const Breadcrumb = ({ crumbs }) => {
  const navigate = useNavigate();
  const { setPreviousPageName, previousPageName } =
    useContext(NavigationContext);

  return (
    <>
      <button
        className="tw-flex tw-gap-1.5 tw-items-center tw-mb-6"
        onClick={() => {
          setPreviousPageName([]);
          navigate("/csc-agent-platform/admin/access-management");
        }}
      >
        <img src={homeIcon} className="tw-w-7 tw-h-5" alt="" />
        Home
      </button>
      {previousPageName.length > 1 && (
        <button
          className="tw-flex tw-gap-2 tw-items-center"
          onClick={() => {
            previousPageName.pop();
            setPreviousPageName(previousPageName);
            navigate(-1);
          }}
        >
          <img src={leftArrow} alt="" />
          {previousPageName[previousPageName.length - 1]}
        </button>
      )}
    </>
  );
};

export default Breadcrumb;
