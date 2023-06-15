import { useParams, useNavigate } from "react-router-dom";
import Accordion from "../components/Accordion";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import primaryFeatures from "../demo.json";
import axios from "axios";
import FeatureHead from "../components/FeatureHead";
import CreateNewFeature from "../components/CreateNewFeature";
import SubFeatureContent from "../components/SubFeatureContent";
import Pills from "../components/Pills";
import { LocationState } from "../components/Interface";
import Dropdown from "../components/Dropdown/Dropdown";

export default function FeatureDetail() {
  const [modalState, setModalState] = useState({ isOpen: false, action: "" });
  const [featureState, setFeatureState] = useState({
    subFeatures: null,
    featureId: null,
    featureName: null,
    roles: null,
  });
  const [isEditable, setIsEditable] = useState(false);
  const [featureForm, setFeatureForm] = useState({});
  const [roleOptions, setRoleOptions] = useState([]);
  const [featureOptions, setFeatureOptions] = useState([]);
  const [initialFeatureState, setInitialFeatureState] = useState({
    subFeatures: null,
    featureId: null,
    featureName: null,
    roles: null,
  });

  const state: LocationState = { featureName: featureState?.featureName };

  const navigate = useNavigate();
  const params = useParams();

  const handleRoleSearch = async (val) => {
    const searchTerm = val.value;
    try {
      const response = await axios.get(
        `https://csc-agent-platform-service-qa1.lower.internal.sephora.com/csc-agent-platform-service/v1/acl/all/roles/${searchTerm}`
      );
      const data = response.data;
      if (data === "") {
        setRoleOptions([]);
      } else {
        setRoleOptions(data);
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  const handleFeatureSearch = async (val) => {
    const searchTerm = val.value;
    try {
      const response = await axios.get(
        `https://csc-agent-platform-service-qa1.lower.internal.sephora.com/csc-agent-platform-service/v1/acl/all/features/${searchTerm}`
      );
      const data = response.data;
      if (data === "") {
        setFeatureOptions([]);
      } else {
        setFeatureOptions(data);
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  const handleUpdateFeatureChange = (fieldName, fieldValue) => {
    setFeatureForm({ ...featureForm, [fieldName]: fieldValue });
  };

  const handleEditSubmit = () => {
    const updatedData = {
      ...featureForm,
      subFeatures: featureState?.subFeatures.map(({ featureId }) => featureId),
      roles: featureState?.roles.map(({ roleId }) => roleId),
      featureId: params?.id,
    };
    console.log(updatedData);
    navigate(0);
  };

  const handleRoleChange = (id, value) => {
    let updatedRoles = [...featureState.roles];
    if (id) {
      updatedRoles = updatedRoles.filter((item) => item.roleId !== id);
    } else {
      const checkIfpresent = updatedRoles.find(
        (item) => item.roleId === value.code
      );
      if (!checkIfpresent)
        updatedRoles.push({
          roleId: value.code,
          roleName: value.name,
        });
    }
    setFeatureState({ ...featureState, roles: updatedRoles });
  };

  const handleSubfeatureChange = (id, value) => {
    console.log(id, value);
    let updatedSubfeatures = [...featureState.subFeatures];
    if (id) {
      updatedSubfeatures = updatedSubfeatures.filter(
        (item) => item.featureId !== id
      );
    } else {
      const checkIfpresent = updatedSubfeatures.find(
        (item) => item.featureId === value.code
      );
      if (!checkIfpresent)
        updatedSubfeatures.push({
          featureId: value.code,
          featureName: value.name,
        });
    }
    setFeatureState({ ...featureState, subFeatures: updatedSubfeatures });
  };

  useEffect(() => {
    if (params?.id) {
      const data = primaryFeatures.find((f) => f.featureId === params.id);
      setInitialFeatureState(data);
    }
  }, [params]);

  useEffect(() => {
    setFeatureState(initialFeatureState);
  }, [initialFeatureState]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(
  //         `https://csc-agent-platform-service-qa1.lower.internal.sephora.com/csc-agent-platform-service/v1/acl/features/${params.id}`
  //       );
  //       setFeatureState(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchData();
  // }, [params]);

  const handleCancel = () => {
    setIsEditable(false);
    setFeatureState(initialFeatureState);
  };

  return (
    <>
      <PageHeader />
      <section className="tw-px-36 tw-sm:tw-px-16 tw-lg:tw-px-36">
        <FeatureHead
          featureState={featureState}
          setIsEditable={setIsEditable}
          isEditable={isEditable}
          handleChange={handleUpdateFeatureChange}
          handleSaveChanges={handleEditSubmit}
          handleCancel={handleCancel}
        />
        <h3 className="tw-text-lg tw-font-bold tw-mt-8 tw-mb-6">Roles</h3>
        {isEditable && (
          <div
            className="tw-mt-2.5 tw-w-1/3 tw-mb-4"
            onChange={(e) => handleRoleSearch(e.target)}
          >
            <Dropdown
              id={"role"}
              className={"col-span-6"}
              label={"Select Roles"}
              type="select"
              options={roleOptions}
              setSelectedOption={(value) => {
                if (value.code) handleRoleChange("", value);
              }}
              disabledSelect={true}
              name={"roleName"}
              code={"roleId"}
              selectArrow={"greyArrow"}
              value={""}
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
        <div className="tw-flex tw-justify-between tw-items-baseline tw-mt-16  tw-mb-6">
          <h3 className="tw-text-lg tw-font-bold ">Sub Features</h3>
          <button
            className="tw-w-[150px] tw-h-[38px] tw-font-bold tw-border-2 tw-border-black tw-rounded-full tw-ml-5"
            onClick={() => setModalState({ isOpen: true, action: "add" })}
          >
            Add Sub Feature
          </button>
        </div>
        {isEditable && (
          <div
            className="tw-mt-2.5 tw-w-1/3 tw-mb-4"
            onChange={(e) => handleFeatureSearch(e.target)}
          >
            <Dropdown
              id={"subRole"}
              className={"col-span-6"}
              label={"Select Sub Features"}
              type="select"
              options={featureOptions}
              setSelectedOption={(value) => {
                if (value.code) handleSubfeatureChange("", value);
              }}
              value=""
              disabledSelect={true}
              name={"featureName"}
              code={"featureId"}
              selectArrow={"greyArrow"}
            />
          </div>
        )}
        {featureState?.subFeatures?.length > 0 &&
          featureState?.subFeatures.map((item) => (
            <Accordion
              title={item.featureName}
              subTitle={item.featureDescription}
              key={item.featureId}
              isEditable={isEditable}
              handleLink={() => {
                navigate(`/access-management/feature/${item.featureId}`, {
                  state: state,
                });
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
