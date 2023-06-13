import { useParams } from "react-router-dom";
import Accordion from "./components/Accordion";
import Header from "./components/Header";
import PageHeader from "./components/PageHeader";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import primaryFeatures from "./demo.json";
import FeatureHead from "./components/FeatureHead";
import CreateNewFeature from "./components/CreateNewFeature";
import SubFeatureContent from "./components/SubFeatureContent";

export default function AccessManagement() {
  const [modalState, setModalState] = useState({ isOpen: false, action: "" });
  const [featureState, setFeatureState] = useState({
    subFeatures: null,
    featureId: null,
  });

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
      <Header />
      <PageHeader />
      <section className="tw-px-5 tw-sm:tw-px-16 tw-lg:tw-px-36">
        <FeatureHead
          setModalState={setModalState}
          featureState={featureState}
        />
        {featureState?.subFeatures?.length > 0 &&
          featureState?.subFeatures.map((item) => (
            <Accordion title={item.featureName} key={item.featureId}>
              <SubFeatureContent item={item} />
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
