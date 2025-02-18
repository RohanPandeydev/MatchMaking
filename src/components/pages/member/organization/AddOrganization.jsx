import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import {
  MemberAddOrganization,
  MemberEditOrganization,
} from "../../../../helper/ValidationHelper/Validation";
import SubscriptionServices from "../../../../services/SubscriptionServices";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import MemberServices from "../../../../services/MemberServices";
import Swal from "sweetalert2";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import Wrapper from "../../../layouts/Wrapper";
import { useNavigate, useParams } from "react-router-dom";
import countries from "../../../../utils/CountryList";
import profileUser from "../../../../assets/images/no-images-available.jpg";
import config from "../../../../../config";
import ppt from "../../../../assets/images/ppt.png";
import docs from "../../../../assets/images/docs.png";
import pdf from "../../../../assets/images/pdf.png";
import sheet from "../../../../assets/images/sheets.png";
import { IoMdClose } from "react-icons/io";
import imgLogo from "../../../../assets/images/img.png";
import MasterServices from "../../../../services/MasterServices";
import useFetchMasterData from "../../../../helper/FetchMasterContent";
import Select from 'react-select';

const AddOrganization = ({ setShowForm }) => {
  const { id: orgId } = useParams();
  const [id, setId] = useState("");
  const nav = useNavigate();
  const [img, setImg] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const fileRef = useRef(null);
  const fileTag = useRef([]);
  const [files, setFiles] = useState([]);
  const [PrefillFiles, setPrefillFiles] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countryOperation, setCountryOperation] = useState([])

  const allowedExtensionsImage = [".jpg", ".jpeg", ".png"];
  const allowedExtensions = [
    ".doc",
    ".docx",
    ".pdf",
    ".csv",
    ".xlsx",
    ".ppt",
    ".pptx", // PowerPoint extensions
    ".jpg",
    ".jpeg",
    ".png",
  ];
  const extensionToIcon = {
    ".doc": docs,
    ".docx": docs,
    ".pdf": pdf,
    ".csv": sheet,
    ".ppt": ppt,
    ".pptx": ppt,
    ".xlsx": sheet,
    ".jpg": imgLogo,
    ".jpeg": imgLogo,
    ".png": imgLogo,
  };
  const [err, setError] = useState("");
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [is_verified, setIsVerified] = useState(false);
  const [appsChecked, setAppsChecked] = useState({
    android: false,
    ios: false,
    api: false,
  });
  const queryClient = useQueryClient();
  const handleImage = (e) => {
    if (e?.target?.files?.length == 0) return;
    const isFileValid = validateFileImage(e?.target?.files[0]);
    // console.log("validateFileImage", isFileValid);
    if (!isFileValid?.isValid) {
      setError(isFileValid?.errorMessage);
      return;
    }
    setImg(e?.target?.files[0]);
    setShowImg(URL.createObjectURL(e?.target?.files[0]));
  };
  const handleVerified = (e) => {
    setIsVerified(e?.target?.checked);
  };
  const handleApps = (e) => {
    const { name, checked } = e.target;

    console.log(name, checked);

    setAppsChecked((prevState) => ({
      ...prevState,
      [name]: checked, // dynamically update based on checkbox value
    }));
  };

  const validateFileImage = (file) => {
    const MAX_FILE_SIZE_MB = 2;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    let isValid = true;
    let errorMessage = "";

    const fileNameParts = file.name.split(".");
    const extension = `.${fileNameParts[
      fileNameParts.length - 1
    ].toLowerCase()}`;

    if (!allowedExtensionsImage.includes(extension)) {
      isValid = false;
      errorMessage = `Invalid file extension: ${extension}. Allowed extensions are: ${allowedExtensionsImage.join(
        ", "
      )}`;
    } else if (file.size > MAX_FILE_SIZE_BYTES) {
      isValid = false;
      errorMessage = `File size exceeds ${MAX_FILE_SIZE_MB} MB`;
    }

    return { isValid, errorMessage };
  };

  const { data: organization_details, isLoadOrganizationData } = useQuery(
    ["organization", id],
    () => {
      return MemberServices.getOrganizationMemberDetails(id);
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data.data, "========");
        // formik.setFieldValue(
        //   "subscription",
        //   data?.data?.subscription?.id || ""
        // );
        formik.setFieldValue("name", data?.data?.name || "");
        formik.setFieldValue("phone", data?.data?.phone || "");
        formik.setFieldValue("address", data?.data?.address || "");
        formik.setFieldValue("email", data?.data?.user?.email || "");
        formik.setFieldValue("host", data?.data?.host || "");
        formik.setFieldValue("ownerName", data?.data?.owner_name || "");
        formik.setFieldValue("country", data?.data?.country || "");
        setCountryName(data?.data?.country);
        formik.setFieldValue("state", data?.data?.state || "");
        setStateName(data?.data?.state);
        formik.setFieldValue("city", data?.data?.city || "");
        setCityName(data?.data?.city);
        formik.setFieldValue(
          "verificationNumber",
          data?.data?.verification_num || ""
        );
        formik.setFieldValue(
          "registrationNumber",
          data?.data?.registration_num || ""
        );


        data?.data?.lead_country && formik.setFieldValue("lead_country", data?.data?.lead_country);
        data?.data?.lead_mother_tongue && formik.setFieldValue("lead_mother_tongue", data?.data?.lead_mother_tongue);
        data?.data?.lead_occupation && formik.setFieldValue("lead_occupation", data?.data?.lead_occupation);
        data?.data?.lead_religion && formik.setFieldValue("lead_religion", data?.data?.lead_religion);
        data?.data?.country_of_operation && formik.setFieldValue("country_of_operation", JSON.parse(data?.data?.country_of_operation));
        data?.data?.lead_employed_in && formik.setFieldValue("lead_employed_in", data?.data?.lead_employed_in);

        const countryOperation = data?.data?.country_of_operation && JSON.parse(data?.data?.country_of_operation)
        data?.data?.country_of_operation && setCountryOperation(countryOperation?.map((each) => {
          return { label: each, value: each }
        }))


        setShowImg(`${config.apiUrl}${data?.data?.image_url}`);
        data?.data?.apps && setAppsChecked(JSON.parse(data?.data?.apps));
        setIsVerified(data?.data?.is_verified);
        setPrefillFiles(
          [
            data?.data?.doc_1,
            data?.data?.doc_2,
            data?.data?.doc_3,
            data?.data?.doc_4,
            data?.data?.doc_5,
          ].filter(Boolean)
        ); // Filters out any falsy values (null, undefined, false, etc.)
        // setFiles([
        //   data?.data?.doc_1 &&data?.data?.doc_1 ,
        //   data?.data?.doc_2 &&data?.data?.doc_2 ,
        //   data?.data?.doc_3 &&data?.data?.doc_3 ,
        //   data?.data?.doc_4 &&data?.data?.doc_4 ,
        //   data?.data?.doc_5 &&data?.data?.doc_5 ,
        // ])
      },
      onError: (err) => {
        if (err?.response?.status == 401) {
          ValidateAuthenticationKey(
            err?.response?.status,
            "Your login session has expired. Please log in again."
          );
          return;
        }
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );
  // console.log("organization_details", organization_details)

  const { data: franchiseList, isLoading: isLoadedFranchiseList } = useQuery(
    ["subscription-organization-member"],
    () =>
      SubscriptionServices.getSubscriptionFranchiseList(
        `?subscriber_type=${"org"}`
      ),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        // console.log("Data Franchise ", data?.data);
        // StorageData.setData(data?.data?.data?.users);
        return data?.data;
      },
      onError: (err) => {
        if (err?.response?.status == 401) {
          ValidateAuthenticationKey(
            err?.response?.status,
            "Your login session has expired. Please log in again."
          );
          return;
        }
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    subscription: "",
    address: "",
    host: "",
    state: "",
    city: "",
    country: "",
    ownerName: "",
    registrationNumber: "",
    verificationNumber: "",
    lead_caste: "",
    lead_country: "",
    lead_mother_tongue: "",
    lead_occupation: "",
    lead_religion: "",
    country_of_operation: [],
    lead_employed_in: ""
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: !id ? MemberAddOrganization : MemberEditOrganization,
    onSubmit: (values, action) => {
      // console.log("action", action);
      // console.log("values====>", values, appsChecked);
      submitHandler(values);
    },
  });
  // console.log(formik.errors)

  const submitHandler = (data) => {
    console.log(data, data?.country_of_operation?.map((each) => each?.value));
    if (id) {
      const removeNull = files.filter((each) => each != null);
      const validateMultipleFileSize = validateFiles(removeNull);

      if (removeNull?.length && removeNull?.length + PrefillFiles?.length > 5) {
        Swal.fire({
          title: "Error",
          text: "Upto 5 File can upload",
          icon: "error",
        });

        return;
      } else if (!validateMultipleFileSize.isValid) {
        Swal.fire({
          title: "Error",
          text: validateMultipleFileSize.errorMessage,
          icon: "error",
        });
        return;
      }

      if (!img || files?.length == 0) {
        const makeJson = {
          subscription: data?.subscription ? Number(data?.subscription) : undefined,
          name: data?.name,
          phone: data?.phone,
          address: data?.address,
          email: data?.email,
          password: data?.password,
          host: data?.host,
          image_url: img || undefined,
          owner_name: data?.ownerName,
          country: data?.country,
          state: data?.state,
          city: data?.city,
          verification_num: data?.verificationNumber,
          registration_num: data?.registrationNumber,
          lead_country: data?.lead_country,
          lead_mother_tongue: data?.lead_mother_tongue,
          lead_occupation: data?.lead_occupation,
          lead_religion: data?.lead_religion,
          country_of_operation: JSON.stringify(countryOperation?.map((each) => each?.value)),
          lead_employed_in: data?.lead_employed_in,
          apps: JSON.stringify(appsChecked),
          is_verified: is_verified,
          ...(files?.length &&
            files.reduce((acc, file, index) => {
              acc[`doc_${index + 1}`] = file;
              return acc;
            }, {})),
        };
        return memberOrganizationUpdate.mutate(makeJson);

      }


      const formData = new FormData();
      // formData.append("subscription", Number(data?.subscription));
      formData.append("name", data?.name);
      formData.append("phone", data?.phone);
      formData.append("address", data?.address);
      formData.append("owner_name", data?.ownerName);
      formData.append("country", data?.country);
      formData.append("state", data?.state);
      formData.append("city", data?.city);
      formData.append("verification_num", data?.verificationNumber);
      formData.append("registration_num", data?.registrationNumber);
      formData.append("lead_country", data?.lead_country);
      formData.append("lead_mother_tongue", data?.lead_mother_tongue);
      formData.append("lead_occupation", data?.lead_occupation);
      formData.append("lead_religion", data?.lead_religion);
      formData.append("country_of_operation", JSON.stringify(countryOperation?.map((each) => each?.value)));
      formData.append("lead_employed_in", data?.lead_employed_in);
      formData.append("apps", JSON.stringify(appsChecked));
      formData.append("is_verified", is_verified);

      if (img) {
        formData.append("image_url", img);
      }
      if (files?.length > 0) {
        let startingIndex = PrefillFiles?.length || 0; // Get the current count of PrefillFiles

        for (let i = 0; i < files?.length && startingIndex < 5; i++) {
          formData?.append("doc_" + (startingIndex + 1), files[i]);
          startingIndex++; // Increment the index to ensure proper doc numbering
        }
      }
      memberOrganizationUpdate.mutate(formData);
    } else {
   
      const removeNull = files.filter((each) => each != null);
      const validateMultipleFileSize = validateFiles(removeNull);

      if (removeNull?.length && removeNull?.length >= 5) {
        Swal.fire({
          title: "Error",
          text: "Upto 5 File can upload",
          icon: "error",
        });

        return;
      } else if (!validateMultipleFileSize.isValid) {
        Swal.fire({
          title: "Error",
          text: validateMultipleFileSize.errorMessage,
          icon: "error",
        });
        return;
      }



      const formData = new FormData();
      console.log(removeNull?.length,"=====")
      if (!img &&  removeNull?.length == 0) {
        const makeJson = {
          subscription: data?.subscription ? Number(data?.subscription) : undefined,
          name: data?.name,
          phone: data?.phone,
          address: data?.address,
          email: data?.email,
          password: data?.password,
          host: data?.host,
          image_url: img || undefined,
          owner_name: data?.ownerName,
          country: data?.country,
          state: data?.state,
          city: data?.city,
          verification_num: data?.verificationNumber,
          registration_num: data?.registrationNumber,
          lead_country: data?.lead_country,
          lead_mother_tongue: data?.lead_mother_tongue,
          lead_occupation: data?.lead_occupation,
          lead_religion: data?.lead_religion,
          country_of_operation: JSON.stringify(countryOperation?.map((each) => each?.value)),
          lead_employed_in: data?.lead_employed_in,
          apps: JSON.stringify(appsChecked),
          is_verified: is_verified,
          
        };
        return memberOrganizationCreate.mutate(makeJson);

      }


      data?.subscription &&
        formData.append("subscription", Number(data?.subscription));
      formData.append("name", data?.name);
      formData.append("phone", data?.phone);
      formData.append("address", data?.address);
      formData.append("email", data?.email);
      formData.append("password", data?.password);
      formData.append("host", data?.host);
      img && formData.append("image_url", img);
      formData.append("owner_name", data?.ownerName);
      formData.append("country", data?.country);
      formData.append("state", data?.state);
      formData.append("city", data?.city);
      formData.append("verification_num", data?.verificationNumber);
      formData.append("registration_num", data?.registrationNumber);
      formData.append("lead_country", data?.lead_country);
      formData.append("lead_mother_tongue", data?.lead_mother_tongue);
      formData.append("lead_occupation", data?.lead_occupation);
      formData.append("lead_religion", data?.lead_religion);
      formData.append("country_of_operation", JSON.stringify(countryOperation.map((each) => each?.value)));
      formData.append("lead_employed_in", data?.lead_employed_in);
      formData.append("apps", JSON.stringify(appsChecked));
      formData.append("is_verified", is_verified);
      if (files?.length) {
        for (let i = 0; i < files?.length; i++) {
          formData?.append("doc_" + (i + 1), files[i]);
        }
      }
      memberOrganizationCreate.mutate(formData);
    }
  };

  const memberOrganizationCreate = useMutation(
    (data) => MemberServices.createOrganizationMember(data),
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        // alert("Created Successfully")
        Swal.fire({
          title: "Successfull",
          text: "Created Successfully ",
          icon: "success",
        });
        handleRefetch();
        nav("/member/organization");
        // setShowForm(false);
        // queryClient.invalidateQueries("subscription-organization");
      },
      onError: (err) => {
        console.log("Error response data:", err.response?.data);

        // Check for specific error messages or provide a generic message
        const msg =
          err.response?.data?.username?.[0] ||
          err.response?.data?.host?.[0] ||
          "An unexpected error occurred. Please try again.";

        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
        });

        return;
      },
    }
  );

  const memberOrganizationUpdate = useMutation(
    (data) => MemberServices.updateOrganizationMemberDetails(id, data),
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        // formik.resetForm();
        // alert("Created Successfully")
        Swal.fire({
          title: "Successfull",
          text: "Update Successfully ",
          icon: "success",
        });
        handleRefetch();
        nav("/member/organization");
        // setShowForm(false);
        // queryClient.invalidateQueries("subscription-organization");
      },
      onError: (err) => {
        console.log("Error response data:", err.response?.data);

        // Check for specific error messages or provide a generic message
        const msg =
          err.response?.data?.username?.[0] ||
          err.response?.data?.host?.[0] ||
          "An unexpected error occurred. Please try again.";

        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
        });

        return;
      },
    }
  );

  const handleCountryChange = (e) => {
    setCityName("");
    setStateName("");
    formik.setFieldValue("city", "");
    formik.setFieldValue("state", "");
    setCountryName(e.target.value);
    // setCountryOperation([{
    //   value: e?.target.value, label: e.target.value
    // }])

    formik.setFieldValue("country", e?.target.value);
  };

  const handleStateChange = (e) => {
    setCityName("");
    formik.setFieldValue("city", "");

    setStateName(e.target.value);
    formik.setFieldValue("state", e?.target.value);
  };
  const handleCityName = (e) => {
    setCityName(e.target.value);
    formik.setFieldValue("city", e?.target.value);
  };
  const { data, isLoading } = useQuery(
    ["all-countries-organization"],
    () => MasterServices.country(),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.data?.data;
      },
      onError: (err) => {
        console.error("Error fetching languages", err?.message); // Debugging log
        if (err?.response?.status === 401) {
          ValidateAuthenticationKey(
            err?.response?.status,
            "Your login session has expired. Please log in again."
          );
          return;
        }
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );
  // Country State City
  const { data: countryList, isLoading: isCountryLoad } = useQuery(
    ["all-country-list-org-add"],
    () => MasterServices.getCountryListByFilter(`?is_disabled=false`),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.data;
        // console.log("Languages API Data", data?.data); // Debugging log
      },
      onError: (err) => {
        console.error("Error fetching languages", err?.message); // Debugging log
        if (err?.response?.status === 401) {
          ValidateAuthenticationKey(
            err?.response?.status,
            "Your login session has expired. Please log in again."
          );
          return;
        }
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  const { data: stateListDropdown, isLoading: isLoadState } = useQuery(
    ["all-state-list-org-add", countryName],
    () =>
      MasterServices.getStateListByCountryWithFilter(
        `?is_disabled=false&country__name=${countryName}`
      ),
    {
      enabled: !!countryName,
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.data;
        // console.log("Languages API Data", data?.data); // Debugging log
      },
      onError: (err) => {
        console.error("Error fetching languages", err?.message); // Debugging log
        if (err?.response?.status === 401) {
          ValidateAuthenticationKey(
            err?.response?.status,
            "Your login session has expired. Please log in again."
          );
          return;
        }
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  const { data: cityListDropdown, isLoading: isCityLaod } = useQuery(
    ["all-city-list-org-add", countryName, stateName],
    () =>
      MasterServices.getCityListByFilter(
        `?is_disabled=false&state__name=${stateName}&country__name=${countryName}`
      ),
    {
      enabled: !!countryName && !!stateName,
      refetchOnWindowFocus: false,
      select: (data) => {
        return data?.data;
        // console.log("Languages API Data", data?.data); // Debugging log
      },
      onError: (err) => {
        console.error("Error fetching languages", err?.message); // Debugging log
        if (err?.response?.status === 401) {
          ValidateAuthenticationKey(
            err?.response?.status,
            "Your login session has expired. Please log in again."
          );
          return;
        }
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  const handleCountryOperation = (data) => {
    setCountryOperation(data)
    // formik.setFieldValue("country_of_operation", data)
  }

  useEffect(() => {
    try {
      const decodeId = orgId && atob(orgId);

      orgId && setId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [orgId]);

  const handleBack = () => {
    // formik.resetForm();
    // setShowForm(false);
    nav("/member/organization");
  };

  const handleRefetch = () => {
    formik.resetForm();
    setImg(false);
    setFiles([]);
    setError("");
    setAppsChecked();
    setIsVerified(false);
    if (!fileTag.current) return;
    fileTag.current.value = "";
    if (!fileRef.current) return;
    fileRef.current.value = "";
    queryClient.invalidateQueries("member-organization");
    queryClient.refetchQueries("member-organization");
  };

  // File Upload

  const validateFile = (file) => {
    const MAX_FILE_SIZE_MB = 25;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    let isValid = true;
    let errorMessage = "";

    const fileNameParts = file.name.split(".");
    const extension = `.${fileNameParts[fileNameParts.length - 1]}`;

    if (!allowedExtensions.includes(extension.toLowerCase())) {
      isValid = false;
      errorMessage = `Invalid file extension: ${extension}`;
    } else if (file.size > MAX_FILE_SIZE_BYTES) {
      isValid = false;
      errorMessage = `File size exceeds ${MAX_FILE_SIZE_MB} MB`;
    }

    return { isValid, errorMessage };
  };
  const validateFiles = (files) => {
    const MAX_TOTAL_SIZE_MB = 25;
    const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;
    let totalSize = 0;
    let isValid = true;
    let errorMessage = "";

    files.forEach((file) => {
      const fileNameParts = file.name.split(".");
      const extension = `.${fileNameParts[fileNameParts.length - 1]}`;

      if (!allowedExtensions.includes(extension.toLowerCase())) {
        isValid = false;
        errorMessage = `Invalid file extension: ${extension}`;
      }

      totalSize += file.size;
    });

    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      isValid = false;
      errorMessage = `Total file size exceeds ${MAX_TOTAL_SIZE_MB} MB`;
    }

    return { isValid, errorMessage, totalSize };
  };
  const handleFileChangeSingle = (e) => {
    const file = e.target.files[0];
    console.log("PrefillFiles", files?.length + PrefillFiles?.length);
    let index = file.length;
    if (PrefillFiles?.length >= 5) {
      Swal.fire({
        title: "Error",
        text: "You can only upload up to 5 files",
        icon: "error",
      });
      if (!fileTag.current) return;
      fileTag.current.value = "";
    } else if (
      e.target.files?.length &&
      files?.length + PrefillFiles?.length >= 5
    ) {
      Swal.fire({
        title: "Error",
        text: "You can only upload up to 5 files ",
        icon: "error",
      });
      if (!fileTag.current) return;
      fileTag.current.value = "";
    } else if (file) {
      const { isValid, errorMessage } = validateFile(file);
      if (isValid) {
        // const newFiles = [...files];
        // newFiles[index] = file;
        setFiles(() => {
          return [...files, file];
        });
        // setFileDetails(() => {
        //   return [...filesDetails, file];
        // });
      } else {
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
        });
      }
    }
  };

  const handleRemoveFile = (index) => {
    if (files?.length == 0) {
      if (!fileTag.current) return;
      fileTag.current.value = "";
      return;
    }
    // fileTag.current[index].value = "";
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    // setFileDetails(newFiles);
    // setErrors(newErrors);

    // If there is only one file input tag left, do not remove it
    return;
  };

  const getFileIcon = (fileName, file) => {
    const extension = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();

    return extensionToIcon[extension] || "unknown-icon"; // Default icon for unknown types
  };

  const getFileIconShow = (fileType, url) => {
    const extension = fileType
      ? fileType.toLowerCase()
      : url.split(".").pop().toLowerCase(); // //console.log("fileType", fileType);
    console.log("extension", extension);
    switch (true) {
      case extension.includes("presentation") || extension.includes("pptx"):
        return { icon: ppt, url }; // For PPT files
      case extension.includes("msword") || extension.includes("docx"):
        return { icon: docs, url }; // For Word files
      case extension.includes("pdf"):
        return { icon: pdf, url }; // For PDF files
      case extension.includes("jpeg") ||
        extension.includes("png") ||
        extension.includes("jpg"):
        return { icon: config.apiUrl + url, url }; // Use image URL directly for image files
      case extension.includes("csv") || extension.includes("sheet"):
        return { icon: sheet, url }; // For Spreadsheet files
      default:
        return null; // Default or handle unknown file types
    }
  };



  // Dropdown Value
  const { data: LanguageListing, isLoading: isLanguageLoaded } =
    useFetchMasterData(config.masterList[0], "all-lang-list-bride-n-groom-org");
  const { data: EmployeeInListing, isLoading: isEmpLoad } = useFetchMasterData(
    config.masterList[7],
    "all-emp-bride-n-groom-org"
  );
  const { data: OccupationListing, isLoading: isOccupationLoad } =
    useFetchMasterData(config.masterList[8], "all-occupation-bride-n-groom-org");
  const { data: ReligionsListing, isLoading: isReligionLoad } =
    useFetchMasterData(config.masterList[3], "all-religion-bride-n-groom-org");

  return (
    <Wrapper>
      <div className="member-form-wrap">
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label> Owner Name *</Label>
                <Input
                  className={
                    formik.touched.ownerName && formik.errors.ownerName
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="ownerName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ownerName}
                  placeholder="|"
                  type="text"
                />
                {formik.touched.ownerName && formik.errors.ownerName && (
                  <div className="invalid-feedback">
                    {formik.errors.ownerName}
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label> Name *</Label>
                <Input
                  className={
                    formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeholder="|"
                  type="text"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
              </FormGroup>
            </Col>

            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Email *</Label>
                <Input
                  className={
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="|"
                  type="text"
                  disabled={!!id}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Phone Number *</Label>
                <Input
                  className={
                    formik.touched.phone && formik.errors.phone
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  placeholder="|"
                  type="text"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="invalid-feedback">{formik.errors.phone}</div>
                )}
              </FormGroup>
            </Col>

            {!id ? (
              <Col md="6" className="mb-2">
                <FormGroup className="common-formgroup">
                  <Label>Password *</Label>
                  <Input
                    className={
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }
                    id=""
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="|"
                    type="password"
                    disabled={!!id}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </FormGroup>
              </Col>
            ) : null}

            <Col md="6">
              <FormGroup className="common-formgroup">
                <Label> Country * </Label>
                <Input
                  id=""
                  name="country"
                  type="select"
                  value={countryName}
                  disabled={isCountryLoad}
                  onChange={handleCountryChange}
                  className={
                    formik.touched.country && formik.errors.country
                      ? "is-invalid"
                      : ""
                  }
                >
                  <option value={""}>Select Country</option>
                  {isCountryLoad ? (
                    <ButtonLoader />
                  ) : (
                    countryList?.length > 0 &&
                    countryList.map((country) => (
                      <option key={country?.name} value={country?.name || ""}>
                        {country?.name || ""}
                      </option>
                    ))
                  )}
                </Input>
                {formik.touched.country && (
                  <p className="text-danger">{formik.errors.country}</p>
                )}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className="common-formgroup">
                <Label> State * </Label>
                <Input
                  id=""
                  name="state"
                  type="select"
                  value={stateName}
                  disabled={!!!countryName}
                  className={
                    formik.touched.state && formik.errors.state
                      ? "is-invalid"
                      : ""
                  }
                  onChange={handleStateChange}
                >
                  <option value={""}>Select State</option>
                  {isLoadState ? (
                    <ButtonLoader />
                  ) : (
                    stateListDropdown?.length > 0 &&
                    stateListDropdown.map((state) => (
                      <option key={state?.name} value={state?.name || ""}>
                        {state?.name || ""}
                      </option>
                    ))
                  )}
                </Input>
                {formik.touched.state && (
                  <p className="text-danger">{formik.errors.state}</p>
                )}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className="common-formgroup">
                <Label> City * </Label>
                <Input
                  id=""
                  name="city"
                  type="select"
                  value={cityName}
                  onChange={handleCityName}
                  disabled={!!!stateName || !!!countryName}
                  className={
                    formik.touched.country && formik.errors.country
                      ? "is-invalid"
                      : ""
                  }
                >
                  <option value={""}>Select City</option>
                  {isCityLaod ? (
                    <ButtonLoader />
                  ) : (
                    cityListDropdown?.length > 0 &&
                    cityListDropdown.map((city) => (
                      <option key={city?.name} value={city?.name || ""}>
                        {city?.name || ""}
                      </option>
                    ))
                  )}
                </Input>
                {formik.touched.city && (
                  <p className="text-danger">{formik.errors.city}</p>
                )}
              </FormGroup>
            </Col>

            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Address *</Label>
                <Input
                  className={
                    formik.touched.address && formik.errors.address
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  placeholder="|"
                  type="text"
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="invalid-feedback">
                    {formik.errors.address}
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label> Registration Number </Label>
                <Input
                  className={
                    formik.touched.registrationNumber &&
                      formik.errors.registrationNumber
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="registrationNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.registrationNumber}
                  placeholder="|"
                  type="text"
                />
                {formik.touched.registrationNumber &&
                  formik.errors.registrationNumber && (
                    <div className="invalid-feedback">
                      {formik.errors.registrationNumber}
                    </div>
                  )}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label> Verification Number </Label>
                <Input
                  className={
                    formik.touched.verificationNumber &&
                      formik.errors.verificationNumber
                      ? "is-invalid"
                      : ""
                  }
                  id=""
                  name="verificationNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.verificationNumber}
                  placeholder="|"
                  type="text"
                />
                {formik.touched.verificationNumber &&
                  formik.errors.verificationNumber && (
                    <div className="invalid-feedback">
                      {formik.errors.verificationNumber}
                    </div>
                  )}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Subdomain Name*</Label>
                <div className="input-group mb-3">
                  {/* <span className="input-group-text" id="basic-addon1">
                    www.
                  </span> */}
                  <Input
                    className={
                      formik.touched.host && formik.errors.host
                        ? "is-invalid"
                        : ""
                    }
                    id=""
                    name="host"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.host}
                    placeholder="|"
                    type="text"
                    disabled={!!id}
                  />
                  <span className="input-group-text" id="basic-addon1">
                    .{window.location.host}
                  </span>
                </div>
                {formik.touched.host && formik.errors.host && (
                  <p className="text-danger fs-6">{formik.errors.host}</p>
                )}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className="common-formgroup">
                <Label> Filter by Country  </Label>
                <Input
                  id=""
                  name="lead_country"
                  type="select"
                  value={formik.values.lead_country}

                  disabled={isCountryLoad}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.lead_country && formik.errors.lead_country
                      ? "is-invalid"
                      : ""
                  }
                >
                  <option value={""}>Select Country</option>
                  {isCountryLoad ? (
                    <ButtonLoader />
                  ) : (
                    countryList?.length > 0 &&
                    countryList.map((country) => (
                      <option key={country?.name} value={country?.name || ""}>
                        {country?.name || ""}
                      </option>
                    ))
                  )}
                </Input>
                {formik.touched.lead_country && (
                  <p className="text-danger">{formik.errors.lead_country}</p>
                )}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className="common-formgroup">
                <Label> Filter By Mother Tongue  </Label>
                <Input
                  id=""
                  name="lead_mother_tongue"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lead_mother_tongue}
                  type="select"
                  className={
                    formik.touched.lead_mother_tongue &&
                      formik.errors.lead_mother_tongue
                      ? "is-invalid"
                      : ""
                  }
                >
                  <option value="">Select Mother Tongue</option>
                  {isLanguageLoaded ? (
                    <ButtonLoader />
                  ) : (
                    LanguageListing?.length > 0 &&
                    LanguageListing?.map((lang) => {
                      return (
                        <option
                          value={
                            lang?.description
                              ? JSON.parse(lang?.description)
                              : lang?.name
                          }
                        >
                          {lang?.name}
                        </option>
                      );
                    })
                  )}

                </Input>
                {formik.touched.lead_mother_tongue && (
                  <p className="text-danger">{formik.errors.lead_mother_tongue}</p>
                )}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className="common-formgroup">
                <Label> Filter By Occupation </Label>
                <Input
                  id=""
                  name="lead_occupation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lead_occupation}
                  type="select"
                  className={
                    formik.touched.lead_occupation &&
                      formik.errors.lead_occupation
                      ? "is-invalid"
                      : ""
                  }
                >
                  <option value="">Select Occupation</option>
                  {isOccupationLoad ? (
                    <ButtonLoader />
                  ) : (
                    OccupationListing?.length > 0 &&
                    OccupationListing?.map((occupation) => {
                      return (
                        <option
                          value={
                            occupation?.description
                              ? JSON.parse(occupation?.description)
                              : occupation?.name
                          }
                        >
                          {occupation?.name}
                        </option>
                      );
                    })
                  )}

                </Input>
                {formik.touched.lead_occupation && (
                  <p className="text-danger">{formik.errors.lead_occupation}</p>
                )}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className="common-formgroup">
                <Label> Filter By Religion </Label>
                <Input
                  id=""
                  name="lead_religion"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lead_religion}
                  type="select"
                  className={
                    formik.touched.lead_religion &&
                      formik.errors.lead_religion
                      ? "is-invalid"
                      : ""
                  }
                >
                  <option value={""}>Select Religion </option>
                  {isReligionLoad ? (
                    <ButtonLoader />
                  ) : (
                    ReligionsListing?.length > 0 &&
                    ReligionsListing?.map((religion) => {
                      return (
                        <option
                          value={
                            religion?.description
                              ? JSON.parse(religion?.description)
                              : religion?.name
                          }
                        >
                          {religion?.name}
                        </option>
                      );
                    })
                  )}

                </Input>
                {formik.touched.lead_religion && (
                  <p className="text-danger">{formik.errors.lead_religion}</p>
                )}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className="common-formgroup">
                <Label> Filter By Job Type </Label>
                <Input
                  id=""
                  name="lead_employed_in"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lead_employed_in}
                  type="select"
                  className={
                    formik.touched.lead_employed_in &&
                      formik.errors.lead_employed_in
                      ? "is-invalid"
                      : ""
                  }
                >
                  <option value="">Select Employed In</option>
                  {isEmpLoad ? (
                    <ButtonLoader />
                  ) : (
                    EmployeeInListing?.length > 0 &&
                    EmployeeInListing?.map((empIn) => {
                      return (
                        <option
                          value={
                            empIn?.description
                              ? JSON.parse(empIn?.description)
                              : empIn?.name
                          }
                        >
                          {empIn?.name}
                        </option>
                      );
                    })
                  )}

                </Input>
                {formik.touched.lead_employed_in && (
                  <p className="text-danger">{formik.errors.lead_employed_in}</p>
                )}
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup className="common-formgroup">
                <Label> Operate by Country  </Label>
                {isCountryLoad ? (
                  <ButtonLoader />
                ) : <Select
                  value={countryOperation}
                  onChange={handleCountryOperation}
                  isMulti={true}
                  options={
                    
                    countryList?.length > 0 &&
                    countryList.map((country) => {
                      return {
                        label: country.name || "",
                        value: country?.name || ""
                      }

                    }

                    )}

                />}
                {/* <Input
                  id=""
                  name="country_of_operation"
                  type="select"
                  value={formik.values.country_of_operation}

                  disabled={isCountryLoad}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.country_of_operation && formik.errors.country_of_operation
                      ? "is-invalid"
                      : ""
                  }
                >
                  <option value={""}>Select Country</option>
                  {isCountryLoad ? (
                    <ButtonLoader />
                  ) : (
                    countryList?.length > 0 &&
                    countryList.map((country) => (
                      <option key={country?.name} value={country?.name || ""}>
                        {country?.name || ""}
                      </option>
                    ))
                  )}
                </Input> */}

              </FormGroup>
            </Col>
            {!id && (
              <Col md="6" className="mb-2">
                <FormGroup className="common-formgroup">
                  <Label> Subscription </Label>
                  <Input
                    id=""
                    className={
                      formik.touched.subscription && formik.errors.subscription
                        ? "is-invalid"
                        : ""
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.subscription}
                    name="subscription"
                    type="select"
                  >
                    <option value={""}>Select Option</option>
                    {!isLoadedFranchiseList &&
                      franchiseList?.map((each, i) => {
                        return (
                          <option key={i} value={each?.id}>
                            {each?.name}
                          </option>
                        );
                      })}
                  </Input>
                  {formik.touched.subscription && (
                    <div className="invalid-feedback">
                      {formik.errors.subscription}
                    </div>
                  )}
                </FormGroup>
              </Col>
            )}
            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup member-add-logo-wrap">
                <Label>Organization Logo </Label>
                <Input
                  accept={allowedExtensionsImage}
                  className={err && err ? "is-invalid" : ""}
                  id=""
                  name="file"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values.address}
                  placeholder="|"
                  type="file"
                  onChange={handleImage}
                  ref={fileRef}
                />
                <img
                  src={showImg || profileUser}
                  className="img-fluid member-logo"
                  height={100}
                  width={100}
                />
                {err && <div className="invalid-feedback">{err}</div>}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className="common-formgroup mb-2 mb-sm-2">
                <Label>Apps</Label>
              </FormGroup>
              <ul className="common-radio-btn mb-3">
                <li>
                  <FormGroup className="mb-0 mb-sm-0">
                    <Input
                      id="select-android"
                      name="android"
                      type="checkbox"
                      checked={appsChecked.android}
                      onChange={handleApps}
                    />
                    <Label for="select-android">Android</Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup className="mb-0 mb-sm-0">
                    <Input
                      id="select-ios"
                      name="ios"
                      type="checkbox"
                      checked={appsChecked.ios}
                      onChange={handleApps}
                    />
                    <Label for="select-ios">iOS</Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup className="mb-0 mb-sm-0">
                    <Input
                      id="select-api"
                      name="api"
                      type="checkbox"
                      checked={appsChecked.api}
                      onChange={handleApps}
                    />
                    <Label for="select-api">Api</Label>
                  </FormGroup>
                </li>
              </ul>
            </Col>
            <Col md="6">
              <FormGroup className="mb-0 mb-md-4">
                <Input
                  id="select-verify"
                  name="verify"
                  type="checkbox"
                  checked={is_verified}
                  onChange={handleVerified}
                />
                <Label for="select-verify">Is Verified</Label>
              </FormGroup>
            </Col>
            <Col md="6" className="mb-2">
              <div className="upload-file-button">
                <FormGroup className="common-formgroup">
                  <Label>Add File</Label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleFileChangeSingle(e)}
                    accept={allowedExtensions}
                    ref={fileTag} // Store reference to each file input element
                    disabled={memberOrganizationCreate?.isLoading}
                    id="upload-docs-img"
                  />
                </FormGroup>
                {/* <label htmlFor="upload-docs-img">
                  <span>Add File</span>
                  <input
                    type="file"
                    onChange={(e) => handleFileChangeSingle(e)}
                    accept={allowedExtensions}
                    ref={fileTag} // Store reference to each file input element
                    disabled={memberOrganizationCreate?.isLoading}
                    id="upload-docs-img"
                  />
                </label> */}
              </div>
              <div className="upload-docs-file-list-wrap">
                {files?.length > 0 &&
                  files?.map((each, index) => {
                    return (
                      <div className="upload-docs-file-list">
                        <Button
                          className="close-btn"
                          disabled={memberOrganizationCreate?.isLoading}
                          onClick={() => handleRemoveFile(index)}
                        >
                          <IoMdClose />
                        </Button>
                        <img
                          loading="lazy"
                          className="img-fluid"
                          height={50}
                          width={50}
                          src={getFileIcon(each?.name, each)}
                          alt="Sb Info"
                        />
                      </div>
                    );
                  })}
              </div>
              {!isLoadOrganizationData &&
                PrefillFiles?.length > 0 &&
                PrefillFiles?.map((ele) => {
                  // console.log("=====", ele, getFileIconShow(ele, ele));
                  return (
                    <img
                      src={getFileIconShow(ele, ele)?.icon}
                      height={20}
                      width={20}
                      className="img-fluid"
                    />
                  );
                })}
            </Col>

            {/* <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Organization Logo *</Label>
                <Input
                  accept={allowedExtensionsImage}
                  className={Orgerr && Orgerr ? "is-invalid" : ""}
                  id=""
                  name="file"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values.address}
                  placeholder="|"
                  type="file"
                  onChange={handleOrgImage}
                  ref={OrgFileRef}
                />
                {Orgerr && <div className="invalid-feedback">{Orgerr}</div>}
              </FormGroup>
            </Col> */}
            {id &&
              !isLoadOrganizationData &&
              organization_details?.data?.domain_name && (
                <Col md="6" className="mb-2">
                  <FormGroup className="common-formgroup">
                    <Label>Domain *</Label>
                    <Input
                      value={organization_details?.data?.domain_name}
                      id=""
                      disabled
                      placeholder="|"
                      type="text"
                    />
                  </FormGroup>
                </Col>
              )}
            <Col md="12" className="mb-2">
              <FormGroup className="common-formgroup">
                <Button
                  disabled={
                    memberOrganizationCreate?.isLoading ||
                    memberOrganizationUpdate?.isLoading
                  }
                  className="btn btn-style1 px-4 py-2"
                  type="submit"
                >
                  {memberOrganizationCreate?.isLoading ||
                    memberOrganizationUpdate?.isLoading ? (
                    <ButtonLoader />
                  ) : !id ? (
                    "Submit"
                  ) : (
                    "Save"
                  )}
                </Button>
                {id ? (
                  <Button className="btn px-4 py-2 mx-2" onClick={handleBack}>
                    Back
                  </Button>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
    </Wrapper>
  );
};

export default AddOrganization;
