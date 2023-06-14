import { useCallback, useRef, useState } from "react";
import { TextBox, Button } from "@sephora-csc/csc-component-library";
import Dropdown from "../components/Dropdown/Dropdown";
import { CreateNewFeatureProps } from "./Interface";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// const roles = [
//   {
//     roleId: "1",
//     roleName: "csc_agent_tier1",
//   },
//   {
//     roleId: "2",
//     roleName: "csc_agent_tier2",
//   },
//   {
//     roleId: "3",
//     roleName: "csc_agent_tier3",
//   },
// ];

// const subFeatures = [
//   {
//     featureId: null,
//     featureName: "Order_personal_fields_name",
//   },
//   {
//     featureId: null,
//     featureName: "Order_personal_fields_email",
//   },
// ];

const CreateNewFeature = ({
  setModalState,
  featureId,
}: CreateNewFeatureProps): JSX.Element => {
  const [modalForm, setModalForm] = useState({
    roles: null,
    subFeatures: null,
    featureDescription: null,
    featureName: null,
  });
  const roleRef = useRef(null);
  const subFeatureRef = useRef(null);
  const navigate = useNavigate();

  const handleModalSubmit = () => {
    let formData;
    if (featureId)
      formData = {
        ...modalForm,
        roleIds: [selectedRole],
        subFeatures: [selectedFeature],
        parentFeatureId: featureId,
      };
    else
      formData = {
        ...modalForm,
        roleIds: [selectedRole],
        subFeatures: [selectedFeature],
        parentFeatureId: "",
      };
    const POST_DATA = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    
    if (
      modalForm.roles === null ||
      modalForm.subFeatures === null ||
      modalForm.featureDescription === null ||
      modalForm.featureName === null
    ) {
      setError("please fill all fields");
    } else if (modalForm.roles.code == "" || modalForm.subFeatures.code == "") {
      setError("please enter valid role or sub feature");
    } else {
      setError("");
      let apiUrl = `https://csc-agent-platform-service-qa1.lower.internal.sephora.com/csc-agent-platform-service/v1/acl/feature/`;
      fetch(apiUrl, POST_DATA)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Request failed with status " + response.status);
          }
        })
        .then((responseData) => {
          setModalState({ isOpen: false, action: "" });
          navigate(0);
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  };

  const handleFormChange = (fieldName, fieldValue) => {
    setModalForm({ ...modalForm, [fieldName]: fieldValue });
  };

  const [error, setError] = useState("");
  const [options, setOptions] = useState([]);
  const [subOptions, subsetOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState([]);
  const handleSearchTermChange = async (val) => {
    const searchTerm = val.value;
    try {
      const response = await axios.get(
        `https://csc-agent-platform-service-qa1.lower.internal.sephora.com/csc-agent-platform-service/v1/acl/all/roles/${searchTerm}`
      );
      const data = response.data;
      if (data === "") {
        setOptions([]);
      } else {
        setOptions(data);
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  const handleSubFeature = async (val) => {
    const searchTerm = val.value;
    try {
      const response = await axios.get(
        `https://csc-agent-platform-service-qa1.lower.internal.sephora.com/csc-agent-platform-service/v1/acl/all/features/${searchTerm}`
      );
      const data = response.data;
      if (data === "") {
        subsetOptions([]);
      } else {
        subsetOptions(data);
      }
    } catch (error) {
      // console.error("Error:", error);
    }
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
      <div
        className="tw-mt-2.5"
        onChange={(e) => handleSearchTermChange(e.target)}
      >
        <Dropdown
          id={"role"}
          className={"col-span-6"}
          label={"Select Roles"}
          type="select"
          options={options}
          setSelectedOption={(value) => {
            setSelectedRole(value.code);
            handleFormChange("roles", value);
          }}
          defaultValue={modalForm.roles?.name || ""}
          dropDownRef={roleRef}
          disabledSelect={true}
          name={"roleName"}
          code={"roleId"}
          selectArrow={"greyArrow"}
        />
      </div>
      <div className="tw-mt-4 tw-font-bold">{"Subfeatures"}</div>
      <div className="tw-mt-2.5" onChange={(e) => handleSubFeature(e.target)}>
        <Dropdown
          id={"subRole"}
          className={"col-span-6"}
          label={"Select Sub Features"}
          type="select"
          options={subOptions}
          setSelectedOption={(value) => {
            setSelectedFeature(value.code);
            handleFormChange("subFeatures", value);
          }}
          defaultValue={modalForm.subFeatures?.name || ""}
          dropDownRef={subFeatureRef}
          disabledSelect={true}
          name={"featureName"}
          code={"featureId"}
          selectArrow={"greyArrow"}
        />
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
