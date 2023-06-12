// import React from "react";
// import "../Styles.css";
import search from "../assets/Union.svg";

export default function PageHeader() {
  const id = "1234";
  return (
    <div className="tw-bg-gray-3 tw-items-center">
      <div className="tw-px-36 tw-py-11 tw-flex tw-items-center">
        <div className="tw-text-left tw-basis-1/2">
          <div className="tw-font-bold tw-text-[26px]">Access Management</div>
          <div>User Name:{id}</div>
        </div>
        <div className="tw-flex tw-basis-1/2 tw-justify-end">
          <div className="tw-mr-2.5 tw-rounded-full tw-border-2 tw-border-gray tw-bg-white tw-flex tw-items-center tw-justify-start tw-w-[250px] tw-h-[44px] tw-flex">
            <img className="tw-pl-3 tw-pr-2" src={search} alt="" />
            <input
              className="tw-border-0 focus:tw-outline-none tw-bg-transparent"
              placeholder="Search"
            ></input>
          </div>
          <div>
            <button className="tw-bg-black tw-rounded-full tw-h-[44px] tw-w-[130px] tw-text-white">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
