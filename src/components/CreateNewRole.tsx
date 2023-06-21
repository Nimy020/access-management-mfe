import React, { useState } from "react";
import { TextBox, Button } from "@sephora-csc/csc-component-library";
import { RoleProps } from "./Interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL } = process.env;

const CreateNewRole = ({
  setModalState,
  initialValues = null,
}: RoleProps): React.JSX.Element => {
  const navigate = useNavigate();

  const [modalForm, setModalForm] = useState({
    roleId: initialValues?.roleId || "",
    roleName: initialValues?.roleName || "",
    roleDescription: initialValues?.roleDescription || "",
  });
  const [error, setError] = useState("");

  const handleModalSubmit = async () => {
    setError("");
    if (!modalForm.roleName || !modalForm.roleDescription) {
      setError("please complete all fields");
      return;
    }

    const newFeatureData = {
      roleName: modalForm.roleName,
      cscMappedRole: modalForm.roleName,
      roleDescription: modalForm.roleDescription,
    };

    const api_headers_Data = {
      "Content-Type": "application/json",
    };
    const postAsyncData = async (roleId) => {
      try {
        if (initialValues?.roleId) {
          await axios.put(
            CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + `/role/${roleId}`,
            newFeatureData,
            { headers: api_headers_Data }
          );
        } else {
          await axios.post(
            CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/role",
            newFeatureData,
            { headers: api_headers_Data }
          );
        }
        setModalState({ isOpen: false, action: "" });
        navigate(0);
      } catch (error) {
        console.error("Error during POST request:", error);
      }
    };

    await postAsyncData(modalForm.roleId);
  };

  const handleFormChange = (fieldName, fieldValue) => {
    let updatedForm = fieldValue;
    if (Array.isArray(modalForm[fieldName])) {
      updatedForm = modalForm[fieldName];
      updatedForm?.push(fieldValue);
    }

    setModalForm({ ...modalForm, [fieldName]: updatedForm });
  };

  return (
    <>
      <div className="tw-mt-5">
        <TextBox
          label="Name"
          onChange={(e) => handleFormChange("roleName", e.target.value)}
          value={modalForm.roleName}
        />
      </div>
      <div className="tw-mt-3 tw-relative">
        <textarea
          onChange={(e) => handleFormChange("roleDescription", e.target.value)}
          className="tw-peer tw-h-[120px] tw-pt-5 tw-flex tw-flex-wrap tw-pb-1.5 tw-px-3 tw-border tw-outline-none tw-rounded-4 tw-text-sm tw-text-black  tw-w-full tw-bg-white tw-border-gray focus:tw-border-black tw-"
          value={modalForm.roleDescription}
        />
        <span className="tw-absolute tw-text-[#676567] tw-left-3.5 tw-top-3.5 tw-pointer-events-none tw-transition tw-ease-in tw-delay-200 tw-text-xs peer-placeholder-shown:tw-top-3.5 peer-placeholder-shown:tw-text-sm peer-focus:tw-pointer-events-none peer-focus:tw-top-1 peer-focus:tw-transition peer-focus:tw-ease-in peer-focus:tw-delay-200 peer-focus:tw-text-xs">
          {" Description"}
        </span>
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
export default CreateNewRole;
