import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import {
  MemberAddFranchise,
  MemberUpdateFranchise,
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
import imgLogo from "../../../../assets/images/img.png";
import { IoMdClose } from "react-icons/io";
import MasterServices from "../../../../services/MasterServices";
import useFetchMasterData from "../../../../helper/FetchMasterContent";
import Select from 'react-select';

const AddFranchise = ({ setShowForm }) => {
  const today = new Date().toISOString().split("T")[0];
  const [countryOperation, setCountryOperation] = useState([])

  const { id: franchiseId } = useParams();
  const [id, setId] = useState("");
  const fileTag = useRef([]);
  const nav = useNavigate();
  const [img, setImg] = useState(false);
  const fileRef = useRef(null);
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
  const [showImg, setShowImg] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [is_verified, setIsVerified] = useState(false);
  const [files, setFiles] = useState([]);
  const [PrefillFiles, setPrefillFiles] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [appsChecked, setAppsChecked] = useState({
    android: false,
    ios: false,
    api: false,
  });
  const handleImage = (e) => {
    if (e?.target?.files?.length == 0) return;
    const isFileValid = validateFileImage(e?.target?.files[0]);
    // console.log("validateFile", isFileValid);
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

  const queryClient = useQueryClient();

  const {
    data: franchiseList,
    isLoading: isLoadedFranchiseList,
    isError,
    error,
    refetch,
  } = useQuery(
    ["subscription-franchise-member"],
    () =>
      SubscriptionServices.getSubscriptionFranchiseList(
        `?subscriber_type=${"franchise"}`
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
    validationSchema: !id ? MemberAddFranchise : MemberUpdateFranchise,
    onSubmit: (values, action) => {
      // console.log(values,"===")
      submitHandler(values);
    },
  });

  const submitHandler = (data) => {
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
        const keyValueData = {
          id: id,
          name: data?.name,
          phone: data?.phone,
          address: data?.address,
          owner_name: data?.ownerName,
          country: data?.country,
          state: data?.state,
          city: data?.city,
          verification_num: data?.verificationNumber,
          registration_num: data?.registrationNumber,
          is_verified: is_verified,
          lead_country: data?.lead_country,
          lead_mother_tongue: data?.lead_mother_tongue,
          lead_occupation: data?.lead_occupation,
          lead_religion: data?.lead_religion,
          country_of_operation: JSON.stringify(countryOperation?.map((each) => each?.value)),
          lead_employed_in: data?.lead_employed_in,
        };
        memberFranchiseUpdateDetails.mutate(keyValueData);

      }
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", data?.name);
      formData.append("phone", data?.phone);
      formData.append("address", data?.address);
      formData.append("owner_name", data?.ownerName);
      formData.append("country", data?.country);
      formData.append("state", data?.state);
      formData.append("city", data?.city);
      formData.append("verification_num", data?.verificationNumber);
      formData.append("registration_num", data?.registrationNumber);
      formData.append("is_verified", is_verified);
      formData.append("lead_country", data?.lead_country);
      formData.append("lead_mother_tongue", data?.lead_mother_tongue);
      formData.append("lead_occupation", data?.lead_occupation);
      formData.append("lead_religion", data?.lead_religion);
      formData.append("country_of_operation", JSON.stringify(countryOperation?.map((each) => each?.value)));
      formData.append("lead_employed_in", data?.lead_employed_in);

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

      memberFranchiseUpdateDetails.mutate(formData);
    } else {

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
      const sendData = {
        subscription: Number(data?.subscription),
        name: data?.name,
        // ownerName: data?.ownerName,
        phone: data?.phone,
        address: data?.address,

        owner_name: data?.ownerName,
        country: data?.country,
        state: data?.state,
        city: data?.city,
        verification_num: data?.verificationNumber,
        registration_num: data?.registrationNumber,
        // apps: JSON.stringify(appsChecked),
        is_verified: is_verified,
        user: {
          email: data?.email,
          password: data?.password,
        },
        lead_country: data?.lead_country,
        lead_mother_tongue: data?.lead_mother_tongue,
        lead_occupation: data?.lead_occupation,
        lead_religion: data?.lead_religion,
        country_of_operation: JSON.stringify(countryOperation?.map((each) => each?.value)),
        lead_employed_in: data?.lead_employed_in
      };
      if (!data?.subscription) {
        sendData.subscription = null;
      }
      memberFranchiseCreate.mutate(sendData);

    }
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
    // queryClient.invalidateQueries("member-franchise");
    queryClient.refetchQueries("member-franchise");
  };
  const memberFranchiseCreate = useMutation(
    (data) => MemberServices.createFranchiseMember(data),
    {
      onSuccess: (data) => {
        const formData = new FormData();
        formData.append("id", data?.data?.id);
        console.log(img,"img")

        // Append the image if it exists
        if (img && typeof img === "string" && img.trim() !== "") {
          formData.append("image_url", img);
        }

        // Remove null values from `files`
        const removeNull = files.filter((each) => each != null);

        // Append files if any
        if (removeNull.length > 0) {
          removeNull.forEach((file, index) => {
            formData.append(`doc_${index + 1}`, file);
          });
        }

        // Handle cases where there is no image or files
        if (!img && removeNull.length === 0) {
          Swal.fire({
            title: "Successful",
            text: "Created Successfully",
            icon: "success",
          });

          handleRefetch(); // Trigger a refetch
          nav("/member/franchise"); // Navigate to the franchise page
        } else {
          // Trigger mutation if there is an image or files
          memberFranchiseUpdate.mutate(formData);
        }

        //  Swal.fire({
        //   title: "Successfull",
        //   text: "Created Successfully ",
        //   icon: "success",
        // });

        // console.log("Data after submission organization", data?.data);
        // formik.resetForm();
        // alert("Created Successfully")
        // Swal.fire({
        //   title: "Successfull",
        //   text: "Created Successfully ",
        //   icon: "success",
        // });
        // fileRef.current.value = null;
        // setImg(false);
        // setError("");
        // queryClient.invalidateQueries("member-franchise");
        // queryClient.refetchQueries("member-franchise");
        // nav("/member/franchise");

        // setShowForm(false);
        // queryClient.invalidateQueries("subscription-organization");
      },
      onError: (err) => {
        const msg = !!err.response?.data?.user?.username[0]
          ? err.response?.data?.user?.username[0]
          : err?.response?.data?.host[0];

        Swal.fire({
          title: "Error",
          text: msg || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );
  const { data: franchise_details, isLoadFranchiseDetails } = useQuery(
    ["franichise", id],
    () => {
      return MemberServices.getFranchiseMemberDetails(id);
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data.data, "Franchise");
        // formik.setFieldValue(
        //   "subscription",
        //   data?.data?.subscription?.id || ""
        // );
        formik.setFieldValue("name", data?.data?.name || "");
        formik.setFieldValue("phone", data?.data?.phone || "");
        formik.setFieldValue("address", data?.data?.address || "");
        formik.setFieldValue("email", data?.data?.user?.email || "");
        // formik.setFieldValue("host", data?.data?.user?.email || "");
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
        data?.data?.image_url && setShowImg(`${config.apiUrl}${data?.data?.image_url}`);
        data?.data?.apps && setAppsChecked(JSON.parse(data?.data?.apps));
        setIsVerified(data?.data?.is_verified);



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


        setPrefillFiles(
          [
            data?.data?.doc_1,
            data?.data?.doc_2,
            data?.data?.doc_3,
            data?.data?.doc_4,
            data?.data?.doc_5,
          ].filter(Boolean) // Filters out any falsy values (null, undefined, false, etc.)
        );
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
  const memberFranchiseUpdate = useMutation(
    (data) => MemberServices.updateFranchiseMember(data),
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
        nav("/member/franchise");

        // setShowForm(false);
        // queryClient.invalidateQueries("subscription-organization");
      },
      onError: (err) => {
        const msg = !!err.response?.data?.username[0]
          ? err.response?.data?.username[0]
          : err?.response?.data?.host[0];

        Swal.fire({
          title: "Error",
          text: msg || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );
  const memberFranchiseUpdateDetails = useMutation(
    (data) => MemberServices.updateFranchiseMember(data),
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        // alert("Created Successfully")
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully ",
          icon: "success",
        });
        handleRefetch();

        nav("/member/franchise");

        // setShowForm(false);
        // queryClient.invalidateQueries("subscription-organization");
      },
      onError: (err) => {
        const msg = !!err.response?.data?.username[0]
          ? err.response?.data?.username[0]
          : err?.response?.data?.host[0];

        Swal.fire({
          title: "Error",
          text: msg || err?.message,
          icon: "error",
        });
        return;
      },
    }
  );
  // Country State City
  const { data: countryList, isLoading: isCountryLoad } = useQuery(
    ["all-country-list-franchise-add"],
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
    ["all-state-list-franchise-add", countryName],
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
    ["all-city-list-franchise-add", countryName, stateName],
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
  // console.log(PrefillFiles, "=============");
  const handleCountryChange = (e) => {
    setCityName("");
    setStateName("");
    formik.setFieldValue("city", "");
    formik.setFieldValue("state", "");
    setCountryName(e.target.value);
    formik.setFieldValue("country", e?.target.value);
    // setCountryOperation([{
    //   value: e?.target.value, label: e.target.value
    // }])
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

  const handleBack = () => {
    nav("/member/franchise");
  };

  useEffect(() => {
    try {
      const decodeId = franchiseId && atob(franchiseId);

      franchiseId && setId(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [franchiseId]);

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

  const handleCountryOperation = (data) => {
    setCountryOperation(data)
    // formik.setFieldValue("country_of_operation", data)
  }

  // Dropdown Value
  const { data: LanguageListing, isLoading: isLanguageLoaded } =
    useFetchMasterData(config.masterList[0], "all-lang-list-bride-n-groom-franchise");
  const { data: EmployeeInListing, isLoading: isEmpLoad } = useFetchMasterData(
    config.masterList[7],
    "all-emp-bride-n-groom-franchise"
  );
  const { data: OccupationListing, isLoading: isOccupationLoad } =
    useFetchMasterData(config.masterList[8], "all-occupation-bride-n-groom-franchise");
  const { data: ReligionsListing, isLoading: isReligionLoad } =
    useFetchMasterData(config.masterList[3], "all-religion-bride-n-groom-franchise");

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
                  disabled={!!id}
                  id=""
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="|"
                  type="text"
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

            {!id && (
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
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </FormGroup>
              </Col>
            )}
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
                  type="address"
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="invalid-feedback">
                    {formik.errors.address}
                  </div>
                )}
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
                      franchiseList?.map((each) => {
                        return <option value={each?.id}>{each?.name}</option>;
                      })}
                  </Input>
                  {formik.touched.subscription && (
                    <p className="text-danger">{formik.errors.subscription}</p>
                  )}
                </FormGroup>
              </Col>
            )}
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

            <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup member-add-logo-wrap">
                <Label>Franchise Logo *</Label>
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
              <FormGroup className="mt-0 mt-md-4">
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
                    disabled={
                      memberFranchiseCreate?.isLoading ||
                      memberFranchiseUpdate?.isLoading ||
                      memberFranchiseUpdateDetails?.isLoading
                    }
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
                    disabled={
                      memberFranchiseCreate?.isLoading ||
                      memberFranchiseUpdate?.isLoading ||
                      memberFranchiseUpdateDetails?.isLoading
                    }
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
                          disabled={
                            memberFranchiseCreate?.isLoading ||
                            memberFranchiseUpdate?.isLoading ||
                            memberFranchiseUpdateDetails?.isLoading
                          }
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

              {!isLoadFranchiseDetails &&
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
            {/* <Col md="6">
              <Label>Apps</Label>
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
            </Col> */}

            {/* <Col md="6" className="mb-2">
              <FormGroup className="common-formgroup">
                <Label>Franchise Logo *</Label>
                <Input
                  accept={allowedExtensions}
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
            <Col md="12" className="mb-2">
              <FormGroup className="common-formgroup">
                <Button
                  disabled={
                    memberFranchiseCreate?.isLoading ||
                    memberFranchiseUpdate?.isLoading ||
                    memberFranchiseUpdateDetails?.isLoading
                  }
                  className="btn btn-style1 px-4 py-2"
                  type="submit"
                >
                  {memberFranchiseCreate?.isLoading ||
                    memberFranchiseUpdate?.isLoading ||
                    memberFranchiseUpdateDetails?.isLoading ? (
                    <ButtonLoader />
                  ) : (
                    "Submit"
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

export default AddFranchise;
