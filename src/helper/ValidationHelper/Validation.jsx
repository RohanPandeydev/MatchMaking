import * as Yup from "yup";
export const AddUser = Yup.object().shape({
  userName: Yup.string()
    .required("Username is required")
    .min(3, "Minimum 3 character"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits")
    .required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  role: Yup.string().required("Role is required"),
  reportingTo: Yup.string(),
  email: Yup.string()
    .email("Invalid email format")
    .max(160, "Maximum 160 character")
    .required("Email is required")
    .typeError("Email must be valid"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum")
    .max(64, "Password is too long - should be 64 chars maximun")
    .required("Password is required"),
  c_password: Yup.string()
    .required("Confrim password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  designation: Yup.string().required("Designation required"),

  team: Yup.array()
    // Validate minimum number of elements in the array
    .min(1, "At least one team  is required")
    // Validate maximum number of elements in the array
    .max(5, "Maximum five team  allowed"),
});
export const UpdateUser = Yup.object().shape({
  userName: Yup.string()
    .required("Username is required")
    .min(3, "Minimum 3 character"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits")
    .required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  role: Yup.string().required("Role is required"),
  reportingTo: Yup.string().required("Reporting is required"),
  email: Yup.string()
    .email("Invalid email format")
    .max(160, "Maximum 160 character")
    .required("Email is required"),
  team: Yup.array()
    // Validate minimum number of elements in the array
    .min(1, "At least one team member is required")
    // Validate maximum number of elements in the array
    .max(5, "Maximum five team members allowed"),
  designation: Yup.string().required("Designation required"),
});
export const LoginForm = Yup.object().shape({
  username: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

//Subscription Page
export const organizationForm = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(3, "Min 3 characters")
    .max(30, "Max 30 characters allowed"),
  cost: Yup.number()
    .required("Required")
    .typeError("Must be a number")
    .test(
      "is-decimal",
      "Must be a valid decimal number with up to two decimal places",
      (value) =>
        value !== undefined && /^\d+(\.\d{1,2})?$/.test(value.toString())
    ), // Ensures cost is a number
  no_of_data: Yup.number().required("Required").typeError("Must be a number"), // Ensures no_of_data is a number
  no_of_subscription: Yup.number()
    .required("Required")
    .typeError("Must be a number"), // Ensures no_of_subscription is a number
  // payment_gateway: Yup.string().required("Required"),
  domain_setup: Yup.boolean().required("Required"), // Ensures domain_setup is a boolean
  currency: Yup.string().required('Required'),
  discount: Yup.number().min(0, 'Discount must be at least 0').required('Required'),
});
export const franchiseForm = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(3, "Min 3 characters")
    .max(30, "Max 30 characters allowed"),
  cost: Yup.number()
    .required("Required")
    .typeError("Must be a number")
    .test(
      "is-decimal",
      "Must be a valid decimal number with up to two decimal places",
      (value) =>
        value !== undefined && /^\d+(\.\d{1,2})?$/.test(value.toString())
    ), // Ensures cost is a number
  no_of_data: Yup.number().required("Required").typeError("Must be a number"), // Ensures no_of_data is a number
  no_of_subscription: Yup.number()
    .required("Required")
    .typeError("Must be a number"), // Ensures no_of_subscription is a number
  // payment_gateway: Yup.string().required("Required"),
  currency: Yup.string().required('Required'),
  discount: Yup.number().min(0, 'Discount must be at least 0').required('Required'),

});
export const ResetFormValidation = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum")
    .max(64, "Password is too long - should be 64 chars maximun")
    .required("Password is required"),
  // .matches(/[0-9]/, "Password requires a number")
  // .matches(/[a-z]/, "Password requires a lowercase letter")
  // .matches(/[A-Z]/, "Password requires an uppercase letter")
  // .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: Yup.string()
    .required("Confrim password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
export const ProfileBasicDetails = Yup.object().shape({
  userName: Yup.string()
    .required("Username is required")
    .min(3, "Minimum 3 character")
    .matches(/^[A-Za-z]+$/, "Only letters are allowed"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.date()
    .max(new Date(Date.now() - 86400000), "Please enter a valid date of birth")
    // .max(new Date(Date.now() - 1), "Date of birth can't be in current")
    .typeError("Please enter numeric value .")
    .required("Date of Birth required"),

  // .matches(/[0-9]/, "Password requires a number")
  // .matches(/[a-z]/, "Password requires a lowercase letter")
  // .matches(/[A-Z]/, "Password requires an uppercase letter")
  // .matches(/[^\w]/, "Password requires a symbol"),
});
export const ProfileContactDetails = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .max(160, "Maximum 160 character")
    .required("Email is required"),
});
// Calculate the date 18 years ago from today
const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

// Bride & Groom
//Basic Details Form
export const LeadAddForm = Yup.object().shape({
  description: Yup.string().max(
    200,
    "Description must be 200 characters or less"
  ),
  gender: Yup.string()
    .oneOf(["male", "female"], "Gender must be either male or female")
    .required("Required"),
  // keyword: Yup.string()
  //   .max(100, 'Keyword must be 100 characters or less'),
  firstName: Yup.string()
    .max(50, "First name must be 50 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(50, "Last name must be 50 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  validEmail: Yup.boolean().required("Required"),
  priority: Yup.boolean().required("Required"),
  maritalStatus: Yup.string()
    .oneOf(
      ["unmarried", "widow_widower", "separated", "divorcee"],
      "Invalid marital status"
    )
    .required("Required"),
  // noOfChildren: Yup.number()
  //   .min(0, 'Number of children cannot be negative')
  //   .max(20, 'Number of children cannot exceed 20')
  //   .required('Required'),
  childrenLivingStatus: Yup.boolean().required("Required"),
  motherTongue: Yup.string()
    .max(50, "Mother tongue must be 50 characters or less")
    .required("Required"),
  dob: Yup.date()
    .max(eighteenYearsAgo, "You must be at least 18 years old")
    .required("Required"),
  birthPlace: Yup.string().max(
    100,
    "Birthplace must be 100 characters or less"
  ),
  birthTime: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)")
    .required("Required"),
  profileCreatedBy: Yup.string().max(
    50,
    "Profile created by must be 50 characters or less"
  ),
  talkingHead: Yup.string().max(
    100,
    "Talking head must be 100 characters or less"
  ),
  religion: Yup.string()
    .max(50, "Religion must be 50 characters or less")
    .required("Required"),
  caste: Yup.string()
    .max(50, "Caste must be 50 characters or less")
    .required("Required"),
  manglik: Yup.string().max(50, "Manglik status must be 50 characters or less"),
  gothra: Yup.string().max(50, "Gothra must be 50 characters or less"),
  education: Yup.string()
    .max(100, "Education must be 100 characters or less")
    .required("Required"),
  educationDetails: Yup.string()
    .max(200, "Education details must be 200 characters or less")
    .required("Required"),
  occupation: Yup.string()
    .max(100, "Occupation must be 100 characters or less")
    .required("Required"),
  employedIn: Yup.string()
    .max(100, "Employed in must be 100 characters or less")
    .required("Required"),
  annualIncome: Yup.string().required("Required"),
});
//Residence Form
export const ResidenceForm = Yup.object().shape({
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  residenceStatus: Yup.string().required("Required"),
  countryCode: Yup.string()
    .matches(/^\+\d{1,3}$/, "Invalid country code")
    .required("Required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits")
    .required("Phone number is required"),
  // contactNumber: Yup.string()
  //   .matches(/^\d{10}$/, "Contact number must be exactly 10 digits")
  //   .required("Required"),
});
// Physical Form
export const PhysicalInfoForm = Yup.object().shape({
  height: Yup.string().required("Required"),
  weight: Yup.string().required("Required"),
  complexion: Yup.string().required("Required"),
  bodyType: Yup.string().required("Required"),
  diet: Yup.string().required("Required"),
  smoking: Yup.string().required("Required"),
  drinking: Yup.string().required("Required"),
});

// Other Info Form
export const OtherInfoForm = Yup.object().shape({
  profileText: Yup.string()
    .max(200, "Profile text cannot be more than 200 characters")
    .required("Required"),
  fatherName: Yup.string().required("Required"),
  // bodyType: Yup.string().required("Required"),
  brothers: Yup.string().required("Required"),
  sisters: Yup.string().required("Required"),
});

// Partner Preferances

export const PartnerPreferanceForm = Yup.object().shape({
  lookingFor: Yup.string().required("Required"),
  complexion: Yup.string().required("Required"),
  fromAge: Yup.number()
    .integer("Must be an integer")
    .required("Required")
    .min(18, "Must be at least 18")
    .max(99, "Must be 99 or less"),
  toAge: Yup.number()
    .integer("Must be an integer")
    .required("Required")
    .min(18, "Must be at least 18")
    .max(99, "Must be 99 or less"),
  fromHeight: Yup.string().required("Required"),

  toHeight: Yup.string().required("Required"),

  mothertongue: Yup.string().required("Required"),
  religion: Yup.string().required("Required"),
  caste: Yup.string().required("Required"), // Optional field, can be empty
  education: Yup.string().required("Required"),
  annualIncome: Yup.string().required("Required"),

  country: Yup.string().required("Required"),
  residanceStatus: Yup.string().required("Required"),
});

// Subcription Customer
export const SubscriptionCustomerForm = Yup.object().shape({
  name: Yup.string().required("Required"),
  call_contact_share: Yup.boolean().required("Required"),
  search_and_filter: Yup.boolean().required("Required"),
  expert_guidance: Yup.boolean().required("Required"),
  contact_views: Yup.number()
    .required("Required")
    .typeError("Must be a number"),
  spotlight: Yup.number().required("Required").typeError("Must be a number"),
});

// Member

export const MemberAddFranchise = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  ownerName: Yup.string()
    .required("Required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  // registrationNumber: Yup.string().required("Required"),
  // verificationNumber: Yup.string().required("Required"),

  email: Yup.string().required("Required").email("Invalid email address"),

  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters"),

  phone: Yup.string()
    .required("Required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  // subscription: Yup.string().required("Required"),

  address: Yup.string()
    .required("Required")
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be at most 100 characters"),
});
export const MemberUpdateFranchise = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  ownerName: Yup.string()
    .required("Required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  // registrationNumber: Yup.string().required("Required"),
  // verificationNumber: Yup.string().required("Required"),

  email: Yup.string().required("Required").email("Invalid email address"),

  phone: Yup.string()
    .required("Required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  address: Yup.string()
    .required("Required")
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be at most 100 characters"),
});

export const MemberAddOrganization = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  ownerName: Yup.string()
    .required("Required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  email: Yup.string().required("Required").email("Invalid email address"),

  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),

  phone: Yup.string()
    .required("Required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  // registrationNumber: Yup.string().required("Required"),
  // verificationNumber: Yup.string().required("Required"),
  // subscription: Yup.string().required("Required"),

  host: Yup.string()
    .required("Required")
    .matches(
      /^[a-z0-9_-]*$/,
      "Host cannot contain special characters and must be lower Case"
    ),
  address: Yup.string()
    .required("Required")
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be at most 100 characters"),
});

export const MemberEditOrganization = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  ownerName: Yup.string()
    .required("Required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),

  // email: Yup.string().required("Required").email("Invalid email address"),
  // password: Yup.string()
  //   .required("Required")
  //   .min(8, "Password must be at least 8 characters"),
  phone: Yup.string()
    .required("Required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  // subscription: Yup.string().required("Required"),

  // host: Yup.string()
  //   .required("Required")
  //   .matches(/^[a-zA-Z0-9_-]*$/, "Host cannot contain special characters"),
  address: Yup.string()
    .required("Required")
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be at most 100 characters"),
  // registrationNumber: Yup.string().required("Required"),
  // verificationNumber: Yup.string().required("Required"),
});

// Verify Model

export const VerifyModelForm = Yup.object().shape({
  amount: Yup.number()
    .required("Amount required")
    .typeError("Must be a number"), // Ensures no_of_subscription is a number,
  colorCode: Yup.string().required("Required"),
});
export const VerifyOrganizationConversionForm = Yup.object().shape({
  host: Yup.string()
    .required("Required")
    .matches(
      /^[a-z0-9_-]*$/,
      "Host cannot contain special characters and must be lower Case"
    ),
});
export const AssignModelValidation = Yup.object().shape({
  // brideandgroom: Yup.string()
  //   .required("Required"),
  // staff: Yup.string()
  //   .required("Required"),
  department: Yup.string()
    .required("Required"),
});
export const ShareModelValidation = Yup.object().shape({
  // brideandgroom: Yup.string()
  //   .required("Required"),
  orgfranchiseId: Yup.string()
    .required("Required"),
});



// Master Table

export const MasterLang = Yup.object().shape({
  // code: Yup.string().required("Required"),
  lang: Yup.string().required("Required"),
});
export const MasterCreateBy = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});
export const MasterNoofChildren = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.number().typeError("must be a number").required("Required"),
});
export const MasterCaste = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  religion: Yup.string().required("Required"),
});
export const MasterReligion = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});
export const MasterEducationLevel = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  level: Yup.string().required("Required"),

});
export const MasterManglikStatus = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});
export const MasterEmployedIn = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});
export const MasterOccupation = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});
export const MasterResidanceStatus = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});
export const MasterCountries = Yup.object().shape({
  // code: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
});
export const MasterCountry = Yup.object().shape({
  country: Yup.string().required("Required"),
  iso: Yup.string().required("Required"),
});
export const MasterState = Yup.object().shape({
  country: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  state_code: Yup.string().required("Required"),
});
export const MasterCity = Yup.object().shape({
  country: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
});
export const MasterIncomeRange = Yup.object().shape({
  currency: Yup.string().required("Required"),
  startRange: Yup.number()
    .typeError("Start range must be a number")
    .required("Required")
    .test(
      "lessThanEndRange",
      "Start range cannot be greater than end range",
      function (value) {
        const { endRange } = this.parent;
        return value <= endRange;
      }
    ),
  endRange: Yup.number()
    .typeError("End range must be a number")
    .required("Required"),
});
export const MasterCountryWithCode = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});
export const MasterComplexion = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});
export const MasterBodyType = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});
export const MasterDiet = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});
export const MasterLookingFor = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});

