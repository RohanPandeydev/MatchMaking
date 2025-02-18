import { Route } from "react-router";
import { IsAccessible } from "../../../guard/Rbac";
import FranchiseAdd from "../../../components/pages/subscription/FranchiseAdd";
import Loader from "../../../utils/Loader/Loader";
import OrganizationAdd from "../../../components/pages/subscription/OrganizationAdd";
import AddFranchise from "../../../components/pages/member/franchise/AddFranchise";
import AddStaff from "../../../components/pages/staff/staff/AddStaff";
import AddOrganization from "../../../components/pages/member/organization/AddOrganization";
import { UpdateRoutesMaster } from "../../../utils/DropdownListing";
import AddRole from "../../../components/pages/staff/role/AddRole";
import AddTeam from "../../../components/pages/staff/team/AddTeam";
import StaffPermissionAssign from "../../../components/pages/staff/staffpermission/StaffPermissionAssign";
import AddDepartment from "../../../components/pages/staff/department/AddDepartment";
import RequireAuth from "../../../guard/RoutesGuard";


const UpdateRoutes=[

    {
        link: "/subscription/franchise/form/:id",
        component: <FranchiseAdd />,
        loader: <Loader />,
      },
      {
        link: "/subscription/organization/form/:id",
        component: <OrganizationAdd />,
        loader: <Loader />,
      },
      {
        link: "/member/franchise/add/:id",
        component: <AddFranchise />,
        loader: <Loader />,
      },
   
      {
        link: "/member/organization/:id",
        component: <AddOrganization />,
        loader: <Loader />,
      },
      {
        link: "/staff/form/:id",
        component: <AddStaff />,
        loader: <Loader />,
      },
      {
        link: "/role/form/:id",
        component: <AddRole />,
        loader: <Loader />,
      },
      {
        link: "/team/form/:id",
        component: <AddTeam />,
        loader: <Loader />,
      },
      {
        link: "/permissionassign/form/:id",
        component: <StaffPermissionAssign />,
        loader: <Loader />,
      },
      {
        link: "/department/form/:id",
        component: <AddDepartment />,
        loader: <Loader />,
      },

      ...UpdateRoutesMaster
]


const renderComponent = (route) => {

    return (
        <RequireAuth>
            <IsAccessible method={"update"} route={route?.link}>
                {route.component}
            </IsAccessible>
        </RequireAuth>
    );
};
const RbacUpdateRoute = () => {
    return (
        <>
            {UpdateRoutes.map((route, index) => (
                <Route key={index} path={route.link} element={renderComponent(route)} />
            ))}
        </>
    );
};

export default RbacUpdateRoute