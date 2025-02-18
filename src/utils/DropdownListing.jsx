import React from 'react'
import LanguageListing from '../components/pages/master/languages/LanguageListing'
import RequireAuth from '../guard/RoutesGuard'
import NoofChildren from '../components/pages/master/noofchildren/NoofChildren'
import CreatedBy from '../components/pages/master/createby/CreatedBy'
import Religions from '../components/pages/master/religions/Religions'
import Castes from '../components/pages/master/caste/Castes'
import EducationLevels from '../components/pages/master/education/EducationLevels'
import ManglikStatuses from '../components/pages/master/manglik/ManglikStatuses'
import EmployedIn from '../components/pages/master/employedin/EmployedIn'
import Occupations from '../components/pages/master/occupations/Occupations'
import IncomeRanges from '../components/pages/master/incomeranges/IncomeRanges'
import ResidenceStatuses from '../components/pages/master/residence/ResidenceStatuses'
import CountriesWithCodes from '../components/pages/master/countrieswithcodes/CountriesWithCodes'
import Height from '../components/pages/master/height/Height'
import Weight from '../components/pages/master/weight/Weight'
import Complexion from '../components/pages/master/complexion/Complexion'
import Body from '../components/pages/master/body/Body'
import Diet from '../components/pages/master/diet/Diet'
import Looking from '../components/pages/master/looking/Looking'
import Age from '../components/pages/master/age/Age'
import Countries from '../components/pages/master/countries/Countries'
import AddAgeValue from '../components/pages/master/age/AddAgeValue'
import AddBody from '../components/pages/master/body/AddBody'
import AddCaste from '../components/pages/master/caste/AddCaste'
import AddComplexion from '../components/pages/master/complexion/AddComplexion'
import AddCountries from '../components/pages/master/countries/AddCountries'
import AddReligions from '../components/pages/master/religions/AddReligions'
import AddEducationLevels from '../components/pages/master/education/AddEducationLevels'
import AddManglikStatus from '../components/pages/master/manglik/AddManglikStatus'
import AddLanguage from '../components/pages/master/languages/AddLanguage'
import AddNoOfChildren from '../components/pages/master/noofchildren/AddNoOfChildren'
import AddCreateBy from '../components/pages/master/createby/AddCreateBy'
import AddEmployedIn from '../components/pages/master/employedin/AddEmployedIn'
import AddOccupations from '../components/pages/master/occupations/AddOccupation'
import AddIncomeRanges from '../components/pages/master/incomeranges/AddIncomeRange'
import AddResidanceStatus from '../components/pages/master/residence/AddResidanceStatus'
import AddCountryWithCode from '../components/pages/master/countrieswithcodes/AddCountryWithCode'
import AddHeight from '../components/pages/master/height/AddHeight'
import AddWeight from '../components/pages/master/weight/AddWeight'
import AddDiet from '../components/pages/master/diet/AddDiet'
import AddLooking from '../components/pages/master/looking/AddLooking'
import Loader from './Loader/Loader'
import CountryList from '../components/pages/master/country/CountryList'
import AddCountry from '../components/pages/master/country/AddCountry'
import StateList from '../components/pages/master/state/StateList'
import AddState from '../components/pages/master/state/AddState'
import CityList from '../components/pages/master/city/CityList'
import AddCity from '../components/pages/master/city/AddCity'
import CurrencyList from '../components/pages/master/currency/CurrencyList'
import AddCurrency from '../components/pages/master/currency/AddCurrency'
import GiftCardCategoryList from '../components/pages/master/giftcard/GiftCardCategoryList'
import AddGiftCardCategory from '../components/pages/master/giftcard/AddGiftCardCategory'
import CommentActivityList from '../components/pages/master/commentactivity/CommentActivityList'
import AddCommentActivity from '../components/pages/master/commentactivity/AddCommentActivity'