export const MasterAge = Yup.object().shape({
  name: Yup.number().typeError("must be a number").required("Required"),
});
export const MasterGiftCardCategory = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});
export const MasterCommentActivityCategory = Yup.object().shape({
  // code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
});

// Staff DropDown

//Departments

//Staff

// Campaign
export const EmailConfigurationValidation = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email format")
    .required("Username / Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  server: Yup.string()
    .matches(
      /^(?:\w+\.)+\w+$/,
      "Invalid server format (e.g., smtp.example.com)"
    )
    .required("Server is required"),
  port: Yup.number()
    .integer("Port must be a valid number")
    .min(1, "Port number must be greater than 0")
    .max(65535, "Port number must be less than or equal to 65535")
    .required("Port is required"),
});
export const SmsConfigurationValidation = Yup.object().shape({
  account_sid: Yup.string()
    .matches(
      /^[A-Za-z0-9]{34}$/,
      "Account SID must be 34 alphanumeric characters"
    )
    .required("Account SID is required"),
  auth_token: Yup.string()
    .min(32, "Auth Token must be at least 32 characters")
    .required("Auth Token is required"),
  phone_number: Yup.string()
    .matches(
      /^\+?[1-9]\d{1,14}$/,
      "Phone number must be in E.164 format (e.g., +1234567890)"
    )
    .required("Phone number is required"),
});
export const EmailCampaignSetupValidation = Yup.object().shape({
  subject: Yup.string()
    .required("Title is required"),

});
export const SmsCampaignSetupValidation = Yup.object().shape({
  subject: Yup.string()
    .required("Title is required"),

});



