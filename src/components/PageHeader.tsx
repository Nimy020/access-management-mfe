import { useNavigate, useParams } from "react-router-dom";
import search from "../assets/Union.svg";
import leftArrow from "../assets/leftArrow.svg";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import customStyles from "./SearchDropDown/customStyles";
import { pageHeader } from "./Interface";

const PageHeader = ({
  seachItem,
  label,
  searchId,
  searchBy,
}: pageHeader): JSX.Element => {
  const id = "1234";
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [options, setOptions] = useState([]);
  const inputRef = useRef(null);
  // const { CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL, API_TIMEOUT } = process.env;
  const handleSearchTermChange = async (val) => {
    setIsActive(true);
    const searchTerm = val.value;
    // try {
    //   const response = await axios.get(
    //     `${CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL}${seachItem}${searchTerm}`
    //   );
    //   const responseData = response.data;
    //   if (responseData === "") {
    //     setOptions([]);
    //   } else {
    //     setOptions(responseData);
    //   }
    // } catch (error) {
    //   // console.error("Error:", error);
    // }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsActive(false);
        inputRef.current.value = "";
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = (optionId) => {
    setIsActive(false);
    sessionStorage.removeItem("breadcrumb");
    navigate(`/access-management/${searchBy}/${optionId}`);
  };
  const breadcrumbArr = JSON.parse(sessionStorage.getItem("breadcrumb"));
  const breadcrumb = breadcrumbArr?.length && breadcrumbArr.pop();
  const params = useParams();
  return (
    <div className="tw-bg-gray-3 tw-items-center">
      <div className="tw-px-5 tw-sm:tw-px-16 tw-lg:tw-px-36 tw-py-11 tw-flex tw-h-[10rem]">
        <div className="tw-text-left tw-basis-1/2">
          {breadcrumb?.name && params?.id && (
            <button
              className="tw-flex tw-gap-2 tw-items-center"
              onClick={() => {
                sessionStorage.setItem(
                  "breadcrumb",
                  JSON.stringify(breadcrumbArr)
                );
                navigate(
                  `/access-management/${breadcrumb?.type}/${
                    breadcrumb?.id || ""
                  }`
                );
              }}
            >
              <img src={leftArrow} alt="" />
              {breadcrumb.name}
            </button>
          )}
          {!breadcrumb?.name && params?.id && (
            <button
              className="tw-flex tw-gap-2 tw-items-center"
              onClick={() => {
                sessionStorage.setItem(
                  "breadcrumb",
                  JSON.stringify(breadcrumbArr)
                );
                navigate(`/access-management/`);
              }}
            >
              <img src={leftArrow} alt="" />
              Primary Features
            </button>
          )}
          {!params?.id && (
            <>
              <div className="tw-font-bold tw-text-[26px]">
                Access Management
              </div>
              <div>User Name:{id}</div>
            </>
          )}
        </div>
        <div className="tw-flex tw-basis-1/2 tw-justify-end">
          <div className="tw-flex tw-flex-col tw-h-fit">
            <div className="tw-mr-2.5 tw-rounded-full tw-border-2 tw-border-gray tw-bg-white tw-flex tw-items-center tw-justify-start tw-w-[250px] tw-h-[44px]">
              <img className="tw-pl-3 tw-pr-2" src={search} alt="" />
              <input
                className="tw-border-0 focus:tw-outline-none tw-bg-transparent"
                placeholder="Search..."
                ref={inputRef}
                onChange={(e) => {
                  handleSearchTermChange(e.target);
                }}
              ></input>
            </div>
            <div className="dropdown">
              {isActive && options?.length > 0 && (
                <ul
                  className=" tw-cursor-pointer tw-max-h-[300px] tw-h-auto tw-border tw-bg-white tw-border-gray tw-rounded-4 tw-overflow-y-auto tw-z-10 tw-relative tw-w-[250px]  tw-py-2"
                  data-testid="list-options"
                >
                  {options?.length > 0 &&
                    options.map((option, index) => {
                      let itemName, itemId;
                      if (option.hasOwnProperty(label)) {
                        itemName = option[label];
                        itemId = option[searchId];
                      }
                      return (
                        <li
                          key={index}
                          value={option}
                          className={customStyles.dropdown.optionsList}
                          onClick={() => {
                            handleClick(itemId);
                          }}
                        >
                          {itemName}
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
