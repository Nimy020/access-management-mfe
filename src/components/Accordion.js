import React from "react";

export default function Accordion({ title, children }) {
  return (
    <div className="tw-border-t-2 tw-border-b-2 tw-border-gray-3 tw-py-4">
      <div className="tw-flex tw-justify-between tw-items-start">
        <h3 className="tw-text-lg tw-font-bold">{title}</h3>
        <div>{children}</div>
        <div className="tw-w-2 tw-h-2 tw-border-black tw-border-b-2 tw-border-r-2 tw-transform tw-rotate-45"></div>
      </div>
    </div>
  );
}