// Staff Management

export const StaffRole = Yup.object().shape({
  role: Yup.string()
    .required("Role is required"),

});
export const StaffTeam = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3, "Minimum 3 character"),
  department: Yup.string()
    .required("Department is required"),

});
export const StaffAdd = Yup.object().shape({
  // code: Yup.string().required("Required"),
  first_name: Yup.string().required("Required").min(3, "Minimum 3 character"),
  last_name: Yup.string().required("Required").min(3, "Minimum 3 character"),
  phone_code: Yup.string().required("Required"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum")
    .max(64, "Password is too long - should be 64 chars maximun")
    .required("Password is required"),
  email: Yup.string().required("Required").email("Invalid email address"),
  department: Yup.string().required("Required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits")
    .required("Phone number is required"),
  role: Yup.string().required("Required"),
  permission: Yup.string().required("Required"),

});
export const StaffUpdate = Yup.object().shape({
  // code: Yup.string().required("Required"),
  first_name: Yup.string().required("Required").min(3, "Minimum 3 character"),
  last_name: Yup.string().required("Required").min(3, "Minimum 3 character"),
  phone_code: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Invalid email address"),
  department: Yup.string().required("Required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits")
    .required("Phone number is required"),
  role: Yup.string().required("Required"),

});
export const DepartmentAdd = Yup.object().shape({
  name: Yup.string().required("Required"),
});
export const StaffPermissionAdd = Yup.object().shape({
  name: Yup.string().required("Required"),
});