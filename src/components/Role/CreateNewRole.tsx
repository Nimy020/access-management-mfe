import { useRef, useState } from "react";
import { TextBox, Dropdown, Button } from "@sephora-csc/csc-component-library";
import {  RoleProps } from "../Interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// const { CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL, API_TIMEOUT } = process.env;

const CreateNewRole = ({
  setModalState,
  initialValues=null,
 }: RoleProps): JSX.Element => {
  const navigate = useNavigate();
 

  const [modalForm, setModalForm] = useState({
    roleId:initialValues?.roleId||'',
    roleName: initialValues?.roleName || '',
    roleDescription: initialValues?.roleDescription || '',
  });
  const [error,setError]=useState("");
  
  const handleModalSubmit = () => {
       setError("");
      if(!modalForm.roleName || !modalForm.roleDescription){
        setError("please complete all fields");
        return ;
      }
        console.log("submit Modalform", modalForm);

        const newFeatureData = {
      roleName: modalForm.roleName,
      cscMappedRole: "csc_agent_tier3",
      roleDescription: modalForm.roleDescription,
    };

    const api_headers_Data = {
      "Content-Type": "application/json",
    };
    console.log("enter in to postasync");
    // const postAsyncData = async (roleId) => {
    //   try {
    //     console.log("enter in to put");
    //     console.log(roleId);
    //     console.log(CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL +  `/role/${roleId}`);
    //          if( initialValues?.roleId){
    //           console.log("if true")
    //       const response = await axios.put(
    //         CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL +  `/role/${roleId}`,
    //         newFeatureData,
    //         { headers: api_headers_Data }
    //       );
    //     }
    //     else {
    //     const response = await axios.post(
    //       CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/role",
    //       newFeatureData,
    //       { headers: api_headers_Data }
    //     );
    //     console.log("POST request successful:", response.data);
    //     }
    //       setModalState({ isOpen: false, action: "" });
    //     navigate(0);
      
    //   } catch (error) {
    //     console.error("Error during POST request:", error);
    //   }
    // };
    // const postAsyncData = async (roleId) => {
      
    //   try {
    //     if( initialValues?.roleId){
    //       const response = await axios.put(
    //         CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL +  `/roles/${roleId}`,
    //         newFeatureData,
    //         { headers: api_headers_Data }
    //       );
    //     }
    //     else{
    //     const response = await axios.post(
    //       CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/role",
    //       newFeatureData,
    //       { headers: api_headers_Data }
    //     );
    //     setModalState({ isOpen: false, action: "" });
    //     navigate(0);
    //   }} catch (error) {
    //     console.error("Error during POST request:", error);
    //   }
    
    // }
    //  postAsyncData(modalForm.roleId);
  };

  const handleFormChange = (fieldName, fieldValue) => {
    let updatedForm = fieldValue;
    if (Array.isArray(modalForm[fieldName])) {
      updatedForm = modalForm[fieldName];
      updatedForm?.push(fieldValue);
    }

    console.log("modalForm on change", modalForm);
    setModalForm({ ...modalForm, [fieldName]: updatedForm });
    console.log("modalForm  on change", modalForm);
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
        {/* <input
          type={"text"}
          onChange={(e) => handleFormChange("roleDescription", e.target.value)}
          className="tw-rounded-md tw-border tw-border-gray focus:tw-border-black tw-h-[120px] tw-w-[380px] tw-opacity-100"
          value={modalForm.roleDescription}
        /> */}
         <textarea
          onChange={(e) =>
            handleFormChange("roleDescription", e.target.value)
          }
          className="tw-peer tw-h-[120px] tw-pt-5 tw-flex tw-flex-wrap tw-pb-1.5 tw-px-3 tw-border tw-outline-none tw-rounded-4 tw-text-sm tw-text-black  tw-w-full tw-bg-white tw-border-gray focus:tw-border-black tw-"
          value={modalForm.roleDescription}
        />
        <span className="tw-absolute tw-text-[#676567] tw-left-3.5 tw-top-3.5 tw-pointer-events-none tw-transition tw-ease-in tw-delay-200 tw-text-xs peer-placeholder-shown:tw-top-3.5 peer-placeholder-shown:tw-text-sm peer-focus:tw-pointer-events-none peer-focus:tw-top-1 peer-focus:tw-transition peer-focus:tw-ease-in peer-focus:tw-delay-200 peer-focus:tw-text-xs">
          {" Description"}
        </span>
        
      </div>
      {error &&(<div className="tw-text-red"> {error}</div>)}
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
