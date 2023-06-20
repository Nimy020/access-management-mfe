import { useRef, useState } from "react";
import { TextBox, Button } from "@sephora-csc/csc-component-library";
import { CreateNewFeatureProps } from "./Interface";
import SearchDropDown from "./SearchDropDown/SearchDropDown";
import axios from "axios";
import Pills from "./Pills";
import { useNavigate } from "react-router-dom";

// const { CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL, API_TIMEOUT } = process.env;

const CreateNewFeature = ({
  setModalState,
  featureId,
}: CreateNewFeatureProps): JSX.Element => {
  const [roles, setRoles] = useState([]);
  const [subFeatures, setSubFeatures] = useState([]);
  const navigate = useNavigate();

  const [modalForm, setModalForm] = useState({
    featureName: "",
    featureDescription: "",
    roles: [],
    subFeatures: [],
  });
  const roleRef = useRef(null);
  const subFeatureRef = useRef(null);

  const handleModalSubmit = () => {
    // let formData;
    // const roleIds = modalForm?.roles?.map((role) => {
    //   return role.roleId;
    // });

    // const subFeaturesIds = modalForm?.subFeatures?.map((feature) => {
    //   return feature.featureId;
    // });
    // const parentFeatureId = featureId ? featureId : "";
    // const newFeatureData = {
    //   parentFeatureId: featureId,
    //   featureName: modalForm.featureName,
    //   featureDescription: modalForm.featureDescription,
    //   roleIds: roleIds,
    //   subFeatures: subFeaturesIds,
    // };

    // const api_headers_Data = {
    //   "Content-Type": "application/json",
    // };

    // const postAsyncData = async () => {
    //   try {
    //     const response = await axios.post(
    //       CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/feature",
    //       newFeatureData,
    //       { headers: api_headers_Data }
    //     );
    //     setModalState({ isOpen: false, action: "" });
    //     navigate(0);
    //   } catch (error) {
    //     console.error("Error during POST request:", error);
    //   }
    // };

    // postAsyncData();
  };

  const handleFormChange = (fieldName, fieldValue) => {
    let updatedForm = fieldValue;
    if (Array.isArray(modalForm[fieldName])) {
      updatedForm = modalForm[fieldName];
      updatedForm?.push(fieldValue);
    }
    setModalForm({ ...modalForm, [fieldName]: updatedForm });
  };

  const handleSelectedRoleDelete = (selectedRoleID) => {
    if (selectedRoleID) {
      const updatedRoles = modalForm?.roles?.filter(
        (value) => value.roleId !== selectedRoleID
      );
      setModalForm({ ...modalForm, roles: updatedRoles });
    }
  };

  const handleSelectedFeatureDelete = (selectedFeatureId) => {
    if (selectedFeatureId) {
      const updatedFeatures = modalForm?.subFeatures?.filter(
        (value) => value.featureId !== selectedFeatureId
      );
      setModalForm({ ...modalForm, subFeatures: updatedFeatures });
    }
  };

  const handleRoleDropDownChange = async (inputValue) => {
    // try {
    //   if (inputValue?.name) {
    //     const response = await axios.get(
    //       CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/all/roles/" + inputValue.name
    //     );
    //     let filteredData = [];
    //     if (response?.data) {
    //       return response?.data;
    //     }
    //   } else {
    //     return null;
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    return null;
  };

  const handleFeatureDropDownChange = async (inputValue) => {
    // try {
    //   if (inputValue?.name) {
    //     const response = await axios.get(
    //       CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL +
    //         "/all/features/" +
    //         inputValue.name
    //     );
    //     let filteredData = [];
    //     if (response?.data) {
    //       return response?.data;
    //     }
    //   } else {
    //     return null;
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    return null;
  };

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
          options={roles}
          setSelectedOption={(value) => handleFormChange("roles", value)}
          dropDownRef={roleRef}
          disabledSelect={true}
          name={"roleName"}
          code={"roleId"}
          selectArrow={"greyArrow"}
          onChange={handleRoleDropDownChange}
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
                handleDelete={handleSelectedRoleDelete}
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
          options={subFeatures}
          setSelectedOption={(value) => handleFormChange("subFeatures", value)}
          defaultValue={""}
          dropDownRef={subFeatureRef}
          disabledSelect={true}
          name={"featureName"}
          code={"featureId"}
          selectArrow={"greyArrow"}
          onChange={handleFeatureDropDownChange}
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
                handleDelete={handleSelectedFeatureDelete}
                pillId={sf.featureId}
              />
            ))}
        </div>
      </div>

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
