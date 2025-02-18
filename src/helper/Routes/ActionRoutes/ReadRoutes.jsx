import { Route } from "react-router";
import BridenGroomListing from "../../../components/pages/bride&groom/bridengroomListing/BridenGroomListing";
import RequestList from "../../../components/pages/bride&groom/request/RequestList";
import MainChat from "../../../components/pages/chat/MainChat";
import ViewFranchise from "../../../components/pages/member/franchise/ViewFranchise";
import ViewOrganization from "../../../components/pages/member/organization/ViewOrganization";
import StaffReport from "../../../components/pages/report/staff/StaffReport";
import ShareDataFranchiseView from "../../../components/pages/sharedata/franchise/ShareDataFranchiseView";
import ShareDataOrganizationView from "../../../components/pages/sharedata/organization/ShareDataOrganizationView";
import RoleList from "../../../components/pages/staff/role/RoleList";
import StaffList from "../../../components/pages/staff/staff/StaffList";
import PermissionList from "../../../components/pages/staff/staffpermission/PermissionList";
import TeamList from "../../../components/pages/staff/team/TeamList";
import Franchise from "../../../components/pages/subscription/Franchise";
import Organization from "../../../components/pages/subscription/Organization";
import ViewTickets from "../../../components/pages/ticket/ViewTickets";
import { ReadRoutesMaster } from "../../../utils/DropdownListing";
import Loader from "../../../utils/Loader/Loader";
import { IsAccessible } from "../../../guard/Rbac";
import RequireAuth, { NonAuth } from "../../../guard/RoutesGuard";
import Department from "../../../components/pages/staff/department/Department";
import CampaignSetup from "../../../components/pages/campaign/campaignsetup/CampaignSetup";
import SmsEmailTemplate from "../../../components/pages/campaign/template/SmsEmailTemplate";
import CampaignListing from "../../../components/pages/campaign/campaignsetup/CampaignListing";
import SmsEmailConfiguration from "../../../components/pages/campaign/SmsEmailConfiguration";
import Login from "../../../components/pages/Login";
import MainBridenGroomDetails from "../../../components/pages/bride&groom/bridengroomListing/MainBridenGroomDetails";
import ViewOrganizationDetails from "../../../components/pages/member/organization/ViewOrganizationDetails";
import ViewFranchiseDetails from "../../../components/pages/member/franchise/ViewFranchiseDetails";
import MatchReport from "../../../components/pages/bride&groom/matchreport/MatchReport";

const ReadRoutes = [

    {
        link: "/member/organization",
        component: <ViewOrganization />,
        loader: <Loader />,
        feature: "Organization",
    },
    {
        link: "/member/franchise",
        component: <ViewFranchise />,
        loader: <Loader />,
        feature: "Franchise",
    },
    {
        link: "/member/franchise/details/:id",
        component: <ViewFranchiseDetails />,
        loader: <Loader />,
    },
    {
        link: "/member/organization/details/:id",
        component: <ViewOrganizationDetails />,
        loader: <Loader />,
    },
    {
        link: "/subscription/franchise/:id?",
        component: <Franchise />,
        loader: <Loader />,
    },

    {
        link: "/subscription/organization/:id?",
        component: <Organization />,
        loader: <Loader />,
    },
    {
        link: "/bridengroom/customer",
        component: <BridenGroomListing />,
        loader: <Loader />,
    },
    {
        link: "/bridengroom/customer/:id",
        component: <MainBridenGroomDetails />,
        loader: <Loader />,
    },
    {
        link: "/bridengroom/requests",
        component: <RequestList />,
        loader: <Loader />,
    },
    {
        link: "/sharedata/organization",
        component: <ShareDataOrganizationView />,
        loader: <Loader />,
    },
    {
        link: "/sharedata/franchise",
        component: <ShareDataFranchiseView />,
        loader: <Loader />,
    },
    {
        link: "/staff",
        component: <StaffList />,
        loader: <Loader />,
    },
    {
        link: "/role",
        component: <RoleList />,
        loader: <Loader />,
    },
    {
        link: "/team",
        component: <TeamList />,
        loader: <Loader />,
    },
    {
        link: "/permissionassign",
        component: <PermissionList />,
        loader: <Loader />,
    },
    {
        link: "/department",
        component: <Department />,
        loader: <Loader />,
    },
    {
        link: "/comment",
        component: <Comment />,
        loader: <Loader />,
    },
    {
        link: "/report/staffreport",
        component: <StaffReport />,
        loader: <Loader />,
    },
    {
        link: "/support_feedback",
        component: <ViewTickets />,
        loader: <Loader />,
    },
    {
        link: "/chat/:id?",
        component: <MainChat />,
        loader: <Loader />,
    },
    {
        link: "/campaign/configuration",
        component: <SmsEmailConfiguration />,
        loader: <Loader />,
    },
    {
        link: "/campaign/listing",
        component: <CampaignListing />,
        loader: <Loader />,
    },
    {
        link: "/campaign/template",
        component: <SmsEmailTemplate />,
        loader: <Loader />,
    },
    {
        link: "/campaign/setup",
        component: <CampaignSetup />,
        loader: <Loader />,
    },
    {
        link: "/bridengroom/customer/matchreport/:id",
        component: <MatchReport />,
        loader: <Loader />,
    },
    ...ReadRoutesMaster,

]

const renderComponent = (route) => {
    if (route?.link == "/login" || route.link.includes("/bridengroom/customer/matchreport/") || route?.link == "/chat") return route?.component
    return (
        <RequireAuth>
            <IsAccessible method={"read"} route={route?.link}>
                {route.component}
            </IsAccessible>
        </RequireAuth>
    );
};
const RbacReadRoute = () => {
    return (
        <>
            {ReadRoutes.map((route, index) => (
                <Route key={index} path={route.link} element={renderComponent(route)} />
            ))}
        </>
    );
};

export default RbacReadRoute