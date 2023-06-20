import PageHeader from "../components/PageHeader";

export default function RoleDetailPage() {
  return (
    <>
      <PageHeader
        seachItem={"all/roles/"}
        label={"roleName"}
        searchId={"roleId"}
        searchBy={"roles"}
      />
    </>
  );
}
