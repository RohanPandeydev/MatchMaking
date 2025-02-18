import PermissionSets from "../../../../guard/Method";

export const Permissions = [
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
          })
        ),
      },
      {
        name: "No of Children",
        id: 2,
        feature: "noofChildren",
        link: "/master/noofchildren",
        methods: Object.entries(PermissionSets?.master.NoOfChildren).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Create By",
        id: 2,
        feature: "createdBy",
        link: "/master/createdBy",
        methods: Object.entries(PermissionSets?.master.CreatedBy).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Religions",
        id: 2,
        feature: "religions",
        link: "/master/religions",
        methods: Object.entries(PermissionSets?.master.Religions).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Castes",
        id: 2,
        feature: "castes",
        link: "/master/castes",
        methods: Object.entries(PermissionSets?.master.Castes).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Education Levels",
        id: 2,
        feature: "educationLevels",
        link: "/master/educationlevels",
        methods: Object.entries(PermissionSets?.master.EducationLevels).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Manglik Status",
        id: 2,
        feature: "manglikStatuses",
        link: "/master/manglikstatuses",
        methods: Object.entries(PermissionSets?.master.ManglikStatuses).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Employed In",
        id: 2,
        feature: "employedIn",
        link: "/master/employedin",
        methods: Object.entries(PermissionSets?.master.EmployedIn).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Occupations",
        id: 2,
        feature: "occupations",
        link: "/master/occupations",
        methods: Object.entries(PermissionSets?.master.Occupations).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Income Ranges",
        id: 2,
        feature: "incomeRanges",
        link: "/master/incomeranges",
        methods: Object.entries(PermissionSets?.master.IncomeRanges).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Country",
        id: 2,
        feature: "country",
        link: "/master/country",
        methods: Object.entries(PermissionSets?.master.Country).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "City",
        id: 2,
        feature: "city",
        link: "/master/city",
        methods: Object.entries(PermissionSets?.master.City).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "State",
        id: 2,
        feature: "state",
        link: "/master/state",
        methods: Object.entries(PermissionSets?.master.State).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Residence Status",
        id: 2,
        feature: "residenceStatuses",
        link: "/master/residencestatus",
        methods: Object.entries(PermissionSets?.master.ResidenceStatuses).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Countries With Codes",
        id: 2,
        feature: "countriesWithCodes",
        link: "/master/countriescodes",
        methods: Object.entries(PermissionSets?.master.CountriesWithCodes).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Complexion",
        id: 2,
        feature: "complexionOptions",
        link: "/master/complexion",
        methods: Object.entries(PermissionSets?.master.ComplexionOptions).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Body Type",
        id: 2,
        feature: "bodyTypeOptions",
        link: "/master/body",
        methods: Object.entries(PermissionSets?.master.BodyTypeOptions).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Diet",
        id: 2,
        feature: "dietOptions",
        link: "/master/diet",
        methods: Object.entries(PermissionSets?.master.DietOptions).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Looking For",
        id: 2,
        feature: "lookingForOptions",
        link: "/master/lookingfor",
        methods: Object.entries(PermissionSets?.master.LookingForOptions).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Age",
        id: 2,
        feature: "ageOptions",
        link: "/master/age",
        methods: Object.entries(PermissionSets?.master.AgeOptions).map(
          ([key, value]) => ({
            label: key,
            value: value,
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
        methods: Object.entries(PermissionSets?.member.organization).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Franchise",
        id: 2,
        feature: "Franchise",
        link: "/member/franchise",
        methods: Object.entries(PermissionSets?.member.franchise).map(
          ([key, value]) => ({
            label: key,
            value: value,
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
        methods: Object.entries(PermissionSets?.sharedata.organization).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Franchise",
        id: 6,
        feature: "Franchise",
        link: "/sharedata/franchise",
        methods: Object.entries(PermissionSets?.sharedata.franchise).map(
          ([key, value]) => ({
            label: key,
            value: value,
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
        methods: Object.entries(PermissionSets?.subscription.organization).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Franchise",
        id: 8,
        feature: "Franchise",
        link: "/subscription/franchise",
        methods: Object.entries(PermissionSets?.subscription.franchise).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
    ],
  },
  {
    parent: "Staff",
    children: [
      {
        name: "Staff List",
        id: 9,
        feature: "staff",
        link: "/staff",
        methods: Object.entries(PermissionSets?.staff.StaffList).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Department",
        id: 10,
        feature: "department",
        link: "/department",
        methods: Object.entries(PermissionSets?.staff.Department).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
      {
        name: "Department Permission",
        id: 11,
        feature: "staffpermission",
        link: "/permission",
        methods: [
          { label: "Assign", value: "assign" },
          { label: "Revoke", value: "revoke" },
        ],
      },
      {
        name: "Comment",
        id: 11,
        feature: "staffcomment",
        link: "/comment",
        methods: Object.entries(PermissionSets?.staff.Comment).map(
          ([key, value]) => ({
            label: key,
            value: value,
          })
        ),
      },
    ],
  },
  {
    parent: "Chat",
    id: 12,
    link: "/chat",
    methods: [
      { label: "Create", value: "create" },
      { label: "View", value: "view" },
    ],
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
          })
        ),
      },

    ],
  },
  {
    parent: "Transaction",
    children: [
      {
        name: "Organization",
        id: 16,
        feature: "Organization",
        link: "#",
        methods: [
          { label: "Create", value: "create" },
          { label: "Read", value: "read" },
          { label: "Update", value: "update" },
          { label: "Delete", value: "delete" },
        ],
      },
      {
        name: "Franchise",
        id: 17,
        feature: "Franchise",
        link: "#",
        methods: [
          { label: "Create", value: "create" },
          { label: "Read", value: "read" },
          { label: "Update", value: "update" },
          { label: "Delete", value: "delete" },
        ],
      },
      {
        name: "Customer",
        id: 18,
        feature: "Customer",
        link: "#",
        methods: [
          { label: "Create", value: "create" },
          { label: "Read", value: "read" },
          { label: "Update", value: "update" },
          { label: "Delete", value: "delete" },
        ],
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
        methods: [
          { label: "Send", value: "send" },
          { label: "View", value: "view" },
        ],
      },
      {
        name: "Franchise",
        id: 20,
        feature: "Franchise",
        link: "#",
        methods: [
          { label: "Send", value: "send" },
          { label: "View", value: "view" },
        ],
      },
      {
        name: "Customer",
        id: 21,
        feature: "Customer",
        link: "#",
        methods: [
          { label: "Send", value: "send" },
          { label: "View", value: "view" },
        ],
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
        methods: [
          { label: "Upload", value: "upload" },
          { label: "View", value: "view" },
        ],
      },
      {
        name: "Franchise",
        id: 23,
        feature: "Franchise",
        link: "#",
        methods: [
          { label: "Upload", value: "upload" },
          { label: "View", value: "view" },
        ],
      },
      {
        name: "Customer",
        id: 24,
        feature: "Customer",
        link: "#",
        methods: [
          { label: "Upload", value: "upload" },
          { label: "View", value: "view" },
        ],
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
        methods: [
          { label: "Create", value: "create" },
          { label: "View", value: "view" },
          { label: "Update", value: "update" },
          { label: "Delete", value: "delete" },
        ],
      },
      {
        name: "Franchise",
        id: 26,
        feature: "Franchise",
        link: "#",
        methods: [
          { label: "Create", value: "create" },
          { label: "View", value: "view" },
          { label: "Update", value: "update" },
          { label: "Delete", value: "delete" },
        ],
      },
    ],
  },
];
const updatedPermissions = Permissions.map((permission) => {
  const parentId = permission?.parent?.toLowerCase() || ""; // Ensure parent exists
  return {
    ...permission,
    id: parentId,
    isChecked:
      permission?.isChecked !== undefined ? permission.isChecked : false,
    children: permission?.children
      ? permission.children.map((child) => {
        const childName = child?.name?.toLowerCase() || ""; // Ensure child name exists
        return {
          ...child,
          isChecked: child?.isChecked !== undefined ? child.isChecked : false,
          id: `${parentId}-${childName}`,
          methods: child.methods
            ? child.methods.map((method) => {
              const methodValue = method?.value?.toLowerCase() || ""; // Ensure method value exists
              return {
                ...method,
                id: `${parentId}-${childName}-${methodValue}`,
                isChecked:
                  method?.isChecked !== undefined
                    ? method.isChecked
                    : false,
              };
            })
            : [], // If no methods, set to an empty array
        };
      })
      : [], // If no children, set to an empty array
  };
});

export default updatedPermissions;
