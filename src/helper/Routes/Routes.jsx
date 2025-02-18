// import {useState} from 'react'
// import { Route, Routes, useRoutes } from 'react-router-dom'
// import Dashboard from '../../pages/Dashboard'
// import Login from '../../pages/Login'
// import UserList from '../../pages/UserList'
// import RoleList from '../../pages/RoleList'
// import RolePermissionList from '../../pages/RolePermissionList'
// import AddRolePermission from '../../pages/AddRolePermission'
// import RolePermissionDetails from '../../pages/RolePermissionDetails'
// import AddRole from '../../pages/AddRole'
// import RoleDetails from '../../pages/RoleDetails'
// import UserDetails from '../../pages/UserDetails'
// import { AddUser } from '../ValidationHelper/Validation'
// import PagenotFound from '../../pages/PagenotFound'
// import RequireAuth from '../../guard/RoutesGuard'
import RequireAuth, { NonAuth } from "../../guard/RoutesGuard";
import Login from "../../components/pages/Login";

import Organization from "../../components/pages/subscription/Organization";
import OrganizationAdd from "../../components/pages/subscription/OrganizationAdd";
import Customer from "../../components/pages/subscription/Customer";
import Franchise from "../../components/pages/subscription/Franchise";
import FranchiseAdd from "../../components/pages/subscription/FranchiseAdd";
import Subscription from "../../components/pages/subscription/Subscription";
import ProfilesDetailsAdd from "../../components/pages/bride&groom/leads/profile/ProfilesDetailsAdd";
import ViewProfile from "../../components/pages/bride&groom/leads/view/ViewProfile";
import AddFranchise from "../../components/pages/member/franchise/AddFranchise";
import ViewFranchise from "../../components/pages/member/franchise/ViewFranchise";
import ViewOrganization from "../../components/pages/member/organization/ViewOrganization";
import ShareDataOrganizationView from "../../components/pages/sharedata/organization/ShareDataOrganizationView";
import ShareDataFranchiseView from "../../components/pages/sharedata/franchise/ShareDataFranchiseView";
import AddOrganization from "../../components/pages/member/organization/AddOrganization";
import StaffList from "../../components/pages/staff/staff/StaffList";
import EditStaffDetails from "../../components/pages/staff/staff/EditStaffDetails";
import StaffPermission from "../../components/pages/staff/staffpermission/StaffPermission";
import Department from "../../components/pages/staff/department/Department";
import AddDepartment from "../../components/pages/staff/department/AddDepartment";
import AddStaff from "../../components/pages/staff/staff/AddStaff";
import ViewFranchiseDetails from "../../components/pages/member/franchise/ViewFranchiseDetails";
import ViewOrganizationDetails from "../../components/pages/member/organization/ViewOrganizationDetails";
import BridenGroomListing from "../../components/pages/bride&groom/bridengroomListing/BridenGroomListing";
import MainBridenGroomDetails from "../../components/pages/bride&groom/bridengroomListing/MainBridenGroomDetails";
import RequestList from "../../components/pages/bride&groom/request/RequestList";
import ViewTickets from "../../components/pages/ticket/ViewTickets";
import CustomerAdd from "../../components/pages/subscription/CustomerAdd";
import ApprovedCustomerDetails from "../../components/pages/bride&groom/approvedcustomer/ApprovedCustomerDetails";
import Loader from "../../utils/Loader/Loader";
import { Route } from "react-router-dom";
import ApprovedCustomer from "../../components/pages/bride&groom/approvedcustomer/ApprovedCustomer";
import { DropdownListingRoute } from "../../utils/DropdownListing";
import { IsAccessible, IsAccessiblePage } from "../../guard/Rbac";
import MatchReport from "../../components/pages/bride&groom/matchreport/MatchReport";
import Comment from "../../components/pages/staff/comment/Comment";
import StaffReport from "../../components/pages/report/staff/StaffReport";
import StaffReportDetails from "../../components/pages/report/staff/StaffReportDetails";
import PerformanceCheck from "../../components/pages/member/organization/PerformanceCheck";
import MainChat from "../../components/pages/chat/MainChat";
import SmsEmailConfiguration from "../../components/pages/campaign/SmsEmailConfiguration";
import CampaignSetup from "../../components/pages/campaign/campaignsetup/CampaignSetup";
import CampaignListing from "../../components/pages/campaign/campaignsetup/CampaignListing";
import SmsEmailTemplate from "../../components/pages/campaign/template/SmsEmailTemplate";
import RoleList from "../../components/pages/staff/role/RoleList";
import AddRole from "../../components/pages/staff/role/AddRole";
import TeamList from "../../components/pages/staff/team/TeamList";
import AddTeam from "../../components/pages/staff/team/AddTeam";
import StaffPermissionAssign from "../../components/pages/staff/staffpermission/StaffPermissionAssign";
import PermissionList from "../../components/pages/staff/staffpermission/PermissionList";