const DropdownListing = [

  { name: "Language", id: 1, feature: "languages", link: "/master/languages", component: <RequireAuth><LanguageListing /></RequireAuth> },
  { name: "Number of child", id: 2, feature: "noofChildren", link: "/master/noofchildren", component: <RequireAuth><NoofChildren /></RequireAuth> },
  { name: "Profile created by", id: 2, feature: "createdBy", link: "/master/createdBy", component: <RequireAuth><CreatedBy /></RequireAuth> },
  { name: "Religion", id: 2, feature: "religions", link: "/master/religions", component: <RequireAuth><Religions /></RequireAuth> },
  { name: "Caste", id: 2, feature: "castes", link: "/master/castes", component: <RequireAuth><Castes /></RequireAuth> },
  { name: "Education qualification", id: 2, feature: "educationLevels", link: "/master/educationlevels", component: <RequireAuth><EducationLevels /></RequireAuth> },
  { name: "Manglik", id: 2, feature: "manglikStatuses", link: "/master/manglikstatuses", component: <RequireAuth><ManglikStatuses /></RequireAuth> },
  { name: "Job type", id: 2, feature: "employedIn", link: "/master/employedin", component: <RequireAuth><EmployedIn /></RequireAuth> },
  { name: "Occupation", id: 2, feature: "occupations", link: "/master/occupations", component: <RequireAuth><Occupations /></RequireAuth> },
  { name: "Salary range", id: 2, feature: "incomeRanges", link: "/master/incomeranges", component: <RequireAuth><IncomeRanges /></RequireAuth> },
  { name: "Residential status", id: 2, feature: "residenceStatuses", link: "/master/residencestatus", component: <RequireAuth><ResidenceStatuses /></RequireAuth> },
  { name: "Country & phone code", id: 2, feature: "countriesWithCodes", link: "/master/countriescodes", component: <RequireAuth><CountriesWithCodes /></RequireAuth> },
  { name: "Skin complexion", id: 2, feature: "ComplexionOptions", link: "/master/complexion", component: <RequireAuth><Complexion /></RequireAuth> },
  { name: "Body shape", id: 2, feature: "bodyTypeOptions", link: "/master/body", component: <RequireAuth><Body /></RequireAuth> },
  { name: "Diet", id: 2, feature: "dietOptions", link: "/master/diet", component: <RequireAuth><Diet /></RequireAuth> },
  { name: "Seeking ", id: 2, feature: "lookingForOptions", link: "/master/lookingfor", component: <RequireAuth><Looking /></RequireAuth> },
  { name: "Age", id: 2, feature: "ageOptions", link: "/master/age", component: <RequireAuth><Age /></RequireAuth> },
  { name: "Country ", id: 2, feature: "country", link: "/master/country", component: <RequireAuth><CountryList /></RequireAuth> },
  { name: "State ", id: 2, feature: "state", link: "/master/state", component: <RequireAuth><StateList /></RequireAuth> },
  { name: "City ", id: 2, feature: "city", link: "/master/city", component: <RequireAuth><CityList /></RequireAuth> },
  { name: "Currency", id: 2, feature: "currency", link: "/master/currency", component: <RequireAuth><CurrencyList /></RequireAuth> },
  { name: "Gift Card Category", id: 2, feature: "giftcardcategory", link: "/master/giftcardcategory", component: <RequireAuth><GiftCardCategoryList /></RequireAuth> },
  { name: "Comment Activity", id: 2, feature: "commentactivity", link: "/master/commentactivity", component: <RequireAuth><CommentActivityList /></RequireAuth> },


]
export const DropdownListingRoute = [
  { loader: <Loader />, name: "Languages", id: 1, feature: "languages", link: "/master/languages", component: <RequireAuth><LanguageListing /></RequireAuth> },
  { loader: <Loader />, name: "Languages", id: 1, feature: "languages", link: "/master/languages/add/:id?", component: <RequireAuth><AddLanguage /></RequireAuth> },
  { loader: <Loader />, name: "Number of child", id: 2, feature: "noofChildren", link: "/master/noofchildren", component: <RequireAuth><NoofChildren /></RequireAuth> },
  { loader: <Loader />, name: "Number of child", id: 2, feature: "noofChildren", link: "/master/noofchildren/add/:id?", component: <RequireAuth><AddNoOfChildren /></RequireAuth> },
  { loader: <Loader />, name: "Profile created by", id: 2, feature: "createdBy", link: "/master/createdBy", component: <RequireAuth><CreatedBy /></RequireAuth> },
  { loader: <Loader />, name: "Profile created by", id: 2, feature: "createdBy", link: "/master/createdBy/add/:id?", component: <RequireAuth><AddCreateBy /></RequireAuth> },
  { loader: <Loader />, name: "Religion", id: 2, feature: "religions", link: "/master/religions", component: <RequireAuth><Religions /></RequireAuth> },
  { loader: <Loader />, name: "Religion", id: 2, feature: "religions", link: "/master/religions/add/:id?", component: <RequireAuth><AddReligions /></RequireAuth> },
  { loader: <Loader />, name: "Caste", id: 2, feature: "castes", link: "/master/castes", component: <RequireAuth><Castes /></RequireAuth> },
  { loader: <Loader />, name: "Caste", id: 2, feature: "castes", link: "/master/castes/add/:id?", component: <RequireAuth><AddCaste /></RequireAuth> },
  { loader: <Loader />, name: "Education qualification", id: 2, feature: "educationLevels", link: "/master/educationlevels", component: <RequireAuth><EducationLevels /></RequireAuth> },
  { loader: <Loader />, name: "Education qualification", id: 2, feature: "educationLevels", link: "/master/educationlevels/add/:id?", component: <RequireAuth><AddEducationLevels /></RequireAuth> },
  { loader: <Loader />, name: "Manglik ", id: 2, feature: "manglikStatuses", link: "/master/manglikstatuses", component: <RequireAuth><ManglikStatuses /></RequireAuth> },
  { loader: <Loader />, name: "Manglik ", id: 2, feature: "manglikStatuses", link: "/master/manglikstatuses/add/:id?", component: <RequireAuth><AddManglikStatus /></RequireAuth> },
  { loader: <Loader />, name: "Job type", id: 2, feature: "employedIn", link: "/master/employedin", component: <RequireAuth><EmployedIn /></RequireAuth> },
  { loader: <Loader />, name: "Job type", id: 2, feature: "employedIn", link: "/master/employedin/add/:id?", component: <RequireAuth><AddEmployedIn /></RequireAuth> },
  { loader: <Loader />, name: "Occupation", id: 2, feature: "occupations", link: "/master/occupations", component: <RequireAuth><Occupations /></RequireAuth> },
  { loader: <Loader />, name: "Occupation", id: 2, feature: "occupations", link: "/master/occupations/add/:id?", component: <RequireAuth><AddOccupations /></RequireAuth> },
  { loader: <Loader />, name: "Salary range", id: 2, feature: "incomeRanges", link: "/master/incomeranges", component: <RequireAuth><IncomeRanges /></RequireAuth> },
  { loader: <Loader />, name: "Salary range", id: 2, feature: "incomeRanges", link: "/master/incomeranges/add/:id?", component: <RequireAuth><AddIncomeRanges /></RequireAuth> },
  // { loader: <Loader />,name: "Countries", id: 2, feature: "countries", link: "/master/countries" , component:<RequireAuth><Countries/></RequireAuth> },
  // { loader: <Loader />,name: "Countries", id: 2, feature: "countries", link: "/master/countries/add" , component:<RequireAuth><AddCountries/></RequireAuth> },
  { loader: <Loader />, name: "Residential status", id: 2, feature: "residenceStatuses", link: "/master/residencestatus", component: <RequireAuth><ResidenceStatuses /></RequireAuth> },
  { loader: <Loader />, name: "Residential status", id: 2, feature: "residenceStatuses", link: "/master/residencestatus/add/:id?", component: <RequireAuth><AddResidanceStatus /></RequireAuth> },
  { loader: <Loader />, name: "Country & phone code", id: 2, feature: "countriesWithCodes", link: "/master/countriescodes", component: <RequireAuth><CountriesWithCodes /></RequireAuth> },
  { loader: <Loader />, name: "Country & phone code", id: 2, feature: "countriesWithCodes", link: "/master/countriescodes/add/:id?", component: <RequireAuth><AddCountryWithCode /></RequireAuth> },
  // { loader: <Loader />,name: "Height", id: 2, feature: "heightOptions", link: "/master/height",component:<RequireAuth><Height/></RequireAuth> },
  // { loader: <Loader />,name: "Height", id: 2, feature: "heightOptions", link: "/master/height/add",component:<RequireAuth><AddHeight/></RequireAuth> },
  // { loader: <Loader />,name: "Weight", id: 2, feature: "weightOptions", link: "/master/weight",component:<RequireAuth><Weight/></RequireAuth> },
  // { loader: <Loader />,name: "Weight", id: 2, feature: "weightOptions", link: "/master/weight/add/:id?",component:<RequireAuth><AddWeight/></RequireAuth> },
  { loader: <Loader />, name: "Skin complexion", id: 2, feature: "ComplexionOptions", link: "/master/complexion", component: <RequireAuth><Complexion /></RequireAuth> },
  { loader: <Loader />, name: "Skin complexion", id: 2, feature: "ComplexionOptions", link: "/master/complexion/add/:id?", component: <RequireAuth><AddComplexion /></RequireAuth> },
  { loader: <Loader />, name: "Body shape", id: 2, feature: "bodyTypeOptions", link: "/master/body", component: <RequireAuth><Body /></RequireAuth> },
  { loader: <Loader />, name: "Body shape", id: 2, feature: "bodyTypeOptions", link: "/master/body/add/:id?", component: <RequireAuth><AddBody /></RequireAuth> },
  { loader: <Loader />, name: "Diet", id: 2, feature: "dietOptions", link: "/master/diet", component: <RequireAuth><Diet /></RequireAuth> },
  { loader: <Loader />, name: "Diet", id: 2, feature: "dietOptions", link: "/master/diet/add/:id?", component: <RequireAuth><AddDiet /></RequireAuth> },
  { loader: <Loader />, name: "Seeking", id: 2, feature: "lookingForOptions", link: "/master/lookingfor", component: <RequireAuth><Looking /></RequireAuth> },
  { loader: <Loader />, name: "Seeking", id: 2, feature: "lookingForOptions", link: "/master/lookingfor/add/:id?", component: <RequireAuth><AddLooking /></RequireAuth> },
  { loader: <Loader />, name: "Age", id: 2, feature: "ageOptions", link: "/master/age", component: <RequireAuth><Age /></RequireAuth> },
  { loader: <Loader />, name: "Age", id: 2, feature: "ageOptions", link: "/master/age/add/:id?", component: <RequireAuth><AddAgeValue /></RequireAuth> },
  { loader: <Loader />, name: "Country ", id: 2, feature: "country", link: "/master/country", component: <RequireAuth><CountryList /></RequireAuth> },
  { loader: <Loader />, name: "Country ", id: 2, feature: "country", link: "/master/country/add/:id?", component: <RequireAuth><AddCountry /></RequireAuth> },
  { loader: <Loader />, name: "State ", id: 2, feature: "state", link: "/master/state", component: <RequireAuth><StateList /></RequireAuth> },
  { loader: <Loader />, name: "State ", id: 2, feature: "state", link: "/master/state/add/:id?", component: <RequireAuth><AddState /></RequireAuth> },
  { loader: <Loader />, name: "City ", id: 2, feature: "city", link: "/master/city", component: <RequireAuth><CityList /></RequireAuth> },
  { loader: <Loader />, name: "City ", id: 2, feature: "city", link: "/master/city/add/:id?", component: <RequireAuth><AddCity /></RequireAuth> },
  { loader: <Loader />, name: "Currency ", id: 2, feature: "currency", link: "/master/currency/add/:id?", component: <RequireAuth><AddCurrency /></RequireAuth> },
  { loader: <Loader />, name: "Currency ", id: 2, feature: "currency", link: "/master/currency", component: <RequireAuth><CurrencyList /></RequireAuth> },
  { loader: <Loader />, name: "Gift Card ", id: 2, feature: "giftcardcategory", link: "/master/giftcardcategory", component: <RequireAuth><GiftCardCategoryList /></RequireAuth> },
  { loader: <Loader />, name: "Gift Card ", id: 2, feature: "giftcardcategory", link: "/master/giftcardcategory/add/:id?", component: <RequireAuth><AddGiftCardCategory /></RequireAuth> },
  { loader: <Loader />, name: "Comment Activity  ", id: 2, feature: "commentactivity", link: "/master/commentactivity", component: <RequireAuth><CommentActivityList /></RequireAuth> },
  { loader: <Loader />, name: "Comment Activity ", id: 2, feature: "commentactivity", link: "/master/commentactivity/add/:id?", component: <RequireAuth><AddCommentActivity /></RequireAuth> },
]

