import Accordion from "../components/Accordion";
import PageHeader from "../components/PageHeader";
import { useState, useEffect, useContext } from "react";
import Modal from "../components/Modal";
import { getPrimaryFeatures } from "../utils/apiServices";
import FeatureHead from "../components/FeatureHead";
import CreateNewFeature from "../components/CreateNewFeature";
import SubFeatureContent from "../components/SubFeatureContent";
import { useNavigate } from "react-router-dom";
import RolesListing from "./RolesListing";
import { NavigationContext } from "../context/NavigationProvider";
import { ModalContext } from "../context/ModalProvider";

export default function AccessManagement() {
  const [featureState, setFeatureState] = useState({
    subFeatures: null,
    featureId: null,
    featureName: null,
    featureDescription: null,
  });
  const [isEditable, setIsEditable] = useState(false);
  const [featureForm, setFeatureForm] = useState({});

  const { setPreviousPageName, previousPageName } =
    useContext(NavigationContext);
  const { modalState, openModal, closeModal, modalForm, setModalForm } =
    useContext(ModalContext);

  const navigate = useNavigate();

  const handleUpdateFeatureChange = (fieldName, fieldValue) => {
    setFeatureForm({ ...featureForm, [fieldName]: fieldValue });
  };
  async function fetchData() {
    try {
      const response = await getPrimaryFeatures();
      setFeatureState({
        featureId: "",
        featureName: "Primary Features",
        featureDescription:
          "Listed below are primary feature of the cec platform admin management",
        subFeatures: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (modalForm.refresh) {
      fetchData()
        .then(() => setModalForm({ refresh: false }))
        .catch((err) => console.error(err));
    }
  }, [modalForm.refresh]);
  useEffect(() => {
    fetchData()
      .then(() => setModalForm({ refresh: false }))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <PageHeader
        seachItem={"all/features/"}
        label={"featureName"}
        searchId={"featureId"}
        searchBy={"feature"}
      />
      <RolesListing header={false} />

      <section className="tw-px-5 tw-sm:tw-px-16 tw-lg:tw-px-36 tw-relative tw-mb-28">
        <FeatureHead
          featureState={featureState}
          setIsEditable={setIsEditable}
          isEditable={isEditable}
          handleChange={handleUpdateFeatureChange}
        />
        <button
          className="tw-w-[150px] tw-h-[38px]  tw-border-2 tw-border-black tw-rounded-full tw-ml-5 tw-absolute tw-top-10 tw-right-5 tw-sm:tw-right-16 tw-lg:tw-right-36"
          onClick={() => openModal("addFeature")}
        >
          Add Feature
        </button>
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
              handleLink={() => {
                setPreviousPageName([
                  ...previousPageName,
                  featureState.featureName,
                ]);
                navigate(
                  `/csc-agent-platform/admin/access-management/feature/${item.featureId}`
                );
              }}
            >
              <SubFeatureContent
                item={item}
                previousPage={featureState.featureName}
              />
            </Accordion>
          ))}
      </section>
      <Modal
        isOpen={modalState.isOpen && modalState.action === "addFeature"}
        title={"Create New Feature"}
        onClose={() => closeModal("addFeature")}
      >
        <CreateNewFeature featureId={null} />
      </Modal>
    </>
  );
}
