import Accordion from "../components/Accordion";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import primaryFeatures from "../demo.json";
import FeatureHead from "../components/FeatureHead";
import CreateNewFeature from "../components/CreateNewFeature";
import SubFeatureContent from "../components/SubFeatureContent";

export default function AccessManagement() {
  const [modalState, setModalState] = useState({ isOpen: false, action: "" });
  const [featureState, setFeatureState] = useState({
    subFeatures: null,
    featureId: null,
    featureName: null,
    featureDescription: null,
  });
  const [isEditable, setIsEditable] = useState(false);
  const [featureForm, setFeatureForm] = useState({});

  const handleUpdateFeatureChange = (fieldName, fieldValue) => {
    setFeatureForm({ ...featureForm, [fieldName]: fieldValue });
  };

  useEffect(() => {
    setFeatureState({
      featureId: "",
      featureName: "Primary Features",
      featureDescription: "Listed below primary features of CSC",
      subFeatures: primaryFeatures,
    });
  }, []);

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
        <CreateNewFeature setModalState={setModalState} featureId={null} />
      </Modal>
    </>
  );
}
