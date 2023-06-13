import React from "react";
import Pills from "./Pills";
import { Link } from "react-router-dom";
import { SubFeatureContentProps } from "./Interface";

export default function SubFeatureContent({
  item,
}: SubFeatureContentProps): JSX.Element {
  return (
    <div className="tw-max-w-2xl">
      <p>{item.featureDescription}</p>
      <div className="tw-mt-7">
        <h3 className="tw-text-base tw-font-bold">Roles</h3>
        <div>
          {item.roles.length > 0 &&
            item.roles.map((role) => (
              <Pills key={role.roleId} label={role.roleName} />
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
                <Pills key={sf.featureId} label={sf.featureName} />
              ))}
          </div>
          <div className="">
            <Link
              className="tw-flex tw-items-center tw-w-[100px]"
              to={`/access-management/feature/${item.featureId}`}
            >
              <div className="tw-flex tw-items-center tw-justify-center tw-w-[15px] tw-h-[15px] tw-border tw-rounded-full tw-border-gray-2 tw-bg-transparent tw-test-sm tw-text-gray-2">
                +
              </div>
              <div>Add New</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
