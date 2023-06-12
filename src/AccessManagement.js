import { Link, useParams } from "react-router-dom";
import Accordion from "./components/Accordion";
import Header from "./components/Header";
import PageHeader from "./components/PageHeader";
import { ChipComponent, TextBox } from "@sephora-csc/csc-component-library";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
console.log("test push")
const subFeatures = {
  featureId: "1",
  featureName: "Order_search",
  featureDescription: "Order Search Feature",
  roles: [
    {
      roleId: "1",
      roleName: "csc_agent_tier1",
    },
    {
      roleId: "2",
      roleName: "csc_agent_tier2",
    },
    {
      roleId: "3",
      roleName: "csc_agent_tier3",
    },
  ],
  subFeatures: [
    {
      featureId: "2",
      featureName: "Order_search_address",
      featureDescription: "Order Search Address Feature",
      roles: [
        {
          roleId: "2",
          roleName: "csc_agent_tier2",
        },
        {
          roleId: "3",
          roleName: "csc_agent_tier3",
        },
      ],
      subFeatures: [],
    },
    {
      featureId: "3",
      featureName: "Order_search_status",
      featureDescription: "Order_search Status",
      roles: [
        {
          roleId: "1",
          roleName: "csc_agent_tier1",
        },
        {
          roleId: "2",
          roleName: "csc_agent_tier2",
        },
        {
          roleId: "3",
          roleName: "csc_agent_tier3",
        },
      ],
      subFeatures: [],
    },
    {
      featureId: "4",
      featureName: "Order_personal_fields",
      featureDescription: "Order Personal Fields",
      roles: [
        {
          roleId: "1",
          roleName: "csc_agent_tier1",
        },
      ],
      subFeatures: [
        {
          featureId: null,
          featureName: "Order_personal_fields_name",
          featureDescription: null,
          roles: null,
          subFeatures: null,
        },
        {
          featureId: null,
          featureName: "Order_personal_fields_email",
          featureDescription: null,
          roles: null,
          subFeatures: null,
        },
      ],
    },
  ],
};
export default function AccessManagement() {
  const [modalState, setModalState] = useState({ isOpen: false, action: "" });
  const [featureState, setFeatureState] = useState(subFeatures);
  const [modalForm, setModalForm] = useState({});
  const params = useParams();

  const handleModalSubmit = () => {
    let formData;
    if (params?.id)
      formData = { ...modalForm, parentFeatureId: featureState.featureId };
    else formData = { ...modalForm, parentFeatureId: "" };
    const POST_DATA = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    let apiUrl =
      modalState.action === "add"
        ? "http://localhost:8080/csc-agent-platform-service/v1/acl/feature"
        : `http://localhost:8080/csc-agent-platform-service/v1/acl/feature/${params.id}`;

    fetch(apiUrl, POST_DATA)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      })
      .then((responseData) => {
        setFeatureState(responseData);
        setModalState({ isOpen: false, action: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFormChange = (fieldName, fieldValue) => {
    setModalForm({ ...modalForm, [fieldName]: fieldValue });
  };

  // useEffect(() => {
  //   if (params?.id)
  //     fetch(
  //       `http://localhost:8080/csc-agent-platform-service/v1/acl/primaryfeatures`
  //     ).then((res) => {
  //       setFeatureState(res.data);
  //     });
  //   else
  //     fetch(
  //       `http://localhost:8080/csc-agent-platform-service/v1/acl/features/${params.id}`
  //     ).then((res) => {
  //       setFeatureState(res.data);
  //     });
  // }, [params]);

  return (
    <>
      <Header />
      <PageHeader />
      <section className="tw-px-5 tw-sm:tw-px-16 tw-lg:tw-px-36">
        <div className="tw-relative tw-p-7">
          <div className="tw-text-center ">
            <h1 className="tw-text-xl tw-font-bold">
              {featureState.featureName}
            </h1>
            <p className="tw-text-sm tw-pt-4 tw-max-w-xl tw-m-auto">
              {featureState.featureDescription}
            </p>
          </div>
          {params?.id && (
            <button
              className="tw-absolute tw-top-0 tw-bottom-0 tw-right-0"
              onClick={() => setModalState({ isOpen: true, action: "edit" })}
            >
              Edit
            </button>
          )}
          <button
            className="tw-absolute tw-top-0 tw-bottom-0 tw-right-0"
            onClick={() => setModalState({ isOpen: true, action: "add" })}
          >
            Add New
          </button>
        </div>
        {featureState?.subFeatures.length > 0 &&
          featureState?.subFeatures.map((item) => (
            <Accordion title={item.featureName} key={item.featureId}>
              <div className="tw-max-w-2xl">
                <p>{item.featureDescription}</p>
                <div className="tw-mt-7">
                  <h3 className="tw-text-base tw-font-bold">Roles</h3>
                  {item.roles.length > 0 &&
                    item.roles.map((role) => (
                      <ChipComponent
                        key={role.roleId}
                        label={role.roleName}
                        color={
                          "tw-p-4 tw-inline-block tw-w-auto tw-bg-gray-4 tw-rounded-md"
                        }
                      />
                    ))}
                </div>
                <div className="tw-mt-7">
                  <div className="tw-relative">
                    <h3 className="tw-text-base tw-font-bold">Sub features</h3>
                    <Link
                      className="tw-absolute tw-top-0 tw-bottom-0 tw-right-0"
                      to={`/feature/${item.featureId}`}
                    >
                      <span className="tw-border tw-border-black tw-rounded-full tw-w-5 tw-h-5 tw-inline-block">
                        +
                      </span>
                      Add New
                    </Link>
                  </div>
                  {item.subFeatures.length > 0 &&
                    item.subFeatures.map((sf) => (
                      <ChipComponent
                        key={sf.featureId}
                        label={sf.featureName}
                        color={
                          "tw-p-4 tw-inline-block tw-w-auto tw-bg-gray-4 tw-rounded-md"
                        }
                      />
                    ))}
                </div>
              </div>
            </Accordion>
          ))}
      </section>
      <Modal
        isOpen={modalState.isOpen}
        title={
          modalState.action === "add"
            ? "Create New Feature"
            : `Edit ${featureState.featureName}`
        }
        onClose={handleModalSubmit}
      >
        <TextBox onChange={handleFormChange} />
        <TextBox onChange={handleFormChange} />
      </Modal>
    </>
  );
}
