import PermissionSets from "../../../../guard/Method";

export let Permissions = [
  {
    parent: "Master",
    children: [
      {
        name: "Languages",
        id: 1,
        feature: "languages",
        link: "/master/languages",
        methods: Object.entries(PermissionSets?.master?.Languages).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "No of Children",
        id: 2,
        feature: "noofChildren",
        link: "/master/noofchildren",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Create By",
        id: 2,
        feature: "createdBy",
        link: "/master/createdBy",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Religions",
        id: 2,
        feature: "religions",
        link: "/master/religions",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Castes",
        id: 2,
        feature: "castes",
        link: "/master/castes",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Education Levels",
        id: 2,
        feature: "educationLevels",
        link: "/master/educationlevels",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Manglik Status",
        id: 2,
        feature: "manglikStatuses",
        link: "/master/manglikstatuses",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Employed In",
        id: 2,
        feature: "employedIn",
        link: "/master/employedin",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Occupations",
        id: 2,
        feature: "occupations",
        link: "/master/occupations",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Income Ranges",
        id: 2,
        feature: "incomeRanges",
        link: "/master/incomeranges",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Country",
        id: 2,
        feature: "country",
        link: "/master/country",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "City",
        id: 2,
        feature: "city",
        link: "/master/city",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "State",
        id: 2,
        feature: "state",
        link: "/master/state",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Residence Status",
        id: 2,
        feature: "residenceStatuses",
        link: "/master/residencestatus",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Countries With Codes",
        id: 2,
        feature: "countriesWithCodes",
        link: "/master/countriescodes",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Complexion",
        id: 2,
        feature: "complexionOptions",
        link: "/master/complexion",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Body Type",
        id: 2,
        feature: "bodyTypeOptions",
        link: "/master/body",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Diet",
        id: 2,
        feature: "dietOptions",
        link: "/master/diet",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Looking For",
        id: 2,
        feature: "lookingForOptions",
        link: "/master/lookingfor",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Age",
        id: 2,
        feature: "ageOptions",
        link: "/master/age",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Currency",
        id: 2,
        feature: "currency",
        link: "/master/currency",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Gift Card Category",
        id: 2,
        feature: "giftcardcategory",
        link: "/master/giftcardcategory",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Comment Activity",
        id: 2,
        feature: "commentactivity",
        link: "/master/commentactivity",
        methods: Object.entries(PermissionSets?.master.Master).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
    ],
  },
  {
    parent: "Member",
    children: [
      {
        name: "Organization",
        id: 1,
        feature: "Organization",
        link: "/member/organization",
        methods: Object.entries(PermissionSets?.member.Member).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Franchise",
        id: 2,
        feature: "Franchise",
        link: "/member/franchise",
        methods: Object.entries(PermissionSets?.member.Member).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
    ],
  },
  {
    parent: "Bride and Groom",
    children: [
      {
        name: "Bride n Groom",
        id: 3,
        feature: "bridengroom",
        link: "/bridengroom/customer",
        methods: Object.entries(
          PermissionSets?.bridengroom.bridengroomListing
        ).map(([key, value]) => ({
          label: key,
          value: value,
          isChecked: false  // Add isChecked property
        })),
      },
      {
        name: "Requests",
        id: 4,
        feature: "request",
        link: "/bridengroom/requests",
        methods: Object.entries(PermissionSets?.bridengroom.requests).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
    ],
  },
  {
    parent: "Share Data",
    children: [
      {
        name: "Organization",
        id: 5,
        feature: "Organization",
        link: "/sharedata/organization",
        methods: Object.entries(PermissionSets?.sharedata.ShareData).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Franchise",
        id: 6,
        feature: "Franchise",
        link: "/sharedata/franchise",
        methods: Object.entries(PermissionSets?.sharedata.ShareData).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
    ],
  },
  {
    parent: "Subscription",
    children: [
      {
        name: "Organization",
        id: 7,
        feature: "Organization",
        link: "/subscription/organization",
        methods: Object.entries(PermissionSets?.subscription.Subscription).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Franchise",
        id: 8,
        feature: "Franchise",
        link: "/subscription/franchise",
        methods: Object.entries(PermissionSets?.subscription.Subscription).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
    ],
  },
  {
    parent: "Staff Management",
    children: [
      {
        name: "Staff List",
        id: 9,
        feature: "staff",
        link: "/staff",
        methods: Object.entries(PermissionSets?.staff.Staff).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Department",
        id: 10,
        feature: "department",
        link: "/department",
        methods: Object.entries(PermissionSets?.staff.Staff).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Team List",
        id: 10,
        feature: "team",
        link: "/team",
        methods: Object.entries(PermissionSets?.staff.Staff).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Role List",
        id: 10,
        feature: "role",
        link: "/role",
        methods: Object.entries(PermissionSets?.staff.Staff).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Assign Permission",
        id: 10,
        feature: "permission",
        link: "/permissionassign",
        methods: Object.entries(PermissionSets?.staff.Staff).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      // {
      //   name: "Department Permission",
      //   id: 11,
      //   feature: "staffpermission",
      //   link: "/permission",
      //   methods: [
      //     { label: "Assign", value: "assign" },
      //     { label: "Revoke", value: "revoke" },
      //   ],
      // },
      {
        name: "Comment",
        id: 11,
        feature: "staffcomment",
        link: "/comment",
        methods: Object.entries(PermissionSets?.staff.Comment).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Team",
        id: 11,
        feature: "team",
        link: "/team",
        methods: Object.entries(PermissionSets?.staff.Team).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Role",
        id: 11,
        feature: "role",
        link: "/role",
        methods: Object.entries(PermissionSets?.staff.Role).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
    ],
  },
  {
    parent: "Chat",
    id: 12,
    link: "/chat",
    methods: Object.entries(PermissionSets?.Chat.chat).map(
      ([key, value]) => ({
        label: key,
        value: value,
        isChecked: false  // Add isChecked property
      })
    ),
  },
  {
    parent: "Report & Analysis",
    children: [
      {
        name: "Staff Report",
        id: 13,
        feature: "staffreport",
        link: "/report/staffreport",
        methods: Object.entries(PermissionSets?.report.staffReport).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },

    ],
  },
  {
    parent: "Communications",
    children: [
      {
        name: "Organization",
        id: 19,
        feature: "Organization",
        link: "#",
        methods: Object.entries(PermissionSets?.Communication.orgnization).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },


    ],
  },
  {
    parent: "Content & Media",
    children: [
      {
        name: "Organization",
        id: 22,
        feature: "Organization",
        link: "#",
        methods: Object.entries(PermissionSets?.ContentMedia.orgnization).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },

    ],
  },
  {
    parent: "Legal Documents",
    children: [
      {
        name: "Organization",
        id: 25,
        feature: "Organization",
        link: "#",
        methods: Object.entries(PermissionSets?.LegalDocs.orgnization).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },

    ],
  },
  {
    parent: "Campaign",
    children: [
      {
        name: "Email/SMS Configuration",
        id: 5,
        feature: "configuration",
        link: "/campaign/configuration",
        methods: Object.entries(PermissionSets?.Campign.Email_SMS_Configuration).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Campaign Setup",
        id: 6,
        feature: "campaign_setup",
        link: "/campaign/setup",
        methods: Object.entries(PermissionSets?.Campign.Campaign_Setup).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Campaign Template",
        id: 6,
        feature: "campaign_template",
        link: "/campaign/template",
        methods: Object.entries(PermissionSets?.Campign.Campaign_Template).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
      {
        name: "Campaign Listing",
        id: 6,
        feature: "campaign_listing",
        link: "/campaign/listing",
        methods: Object.entries(PermissionSets?.Campign.Campaign_Listing).map(
          ([key, value]) => ({
            label: key,
            value: value,
            isChecked: false  // Add isChecked property
          })
        ),
      },
    ],
  },
];



export default Permissions;
