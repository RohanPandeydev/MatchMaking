import { LuLogOut, LuMessageSquare, LuUserX2 } from "react-icons/lu";
import { BsBasket, BsSpeedometer2 } from "react-icons/bs";
import {
  FiChevronRight,
  FiUser,
  FiUsers,
  FiShare,
  FiDollarSign,
  FiPieChart,
  FiBriefcase,
  FiCreditCard,
  FiMail,
  FiFilm,
  FiMessageCircle,
  FiFileText,
} from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { CgRing } from "react-icons/cg";
import { FaRegFolderClosed } from "react-icons/fa6";
import { MdOutlineSubscriptions } from "react-icons/md";
import { ImTree } from "react-icons/im";
import { RiPlayList2Line } from "react-icons/ri";
import DropdownListing from "./DropdownListing";

const SideBarListing = [
  {
    parent: "Master",
    icon: <FiUser />,
    children: DropdownListing || [],
  },
  {
    parent: "Member",
    icon: <FiUser />,
    children: [
      { name: "Organization", id: 1, feature: "Organization", link: "/member/organization" },
      { name: "Franchise", id: 2, feature: "Franchise", link: "/member/franchise" },
    ],
  },
  {
    parent: "Bride and Groom",
    icon: <FiUsers />,
    children: [
      { name: "Bride n Groom", id: 3, feature: "bridengroom", link: "/bridengroom/customer" },
      { name: "Requests", id: 4, feature: "request", link: "/bridengroom/requests" },
    ],
  },
  {
    parent: "Share Data",
    icon: <FiShare />,
    children: [
      { name: "Organization", id: 5, feature: "Organization", link: "/sharedata/organization" },
      { name: "Franchise", id: 6, feature: "Franchise", link: "/sharedata/franchise" },
    ],
  },
  {
    parent: "Subscription",
    icon: <FiDollarSign />,
    children: [
      { name: "Organization", id: 7, feature: "Organization", link: "/subscription/organization" },
      { name: "Franchise", id: 8, feature: "Franchise", link: "/subscription/franchise" },
      // { name: "Customer", id: 8, feature: "Customer", link: "/subscription/customer" },

    ],
  },
  {
    parent: "Staff Management",
    icon: <FiBriefcase />,
    children: [
      { name: "Staff List", id: 9, feature: "staff", link: "/staff" },
      { name: "Team List", id: 9, feature: "team", link: "/team" },
      { name: "Role List", id: 9, feature: "role", link: "/role" },
      { name: "Department", id: 10, feature: "department", link: "/department" },
      // { name: "Department Permission", id: 11, feature: "staffpermission", link: "/permission" },
      { name: "Assign Permission ", id: 11, feature: "permission", link: "/permissionassign" },
    ],
  },
  {
    parent: "Tickets",
    icon: <FiMessageCircle />,
    link: "/support_feedback",
    id: 12,
  },
  {
    parent: "Report & Analysis",
    icon: <FiPieChart />,
    children: [
      { name: "Staff Report ", id: 13, feature: "staffreport", link: "/report/staffreport" },
      // { name: "Franchise", id: 14, feature: "Franchise", link: "#" },
      // { name: "Customer", id: 15, feature: "Customer", link: "#" },
    ],
  },
  {
    parent: "Transaction",
    icon: <FiCreditCard />,
    children: [
      { name: "Organization", id: 16, feature: "Organization", link: "#" },
      { name: "Franchise", id: 17, feature: "Franchise", link: "#" },
      { name: "Customer", id: 18, feature: "Customer", link: "#" },
    ],
  },
  // {
  //   parent: "Communications",
  //   icon: <FiMail />,
  //   children: [
  //     { name: "Organization", id: 19, feature: "Organization", link: "#" },
  //     { name: "Franchise", id: 20, feature: "Franchise", link: "#" },
  //     { name: "Customer", id: 21, feature: "Customer", link: "#" },
  //   ],
  // },
  // {
  //   parent: "Content & Media",
  //   icon: <FiFilm />,
  //   children: [
  //     { name: "Organization", id: 22, feature: "Organization", link: "#" },
  //     { name: "Franchise", id: 23, feature: "Franchise", link: "#" },
  //     { name: "Customer", id: 24, feature: "Customer", link: "#" },
  //   ],
  // },
  {
    parent: "Legal Documents",
    icon: <FiFileText />,
    children: [
      { name: "Organization", id: 25, feature: "Organization", link: "#" },
      { name: "Franchise", id: 26, feature: "Franchise", link: "#" },
      { name: "Customer", id: 27, feature: "Customer", link: "#" },
    ],
  },
  {
    parent: "Chats",
    icon: <FiMessageCircle />,
    link: "/chat",
    id: 12,
  },
  {
    parent: "Campaign",
    icon: <FiFileText />,
    children: [
      { name: "Email/SMS Configuration", id: 25, feature: "sms/email", link: "/campaign/configuration" },
      { name: "Campaign Setup", id: 25, feature: "campaign", link: "/campaign/setup" },
      { name: "Campaign Listing", id: 25, feature: "campaign", link: "/campaign/listing" },
      { name: "Campaign Template", id: 25, feature: "campaign", link: "/campaign/template" },
      // { name: "Franchise", id: 26, feature: "Franchise", link: "#" },
      // { name: "Customer", id: 27, feature: "Customer", link: "#" },
    ],
  },

];

export default SideBarListing;
