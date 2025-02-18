/* eslint-disable no-unused-vars */
import React, { memo, useMemo } from "react";
import { Route } from "react-router-dom";
import OnlineMembers from "../../components/pages/html/bridengroomleadsfilter/OnlineMembers";
import MemberAdvanceSearch from "../../components/pages/html/bridengroomleadsfilter/MemberAdvanceSearch";
import PlanwisePaidMembers from "../../components/pages/html/bridengroomleadsfilter/PlanwisePaidMembers";
import PersonalizedMember from "../../components/pages/html/bridengroomleadsfilter/PersonalizedMember";
import StaffRole from "../../components/pages/html/StaffRole";
import StaffRoleEdit from "../../components/pages/html/StaffRoleEdit";
import ProfileDetails from "../../components/pages/html/ProfileDetails";
import ApprovedCustomer from "../../components/pages/bride&groom/approvedcustomer/ApprovedCustomer";
import ApprovedCustomerView from "../../components/pages/html/ApprovedCustomerView";
import SaasDashboard from "../../components/pages/html/SaasDashboard";
import PaasPaymentMethod from "../../components/pages/html/PaasPaymentMethod";
import PaasPaymentMethodInner from "../../components/pages/html/PaasPaymentMethodInner";
import ApprovedCustomerSendRequestTable from "../../components/pages/html/ApprovedCustomerSendRequestTable";
import MemberPaidToFeatured from "../../components/pages/html/bridengroomleadsfilter/MemberPaidToFeatured";
import CountryWiseMembers from "../../components/pages/html/bridengroomleadsfilter/CountryWiseMembers";
import NoCommentMembers from "../../components/pages/html/bridengroomleadsfilter/NoCommentMembers";
import HomePageMembers from "../../components/pages/html/bridengroomleadsfilter/HomePageMembers";
import MembershipOnHold from "../../components/pages/html/bridengroomleadsfilter/MembershipOnHold";
import SearchPendingProfileMembers from "../../components/pages/html/bridengroomleadsfilter/SearchPendingProfileMembers";
import DeleteProfileRequest from "../../components/pages/html/bridengroomleadsfilter/DeleteProfileRequest";
import InquiryMembers from "../../components/pages/html/bridengroomleadsfilter/InquiryMembers";
import LapsedMembership from "../../components/pages/html/bridengroomleadsfilter/LapsedMembership";
import UpgradeDowngradePlan from "../../components/pages/html/bridengroomleadsfilter/UpgradeDowngradePlan";
import MemberActiveToPaid from "../../components/pages/html/bridengroomleadsfilter/MemberActiveToPaid";
import PopupDesign from "../../components/pages/html/PopupDesign";
import AdminRequests from "../../components/pages/html/AdminRequests";
import MemberOrganizationDetails from "../../components/pages/html/MemberOrganizationDetails";

import PrivacyPolicy from "../../components/pages/html/PrivacyPolicy";
import TermsCondition from "../../components/pages/html/TermsCondition";
import SubscriptionList from "../../components/pages/html/SubscriptionList";
import ApiDevelopment from "../../components/pages/html/ApiDevelopment";

import OrganizationList from "../../components/pages/html/OrganizationList";
import DomainSearch from "../../components/pages/html/DomainSearch";
import TableViewAdmin from "../../components/pages/html/TableViewAdmin";
import WebsiteContent from "../../components/pages/html/WebsiteContent";
import ShareDataTable from "../../components/pages/html/ShareDataTable";

