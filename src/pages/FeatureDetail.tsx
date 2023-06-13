import { useParams } from "react-router-dom";
import Accordion from "../components/Accordion";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import primaryFeatures from "../demo.json";
import FeatureHead from "../components/FeatureHead";
import CreateNewFeature from "../components/CreateNewFeature";
import SubFeatureContent from "../components/SubFeatureContent";
import Pills from "../components/Pills";

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

  const handleUpdateFeatureChange = (fieldName, fieldValue) => {
    setFeatureForm({ ...featureForm, [fieldName]: fieldValue });
  };

  const params = useParams();

  // useEffect(() => {
  //   if (params?.id)
  //     fetch(
  //       `http://localhost:9000/csc-agent-platform-service/v1/acl/features/${params.id}`
  //     ).then((res) => {
  //       setFeatureState(res.data);
  //     });

  useEffect(() => {
    if (params?.id) {
      const data = primaryFeatures.find((f) => f.featureId === params.id);
      setFeatureState(data);
    }
  }, [params]);

  return (
    <>
      <PageHeader />
      <section className="tw-px-5 tw-sm:tw-px-16 tw-lg:tw-px-36">
        <FeatureHead
          setModalState={setModalState}
          featureState={featureState}
          setIsEditable={setIsEditable}
          isEditable={isEditable}
          handleChange={handleUpdateFeatureChange}
        />
        <h3 className="tw-text-base tw-font-bold tw-my-4">Roles</h3>
        <div className="tw-mb-6">
          {featureState?.roles?.length > 0 &&
            featureState?.roles.map((item) => (
              <Pills label={item.roleName} key={item.roleId} />
            ))}
        </div>
        <hr className="tw-border-b-2 tw-border-b-black tw-my-10" />
        <h3 className="tw-text-lg tw-font-bold  tw-mb-4">Sub Features</h3>
        {featureState?.subFeatures?.length > 0 &&
          featureState?.subFeatures.map((item) => (
            <Accordion title={item.featureName} key={item.featureId}>
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
