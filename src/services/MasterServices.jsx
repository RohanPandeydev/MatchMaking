import axios from "axios";
import config from "../../config";
import HttpHeaders from "../helper/httphelper/HttpHeaders";

const MasterServices = {};

MasterServices.getSideBarListingId = (type) => {
  return axios.get(
    `${config.apiUrl}/api/account/categorylist/?${type}`,
    HttpHeaders.getAuthHeader()
  );
};
// Language

MasterServices.List = (type) => {
  return axios.get(
    `${config.apiUrl}/api/account/categoryoptionlist/?${type}`,
    HttpHeaders.getAuthHeader()
  );
};

MasterServices.LangWithCode = (formdata) => {
  return axios.get(`https://restcountries.com/v3.1/lang/${formdata?.lang}`);
};
MasterServices.CountryCode = (formdata) => {
  return axios.get(`https://restcountries.com/v3.1/lang/${formdata?.code}`);
};
MasterServices.Langs = (formdata) => {
  return axios.get(`https://restcountries.com/v3.1/all`);
};

// Countries Value
MasterServices.country = (formdata) => {
  return axios.get(`https://restcountries.com/v3.1/all`);
};
MasterServices.CountryStateCity = (formdata) => {
  return axios.get(
    `https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/countries%2Bstates%2Bcities.json`
  );
};
MasterServices.countryState = (formdata) => {
  return axios.get(`https://restcountries.com/v3.1/all`);
};
// Country List [Currently Using these 3]
MasterServices.country = (formdata) => {
  return axios.get(`https://countriesnow.space/api/v0.1/countries/capital`);
};
MasterServices.stateList = (formdata) => {
  return axios.post(
    `https://countriesnow.space/api/v0.1/countries/states`,
    formdata
  );
};
MasterServices.cityList = (formdata) => {
  return axios.post(
    `https://countriesnow.space/api/v0.1/countries/state/cities`,
    formdata
  );
};

// MasterServices.countryStateCity = (formdata) => {
//   return axios.get(`https://restcountries.com/v3.1/all`);

// };

