import { useNavigate } from "react-router-dom";
import { FeatureHeadProps } from "./Interface";
import { deleteFeature } from "../utils/apiServices";
import React, { useContext, useState } from "react";
import { NavigationContext } from "../context/NavigationProvider";
import { FeatureContext } from "../context/FeatureProvider";

const FeatureHead = ({
  handleSaveChanges,
  handleCancel,
}: FeatureHeadProps): React.JSX.Element => {
  const navigate = useNavigate();
  
  const { setPreviousPageName } = useContext(NavigationContext);
  const { featureState, setIsEditable, isEditable } =
    useContext(FeatureContext);

  const [featureForm, setFeatureForm] = useState({
    featureName: featureState?.featureName,
    featureDescription: featureState?.featureDescription,
  });

  const handleChange = (fieldName, fieldValue) => {
    setFeatureForm({ ...featureForm, [fieldName]: fieldValue });
  };

  const handleFeatureDelete = () => {
    if (confirm("Are you sure you want to delete this feature?")) {
      deleteFeature(featureState.featureId)
        .then(() => {
          setPreviousPageName([]);
          navigate("/csc-agent-platform/admin/access-management/");
        })
        .catch((error) => {
          console.error("Error deleting:", error);
        });
    }
  };

  return (
    <div className="tw-relative">
      <div className="tw-flex tw-items-center tw-pt-10 tw-pb-7 tw-border-b-2 tw-border-b-black">
        {!isEditable && (
          <>
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
                <>
                  <button
                    onClick={() => setIsEditable(true)}
                    className="tw-mr-5 hover:tw-underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleFeatureDelete}
                    className="tw-w-[150px] tw-h-[38px] tw-border-2 tw-border-black tw-rounded-full tw-ml-5"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </>
        )}
        {isEditable && (
          <>
            <div className="tw-basis-1/2">
              <h1
                className="tw-text-xl tw-font-bold"
                contentEditable
                suppressContentEditableWarning
                onKeyUp={(e) => {
                  const target = e.target as HTMLElement;
                  handleChange("featureName", target.innerText);
                }}
              >
                {featureState?.featureName}
              </h1>
              <p
                className="tw-text-sm tw-pt-4 tw-max-w-xl"
                contentEditable
                suppressContentEditableWarning
                onKeyUp={(e) => {
                  const target = e.target as HTMLElement;
                  handleChange("featureDescription", target.innerText);
                }}
              >
                {featureState?.featureDescription}
              </p>
            </div>
            <div className="tw-flex tw-basis-1/2 tw-justify-end tw-items-center">
              <button onClick={() => handleSaveChanges(featureForm)}>
                Save Changes
              </button>
              <button
                className="tw-w-[150px] tw-h-[38px] tw-border-2 tw-border-black tw-rounded-full tw-ml-5"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default FeatureHead;
