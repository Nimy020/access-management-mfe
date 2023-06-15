import { useParams } from "react-router-dom";
import Accordion from "../components/Accordion";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import primaryFeatures from "../demo.json";
import axios from "axios";
import FeatureHead from "../components/FeatureHead";
import CreateNewFeature from "../components/CreateNewFeature";
import SubFeatureContent from "../components/SubFeatureContent";
import { useNavigate } from "react-router-dom";
import { LocationState } from "../components/Interface";

export default function RoleDetail() {
  const [modalState, setModalState] = useState({ isOpen: false, action: "" });
  const [featureState, setFeatureState] = useState({
    subFeatures: null,
    featureId: null,
    featureName: null,
  });



  const state: LocationState = { featureName: featureState?.featureName };

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://csc-agent-platform-service-qa1.lower.internal.sephora.com/csc-agent-platform-service/v1/acl/features/${params.id}`
        );
        setFeatureState(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [params]);

  return (
    <>
      <PageHeader />
      <section className="tw-px-36 tw-sm:tw-px-16 tw-lg:tw-px-36">
        <FeatureHead
          setModalState={setModalState}
          featureState={featureState}
        />
        {featureState?.subFeatures?.length > 0 &&
          featureState?.subFeatures.map((item) => (
            <Accordion
              title={item.featureName}
              key={item.featureId}
              handleLink={() => {
                navigate(`/access-management/feature/${item.featureId}`, {
                  state: state,
                });
              }}
            >
              <SubFeatureContent
                item={item}
                featureName={featureState?.featureName}
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
