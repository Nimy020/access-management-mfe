import React from "react";
import Pills from "./Pills";
import { useNavigate } from "react-router-dom";
import { LocationState, SubFeatureContentProps } from "./Interface";

export default function SubFeatureContent({
  item,
  featureName,
  handleChange,
}: SubFeatureContentProps): JSX.Element {
  const state: LocationState = { featureName: featureName };

  const navigate = useNavigate();

  const handleLinkClick = () => {
    navigate(`/access-management/feature/${item.featureId}`, {
      state: state,
    });
  };
  return (
    <div className="tw-max-w-2xl">
      <p>{item.featureDescription}</p>
      <div className="tw-mt-7">
        <h3 className="tw-text-base tw-font-bold">Roles</h3>
        <div>
          {item.roles.length > 0 &&
            item.roles.map((role) => (
              <Pills
                key={role.roleId}
                label={role.roleName}
              />
            ))}
        </div>
      </div>
      <div className="tw-mt-7">
        <div className="tw-basis-1/2">
          <h3 className="tw-text-base tw-font-bold">Sub features</h3>
        </div>
        <div className="tw-basis-1/2 tw-flex">
          <div className="">
            {item.subFeatures.length > 0 &&
              item.subFeatures.map((sf) => (
                <Pills
                  key={sf.featureId}
                  label={sf.featureName}
                />
              ))}
          </div>
          <div className="">
            <button
              className="tw-flex tw-items-center tw-w-[100px]"
              onClick={handleLinkClick}
            >
              <div className="tw-flex tw-items-center tw-justify-center tw-w-[15px] tw-h-[15px] tw-border tw-rounded-full tw-border-gray-2 tw-bg-transparent tw-test-sm tw-text-gray-2">
                +
              </div>
              <div>Add New</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
