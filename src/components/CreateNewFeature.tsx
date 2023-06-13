import React, { useRef, useState } from "react";
import { TextBox, Dropdown, Button } from "@sephora-csc/csc-component-library";
import { CreateNewFeatureProps } from "./Interface";

const roles = [
  {
    roleId: "1",
    roleName: "csc_agent_tier1",
  },
  {
    roleId: "2",
    roleName: "csc_agent_tier2",
  },
  {
    roleId: "3",
    roleName: "csc_agent_tier3",
  },
];

const subFeatures = [
  {
    featureId: null,
    featureName: "Order_personal_fields_name",
  },
  {
    featureId: null,
    featureName: "Order_personal_fields_email",
  },
];

const CreateNewFeature = ({
  setModalState,
  featureId,
}: CreateNewFeatureProps): JSX.Element => {
  const [modalForm, setModalForm] = useState({
    roles: null,
    subFeatures: null,
  });
  const roleRef = useRef(null);
  const subFeatureRef = useRef(null);

  const handleModalSubmit = () => {
    let formData;
    if (featureId) formData = { ...modalForm, parentFeatureId: featureId };
    else formData = { ...modalForm, parentFeatureId: "" };
    const POST_DATA = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    // let apiUrl =
    //   modalState.action === "add"
    //     ? "http://localhost:9000/csc-agent-platform-service/v1/acl/feature"
    //     : `http://localhost:9000/csc-agent-platform-service/v1/acl/feature/${params.id}`;

    // fetch(apiUrl, POST_DATA)
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error("Request failed with status " + response.status);
    //     }
    //   })
    //   .then((responseData) => {
    //     setModalState({ isOpen: false, action: "" });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const handleFormChange = (fieldName, fieldValue) => {
    setModalForm({ ...modalForm, [fieldName]: fieldValue });
  };

  return (
    <>
      <div className=" tw-mt-5 tw-text-center tw-text-[#676567] tw-opacity-100">
        Sed eu semper ligula. Proin dapibus nunc quis ligula ullamcorper
        venenatis. Nulla mollis sagittis
      </div>
      <div className="tw-mt-5">
        <TextBox
          label="Feature Name"
          onChange={(e) => handleFormChange("featureName", e.target.value)}
        />
      </div>
      <div className="tw-mt-3 tw-relative">
        <input
          type={"text"}
          onChange={(e) =>
            handleFormChange("featureDescription", e.target.value)
          }
          className="tw-rounded-md tw-border tw-border-gray focus:tw-border-black tw-h-[120px] tw-w-[380px] tw-opacity-100"
        />
        <span className="tw-absolute tw-text-[#676567] tw-left-3.5 tw-top-3.5 tw-pointer-events-none tw-transition tw-ease-in tw-delay-200 tw-text-xs peer-placeholder-shown:tw-top-3.5 peer-placeholder-shown:tw-text-sm peer-focus:tw-pointer-events-none peer-focus:tw-top-1 peer-focus:tw-transition peer-focus:tw-ease-in peer-focus:tw-delay-200 peer-focus:tw-text-xs">
          {"Feature Description"}
        </span>
      </div>
      <div className="tw-mt-4 tw-font-bold">{"Roles"}</div>
      <div className="tw-mt-2.5">
        <Dropdown
          id={"role"}
          className={"col-span-6"}
          label={"Select Roles"}
          type="select"
          options={roles}
          setSelectedOption={(value) => handleFormChange("roles", value)}
          defaultValue={modalForm.roles?.name || ""}
          dropDownRef={roleRef}
          disabledSelect={true}
          name={"roleName"}
          code={"roleId"}
          selectArrow={"greyArrow"}
        />
      </div>
      <div className="tw-mt-4 tw-font-bold">{"Subfeatures"}</div>
      <div className="tw-mt-2.5">
        <Dropdown
          id={"subRole"}
          className={"col-span-6"}
          label={"Select Sub Features"}
          type="select"
          options={subFeatures}
          setSelectedOption={(value) => handleFormChange("subFeatures", value)}
          defaultValue={modalForm.subFeatures?.name || ""}
          dropDownRef={subFeatureRef}
          disabledSelect={true}
          name={"featureName"}
          code={"featureId"}
          selectArrow={"greyArrow"}
        />
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
