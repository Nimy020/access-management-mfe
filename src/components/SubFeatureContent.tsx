import Pills from "./Pills";
import { SubFeatureContentProps } from "./Interface";

export default function SubFeatureContent({
  item,
  handleChange,
}: SubFeatureContentProps): JSX.Element {
  return (
    <div className="tw-max-w-2xl">
      <p className="tw-text-sm">{item.featureDescription}</p>
      <div className="tw-mt-7">
        <h3 className="tw-text-sm tw-font-bold tw-pb-4">Roles</h3>
        <div>
          {item?.roles?.length > 0 &&
            item?.roles?.map((role) => (
              <Pills key={role.roleId} label={role.roleName} type="roles" />
            ))}
        </div>
      </div>
      <div className="tw-mt-7">
        <div className="tw-basis-1/2">
          <h3 className="tw-text-sm tw-font-bold tw-pb-4">Sub features</h3>
        </div>
        <div className="tw-basis-1/2 tw-flex">
          <div className="">
            {item?.subFeatures?.length > 0 &&
              item?.subFeatures?.map((sf) => (
                <Pills
                  key={sf.featureId}
                  pillId={sf.featureId}
                  label={sf.featureName}
                  type="feature"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
