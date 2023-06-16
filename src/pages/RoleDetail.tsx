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

  const state: LocationState = {
    type: "roles",
    name: featureState?.featureName,
    id: featureState?.featureId,
  };

  const navigate = useNavigate();

  const params = useParams();

  const { CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL, API_TIMEOUT } = process.env;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL}all/roles`
        );
        setFeatureState(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [params]);

  return (
    <>
      <PageHeader
        seachItem={"all/roles/"}
        label={"roleName"}
        searchId={"roleId"}
        searchBy={"roles"}
      />
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
