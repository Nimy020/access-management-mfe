import AccessManagement from './pages/AccessManagement';
import FeatureDetail from './pages/FeatureDetail';
import RoleDetail from './pages/RoleDetail';
import RolesListing from './pages/RolesListing';
const routes = [
  {
    path: '/access-management',
    name: 'Dashboard',
    element: <AccessManagement />,
  },
  {
    path: '/access-management/roles',
    name: 'Roles',
    crumbs: { label: 'Dashboard', to: '/access-management' },
    element: <RolesListing  />,
  },
  {
    path: '/access-management/role/:id',
    name: 'Roles',
    crumbs: { label: 'Roles', to: '/access-management/roles' },
    element: <RoleDetail />,
  },
  {
    path: '/access-management/feature/:id',
    name: 'Features',
    crumbs: { label: 'Dashboard', to: '/access-management' },
    element: <FeatureDetail />,
  },
];

export default routes;
