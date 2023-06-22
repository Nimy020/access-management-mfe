import AccessManagement from "./Pages/AccessManagement";
import FeatureDetail from "./Pages/FeatureDetail";
import RoleDetail from "./Pages/RoleDetail";
import RolesListing from "./Pages/RolesListing";
import { FeatureProvider } from "./context/FeatureProvider";
const routes = [
  {
    path: "/csc-agent-platform/admin/access-management",
    name: "Dashboard",
    element: (
      <FeatureProvider>
        <AccessManagement />
      </FeatureProvider>
    ),
  },
  {
    path: "/csc-agent-platform/admin/access-management/roles",
    name: "Roles",
    element: <RolesListing />,
  },
  {
    path: "/csc-agent-platform/admin/access-management/role/:id",
    name: "Roles",
    element: <RoleDetail />,
  },
  {
    path: "/csc-agent-platform/admin/access-management/feature/:id",
    name: "Features",

    element: (
      <FeatureProvider>
        <FeatureDetail />
      </FeatureProvider>
    ),
  },
];

export default routes;
