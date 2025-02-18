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
import { IoMdClose } from "react-icons/io";

const AddFranchise = ({ setShowForm }) => {
  const today = new Date().toISOString().split("T")[0];
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
  ];
  const extensionToIcon = {
    ".doc": docs,
    ".docx": docs,
    ".pdf": pdf,
    ".csv": sheet,
    ".ppt": ppt,
    ".pptx": ppt,
    ".xlsx": sheet,
  };
  const [err, setError] = useState("");
  const [showImg, setShowImg] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [is_verified, setIsVerified] = useState(false);
  const [files, setFiles] = useState([]);

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

      const sendData = {
        id: id,
        name: data?.name,
        phone: data?.phone,
        address: data?.address,
        host: data?.email,
        owner_name: data?.ownerName,
        country: data?.country,
        state: data?.state,
        city: data?.city,
        verification_num: data?.verificationNumber,
        registration_num: data?.registrationNumber,
        // apps: JSON.stringify(appsChecked),
        is_verified: is_verified,

        // user: {
        //   email: data?.email,
        //   password: data?.password,
        // },
      };
      // console.log("sendData", sendData);
      const formData = new FormData();

      if (img) {
        formData.append("id", id);
        formData.append("image_url", img);
        memberFranchiseUpdateDetails.mutate(formData);
      }
      if (files?.length > 0) {
        for (let i = 0; i < files?.length; i++) {
          formData?.append("doc_" + (i + 1), files[i]);
        }
      }
      memberFranchiseUpdateDetails.mutate(sendData);
    } else {
      if (!img) {
        setError("Organization logo Required");

        return;
      }
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
      // if (!OrgImg) {
      //   setOrgError("Organization image Required");
      //   return;
      // }

      // formData?.append("image_url", img);
      const sendData = {
        subscription: Number(data?.subscription),
        name: data?.name,
        // ownerName: data?.ownerName,
        phone: data?.phone,
        address: data?.address,
        host: data?.email,
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
    queryClient.invalidateQueries("member-franchise");
    queryClient.refetchQueries("member-franchise");
  };
  const memberFranchiseCreate = useMutation(
    (data) => MemberServices.createFranchiseMember(data),
    {
      onSuccess: (data) => {
        const formData = new FormData();
        formData?.append("id", data?.data?.id);
        formData?.append("image_url", img);
        if (files?.length > 0) {
          for (let i = 0; i < files?.length; i++) {
            formData?.append("doc_" + (i + 1), files[i]);
          }
        }

        memberFranchiseUpdate.mutate(formData);

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
        formik.setFieldValue("host", data?.data?.user?.email || "");
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
        setShowImg(`${config.apiUrl}${data?.data?.image_url}`);
        data?.data?.apps && setAppsChecked(JSON.parse(data?.data?.apps));
        setIsVerified(data?.data?.is_verified);
        // setFiles([
        //   data?.data?.doc_1 && data?.data?.doc_1,
        //   data?.data?.doc_2 && data?.data?.doc_2,
        //   data?.data?.doc_3 && data?.data?.doc_3,
        //   data?.data?.doc_4 && data?.data?.doc_4,
        //   data?.data?.doc_5 && data?.data?.doc_5,
        // ]);
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

  const handleCountryChange = (e) => {
    setCityName("");
    setStateName("");
    formik.setFieldValue("city", "");
    formik.setFieldValue("state", "");
    setCountryName(e.target.value);
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

  const stateList = useMemo(() => {
    if (!countryName) return [];
    const tempArr = [...countries];
    const stateOfCountry = countryName
      ? tempArr.find((each) => each.name == countryName)
      : [];
    return stateOfCountry.states;
  }, [countryName]);

  const cityList = useMemo(() => {
    if (!stateName) return [];
    const tempArr = [...stateList];
    const cityOfCountry = stateName
      ? tempArr.find((each) => each?.name == stateName)
      : [];
    return cityOfCountry.cities;
  }, [stateName]);

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
    let index = file.length;
    if (files?.length >= 5) {
      Swal.fire({
        title: "Error",
        text: "Upto 5 File can upload",
        icon: "error",
      });

      return;
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
  return (
    <Wrapper>
      <div className="subscription-form-wrap">
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
                  onChange={handleCountryChange}
                  className={
                    formik.touched.country && formik.errors.country
                      ? "is-invalid"
                      : ""
                  }
                >
                  <option value={""}>Select Country</option>
                  {countries?.map((each) => {
                    return (
                      <option value={each?.name}>{each?.name || ""}</option>
                    );
                  })}
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
                  className={
                    formik.touched.state && formik.errors.state
                      ? "is-invalid"
                      : ""
                  }
                  onChange={handleStateChange}
                >
                  <option value={""}>Select State</option>
                  {stateList?.map((each) => {
                    return <option value={each?.name}>{each?.name}</option>;
                  })}
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
                  className={
                    formik.touched.country && formik.errors.country
                      ? "is-invalid"
                      : ""
                  }
                >
                  <option value={""}>Select City</option>
                  {cityList?.map((each) => {
                    return <option value={each}>{each}</option>;
                  })}
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
                <Label> Registration Number *</Label>
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
                <Label> Verification Number *</Label>
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
                  className="img-fluid"
                  height={100}
                  width={100}
                />
                {err && <div className="invalid-feedback">{err}</div>}
              </FormGroup>
            </Col>
            <Col md="6" className="mb-2">
              <div className="upload-file-button">
                <label htmlFor="upload-docs-img">
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
                </label>
              </div>
              {files?.length > 0 &&
                files?.map((each, index) => {
                  return (
                    <div className="upload-docs-file-list-wrap">
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
                    </div>
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
            <Col>
              <FormGroup className="mb-0 mb-sm-0">
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