import WebsiteContentLanding from "../../components/pages/html/WebsiteContentLanding";
import PersonalDetails from "../../components/pages/html/PersonalDetails";
import AllStaff from "../../components/pages/html/AllStaff";
import StaffContactDetailRequest from "../../components/pages/html/StaffContactDetailRequest";
import RequireAuth from "../../guard/RoutesGuard";
import Loader from "../../utils/Loader/Loader";
import MatchReport from "../../components/pages/html/MatchReport";
import PerformanceCheck from "../../components/pages/member/organization/PerformanceCheck";
import DashboardStories from "../../components/pages/html/dashoard/DashboardStories";
import Chat from "../../components/pages/html/chat/Chat";
import SalesReport from "../../components/pages/html/report/SalesReport";
import EmailTemplete from "../../components/pages/html/emailsmstemplete/EmailTemplete";
import Campaign from "../../components/pages/html/emailsmstemplete/Campaign";
const Routes = [
  {
    link: "/html/organization-list",
    component: (
      <RequireAuth>
        <OrganizationList />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/domain",
    component: (
      <RequireAuth>
        <DomainSearch />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/table-view-admin",
    component: (
      <RequireAuth>
        <TableViewAdmin />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/website-content",
    component: (
      <RequireAuth>
        <WebsiteContent />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/website-content-landing",
    component: (
      <RequireAuth>
        <WebsiteContentLanding />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/pass-payment-method",
    component: (
      <RequireAuth>
        <PaasPaymentMethod />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/pass-payment-method-inner",
    component: (
      <RequireAuth>
        <PaasPaymentMethodInner />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/share-data",
    component: (
      <RequireAuth>
        <ShareDataTable />
      </RequireAuth>
    ),
    loader: <Loader />,
  },

  {
    link: "/html/personal-details",
    component: (
      <RequireAuth>
        <PersonalDetails />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/all-staff",
    component: (
      <RequireAuth>
        <AllStaff />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/staff-contact-detail-request",
    component: (
      <RequireAuth>
        <StaffContactDetailRequest />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/staff-role",
    component: (
      <RequireAuth>
        <StaffRole />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/staff-role-edit",
    component: (
      <RequireAuth>
        <StaffRoleEdit />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/approved-customer",
    component: (
      <RequireAuth>
        <ApprovedCustomer />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/approved-customer-view",
    component: (
      <RequireAuth>
        <ApprovedCustomerView />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/approved-customer-send-request-table",
    component: (
      <RequireAuth>
        <ApprovedCustomerSendRequestTable />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/profile-details",
    component: (
      <RequireAuth>
        <ProfileDetails />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/member-organization-details",
    component: (
      <RequireAuth>
        <MemberOrganizationDetails />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/saas-dashboard",
    component: (
      <RequireAuth>
        <SaasDashboard />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/popup",
    component: (
      <RequireAuth>
        <PopupDesign />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/admin-requests",
    component: (
      <RequireAuth>
        <AdminRequests />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/online-members",
    component: (
      <RequireAuth>
        <OnlineMembers />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/member-advance-search",
    component: (
      <RequireAuth>
        <MemberAdvanceSearch />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/planwise-paid-members",
    component: (
      <RequireAuth>
        <PlanwisePaidMembers />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/personalized-member",
    component: (
      <RequireAuth>
        <PersonalizedMember />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/member-active-to-paid",
    component: (
      <RequireAuth>
        <MemberActiveToPaid />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/member-paid-to-featured",
    component: (
      <RequireAuth>
        <MemberPaidToFeatured />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/lapsed-membership",
    component: (
      <RequireAuth>
        <LapsedMembership />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/upgrade-downgrade-plan",
    component: (
      <RequireAuth>
        <UpgradeDowngradePlan />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/country-wise-members",
    component: (
      <RequireAuth>
        <CountryWiseMembers />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/no-comment-members",
    component: (
      <RequireAuth>
        <NoCommentMembers />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/home-page-members",
    component: (
      <RequireAuth>
        <HomePageMembers />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/membership-on-hold",
    component: (
      <RequireAuth>
        <MembershipOnHold />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/search-pending-profile-members",
    component: (
      <RequireAuth>
        <SearchPendingProfileMembers />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/delete-profile-request",
    component: (
      <RequireAuth>
        <DeleteProfileRequest />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/inquiry-members",
    component: (
      <RequireAuth>
        <InquiryMembers />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/privacy-policy",
    component: (
      <RequireAuth>
        <PrivacyPolicy />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/terms-condition",
    component: (
      <RequireAuth>
        <TermsCondition />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/subscription-list",
    component: (
      <RequireAuth>
        <SubscriptionList />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/api-development",
    component: (
      <RequireAuth>
        <ApiDevelopment />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/match-report",
    component: (
      <RequireAuth>
        <MatchReport />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/match-report",
    component: (
      <RequireAuth>
        <MatchReport />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/stories",
    component: (
      <RequireAuth>
        <DashboardStories />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/chat",
    component: (
      <RequireAuth>
        <Chat />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/sales-report",
    component: (
      <RequireAuth>
        <SalesReport />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/email-templete",
    component: (
      <RequireAuth>
        <EmailTemplete />
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  {
    link: "/html/campaign",
    component: (
      <RequireAuth>
        <Campaign/>
      </RequireAuth>
    ),
    loader: <Loader />,
  },
  
];
const HtmlRoutes = () => {
  return (
    <>
      {Routes.map((route, index) => (
        <Route
          key={index}
          path={route.link}
          element={route.component}
          loader={route.loader}
        />
      ))}
    </>
  );
};
export default HtmlRoutes;
