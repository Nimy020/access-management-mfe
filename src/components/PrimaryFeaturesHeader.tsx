import { FeatureHeadProps } from "./Interface";

const PrimaryFeaturesHeader = ({
  setModalState,
}: FeatureHeadProps): JSX.Element => {
  return (
    <div className="tw-relative">
      <div className="tw-flex tw-items-center tw-pt-10 tw-pb-7 tw-border-b-2 tw-border-b-black">
        <div className="tw-basis-1/2">
          <h1 className="tw-text-xl tw-font-bold">
            Primary Features
          </h1>
        </div>
        <div className="tw-flex tw-basis-1/2 tw-justify-end tw-items-center">
          <button
            className="tw-w-[250px] tw-h-[38px] tw-font-bold tw-border-2 tw-border-black tw-rounded-full tw-ml-5"
            onClick={() => setModalState({ isOpen: true, action: "add", priamryFeatue: true, parentFeatureId: "" })}
          >
            Add Primary Feature
          </button>
        </div>
      </div>
    </div>
  );
};
export default PrimaryFeaturesHeader;
