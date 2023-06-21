import PageHeader from "../components/PageHeader";
import { useState, useEffect, useContext } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import CreateNewRole from "../components/CreateNewRole";
import { useNavigate } from "react-router-dom";
import viewEditIcon from "../assets/view-edit.svg";
import ListHead from "../components/ListHead";
import { NavigationContext } from "../context/NavigationProvider";

const fetchData = async () => {
  try {
    const { CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL } = process.env;
    const response = await axios.get(
      CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/all/roles"
    );
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};
const deleteData = async (roleId) => {
  try {
    const { CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL } = process.env;
    await axios.delete(
      CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + `/role/${roleId}`
    );
    return true;
  } catch (error) {
    console.error(error);
  }
};

export default function RolesListing({ header = true }) {
  const [modalState, setModalState] = useState({ isOpen: false, action: "" });
  const [rolesState, setRolesState] = useState([]);
  const [roleUpdate, setRoleUpdate] = useState({ key: "", message: "" });
  const limitMax = 3;
  const navigate = useNavigate();
  const { setPreviousPageName, previousPageName } =
    useContext(NavigationContext);

  useEffect(() => {
    const fetchDataCallback = async () => {
      const result = await fetchData();
      if (!header) {
        setRolesState(result.slice(0, limitMax));
      } else {
        setRolesState(result);
      }
    };
    fetchDataCallback().catch((err) => console.error(err));
  }, [roleUpdate]);

  const deleteRole = (roleId: any) => {
    const deleteDatacallback = async () => {
      if (confirm("Are you sure you want to delete this Role?")) {
        await deleteData(roleId);
        setRoleUpdate({ key: roleId, message: "deleted successfully" });
      }
    };
    deleteDatacallback().catch((err) => console.error(err));
  };

  return (
    <>
      {header && <PageHeader />}
      <section className="tw-px-5 tw-sm:tw-px-16 tw-lg:tw-px-36 tw-relative">
        <div className="tw-flex  tw-pt-10 tw-pb-7 tw-border-b-2">
          <div className="tw-w-1/2">
            <h1 className="tw-text-xl tw-font-bold tw-mr-[880px]">Roles</h1>
          </div>

          <div className="tw-w-1/2 tw-flex tw-justify-end tw-items-center">
            {!header && (
              <a
                className="tw-text-sm tw-cursor-pointer tw-mr-5 tw-text-[#676567]"
                onClick={() => {
                  setPreviousPageName(["Dashboard"]);
                  navigate(`/csc-agent-platform/admin/access-management/roles`);
                }}
              >
                Show all Roles
              </a>
            )}
            <button
              className="tw-w-[150px] tw-h-[38px]  tw-border-2 tw-border-black tw-rounded-full tw-ml-5 "
              onClick={() => setModalState({ isOpen: true, action: "add" })}
            >
              Add new Role
            </button>
          </div>
        </div>
        <ListHead>
          <span className="tw-text-sm tw-font-normal tw-w-1/3 tw-truncate tw-text-[#676567]">
            Name
          </span>
          <span className="tw-text-sm tw-font-normal tw-w-2/3 tw-truncate tw-text-[#676567]">
            Description
          </span>
        </ListHead>
        {rolesState.length > 0 &&
          rolesState.map((item) => (
            <div key={item.roleId} className=" tw-border-b tw-pt-4 tw-pb-4">
              <div className="tw-flex tw-justify-between tw-items-start">
                <span className="tw-text-base tw-font-normal tw-w-1/3 tw-truncate">
                  {item.roleName}
                </span>
                <span className="tw-text-base tw-font-normal tw-w-1/3 tw-truncate">
                  {item.roleDescription}
                </span>
                <span className="tw-text-base tw-flex tw-font-normal tw-w-1/3 tw-gap-4 tw-justify-end">
                  <button
                    className="tw-w-[1.25rem]"
                    onClick={() => {
                      setPreviousPageName([...previousPageName, "Roles"]);
                      navigate(
                        `/csc-agent-platform/admin/access-management/role/${item.roleId}`
                      );
                    }}
                  >
                    <img src={viewEditIcon} alt="Edit"></img>
                  </button>
                  <button
                    className="tw-w-[74px] tw-h-[36px] tw-bg-[#EEEEEE] tw-text-sm tw-text-[#666666] tw-rounded-full"
                    onClick={() => deleteRole(item.roleId)}
                  >
                    Delete
                  </button>
                </span>
              </div>
            </div>
          ))}
      </section>
      <Modal
        isOpen={modalState.isOpen}
        title={"Create New Role"}
        onClose={() => setModalState({ isOpen: false, action: "" })}
      >
        <CreateNewRole setModalState={setModalState} />
      </Modal>
    </>
  );
}
