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
const AddOrganization = ({ setShowForm }) => {
  const { id: orgId } = useParams();
  const [id, setId] = useState("");
  const nav = useNavigate();
  const [img, setImg] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const fileRef = useRef(null);
  const fileTag = useRef([]);
  const [files, setFiles] = useState([]);

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
        setShowImg(`${config.apiUrl}${data?.data?.image_url}`);
        data?.data?.apps && setAppsChecked(JSON.parse(data?.data?.apps));
        setIsVerified(data?.data?.is_verified);
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
    // console.log(data);
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
      formData.append("apps", JSON.stringify(appsChecked));
      formData.append("is_verified", is_verified);

      if (img) {
        formData.append("image_url", img);
      }
      if (files?.length) {
        for (let i = 0; i < files?.length; i++) {
          formData?.append("doc_" + (i + 1), files[i]);
        }
      }
      memberOrganizationUpdate.mutate(formData);
    } else {
      if (!img) {
        setError("Organization logo  Required");

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

      const formData = new FormData();
      data?.subscription &&
        formData.append("subscription", Number(data?.subscription));
      formData.append("name", data?.name);
      formData.append("phone", data?.phone);
      formData.append("address", data?.address);
      formData.append("email", data?.email);
      formData.append("password", data?.password);
      formData.append("host", data?.host);
      formData.append("image_url", img);
      formData.append("owner_name", data?.ownerName);
      formData.append("country", data?.country);
      formData.append("state", data?.state);
      formData.append("city", data?.city);
      formData.append("verification_num", data?.verificationNumber);
      formData.append("registration_num", data?.registrationNumber);
      formData.append("apps", JSON.stringify(appsChecked));
      formData.append("is_verified", is_verified);
      if (files?.length) {
        for (let i = 0; i < files?.length; i++) {
          formData?.append("doc_" + (i + 1), files[i]);
        }
      }
      console.log("here====")
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
              <FormGroup className="common-formgroup">
                <Label>Organization Logo *</Label>
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
                      memberOrganizationCreate?.isLoading 
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
                            memberOrganizationCreate?.isLoading 
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
            <Col md="6">
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
            </Col>
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
                  disabled={memberOrganizationCreate?.isLoading}
                  className="btn btn-style1 px-4 py-2"
                  type="submit"
                >
                  {memberOrganizationCreate?.isLoading ? (
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