MasterServices.Add = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/account/categoryoptionlist/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.Update = (formdata) => {
  return axios.put(
    `${config.apiUrl}/api/account/categoryoptionlist/${formdata?.id}/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.UpdateWithImage= (formdata) => {
  return axios.put(
    `${config.apiUrl}/api/account/categoryoptionlist/${formdata.get("id")}/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.DeleteMasterContent = (formdata) => {
  return axios.delete(
    `${config.apiUrl}/api/account/categoryoptionlist/${formdata?.id}/`,

    HttpHeaders.getAuthHeader()
  );
};
MasterServices.getById = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/categoryoptionlist/${formdata?.id}`,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.getCurrencyList = (formdata) => {
  return axios.get(
    `https://restcountries.com/v3.1/all?fields=name,currencies`,);
};
// Add Country [Latest This One ]
MasterServices.AddCountry = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/account/countries/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.getCountryList = (formdata) => {
  if (formdata) {

    return axios.get(
      `${config.apiUrl}/api/account/countries/${formdata}`,

      HttpHeaders.getAuthHeader()
    );
  }
  return axios.get(
    `${config.apiUrl}/api/account/countries/`,

    HttpHeaders.getAuthHeader()
  );
};
MasterServices.getCountryListByFilter = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/countries/${formdata}`,

    HttpHeaders.getAuthHeader()
  );
};

MasterServices.getCountryById = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/countries/${formdata?.id}`,

    HttpHeaders.getAuthHeader()
  );
};
MasterServices.getUpdateCountry = (formdata) => {
  return axios.put(
    `${config.apiUrl}/api/account/countries/${formdata?.id}/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.getCountryDeleteById = (formdata) => {
  return axios.delete(
    `${config.apiUrl}/api/account/countries/${formdata?.id}`,

    HttpHeaders.getAuthHeader()
  );
};
MasterServices.AddState = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/account/state/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};

MasterServices.getStateList = (formdata) => {
  if (formdata.length) {

    return axios.get(
      `${config.apiUrl}/api/account/state/${formdata}`,

      HttpHeaders.getAuthHeader()
    );
  }
  return axios.get(
    `${config.apiUrl}/api/account/state/`,

    HttpHeaders.getAuthHeader()
  );
};

MasterServices.getStateListByCountry = (formdata) => {
  console.log(formdata);
  return axios.get(
    `${config.apiUrl}/api/account/state/?country__name=${formdata?.country__name}`,

    HttpHeaders.getAuthHeader()
  );
};

MasterServices.getStateListByCountryWithFilter = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/state/${formdata}`,

    HttpHeaders.getAuthHeader()
  );
};
MasterServices.getStateById = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/state/${formdata?.id}`,

    HttpHeaders.getAuthHeader()
  );
};
MasterServices.getUpdateState = (formdata) => {
  return axios.put(
    `${config.apiUrl}/api/account/state/${formdata?.id}/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.getDeleteState = (formdata) => {
  return axios.delete(
    `${config.apiUrl}/api/account/state/${formdata?.id}/`,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.AddCity = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/account/cities/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.getCityList = (formdata) => {
  console.log(formdata, "Fotmmmmm")
  if (formdata?.length) {
    return axios.get(
      `${config.apiUrl}/api/account/cities/${formdata}`,

      HttpHeaders.getAuthHeader()
    );
  }
  return axios.get(
    `${config.apiUrl}/api/account/cities/`,

    HttpHeaders.getAuthHeader()
  );
};
MasterServices.getCityListByFilter = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/cities/${formdata}`,

    HttpHeaders.getAuthHeader()
  );
};
// MasterServices.getCityList = (formdata) => {
//   return axios.get(
//     `${config.apiUrl}/api/account/cities/`,

//     HttpHeaders.getAuthHeader()
//   );
// };
MasterServices.getCityById = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/cities/${formdata?.id}`,

    HttpHeaders.getAuthHeader()
  );
};
MasterServices.getUpdateCity = (formdata) => {
  return axios.put(
    `${config.apiUrl}/api/account/cities/${formdata?.id}/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.getDeleteCity = (formdata) => {
  return axios.delete(
    `${config.apiUrl}/api/account/cities/${formdata?.id}/`,
    HttpHeaders.getAuthHeader()
  );
};
// Age
MasterServices.AddAge = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/account/categorylist/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.AgeList = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/categorylist/`,
    HttpHeaders.getAuthHeader()
  );
};
// Body
MasterServices.AddBody = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/account/categorylist/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.BodyList = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/categorylist/`,
    HttpHeaders.getAuthHeader()
  );
};
// Caste
MasterServices.AddCaste = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/account/categorylist/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.CasteList = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/categorylist/`,
    HttpHeaders.getAuthHeader()
  );
};
// Complexion
MasterServices.AddComplexion = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/account/categorylist/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.ComplexionList = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/categorylist/`,
    HttpHeaders.getAuthHeader()
  );
};
// Manglik
MasterServices.AddManglik = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/account/categorylist/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.ManglikList = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/categorylist/`,
    HttpHeaders.getAuthHeader()
  );
};
// Country With Code
MasterServices.AddCountryWithCode = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/account/categorylist/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.CountryWithCodeList = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/categorylist/`,
    HttpHeaders.getAuthHeader()
  );
};
// Create By
MasterServices.AddCreateBy = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/account/categorylist/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.CreateByList = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/categorylist/`,
    HttpHeaders.getAuthHeader()
  );
};
// Diet
MasterServices.AddDiet = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/account/categorylist/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.DietList = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/categorylist/`,
    HttpHeaders.getAuthHeader()
  );
};
// Education Level
MasterServices.AddEducation = (formdata) => {
  return axios.post(
    `${config.apiUrl}/api/account/categorylist/`,
    formdata,
    HttpHeaders.getAuthHeader()
  );
};
MasterServices.EducationList = (formdata) => {
  return axios.get(
    `${config.apiUrl}/api/account/categorylist/`,
    HttpHeaders.getAuthHeader()
  );
};




// Bulk Upload
MasterServices.uploadCsvFileCountry = (formdata) => {
  return axios.post(`${config.apiUrl}/api/account/upload/countries/`, formdata, HttpHeaders.getAuthHeader())
}
MasterServices.uploadCsvFileState = (formdata) => {
  return axios.post(`${config.apiUrl}/api/account/upload/state/`, formdata, HttpHeaders.getAuthHeader())
}
MasterServices.uploadCsvFileCity = (formdata) => {
  return axios.post(`${config.apiUrl}/api/account/upload/city/`, formdata, HttpHeaders.getAuthHeader())
}

export default MasterServices;
