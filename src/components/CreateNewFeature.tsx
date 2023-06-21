import React, { useContext, useEffect } from "react";
import { TextBox, Button } from "@sephora-csc/csc-component-library";
import { CreateNewFeatureProps } from "./Interface";
import SearchDropDown from "./SearchDropDown/SearchDropDown";
import { postFeatureData } from "../utils/apiServices";
import Pills from "./Pills";
import { ModalContext } from "../context/ModalProvider";

const { CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL } = process.env;

const CreateNewFeature = ({
  featureId,
}: CreateNewFeatureProps): React.JSX.Element => {
  const { closeModal, modalForm, setModalForm, error, setError } =
    useContext(ModalContext);

  const handleModalSubmit = async () => {
    setError("");
    if (!modalForm.featureName || !modalForm.featureDescription) {
      setError("please complete all fields");
      return;
    }
    const roleIds = modalForm?.roles?.map((role) => {
      return role.roleId;
    });

    const subFeaturesIds = modalForm?.subFeatures?.map((feature) => {
      return feature.featureId;
    });
    const newFeatureData = {
      parentFeatureId: featureId,
      featureName: modalForm.featureName,
      featureDescription: modalForm.featureDescription,
      roleIds: roleIds,
      subFeatures: subFeaturesIds,
    };

    const postAsyncData = async () => {
      try {
        await postFeatureData(newFeatureData);
        closeModal("addFeature");
        setModalForm({ refresh: true });
      } catch (error) {
        console.error("Error during POST request:", error);
      }
    };

    await postAsyncData();
  };

  const handleFormChange = (fieldName, fieldValue) => {
    let updatedForm = fieldValue;
    let fieldId = fieldName === "roles" ? "roleId" : "featureId";
    if (fieldName === "roles" || fieldName === "subFeatures") {
      const checkIfpresent = modalForm[fieldName].find(
        (item) => item[fieldId] === fieldValue[fieldId]
      );
      if (!checkIfpresent) {
        updatedForm = modalForm[fieldName];
        updatedForm?.push(fieldValue);
        setModalForm({ ...modalForm, [fieldName]: updatedForm });
      }
    } else {
      setModalForm({ ...modalForm, [fieldName]: updatedForm });
    }
  };

  const handleSelectedDelete = (selectedId, fieldName) => {
    const fieldId = fieldName === "roles" ? "roleId" : "featureId";
    if (selectedId) {
      const updated = modalForm[fieldName]?.filter(
        (value) => value[fieldId] !== selectedId
      );
      setModalForm({ ...modalForm, [fieldName]: updated });
    }
  };
  useEffect(() => {
    setModalForm({
      featureName: "",
      featureDescription: "",
      roles: [],
      subFeatures: [],
    });
  }, []);
  return (
    <>
      <div className="tw-mt-5">
        <TextBox
          label="Feature Name"
          onChange={(e) => handleFormChange("featureName", e.target.value)}
        />
      </div>
      <div className="tw-mt-3 tw-relative">
        <textarea
          onChange={(e) =>
            handleFormChange("featureDescription", e.target.value)
          }
          className="tw-peer tw-h-[120px] tw-pt-5 tw-flex tw-flex-wrap tw-pb-1.5 tw-px-3 tw-border tw-outline-none tw-rounded-4 tw-text-sm tw-text-black  tw-w-full tw-bg-white tw-border-gray focus:tw-border-black tw-"
        />
        <span className="tw-absolute tw-left-3.5 tw-top-2  tw-pointer-events-none tw-transition tw-ease-in tw-delay-200 tw-text-xs peer-placeholder-shown:tw-top-3.5 peer-placeholder-shown:tw-text-sm peer-focus:tw-pointer-events-none peer-focus:tw-top-1 peer-focus:tw-transition peer-focus:tw-ease-in peer-focus:tw-delay-200 peer-focus:tw-text-xs">
          {"Feature Description"}
        </span>
      </div>
      <div className="tw-mt-4 tw-font-bold">{"Roles"}</div>
      <div className="tw-mt-2.5">
        <SearchDropDown
          id={"role"}
          className={"col-span-6"}
          label={"Select Roles"}
          type="select"
          setSelectedOption={(value) => handleFormChange("roles", value)}
          disabledSelect={true}
          name={"roleName"}
          code={"roleId"}
          selectArrow={"greyArrow"}
          apiUrl={CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/all/roles/"}
          defaultValue={""}
        />
      </div>

      <div className="tw-mt-2.5">
        <div className="">
          {modalForm?.roles?.length > 0 &&
            modalForm?.roles?.map((sf) => (
              <Pills
                key={sf.roleId}
                label={sf.roleName}
                isEditable={true}
                handleDelete={(id) => handleSelectedDelete(id, "roles")}
                pillId={sf.roleId}
              />
            ))}
        </div>
      </div>

      <div className="tw-mt-4 tw-font-bold">{"Subfeatures"}</div>
      <div className="tw-mt-2.5">
        <SearchDropDown
          id={"subRole"}
          className={"col-span-6"}
          label={"Select Sub Features"}
          type="select"
          setSelectedOption={(value) => handleFormChange("subFeatures", value)}
          defaultValue={""}
          disabledSelect={true}
          name={"featureName"}
          code={"featureId"}
          selectArrow={"greyArrow"}
          apiUrl={CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/all/features/"}
        />
      </div>

      <div className="tw-mt-2.5">
        <div className="">
          {modalForm?.subFeatures?.length > 0 &&
            modalForm?.subFeatures?.map((sf) => (
              <Pills
                key={sf.featureId}
                label={sf.featureName}
                isEditable={true}
                handleDelete={(id) => handleSelectedDelete(id, "subFeatures")}
                pillId={sf.featureId}
              />
            ))}
        </div>
      </div>
      {error && <div className="tw-text-red"> {error}</div>}
      <div className="tw-mt-[30px]  tw-text-center">
        <Button
          label={"Submit"}
          type={"primary"}
          className={"tw-w-[180px]"}
          disabled={false}
          onClick={handleModalSubmit}
        ></Button>
      </div>
    </>
  );
};
export default CreateNewFeature;
