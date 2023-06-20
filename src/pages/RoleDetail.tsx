import { useParams } from "react-router-dom";
import Accordion from "../components/Accordion";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import SubFeatureContent from "../components/SubFeatureContent";
import { useNavigate } from "react-router-dom";
import CreateNewRole from "../components/Role/CreateNewRole";
import { LocationState } from "../components/Interface";

const fetchData = async (roleId) => {
  try {
    const { CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL, API_TIMEOUT } = process.env;
    const response = await axios.get(
      CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + `/roles/${roleId}`
    );
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};

export default function RoleDetail() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    action: "",
    roleId: "",
  });
  const [getState, setGetState] = useState(null);

  const state: LocationState = {
    type: "role",
    name: getState?.roleName,
    id: getState?.roleId,
  };

  const navigate = useNavigate();
  const params = useParams();
  const handleBreadcrumb = (id,type) => {
    let breadcrumb = JSON.parse(sessionStorage.getItem("breadcrumb")) || [];
    breadcrumb.push(state);
    sessionStorage.setItem("breadcrumb", JSON.stringify(breadcrumb));
    navigate(`/access-management/${type}/${id}`);
  };
  useEffect(() => {
    const fetchDataCallback = async () => {
      const result = await fetchData(params.id);
      setGetState(result);
    };
    console.log("display params", params);
    fetchDataCallback();
  }, [params]);

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
                        onClick={() =>
                          setModalState({
                            isOpen: true,
                            action: "edit",
                            roleId: getState?.roleId,
                          })
                        }
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
              handleBreadcrumb(item.featureId,"feature");
            }}
            >
              <SubFeatureContent
                item={item}
                featureName={getState?.featureName}
              />
            </Accordion>
          ))}
      </section>
      <Modal
        isOpen={modalState.isOpen}
        title={"Edit Role"}
        onClose={() => setModalState({ isOpen: false, action: "", roleId: "" })}
      >
        <CreateNewRole
          setModalState={setModalState}
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
