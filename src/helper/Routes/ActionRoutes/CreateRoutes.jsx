import { Route } from "react-router";
import FranchiseAdd from "../../../components/pages/subscription/FranchiseAdd";
import Loader from "../../../utils/Loader/Loader";
import { IsAccessible } from "../../../guard/Rbac";
import OrganizationAdd from "../../../components/pages/subscription/OrganizationAdd";
import AddOrganization from "../../../components/pages/member/organization/AddOrganization";
import AddTeam from "../../../components/pages/staff/team/AddTeam";
import AddRole from "../../../components/pages/staff/role/AddRole";
import AddStaff from "../../../components/pages/staff/staff/AddStaff";
import StaffPermissionAssign from "../../../components/pages/staff/staffpermission/StaffPermissionAssign";
import AddDepartment from "../../../components/pages/staff/department/AddDepartment";
import ProfilesDetailsAdd from "../../../components/pages/bride&groom/leads/profile/ProfilesDetailsAdd";
import { CreateRoutesMaster } from "../../../utils/DropdownListing";
import AddFranchise from "../../../components/pages/member/franchise/AddFranchise";
import RequireAuth from "../../../guard/RoutesGuard";


const CreateRoutes = [
    {
        link: "/bridengroom/customer/add",
        component: <ProfilesDetailsAdd />,
        loader: <Loader />,
    },
    {
        link: "/subscription/franchise/form",
        component: <FranchiseAdd />,
        loader: <Loader />,
    },
    {
        link: "/subscription/organization/form",
        component: <OrganizationAdd />,
        loader: <Loader />,
    },
    {
        link: "/member/franchise/add",
        component: <AddFranchise />,
        loader: <Loader />,
    },
    {
        link: "/member/organization/add",
        component: <AddOrganization />,
        loader: <Loader />,
    },

    {
        link: "/staff/form",
        component: <AddStaff />,
        loader: <Loader />,
    },
    {
        link: "/role/form",
        component: <AddRole />,
        loader: <Loader />,
    },
    {
        link: "/team/form",
        component: <AddTeam />,
        loader: <Loader />,
    },
    {
        link: "/permissionassign/form",
        component: <StaffPermissionAssign />,
        loader: <Loader />,
    },
    {
        link: "/department/form",
        component: <AddDepartment />,
        loader: <Loader />,
    },
    ...CreateRoutesMaster

]

const renderComponent = (route) => {

    return (
        <RequireAuth>
            <IsAccessible method={"create"} route={route?.link}>
                {route.component}
            </IsAccessible>
        </RequireAuth>
    );
};
const RbacCreateRoute = () => {
    return (
        <>
            {CreateRoutes.map((route, index) => (
                <Route key={index} path={route.link} element={renderComponent(route)} />
            ))}
        </>
    );
};

export default RbacCreateRoute