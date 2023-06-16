import { useParams, useNavigate } from "react-router-dom";
import Accordion from "../components/Accordion";
import PageHeader from "../components/PageHeader";
import { useState, useEffect, useRef } from "react";
import Modal from "../components/Modal";
import primaryFeatures from "../demo.json";
import axios from "axios";
import FeatureHead from "../components/FeatureHead";
import CreateNewFeature from "../components/CreateNewFeature";
import SubFeatureContent from "../components/SubFeatureContent";
import Pills from "../components/Pills";
import { LocationState } from "../components/Interface";
import SearchDropDown from "../components/SearchDropDown/SearchDropDown";

// const { CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL, API_TIMEOUT } = process.env;
export default function FeatureDetail() {
  const [modalState, setModalState] = useState({ isOpen: false, action: "" });
  const [featureState, setFeatureState] = useState({
    subFeatures: [],
    featureId: null,
    featureName: null,
    featureDescription: null,
    roles: [],
  });
  const roleRef = useRef(null);
  const subFeatureRef = useRef(null);
  const [subFeatures, setSubFeatures] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [roles, setRoles] = useState([]);
  const [featureForm, setFeatureForm] = useState({});
  const [roleOptions, setRoleOptions] = useState([]);
  const [featureOptions, setFeatureOptions] = useState([]);
  const [initialFeatureState, setInitialFeatureState] = useState({
    subFeatures: [],
    featureId: null,
    featureName: null,
    featureDescription: null,
    roles: [],
  });

  const state: LocationState = {
    type: "feature",
    name: featureState?.featureName,
    id: featureState?.featureId,
  };

  const navigate = useNavigate();
  const params = useParams();

  const handleUpdateFeatureChange = (fieldName, fieldValue) => {
    setFeatureForm({ ...featureForm, [fieldName]: fieldValue });
  };

  const handleEditSubmit = () => {
    const updatedData = {
      ...featureForm,
      subFeatures: featureState?.subFeatures.map(({ featureId }) => featureId),
      roleIds: featureState?.roles.map(({ roleId }) => roleId),
      featureId: params?.id,
    };
    console.log("Updated data", updatedData, featureForm);

    // axios
    //   .put(
    //     `https://csc-agent-platform-service-qa1.lower.internal.sephora.com/csc-agent-platform-service/v1/acl/feature/${updatedData.featureId}`,
    //     updatedData
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     navigate(0);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const handleRoleChange = (id, value) => {
    let updatedRoles = [...featureState.roles];
    if (id) {
      updatedRoles = updatedRoles.filter((item) => item.roleId !== id);
    } else {
      const checkIfpresent = updatedRoles.find(
        (item) => item.roleId === value.roleId
      );
      if (!checkIfpresent)
        updatedRoles.push({
          roleId: value.roleId,
          roleName: value.roleName,
        });
    }
    setFeatureState({ ...featureState, roles: updatedRoles });
  };

  const handleSubfeatureChange = (id, value) => {
    let updatedSubfeatures = [...featureState.subFeatures];
    if (id) {
      updatedSubfeatures = updatedSubfeatures.filter(
        (item) => item.featureId !== id
      );
    } else {
      const checkIfpresent = updatedSubfeatures.find(
        (item) => item.featureId === value.featureId
      );
      if (!checkIfpresent)
        updatedSubfeatures.push({
          featureId: value.featureId,
          featureName: value.featureName,
          featureDescription: value.featureDescription,
        });
    }
    setFeatureState({ ...featureState, subFeatures: updatedSubfeatures });
  };

  const handleCancel = () => {
    setIsEditable(false);
    setFeatureState(initialFeatureState);
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(
  //         `https://csc-agent-platform-service-qa1.lower.internal.sephora.com/csc-agent-platform-service/v1/acl/features/${params.id}`
  //       );
  //       setInitialFeatureState(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchData();
  // }, [params]);

  const handleRoleDropDownChange = async (inputValue) => {
    try {
      console.log(inputValue);
      if (inputValue?.name) {
        // const response = await axios.get(
        //   CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/all/roles/" + inputValue.name
        // );
        // console.log("handleFeatureDropDownChange", response.data);
        // let filteredData = [];
        // if (response?.data) {
        //   console.log("filteredData", response?.data);
        //   return response?.data;
        // }
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  const handleFeatureDropDownChange = async (inputValue) => {
    try {
      console.log(inputValue);
      if (inputValue?.name) {
        // const response = await axios.get(
        //   CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL +
        //     "/all/features/" +
        //     inputValue.name
        // );
        // console.log("handleFeatureDropDownChange", response.data);
        // let filteredData = [];
        // if (response?.data) {
        //   return response?.data;
        // }
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  useEffect(() => {
    if (params?.id) {
      const data = primaryFeatures.find((f) => f.featureId === params.id);
      setInitialFeatureState(data);
    }
  }, [params]);

  useEffect(() => {
    setFeatureForm({
      featureName: initialFeatureState?.featureName,
      featureDescription: initialFeatureState?.featureDescription,
    });
    setFeatureState(initialFeatureState);
  }, [initialFeatureState]);

  return (
    <>
      <PageHeader />
      <section className="tw-px-36 tw-sm:tw-px-16 tw-lg:tw-px-36 tw-mb-28">
        <FeatureHead
          featureState={featureState}
          setIsEditable={setIsEditable}
          isEditable={isEditable}
          handleChange={handleUpdateFeatureChange}
          handleSaveChanges={handleEditSubmit}
          handleCancel={handleCancel}
        />
        <h3 className="tw-text-lg tw-font-bold tw-mt-8 tw-pb-6 tw-mb-6 tw-border-b-2">
          Roles
        </h3>
        {isEditable && (
          <div className="tw-mt-2.5 tw-w-1/3 tw-mb-4">
            <SearchDropDown
              id={"role"}
              className={"col-span-6"}
              label={"Select Roles"}
              type="select"
              options={roles}
              setSelectedOption={(value) => {
                handleRoleChange("", value);
              }}
              dropDownRef={roleRef}
              disabledSelect={true}
              name={"roleName"}
              code={"roleId"}
              selectArrow={"greyArrow"}
              onChange={handleRoleDropDownChange}
              defaultValue={""}
            />
          </div>
        )}
        <div className="tw-mb-6">
          {featureState?.roles?.length > 0 &&
            featureState?.roles.map((item) => (
              <Pills
                label={item.roleName}
                key={item.roleId}
                isEditable={isEditable}
                handleDelete={() => handleRoleChange(item.roleId, "")}
              />
            ))}
        </div>
        <div className="tw-flex tw-justify-between tw-items-baseline tw-mt-16 tw-pb-4 tw-border-b-2">
          <h3 className="tw-text-lg tw-font-bold ">Sub Features</h3>
          {!isEditable && (
            <button
              className="tw-w-[150px] tw-h-[38px] tw-border-2 tw-border-black tw-rounded-full tw-ml-5"
              onClick={() => setModalState({ isOpen: true, action: "add" })}
            >
              Add Sub Feature
            </button>
          )}
        </div>

        {isEditable && (
          <div className="tw-mt-6 tw-w-1/3 tw-mb-4">
            <SearchDropDown
              id={"subRole"}
              className={"col-span-6"}
              label={"Select Sub Features"}
              type="select"
              options={subFeatures}
              setSelectedOption={(value) => {
                if (value.featureId) handleSubfeatureChange("", value);
              }}
              defaultValue={""}
              dropDownRef={subFeatureRef}
              disabledSelect={true}
              name={"featureName"}
              code={"featureId"}
              selectArrow={"greyArrow"}
              onChange={handleFeatureDropDownChange}
            />
          </div>
        )}
        <div className="tw-flex tw-justify-between tw-items-start tw-py-4 tw-border-b">
          <h3 className="tw-w-1/6 tw-text-sm tw-text-[#676567]">Name</h3>
          <span className="tw-text-sm tw-w-1/2 tw-text-[#676567]">
            Description
          </span>
          <div className="tw-w-[74px] tw-justify-end"></div>
        </div>
        {featureState?.subFeatures?.length > 0 &&
          featureState?.subFeatures.map((item) => (
            <Accordion
              title={item.featureName}
              subTitle={item.featureDescription}
              key={item.featureId}
              isEditable={isEditable}
              handleLink={() => {
                let breadcrumb =
                  JSON.parse(sessionStorage.getItem("breadcrumb")) || [];
                breadcrumb.push(state);
                sessionStorage.setItem(
                  "breadcrumb",
                  JSON.stringify(breadcrumb)
                );
                navigate(`/access-management/feature/${item.featureId}`);
              }}
              handleDelete={() => handleSubfeatureChange(item.featureId, "")}
            >
              <SubFeatureContent
                item={item}
                featureName={featureState?.featureName}
                handleChange={handleUpdateFeatureChange}
              />
            </Accordion>
          ))}
      </section>
      <Modal
        isOpen={modalState.isOpen}
        title={"Create New Feature"}
        onClose={() => {
          setModalState({ isOpen: false, action: "" });
          setFeatureForm({});
        }}
      >
        <CreateNewFeature
          setModalState={setModalState}
          featureId={featureState?.featureId}
        />
      </Modal>
    </>
  );
}
