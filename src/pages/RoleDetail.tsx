import { useParams, useNavigate } from "react-router-dom";
import Accordion from "../components/Accordion";
import PageHeader from "../components/PageHeader";
import { useState, useEffect, useContext } from "react";
import Modal from "../components/Modal";
import { fetchRoleData } from "../utils/apiServices";
import SubFeatureContent from "../components/SubFeatureContent";
import CreateNewRole from "../components/CreateNewRole";
import { NavigationContext } from "../context/NavigationProvider";
import { ModalContext } from "../context/ModalProvider";

const fetchData = async (roleId) => {
  try {
    const response = await fetchRoleData(roleId);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};

export default function RoleDetail() {
  const [getState, setGetState] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  const { setPreviousPageName, previousPageName } =
    useContext(NavigationContext);
  const { modalState, openModal, closeModal, modalForm, setModalForm } =
    useContext(ModalContext);
  const fetchDataCallback = async () => {
    const result = await fetchData(params.id);
    setGetState(result);
  };
  useEffect(() => {
    if (modalForm.refresh) {
      fetchDataCallback()
        .then(() => setModalForm({ refresh: false }))
        .catch((err) => console.error(err));
    }
  }, [modalForm.refresh]);
  useEffect(() => {
    fetchDataCallback()
      .then(() => setModalForm({ refresh: false }))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <PageHeader />
      <section className="tw-px-36 tw-sm:tw-px-16 tw-lg:tw-px-36">
        <div className="tw-relative">
          <div className="tw-flex tw-items-center tw-pt-10 tw-pb-7 tw-border-b-2">
            {
              <>
                <div className="tw-basis-1/2">
                  <h1 className="tw-text-xl tw-font-bold">
                    {getState?.roleName}
                  </h1>
                  <p className="tw-text-sm tw-pt-4 tw-max-w-xl">
                    {getState?.roleDescription}
                  </p>
                </div>
                <div className="tw-flex tw-basis-1/2 tw-justify-end tw-items-center">
                  {getState?.roleId && (
                    <>
                      <button
                        className="tw-mr-5 hover:tw-underline"
                        onClick={() => openModal("editRole")}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </>
            }
          </div>
        </div>
        <div className="tw-flex tw-justify-between tw-items-baseline tw-mt-8 tw-mb-6">
          <h3 className="tw-text-lg tw-font-bold ">Features</h3>
        </div>
        {getState?.featureHierarchy?.length == 0 && <div>no feature added</div>}
        {getState?.featureHierarchy?.length > 0 &&
          getState?.featureHierarchy.map((item) => (
            <Accordion
              title={item.featureName}
              subTitle={item.featureDescription}
              key={item.featureId}
              handleLink={() => {
                setPreviousPageName([...previousPageName, getState.roleName]);
                navigate(
                  `/csc-agent-platform/admin/access-management/feature/${item.featureId}`
                );
              }}
            >
              <SubFeatureContent item={item} previousPage={getState.roleName} />
            </Accordion>
          ))}
      </section>
      <Modal
        isOpen={modalState.isOpen && modalState.action === "editRole"}
        title={"Edit Role"}
        onClose={() => closeModal("editRole")}
      >
        <CreateNewRole
          initialValues={{
            roleId: getState?.roleId,
            roleName: getState?.roleName,
            roleDescription: getState?.roleDescription,
          }}
        />
      </Modal>
    </>
  );
}
