import AccessManagement from "./pages/AccessManagement";
import FeatureDetail from "./pages/FeatureDetail";
import RoleDetail from "./pages/RoleDetail";
import RolesListing from "./pages/RolesListing";
const routes = [
  {
    path: "",
    name: "Dashboard",
    element: <AccessManagement />,
  },
  {
    path: "roles",
    name: "Roles",
    element: <RolesListing />,
  },
  {
    path: "role/:id",
    name: "Roles",
    element: <RoleDetail />,
  },
  {
    path: "feature/:id",
    name: "Features",

    element: <FeatureDetail />,
  },
];

export default routes;
