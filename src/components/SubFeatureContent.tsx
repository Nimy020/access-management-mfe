import Pills from "./Pills";
import { SubFeatureContentProps } from "./Interface";

export default function SubFeatureContent({
  item,
  handleChange,
}: SubFeatureContentProps): JSX.Element {  
  return (
    <div className="tw-max-w-2xl">
      <p>{item.featureDescription}</p>
      <div className="tw-mt-7">
        <h3 className="tw-text-base tw-font-bold">Roles</h3>
        <div>
          {item?.roles?.length > 0 &&
            item?.roles?.map((role) => (
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
            {item?.subFeatures?.length > 0 &&
              item?.subFeatures?.map((sf) => (
                <Pills
                  key={sf.featureId}
                  label={sf.featureName}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