const Routes = [
  {
    link: "/login",
    component: (
      <NonAuth>
        <Login />
      </NonAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/customer",
    component: <Customer />,
    loader: <Loader />,
  },
  {
    link: "/subscription/franchise/:id?",
    component: <Franchise />,
    loader: <Loader />,
  },
  {
    link: "/subscription/franchise/form/:id?",
    component: <FranchiseAdd />,
    loader: <Loader />,
  },
  {
    link: "/subscription/organization/:id?",
    component: <Organization />,
    loader: <Loader />,
  },
  {
    link: "/subscription/organization/form/:id?",
    component: <OrganizationAdd />,
    loader: <Loader />,
  },

  // {
  //   link: "/subscription/customer",
  //   component: <Customer />,
  //   loader: <Loader />,
  // },
  // {
  //   link: "/subscription/customer/form/:id?",
  //   component: <CustomerAdd />,
  //   loader: <Loader />,
  // },
  // {
  //   link: "/bridengroom/customer/add",
  //   component: <ProfilesDetailsAdd />,
  //   loader: <Loader />,
  // },
  {
    link: "/bridengroom/customer/add",
    component: <ProfilesDetailsAdd />,
    loader: <Loader />,
  },
  {
    link: "/bridengroom/customer/matchreport/:id",
    component: <MatchReport />,
    loader: <Loader />,
  },
  {
    link: "/bridengroom/requests",
    component: <RequestList />,
    loader: <Loader />,
  },
  {
    link: "/bridengroom/approved/customer/details/:id",
    component: <ApprovedCustomerDetails />,
    loader: <Loader />,
  },
  {
    link: "/bridengroom/approved/customer",
    component: <ApprovedCustomer />,
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
    link: "/subscription",
    component: <Subscription />,
    loader: <Loader />,
  },
  {
    link: "/member/franchise",
    component: <ViewFranchise />,
    loader: <Loader />,
  },
  {
    link: "/member/franchise/details/:id",
    component: <ViewFranchiseDetails />,
    loader: <Loader />,
  },
  {
    link: "/member/franchise/add/:id?",
    component: <AddFranchise />,
    loader: <Loader />,
  },
  // {
  //   link: "/member/franchise/:id",
  //   component: <AddFranchise />,
  //   loader: <Loader />,
  // },
  {
    link: "/member/organization",
    component: <ViewOrganization />,
    loader: <Loader />,
  },
  {
    link: "/member/organization/details/:id",
    component: <ViewOrganizationDetails />,
    loader: <Loader />,
  },
  {
    link: "/member/organization/add",
    component: <AddOrganization />,
    loader: <Loader />,
  },
 {
    link: "/member/organization/:id",
    component: <AddOrganization />,
    loader: <Loader />,
  },
  {
    link: "/member/organization/performance/:id?",
    component: (
      <RequireAuth>
        <PerformanceCheck />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/member/franchise/performance/:id?",
    component: (
      <RequireAuth>
        <PerformanceCheck />
      </RequireAuth>
    ),
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
    link: "/staff/form/:id?",
    component: <AddStaff />,
    loader: <Loader />,
  },
  {
    link: "/role",
    component: <RoleList />,
    loader: <Loader />,
  },
  {
    link: "/role/form/:id?",
    component: <AddRole />,
    loader: <Loader />,
  },
  {
    link: "/team",
    component: <TeamList />,
    loader: <Loader />,
  },
  {
    link: "/team/form/:id?",
    component: <AddTeam />,
    loader: <Loader />,
  },
  {
    link: "/staff/details/:id",
    component: <EditStaffDetails />,
    loader: <Loader />,
  },
  {
    link: "/permissionassign",
    component: <PermissionList />,
    loader: <Loader />,
  },
  {
    link: "/permissionassign/form/:id?",
    component: <StaffPermissionAssign />,
    loader: <Loader />,
  },
  // {
  //   link: "/permission",
  //   component: <Permissions />,
  //   loader: <Loader />,
  // },
  {
    link: "/department",
    component: <Department />,
    loader: <Loader />,
  },
  {
    link: "/department/form/:id?",
    component: <AddDepartment />,
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
    link: "/report/staffreport/:id?",
    component: <StaffReportDetails />,
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
  // <Route path="/admin/campaign/configuration" element={<RequireAuth><SmsEmailConfiguration /></RequireAuth>} />
  // <Route path="/admin/campaign/setup" element={<RequireAuth><CampaignSetup /></RequireAuth>} />
  // <Route path="/admin/campaign/listing" element={<RequireAuth><CampaignListing /></RequireAuth>} />
  // <Route path="/admin/campaign/template" element={<RequireAuth><SmsEmailTemplate /></RequireAuth>} />
  ...DropdownListingRoute,
];
const renderComponent = (route) => {
  if (route?.link == "/login" || route?.link.includes("/bridengroom/customer/matchreport/") || route?.link == "/chat") return route?.component
  return (
    <RequireAuth>
      {/* <IsAccessiblePage pathname={route?.link}> */}
      {route.component}
      {/* </IsAccessiblePage> */}
    </RequireAuth>
  );
};
const RbacRoute = () => {
  return (
    <>
      {Routes.map((route, index) => (
        <Route key={index} path={route.link} element={renderComponent(route)} />
      ))}
    </>
  );
};
export default RbacRoute;
