const PermissionSets = {};
PermissionSets.member = {
  Member: {
    
    Read: {
      allData: false,
      ownData: false,
      credential: false

    },
    Create: {
      create: false
    },
    Update: {
     update:false
    },
    Delete: {
      delete: false
    },
    AccountStatus: {
      status: false
    },
    Revert: {
     revert:false
    },
    Transfer: {
     transfer:false
    },
    Comment:{
      comment:false,
    },
    Chat:{
      chat:false,
    },
    Subscription:{
      subscription:false,
    },
    Credential:{
      credential:false
    },
    staffAssign:{
      staff:false
    },
  
  },
  franchise: {
    Read: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false,
      credential: false

    },
    Create: {
      create: false
    },
    Update: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false,
      credential: false
    },
    Delete: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false
    },
    AccountStatus: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false
    },
    Revert: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false
    },
    Transfer: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false
    },
  },
  organization: {
    Read: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false,
      credential: false


    },
    Create: {
      create: false
    },
    Update: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false,
      credential: false
    },
    Delete: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false
    },
    AccountStatus: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false
    },
    Revert: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false
    },
    Transfer: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false
    },
  },
};
PermissionSets.bridengroom = {
  bridengroomListing: {
    Read: {
      allData: false,
      ownData: false,
      credential:false
    },
    Create: {
      create: false
    },
  
    Update: {
     update:false,
     credential: false

    },
    Delete: {
      delete: false,
     
    },
    
    Revert: {
   revert:false
    },
    Message: {
   message:false
    },
    MatchReport: {
   matchreport:false
    },
    AccountVerify: {
      allData: false,
      ownData: false
    },
    Reaction: {
      allData: false,
      ownData: false
    },
    staffAssign:{
      staff:false
    },
    Comment:{
      comment:false
    },
    Share:{
      share:false
    },
    Verify:{
      verify:false
    }
  },
  requests: {
    Read: {
      read: false
    },
    Delete: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false
    },
    RequestStatus: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false
    },
  },
};
PermissionSets.sharedata = {
  ShareData: {
    Read: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false
    },
    Share: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false,

    },
  },
  organization: {
    Share: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false
    },
  },
  franchise: {
    Share: {
      teamData: false,
      assignedData: false,
      allData: false,
      ownData: false
    },
  },
};
PermissionSets.subscription = {
  Subscription: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  organization: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  franchise: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
};
PermissionSets.staff = {
  Staff: {
    Read: {
      read: false,
      readOwnStaffData: false,
    },
    Create: {
      create: false,
    },
    Update: {
      update: false,
      updateOwnstaffdata: false,

    },
    Delete: {
      delete: false,
      deleteOwnstaffdata: false,
    },
    AccountStatus: {
      active: false,
      ownStaffActive: false
    },
  },
  StaffList: {
    Read: {
      read: false,
      readOwnStaffData: false,
    },
    Create: {
      create: false,
    },
    Update: {
      update: false,
      updateOwnstaffdata: false,

    },
    Delete: {
      delete: false,
      deleteOwnstaffdata: false,
    },
    AccountStatus: {
      active: false,
      ownStaffActive: false
    },
  },
  Department: {
    Read: {
      read: false,
      readOwnStaffData: false,
    },
    Create: {
      create: false,
    },
    Update: {
      update: false,
      updateOwnstaffdata: false,

    },
    Delete: {
      delete: false,
      deleteOwnstaffdata: false,
    },
  },
  PermissionModule: {
    Read: {
      read: false,

    },
    Create: {
      create: false,
    },
    Update: {
      update: false,

    },
    Delete: {
      delete: false,

    },

  },
  Comment: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  Team: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  Role: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
};
PermissionSets.report = {
  staffReport: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },

  },
};
PermissionSets.master = {

  Master: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
    Status: {
      status: false
    },
  },
  Languages: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  NoOfChildren: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  CreatedBy: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  Religions: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  Castes: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  EducationLevels: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  ManglikStatuses: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  EmployedIn: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  Occupations: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  IncomeRanges: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  Countries_State_City: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  ResidenceStatuses: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  CountriesWithCodes: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  ComplexionOptions: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  CurrencyList: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  BodyTypeOptions: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  DietOptions: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  LookingForOptions: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  AgeOptions: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  Country: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  City: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  State: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  GiftCategory: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
  CommentActivity: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },
  },
};
PermissionSets.Chat = {
  chat: {
    Read: {
      read: false,
    },


  },
};
PermissionSets.ContentMedia = {
  orgnization: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },

  },
};
PermissionSets.LegalDocs = {
  orgnization: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },

  },
};
PermissionSets.Communication = {
  orgnization: {
    Read: {
      read: false,
    },
    Create: {
      create: false
    },
    Update: {
      update: false
    },
    Delete: {
      delete: false
    },

  },
};

PermissionSets.Campign = {
  Email_SMS_Configuration: {
    Read: {
      read: false,
    },

    Update: {
      update: false,

    },
    Delete: {
      delete: false,
    },

  },
  Campaign_Setup: {
    Read: {
      read: false,
    },
    Create: {
      create: false,
    },
    Update: {
      update: false,

    },
    Delete: {
      delete: false,
    },

  },
  Campaign_Template: {
    Read: {
      read: false,
    },
    Create: {
      create: false,
    },
    Update: {
      update: false,

    },
    Delete: {
      delete: false,
    },

  },
  Campaign_Listing: {
    Read: {
      read: false,
    },

    Campaign: {
      campaign: false,

    },
    Delete: {
      delete: false,
    },

  },

};

export default PermissionSets;
