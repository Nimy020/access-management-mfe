import { Link, useParams } from "react-router-dom";
import Accordion from "./components/Accordion";
import Header from "./components/Header";
import PageHeader from "./components/PageHeader";
import { TextBox, Dropdown, Button } from "@sephora-csc/csc-component-library";
import Pills from "./components/Pills";
import { useState, useEffect, useRef } from "react";
import Modal from "./components/Modal";
import primaryFeatures from "./demo.json";

const roles = [
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
];

const subFeatures = [
  {
    featureId: null,
    featureName: "Order_personal_fields_name",
  },
  {
    featureId: null,
    featureName: "Order_personal_fields_email",
  },
];

const FeatureManagement = () => {
  const [modalState, setModalState] = useState({ isOpen: false, action: "" });
  const [featureState, setFeatureState] = useState({});
  const [modalForm, setModalForm] = useState({});

  const roleRef = useRef(null);
  const subFeatureRef = useRef(null);
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
        ? "http://localhost:9000/csc-agent-platform-service/v1/acl/feature"
        : `http://localhost:9000/csc-agent-platform-service/v1/acl/feature/${params.id}`;

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

  useEffect(() => {
    if (params?.id)
      fetch(
        `http://localhost:9000/csc-agent-platform-service/v1/acl/features/${params.id}`
      ).then((res) => {
        setFeatureState(res.data);
      });

    // useEffect(() => {
    //   if (params?.id) {
    //     const data = primaryFeatures.find((f) => f.featureId === params.id);
    //     setFeatureState(data);
    //   } else {
    //     setFeatureState({
    //       featureName: "Primary Features",
    //       featureDescription:
    //         "Sed Eu Semper Ligula. Proin Dapibus Nunc Quis Ligula Ullamcorper Venenatis. Nulla Mollis Sagittis",
    //       subFeatures: primaryFeatures,
    //     });
    //   }
  }, [params]);

  useEffect(() => {
    fetch(
      `http://localhost:9000/csc-agent-platform-service/v1/acl/primaryfeatures`
    ).then((res) => {
      setFeatureState(res.data);
    });
  }, []);

  return (
    <>
      <Header />
      <PageHeader />
      <section className="tw-px-5 tw-sm:tw-px-16 tw-lg:tw-px-36">
        <div className="tw-relative">
          <div className="tw-flex tw-items-center tw-pt-10 tw-pb-7 tw-border-b-2 tw-border-b-black">
            <div className="tw-basis-1/2">
              <h1 className="tw-text-xl tw-font-bold">
                {featureState?.featureName}
              </h1>
              <p className="tw-text-sm tw-pt-4 tw-max-w-xl">
                {featureState?.featureDescription}
              </p>
            </div>
            <div className="tw-flex tw-basis-1/2 tw-justify-end tw-items-center">
              {params?.id && (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <span
                  onClick={() =>
                    setModalState({ isOpen: true, action: "edit" })
                  }
                >
                  Edit
                </span>
              )}
              <button
                className="tw-w-[150px] tw-h-[38px] tw-font-bold tw-border-2 tw-border-black tw-rounded-full tw-ml-5"
                onClick={() => setModalState({ isOpen: true, action: "add" })}
              >
                Add new Feature
              </button>
            </div>
          </div>
        </div>
        {featureState?.subFeatures?.length > 0 &&
          featureState?.subFeatures.map((item) => (
            <Accordion title={item.featureName} key={item.featureId}>
              <div className="tw-max-w-2xl">
                <p>{item.featureDescription}</p>
                <div className="tw-mt-7">
                  <h3 className="tw-text-base tw-font-bold">Roles</h3>
                  <div>
                    {item.roles.length > 0 &&
                      item.roles.map((role) => (
                        <Pills key={role.roleId} label={role.roleName} />
                      ))}
                  </div>
                </div>
                <div className="tw-mt-7">
                  <div className="tw-basis-1/2">
                    <h3 className="tw-text-base tw-font-bold">Sub features</h3>
                  </div>
                  <div className="tw-basis-1/2 tw-flex">
                    <div className="">
                      {item.subFeatures.length > 0 &&
                        item.subFeatures.map((sf) => (
                          <Pills key={sf.featureId} label={sf.featureName} />
                        ))}
                    </div>
                    <div className="">
                      <Link
                        className="tw-flex tw-items-center tw-w-[100px]"
                        to={`/access-management/feature/${item.featureId}`}
                      >
                        <div className="tw-flex tw-items-center tw-justify-center tw-w-[15px] tw-h-[15px] tw-border tw-rounded-full tw-border-gray-2 tw-bg-transparent tw-test-sm tw-text-gray-2">
                          +
                        </div>
                        <div>Add New</div>
                      </Link>
                    </div>
                  </div>
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
            : `Edit ${featureState?.featureName}`
        }
        onClose={() => setModalState({ isOpen: false, action: "" })}
      >
        <div className=" tw-mt-5 tw-text-center tw-text-[#676567] tw-opacity-100">
          Sed eu semper ligula. Proin dapibus nunc quis ligula ullamcorper
          venenatis. Nulla mollis sagittis
        </div>
        <div className="tw-mt-5">
          <TextBox
            label="Feature Name"
            onChange={(e) => handleFormChange("featureName", e.target.value)}
          />
        </div>
        <div className="tw-mt-3 tw-relative">
          <input
            type={"text"}
            onChange={(e) =>
              handleFormChange("featureDescription", e.target.value)
            }
            className="tw-rounded-md tw-border tw-border-gray focus:tw-border-black tw-h-[120px] tw-w-[380px] tw-opacity-100"
          />
          <span className="tw-absolute tw-text-[#676567] tw-left-3.5 tw-top-3.5 tw-pointer-events-none tw-transition tw-ease-in tw-delay-200 tw-text-xs peer-placeholder-shown:tw-top-3.5 peer-placeholder-shown:tw-text-sm peer-focus:tw-pointer-events-none peer-focus:tw-top-1 peer-focus:tw-transition peer-focus:tw-ease-in peer-focus:tw-delay-200 peer-focus:tw-text-xs">
            {"Feature Description"}
          </span>
        </div>
        <div className="tw-mt-4 tw-font-bold">{"Roles"}</div>
        <div className="tw-mt-2.5">
          <Dropdown
            id={"role"}
            className={"col-span-6"}
            label={"Select Roles"}
            type="select"
            options={roles}
            setSelectedOption={(value) => handleFormChange("roles", value)}
            defaultValue={modalForm.roles?.name || ""}
            dropDownRef={roleRef}
            disabledSelect={true}
            name={"roleName"}
            code={"roleId"}
            selectArrow={"greyArrow"}
          />
        </div>
        <div className="tw-mt-4 tw-font-bold">{"Subfeatures"}</div>
        <div className="tw-mt-2.5">
          <Dropdown
            id={"subRole"}
            className={"col-span-6"}
            label={"Select Sub Features"}
            type="select"
            options={subFeatures}
            setSelectedOption={(value) =>
              handleFormChange("subFeatures", value)
            }
            defaultValue={modalForm.subFeatures?.name || ""}
            dropDownRef={subFeatureRef}
            disabledSelect={true}
            name={"featureName"}
            code={"featureId"}
            selectArrow={"greyArrow"}
          />
        </div>
        <div className="tw-mt-[30px]  tw-text-center">
          <Button
            label={"Submit"}
            type={"primary"}
            className={"tw-w-[180px]"}
            disabled={false}
            onClick={handleModalSubmit}
          ></Button>
        </div>
      </Modal>
    </>
  );
};
export default FeatureManagement;
