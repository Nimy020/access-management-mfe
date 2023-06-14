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

  const state: LocationState = { featureName: featureState?.featureName };

  const navigate = useNavigate();

  const handleUpdateFeatureChange = (fieldName, fieldValue) => {
    setFeatureForm({ ...featureForm, [fieldName]: fieldValue });
  };

  const handleRemoveSubfeatures = (id) => {
    const updatedSubFeatures = featureState.subFeatures.filter(
      (item) => item.featureId !== id
    );
    setFeatureState({ ...featureState, subFeatures: updatedSubFeatures });
  };

  const handleEditSubmit = () => {
    const updatedData = {
      ...featureForm,
      subFeatures: featureState?.subFeatures,
      featureId: params?.id,
    };
    console.log(updatedData);
  };

  const params = useParams();

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

  useEffect(() => {
    if (params?.id) {
      const data = primaryFeatures.find((f) => f.featureId === params.id);
      setFeatureState(data);
    }
  }, [params]);

  return (
    <>
      <PageHeader />
      <section className="tw-px-36 tw-sm:tw-px-16 tw-lg:tw-px-36">
        <FeatureHead
          setModalState={setModalState}
          featureState={featureState}
          setIsEditable={setIsEditable}
          isEditable={isEditable}
          handleChange={handleUpdateFeatureChange}
          handleSaveChanges={handleEditSubmit}
        />
        <h3 className="tw-text-lg tw-font-bold tw-mt-8 tw-mb-6">Roles</h3>
        <div className="tw-mb-6">
          {featureState?.roles?.length > 0 &&
            featureState?.roles.map((item) => (
              <Pills
                label={item.roleName}
                key={item.roleId}
                isEditable={isEditable}
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
              handleDelete={() => handleRemoveSubfeatures(item.featureId)}
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
        onClose={() => setModalState({ isOpen: false, action: "" })}
      >
        <CreateNewFeature
          setModalState={setModalState}
          featureId={featureState?.featureId}
        />
      </Modal>
    </>
  );
}