export const ReadRoutesMaster = [
  { loader: <Loader />, name: "Languages", id: 1, feature: "languages", link: "/master/languages", component: <RequireAuth><LanguageListing /></RequireAuth> },
  { loader: <Loader />, name: "Number of child", id: 2, feature: "noofChildren", link: "/master/noofchildren", component: <RequireAuth><NoofChildren /></RequireAuth> },
  { loader: <Loader />, name: "Profile created by", id: 2, feature: "createdBy", link: "/master/createdBy", component: <RequireAuth><CreatedBy /></RequireAuth> },
  { loader: <Loader />, name: "Religion", id: 2, feature: "religions", link: "/master/religions", component: <RequireAuth><Religions /></RequireAuth> },
  { loader: <Loader />, name: "Caste", id: 2, feature: "castes", link: "/master/castes", component: <RequireAuth><Castes /></RequireAuth> },
  { loader: <Loader />, name: "Education qualification", id: 2, feature: "educationLevels", link: "/master/educationlevels", component: <RequireAuth><EducationLevels /></RequireAuth> },
  { loader: <Loader />, name: "Manglik ", id: 2, feature: "manglikStatuses", link: "/master/manglikstatuses", component: <RequireAuth><ManglikStatuses /></RequireAuth> },
  { loader: <Loader />, name: "Job type", id: 2, feature: "employedIn", link: "/master/employedin", component: <RequireAuth><EmployedIn /></RequireAuth> },
  { loader: <Loader />, name: "Occupation", id: 2, feature: "occupations", link: "/master/occupations", component: <RequireAuth><Occupations /></RequireAuth> },
  { loader: <Loader />, name: "Salary range", id: 2, feature: "incomeRanges", link: "/master/incomeranges", component: <RequireAuth><IncomeRanges /></RequireAuth> },
  { loader: <Loader />, name: "Residential status", id: 2, feature: "residenceStatuses", link: "/master/residencestatus", component: <RequireAuth><ResidenceStatuses /></RequireAuth> },
  { loader: <Loader />, name: "Country & phone code", id: 2, feature: "countriesWithCodes", link: "/master/countriescodes", component: <RequireAuth><CountriesWithCodes /></RequireAuth> },
  { loader: <Loader />, name: "Skin complexion", id: 2, feature: "ComplexionOptions", link: "/master/complexion", component: <RequireAuth><Complexion /></RequireAuth> },
  { loader: <Loader />, name: "Body shape", id: 2, feature: "bodyTypeOptions", link: "/master/body", component: <RequireAuth><Body /></RequireAuth> },
  { loader: <Loader />, name: "Diet", id: 2, feature: "dietOptions", link: "/master/diet", component: <RequireAuth><Diet /></RequireAuth> },
  { loader: <Loader />, name: "Seeking", id: 2, feature: "lookingForOptions", link: "/master/lookingfor", component: <RequireAuth><Looking /></RequireAuth> },
  { loader: <Loader />, name: "Age", id: 2, feature: "ageOptions", link: "/master/age", component: <RequireAuth><Age /></RequireAuth> },
  { loader: <Loader />, name: "Country ", id: 2, feature: "country", link: "/master/country", component: <RequireAuth><CountryList /></RequireAuth> },
  { loader: <Loader />, name: "State ", id: 2, feature: "state", link: "/master/state", component: <RequireAuth><StateList /></RequireAuth> },
  { loader: <Loader />, name: "City ", id: 2, feature: "city", link: "/master/city", component: <RequireAuth><CityList /></RequireAuth> },
  { loader: <Loader />, name: "Currency ", id: 2, feature: "currency", link: "/master/currency", component: <RequireAuth><CurrencyList /></RequireAuth> },
  { loader: <Loader />, name: "Gift Card ", id: 2, feature: "giftcardcategory", link: "/master/giftcardcategory", component: <RequireAuth><GiftCardCategoryList /></RequireAuth> },
  { loader: <Loader />, name: "Comment Activity  ", id: 2, feature: "commentactivity", link: "/master/commentactivity", component: <RequireAuth><CommentActivityList /></RequireAuth> },
];

