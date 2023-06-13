import React from "react";

export default function FeatureHead({ setModalState, featureState }) {
  return (
    <div className="tw-relative">
      <div className="tw-flex tw-items-center tw-pt-10 tw-pb-7 tw-border-b-2 tw-border-b-black">
        <div className="tw-basis-1/2">
          <h1 className="tw-text-xl tw-font-bold">
            {featureState?.featureName}
          </h1>
          <p className="tw-text-sm tw-pt-4 tw-max-w-xl">
            {featureState?.featureDescription}
          </p>
        </div>
        <div className="tw-flex tw-basis-1/2 tw-justify-end tw-items-center">
          {featureState?.featureId && (
            <span
              onClick={() => setModalState({ isOpen: true, action: "edit" })}
            >
              Edit
            </span>
          )}
          <button
            className="tw-w-[150px] tw-h-[38px] tw-font-bold tw-border-2 tw-border-black tw-rounded-full tw-ml-5"
            onClick={() => setModalState({ isOpen: true, action: "add" })}
          >
            Add new Feature
          </button>
        </div>
      </div>
    </div>
  );
}
