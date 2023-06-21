import { useNavigate, matchRoutes } from "react-router-dom";
import search from "../assets/Union.svg";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import customStyles from "./SearchDropDown/customStyles";
import { pageHeader } from "./Interface";
import Breadcrumb from "./Breadcrumb";
import routes from "../routes";
import { NavigationContext } from "../context/NavigationProvider";

const PageHeader = ({
  seachItem,
  label,
  searchId,
  searchBy,
}: pageHeader): React.JSX.Element => {
  const id = "1234";
  const [{ route }] = matchRoutes(routes, location);
  // const { crumbs } = route;
  const navigate = useNavigate();
  const { setPreviousPageName, previousPageName } =
    useContext(NavigationContext);

  const [isActive, setIsActive] = useState(false);
  const [options, setOptions] = useState([]);

  const inputRef = useRef(null);
  const { CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL } = process.env;

  const handleSearchTermChange = async (val) => {
    setIsActive(true);
    const searchTerm = val.value;
    try {
      const response = await axios.get(
        `${CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL}${seachItem}${searchTerm}`
      );
      const responseData = response.data;
      if (responseData === "") {
        setOptions([]);
      } else {
        setOptions(responseData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
    setPreviousPageName(["Dashboard"]);
    navigate(
      `/csc-agent-platform/admin/access-management/${searchBy}/${optionId}`
    );
  };

  return (
    <div className="tw-bg-gray-3 tw-items-center">
      <div className="tw-px-5 tw-sm:tw-px-16 tw-lg:tw-px-36 tw-py-11 tw-flex tw-h-[10rem]">
        <div className="tw-text-left tw-basis-1/2">
          {previousPageName.length > 0 ? (
            <Breadcrumb crumbs={previousPageName} />
          ) : (
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
                  handleSearchTermChange(e.target).catch((err) =>
                    console.error(err)
                  );
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
                          key={itemId}
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