export const CreateRoutesMaster = [
  { loader: <Loader />, name: "Languages", id: 1, feature: "languages", link: "/master/languages/add", component: <RequireAuth><AddLanguage /></RequireAuth> },
  { loader: <Loader />, name: "Number of child", id: 2, feature: "noofChildren", link: "/master/noofchildren/add", component: <RequireAuth><AddNoOfChildren /></RequireAuth> },
  { loader: <Loader />, name: "Profile created by", id: 2, feature: "createdBy", link: "/master/createdBy/add", component: <RequireAuth><AddCreateBy /></RequireAuth> },
  { loader: <Loader />, name: "Religion", id: 2, feature: "religions", link: "/master/religions/add", component: <RequireAuth><AddReligions /></RequireAuth> },
  { loader: <Loader />, name: "Caste", id: 2, feature: "castes", link: "/master/castes/add", component: <RequireAuth><AddCaste /></RequireAuth> },
  { loader: <Loader />, name: "Education qualification", id: 2, feature: "educationLevels", link: "/master/educationlevels/add", component: <RequireAuth><AddEducationLevels /></RequireAuth> },
  { loader: <Loader />, name: "Manglik ", id: 2, feature: "manglikStatuses", link: "/master/manglikstatuses/add", component: <RequireAuth><AddManglikStatus /></RequireAuth> },
  { loader: <Loader />, name: "Job type", id: 2, feature: "employedIn", link: "/master/employedin/add", component: <RequireAuth><AddEmployedIn /></RequireAuth> },
  { loader: <Loader />, name: "Occupation", id: 2, feature: "occupations", link: "/master/occupations/add", component: <RequireAuth><AddOccupations /></RequireAuth> },
  { loader: <Loader />, name: "Salary range", id: 2, feature: "incomeRanges", link: "/master/incomeranges/add", component: <RequireAuth><AddIncomeRanges /></RequireAuth> },
  { loader: <Loader />, name: "Residential status", id: 2, feature: "residenceStatuses", link: "/master/residencestatus/add", component: <RequireAuth><AddResidanceStatus /></RequireAuth> },
  { loader: <Loader />, name: "Country & phone code", id: 2, feature: "countriesWithCodes", link: "/master/countriescodes/add", component: <RequireAuth><AddCountryWithCode /></RequireAuth> },
  { loader: <Loader />, name: "Skin complexion", id: 2, feature: "ComplexionOptions", link: "/master/complexion/add", component: <RequireAuth><AddComplexion /></RequireAuth> },
  { loader: <Loader />, name: "Body shape", id: 2, feature: "bodyTypeOptions", link: "/master/body/add", component: <RequireAuth><AddBody /></RequireAuth> },
  { loader: <Loader />, name: "Diet", id: 2, feature: "dietOptions", link: "/master/diet/add", component: <RequireAuth><AddDiet /></RequireAuth> },
  { loader: <Loader />, name: "Seeking", id: 2, feature: "lookingForOptions", link: "/master/lookingfor/add", component: <RequireAuth><AddLooking /></RequireAuth> },
  { loader: <Loader />, name: "Age", id: 2, feature: "ageOptions", link: "/master/age/add", component: <RequireAuth><AddAgeValue /></RequireAuth> },
  { loader: <Loader />, name: "Country ", id: 2, feature: "country", link: "/master/country/add", component: <RequireAuth><AddCountry /></RequireAuth> },
  { loader: <Loader />, name: "State ", id: 2, feature: "state", link: "/master/state/add", component: <RequireAuth><AddState /></RequireAuth> },
  { loader: <Loader />, name: "City ", id: 2, feature: "city", link: "/master/city/add", component: <RequireAuth><AddCity /></RequireAuth> },
  { loader: <Loader />, name: "Currency ", id: 2, feature: "currency", link: "/master/currency/add", component: <RequireAuth><AddCurrency /></RequireAuth> },
  { loader: <Loader />, name: "Gift Card ", id: 2, feature: "giftcardcategory", link: "/master/giftcardcategory/add", component: <RequireAuth><AddGiftCardCategory /></RequireAuth> },
  { loader: <Loader />, name: "Comment Activity ", id: 2, feature: "commentactivity", link: "/master/commentactivity/add", component: <RequireAuth><AddCommentActivity /></RequireAuth> },
];

 export const UpdateRoutesMaster = [
  { loader: <Loader />, name: "Languages", id: 1, feature: "languages", link: "/master/languages/add/:id", component: <RequireAuth><AddLanguage /></RequireAuth> },
  { loader: <Loader />, name: "Number of child", id: 2, feature: "noofChildren", link: "/master/noofchildren/add/:id", component: <RequireAuth><AddNoOfChildren /></RequireAuth> },
  { loader: <Loader />, name: "Profile created by", id: 2, feature: "createdBy", link: "/master/createdBy/add/:id", component: <RequireAuth><AddCreateBy /></RequireAuth> },
  { loader: <Loader />, name: "Religion", id: 2, feature: "religions", link: "/master/religions/add/:id", component: <RequireAuth><AddReligions /></RequireAuth> },
  { loader: <Loader />, name: "Caste", id: 2, feature: "castes", link: "/master/castes/add/:id", component: <RequireAuth><AddCaste /></RequireAuth> },
  { loader: <Loader />, name: "Education qualification", id: 2, feature: "educationLevels", link: "/master/educationlevels/add/:id", component: <RequireAuth><AddEducationLevels /></RequireAuth> },
  { loader: <Loader />, name: "Manglik ", id: 2, feature: "manglikStatuses", link: "/master/manglikstatuses/add/:id", component: <RequireAuth><AddManglikStatus /></RequireAuth> },
  { loader: <Loader />, name: "Job type", id: 2, feature: "employedIn", link: "/master/employedin/add/:id", component: <RequireAuth><AddEmployedIn /></RequireAuth> },
  { loader: <Loader />, name: "Occupation", id: 2, feature: "occupations", link: "/master/occupations/add/:id", component: <RequireAuth><AddOccupations /></RequireAuth> },
  { loader: <Loader />, name: "Salary range", id: 2, feature: "incomeRanges", link: "/master/incomeranges/add/:id", component: <RequireAuth><AddIncomeRanges /></RequireAuth> },
  { loader: <Loader />, name: "Residential status", id: 2, feature: "residenceStatuses", link: "/master/residencestatus/add/:id", component: <RequireAuth><AddResidanceStatus /></RequireAuth> },
  { loader: <Loader />, name: "Country & phone code", id: 2, feature: "countriesWithCodes", link: "/master/countriescodes/add/:id", component: <RequireAuth><AddCountryWithCode /></RequireAuth> },
  { loader: <Loader />, name: "Skin complexion", id: 2, feature: "ComplexionOptions", link: "/master/complexion/add/:id", component: <RequireAuth><AddComplexion /></RequireAuth> },
  { loader: <Loader />, name: "Body shape", id: 2, feature: "bodyTypeOptions", link: "/master/body/add/:id", component: <RequireAuth><AddBody /></RequireAuth> },
  { loader: <Loader />, name: "Diet", id: 2, feature: "dietOptions", link: "/master/diet/add/:id", component: <RequireAuth><AddDiet /></RequireAuth> },
  { loader: <Loader />, name: "Seeking", id: 2, feature: "lookingForOptions", link: "/master/lookingfor/add/:id", component: <RequireAuth><AddLooking /></RequireAuth> },
  { loader: <Loader />, name: "Age", id: 2, feature: "ageOptions", link: "/master/age/add/:id", component: <RequireAuth><AddAgeValue /></RequireAuth> },
  { loader: <Loader />, name: "Country ", id: 2, feature: "country", link: "/master/country/add/:id", component: <RequireAuth><AddCountry /></RequireAuth> },
  { loader: <Loader />, name: "State ", id: 2, feature: "state", link: "/master/state/add/:id", component: <RequireAuth><AddState /></RequireAuth> },
  { loader: <Loader />, name: "City ", id: 2, feature: "city", link: "/master/city/add/:id", component: <RequireAuth><AddCity /></RequireAuth> },
  { loader: <Loader />, name: "Currency ", id: 2, feature: "currency", link: "/master/currency/add/:id", component: <RequireAuth><AddCurrency /></RequireAuth> },
  { loader: <Loader />, name: "Gift Card ", id: 2, feature: "giftcardcategory", link: "/master/giftcardcategory/add/:id", component: <RequireAuth><AddGiftCardCategory /></RequireAuth> },
  { loader: <Loader />, name: "Comment Activity ", id: 2, feature: "commentactivity", link: "/master/commentactivity/add/:id", component: <RequireAuth><AddCommentActivity /></RequireAuth> },
];



export default DropdownListing