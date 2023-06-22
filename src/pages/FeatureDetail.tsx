import { useParams, useNavigate } from "react-router-dom";
import Accordion from "../components/Accordion";
import PageHeader from "../components/PageHeader";
import { useState, useEffect, useContext } from "react";
import Modal from "../components/Modal";
import { getFeatureData, editFeatureData } from "../utils/apiServices";
import FeatureHead from "../components/FeatureHead";
import CreateNewFeature from "../components/CreateNewFeature";
import SubFeatureContent from "../components/SubFeatureContent";
import Pills from "../components/Pills";
import SearchDropDown from "../components/SearchDropDown/SearchDropDown";
import { NavigationContext } from "../context/NavigationProvider";
import { ModalContext } from "../context/ModalProvider";
import { FeatureContext } from "../context/FeatureProvider";

const { CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL } = process.env;

export default function FeatureDetail() {
  const [initialFeatureState, setInitialFeatureState] = useState({
    subFeatures: [],
    featureId: null,
    featureName: null,
    featureDescription: null,
    roles: [],
  });

  const navigate = useNavigate();
  const params = useParams();

  const { setPreviousPageName, previousPageName } =
    useContext(NavigationContext);
  const { modalState, openModal, closeModal, modalForm, setModalForm } =
    useContext(ModalContext);
  const { featureState, setFeatureState, isEditable, setIsEditable } =
    useContext(FeatureContext);

  const handleEditSubmit = (featureForm) => {
    if (!featureForm.featureName || !featureForm.featureDescription) {
      alert("Name and description fields cannot be empty");
    } else {
      const updatedData = {
        ...featureForm,
        subFeatures: featureState?.subFeatures.map(
          ({ featureId }) => featureId
        ),
        roleIds: featureState?.roles.map(({ roleId }) => roleId),
        featureId: params?.id,
      };
      editFeatureData(updatedData.featureId, updatedData)
        .then(() => {
          setModalForm({ refresh: true });
          setIsEditable(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
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

  const fetchData = async () => {
    try {
      const response = await getFeatureData(params?.id);
      setInitialFeatureState(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
  }, [params]);

  useEffect(() => {
    setFeatureState(initialFeatureState);
  }, [initialFeatureState]);

  return (
    <>
      <PageHeader
        seachItem={"all/features/"}
        label={"featureName"}
        searchId={"featureId"}
        searchBy={"feature"}
      />
      <section className="tw-px-36 tw-sm:tw-px-16 tw-lg:tw-px-36 tw-mb-28">
        <FeatureHead
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
              setSelectedOption={(value) => {
                handleRoleChange("", value);
              }}
              disabledSelect={true}
              name={"roleName"}
              code={"roleId"}
              selectArrow={"greyArrow"}
              apiUrl={CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/all/roles/"}
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
                type={"role"}
                pillId={item.roleId}
                previousPage={featureState.featureName}
              />
            ))}
        </div>
        <div className="tw-flex tw-justify-between tw-items-baseline tw-mt-16  tw-mb-3 tw-pb-4 tw-border-b-2">
          <h3 className="tw-text-lg tw-font-bold ">Sub Features</h3>
          {!isEditable && (
            <button
              className="tw-w-[150px] tw-h-[38px] tw-border-2 tw-border-black tw-rounded-full tw-ml-5"
              onClick={() => openModal("addFeature")}
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
              setSelectedOption={(value) => {
                if (value.featureId) handleSubfeatureChange("", value);
              }}
              defaultValue={""}
              disabledSelect={true}
              name={"featureName"}
              code={"featureId"}
              selectArrow={"greyArrow"}
              apiUrl={CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/all/features/"}
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
                setPreviousPageName([
                  ...previousPageName,
                  featureState.featureName,
                ]);
                navigate(
                  `/csc-agent-platform/admin/access-management/feature/${item.featureId}`
                );
              }}
              handleDelete={() => handleSubfeatureChange(item.featureId, "")}
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
        onClose={() => {
          closeModal("addFeature");
        }}
      >
        <CreateNewFeature />
      </Modal>
    </>
  );
}
