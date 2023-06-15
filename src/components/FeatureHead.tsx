import { useNavigate } from "react-router-dom";
import { FeatureHeadProps } from "./Interface";
import axios from "axios";

const FeatureHead = ({
  setModalState,
  featureState,
  setIsEditable,
  isEditable,
  handleChange,
  handleSaveChanges,
}: FeatureHeadProps): JSX.Element => {
  
  const navigate = useNavigate();
  console.log(featureState);
  const handleFeatureDelete = () => {

    console.log("Feature state in Feature head", featureState);

    if (confirm("Are you sure you want to delete this feature?")) {

      axios

        .delete(

          `https://csc-agent-platform-service-qa1.lower.internal.sephora.com/csc-agent-platform-service/v1/acl/feature/${featureState.featureId}`

        )

        .then((response) => {

          console.log("Delete successful");

        })

        .catch((error) => {

          console.error("Error deleting:", error);

        });

      sessionStorage.clear();

      navigate("/access-management/feature/");

      window.location.reload();

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
                    className="hover:tw-underline"
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
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button
                className="tw-w-[150px] tw-h-[38px] tw-font-bold tw-border-2 tw-border-black tw-rounded-full tw-ml-5"
                onClick={() => setIsEditable(false)}
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
