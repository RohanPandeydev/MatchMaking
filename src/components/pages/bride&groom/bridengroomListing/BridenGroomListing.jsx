import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../../../layouts/Wrapper";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import {
  AiOutlineEdit,
  AiOutlineEye,
} from "react-icons/ai";
import { GiQueenCrown } from "react-icons/gi";
import { FiPlus, FiShare2 } from "react-icons/fi";
import { VscFilter } from "react-icons/vsc";
import profileUser from "../../../../assets/images/no-images-available.jpg";
import whatsappIcon from "../../../../assets/images/whatsapp-icon.svg";
import { LuMailOpen } from "react-icons/lu";
import { IoCallOutline, IoImagesOutline } from "react-icons/io5";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiMessageDetail, BiReset } from "react-icons/bi";
import { FaComment, FaFlag, FaRegComments, FaShare } from "react-icons/fa";
import BridenGroomServices from "../../../../services/BridenGroomServices";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../../utils/Loader/Loader";
import moment from "moment/moment";
import config from "../../../../../config";
import Pagination from "../../../../utils/Pagination";
import { GrUpdate } from "react-icons/gr";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import classnames from "classnames";
import { MdOutlineArchive, MdVerified } from "react-icons/md";
import NoActiveDataFound from "../../../../utils/NoActiveDataFound";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import PermissionSets from "../../../../guard/Method";
import AssignModel from "./AssignModel";
import { FaUserTie } from "react-icons/fa";
import { FaFileArchive } from "react-icons/fa";
import BrideandGroomFilter from "./BrideandGroomFilter";
import MasterServices from "../../../../services/MasterServices";
import { calculateDOB } from "../../../../utils/CalculateAge";
import ShareDataModel from "./ShareDataModel";
import ShareDataServices from "../../../../services/ShareDataServices";
import Select from 'react-select'
import Orgnaization_FranchiseModel from "./Orgnaization_FranchiseModel";
import CommentModule from "../../../../utils/CommentModule";
import StorageData from "../../../../helper/storagehelper/StorageData";
import StaffServices from "../../../../services/StaffServices";
import customContext from "../../../../contexts/Context";
import { checkMethodsAndRouteBMS, IsAccessibleMethodBMS } from "../../../../guard/Rbac";

const ViewProfile = () => {
  // Extract initial page from query parameters

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialTabValue = queryParams.get("tab");
  const [id, setId] = useState("")
  // const [shareType, setShareType] = useState("")
  const initialLimit = useMemo(
    () => parseInt(queryParams.get("limit")) || 10,
    [parseInt(queryParams.get("limit"))]
  );
  const queryClient = useQueryClient();
  const [toggleFilter, setToggleFilter] = useState(false);
  const [currentInd, setCurrentInd] = useState("0");
  const [limit, setLimit] = useState(initialLimit || 10);
  const [toggleAssignModel, settoggleAssignModel] = useState(false);
  const [toogleDuplicateDataModel, setToggleDuplicateDataModel] = useState(false);
  const [toggleShareModel, setShareModel] = useState(false);
  const [brideandGroomId, setBrideAndGroomId] = useState([]);
  const [bridengroomId, setBrideGroomId] = useState("");
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [tabValue, setTabValue] = useState("");
  const [activeTab, setActiveTab] = useState(initialTabValue || "All");
  const [checkboxList, setCheckBoxList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  // Filter Value
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [selectOrgFracType, setOrgFraType] = useState({})
  const [shareType, setShareType] = useState({ label: "Select Data", value: "" })
  const [duplicateData, setDuplicateData] = useState([])
  const [showErr, setShowErr] = useState("")
  const [organizationId, setOrganizationId] = useState({ label: "Select Organization", value: "" })
  const [franchiseId, setFranchiseId] = useState({ label: "Select Franchise", value: "" })


  const [teamExecutive, setTeamExecutive] = useState(false)
  const [teamExecutiveErr, setTeamExecutiveErr] = useState(false)
  const [teamHead, setTeamHead] = useState(false)
  const [teamHeadErr, setTeamHeadErr] = useState("")

  const [selectId, setSelectId] = useState({})
  const { loggedInStaffId, userData } = customContext()

  const [findYourMatch, setFindYourMatch] = useState({
    search: "",//Name Email Phone 
    profile_create_by: "",
    religion: "",
    lead_create_by: "",

    caste: "",
    gender: "",
    date_of_birth__lte: "",
    date_of_birth__gte: "",
    birth_age_start: "",
    birth_age_end: "",
    hight_start: "",
    hight_end: "",
    hight__lte: "",
    hight__gte: "",
    mother_tongue: "",
    education: "",
    occupation: "",
    is_approve: "",
    drinking: "",
    smoking: "",
    diet: "",
    created_at: "",
    amount__gte: "",
    amount__lte: "",
    lead_create_by__id: "",
    marital_status: "",
    is_personalized: "",
  })

  console.log(userData,"userData123456")
  const handleCheckedUser = (e, id) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add to checkedUsers array if checked
      setCheckBoxList((prev) => [...prev, { tenant: "", brideandgroom: id }]);
    } else {
      // Remove from checkedUsers array if unchecked
      setCheckBoxList((prev) =>
        prev.filter((user) => user.brideandgroom !== id)
      );
    }
  };
  const handleAssignModel = (e, data) => {
    setBrideAndGroomId([data]);
    settoggleAssignModel(!toggleAssignModel);
  };

  const handleShareModel = (e, data) => {
    setBrideAndGroomId([data])
    setShareModel(true)
    // setShareType({ label: "Select Data", value: "" })

  }
  const handleDuplicateModelData = (e, data) => {
    setToggleDuplicateDataModel(true)
    setDuplicateData(data)

  }
  const handleCloseAssignModel = () => {
    queryClient.refetchQueries("bride-groom-data-personalized");
    setBrideAndGroomId("");
    setDuplicateData([])
    settoggleAssignModel(false);
    setSelectAll(false)
    setTeamExecutive(false)
    setTeamExecutiveErr("")
    setTeamHead(false)
    setTeamHeadErr("")
  };
  const handleCloseShareDataModel = () => {
    queryClient.refetchQueries("share-data-org-franchise-share-model");
    setBrideAndGroomId([]);
    setSelectAll(false)
    setShareModel(false);
    setCheckBoxList([])
    setDuplicateData([])

    setShareType({ label: "Select Data", value: "" })
    setOrganizationId({ label: "Select Organization", value: "" })
    setFranchiseId({ label: "Select Franchise", value: "" })

  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      const allCheckedUsers = data?.data?.results.map((each) => ({
        brideandgroom: each.id,
      }));
      setCheckBoxList(allCheckedUsers);
    } else {
      setCheckBoxList([]);
    }
  };


  const tabs = [
    {
      id: 1,
      value: {},
      name: "All",
    },
    {
      id: 2,
      value: { is_approve: 0 },
      name: "Leads",
    },
    {
      id: 3,
      value: { is_approve: 1 },
      name: "Approved",
    },
    {
      id: 4,
      value: { is_premium: 1 },
      name: "Premium",
    },
    {
      id: 5,
      value: { is_premium: 0 },
      name: "Non Premium",
    },
    {
      id: 6,
      value: { is_deleted: true },
      name: "Archived",
    },
  ];


  const clearQueryParams = () => {
    navigate({
      pathname: location.pathname, // Keeps the current path
      search: "", // Clears all query parameters
    });
  };
  // Function to convert tabValue object to query string
  const convertToQueryString = (params) => {
    return Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  };

  const handleResetFilter = () => {
    // alert("here")
    //setToggleFilter(false)

    setFindYourMatch({
      search: "",//Name Email Phone 
      profile_create_by: "",
      religion: "",
      lead_create_by: "",

      caste: "",
      gender: "",
      date_of_birth__lte: "",
      date_of_birth__gte: "",
      birth_age_start: "",
      birth_age_end: "",
      hight_start: "",
      hight_end: "",
      hight__lte: "",
      hight__gte: "",
      mother_tongue: "",
      education: "",
      occupation: "",
      is_approve: "",
      drinking: "",
      smoking: "",
      diet: "",
      created_at: "",
      amount__gte: "",
      amount__lte: "",
      lead_create_by__id: "",
      marital_status: "",
      is_personalized: "",

    })
    setCountryName("")
    setStateName("")
    setCityName("")
  }
  const handleCloseFilter = () => {
    setToggleFilter(!toggleFilter)

    // setFindYourMatch({
    //   search: "",//Name Email Phone 
    //   profile_create_by: "",
    //   religion: "",
    //   lead_create_by: "",

    //   caste: "",
    //   gender: "",
    //   date_of_birth__lte: "",
    //   date_of_birth__gte: "",
    //   birth_age_start: "",
    //   birth_age_end: "",
    //   hight_start: "",
    //   hight_end: "",
    //   hight__lte: "",
    //   hight__gte: "",
    //   mother_tongue: "",
    //   education: "",
    //   occupation: "",
    //   is_approve: "",
    //   drinking: "",
    //   smoking: "",
    //   diet: "",
    //   created_at: "",
    //   amount__gte: "",
    //   amount__lte: "",
    //   lead_create_by__id: "",
    //   marital_status: "",
    //   is_personalized: "",

    // })
  }


  const handleCountryChange = (e) => {
    setCityName("");
    setStateName("");
    setPageNumber(1);
    queryParams.set("page", 1);
    setCountryName(e.target.value);
  };

  const handleStateChange = (e) => {
    setCityName("");
    setPageNumber(1);
    queryParams.set("page", 1);

    setStateName(e.target.value);
  };
  const handleCityName = (e) => {
    setCityName(e.target.value);
    queryParams.set("page", 1);
    setPageNumber(1);
  };
  const accessPermission =
    (StorageData?.getUserData() &&
      StorageData?.getUserData()?.permission) ||
    [];
  const checkMethod = loggedInStaffId && checkMethodsAndRouteBMS(accessPermission.content, "Read", "allData", window.location.pathname)
  const { data, isLoading: isLoadingData } = useQuery(
    ["bridengroomdata-listing", pageNumber, tabValue, limit, findYourMatch?.search, findYourMatch?.caste, countryName,
      stateName, findYourMatch?.is_personalized,
      cityName, findYourMatch?.profile_create_by, findYourMatch?.religion, findYourMatch?.gender, findYourMatch?.marital_status, findYourMatch?.date_of_birth__lte, findYourMatch?.date_of_birth__gte, findYourMatch?.hight__gte, findYourMatch?.hight__lte, findYourMatch?.mother_tongue, findYourMatch?.education, findYourMatch?.occupation, findYourMatch?.is_approve, findYourMatch?.annual_income, findYourMatch?.smoking, findYourMatch?.drinking, findYourMatch?.diet, findYourMatch?.created_at, findYourMatch?.amount__gte, findYourMatch?.lead_create_by__account_type, findYourMatch?.staff, findYourMatch?.lead_create_by__id, findYourMatch?.amount__lte, organizationId, franchiseId],
    () => {
      let queryParams = `?page=${pageNumber}&page_size=${limit}`;
      if (countryName) queryParams += `&country=${countryName}`;
      if (stateName) queryParams += `&state=${stateName}`;
      if (cityName) queryParams += `&city=${cityName}`;
      if (findYourMatch?.search) queryParams += `&search=${findYourMatch.search}`;
      if (findYourMatch?.profile_create_by) queryParams += `&profile_create_by=${findYourMatch.profile_create_by}`;
      if (findYourMatch?.religion) queryParams += `&religion=${findYourMatch.religion}`;
      if (findYourMatch?.caste) queryParams += `&caste=${findYourMatch.caste}`;
      if (findYourMatch?.gender) queryParams += `&gender=${findYourMatch.gender}`;
      if (findYourMatch?.marital_status) queryParams += `&marital_status=${findYourMatch.marital_status}`;
      if (findYourMatch?.date_of_birth__lte) queryParams += `&date_of_birth__lte=${findYourMatch.date_of_birth__lte}`;
      if (findYourMatch?.date_of_birth__gte) queryParams += `&date_of_birth__gte=${findYourMatch.date_of_birth__gte}`;
      if (findYourMatch?.hight__gte) queryParams += `&hight__gte=${findYourMatch.hight__gte}`;
      if (findYourMatch?.hight__lte) queryParams += `&hight__lte=${findYourMatch.hight__lte}`;
      if (findYourMatch?.mother_tongue) queryParams += `&mother_tongue=${findYourMatch.mother_tongue}`;
      if (findYourMatch?.education) queryParams += `&education=${findYourMatch.education}`;
      if (findYourMatch?.occupation) queryParams += `&occupation=${findYourMatch.occupation}`;
      if (findYourMatch?.is_approve) queryParams += `&is_approve=${findYourMatch.is_approve}`;
      if (findYourMatch?.annual_income) queryParams += `&annual_income=${findYourMatch.annual_income}`;
      if (findYourMatch?.drinking) queryParams += `&drinking=${findYourMatch.drinking}`;
      if (findYourMatch?.smoking) queryParams += `&smoking=${findYourMatch.smoking}`;
      if (findYourMatch?.diet) queryParams += `&diet=${findYourMatch.diet}`;
      if (findYourMatch?.created_at) queryParams += `&created_at=${findYourMatch.created_at}`;
      if (findYourMatch?.amount__gte) queryParams += `&amount__gte=${findYourMatch.amount__gte}`;
      if (findYourMatch?.amount__lte) queryParams += `&amount__lte=${findYourMatch.amount__lte}`;
      if (findYourMatch?.staff) queryParams += `&staff=${findYourMatch.staff}`;
      if (findYourMatch?.is_personalized) queryParams += `&is_personalized=${findYourMatch.is_personalized == "yes" ? true : false}`;
      if (findYourMatch?.lead_create_by__id) queryParams += `&lead_create_by__id=${findYourMatch.lead_create_by__id}`;
      if (organizationId && organizationId?.value) queryParams += `&tenant=${organizationId?.value}`;
      if (franchiseId && franchiseId?.value) queryParams += `&tenant=${franchiseId?.value}`;
      if (!checkMethod && loggedInStaffId) queryParams += `&staff=${loggedInStaffId}`;

      // if (findYourMatch?.lead_create_by) queryParams += `&lead_create_by=${findYourMatch.lead_create_by}`;
      if (findYourMatch?.lead_create_by__account_type) queryParams += findYourMatch.lead_create_by__account_type == "admin" ? `&lead_create_by=${false}` : `&lead_create_by__account_type=${findYourMatch.lead_create_by__account_type}`;
      if (tabValue) queryParams += `&${convertToQueryString(tabValue)}`;
      return BridenGroomServices.getBridenGroomAlls(queryParams)
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const total = Math.ceil(data?.data?.count / 10);
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

  const handleCurrentActiveIndex = (index, idx) => {
    setBrideGroomId(idx);
    // If the clicked index is the same as the currently opened one, close it
    if (currentInd === index) {
      setCurrentInd(null);
    } else {
      // Otherwise, open the clicked index
      setCurrentInd(index);
    }
  };

  useEffect(() => {
    setBrideGroomId("");
    setCurrentInd("0");
    setPageNumber(initialPage);
  }, [initialPage]);

  const handleNav = () => {
    navigate("/bridengroom/customer/add");
  };

  // update modal

  const [updateModal, setModalUpdate] = useState(false);
  const toggle = () => setModalUpdate(!updateModal);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to archive this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, archive it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // resetTimer()
        deleteBridenGroom.mutate({ id: id });
      }
    });
  };
  const handleMultiDelete = () => {
    Swal.fire({
      title: "Are you sure you want to archive all?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, archive it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // resetTimer()
        console.log("dddd", checkboxList);
        const sendData = {
          is_deleted: true,
          brideandgrooms: checkboxList?.map((ele) => ele?.brideandgroom),
        };

        multiDeleteBridenGroom.mutate(sendData);
      }
    });
  };
  const deleteBridenGroom = useMutation(
    (formdata) => {
      return BridenGroomServices.deleteBridenGroom(formdata);
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          title: "Successfull",
          text: "Deleted",
          icon: "success",
        });
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries(["bridengroomdata-listing", pageNumber]);
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        // alert(err?.response?.data?.error || err?.message);
      },
    }
  );
  const multiDeleteBridenGroom = useMutation(
    (formdata) => {
      return BridenGroomServices.multiDeleteBridenGroom(formdata);
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          title: "Successfull",
          text: /Archived/.test(activeTab)
            ? "Bride n Groom Reverted Successfully"
            : "Deleted",
          icon: "success",
        });
        setCheckBoxList([]);
        setSelectAll(false);
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries(["bridengroomdata-listing", pageNumber]);
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        // alert(err?.response?.data?.error || err?.message);
      },
    }
  );
  const handleRevertData = (id) => {
    Swal.fire({
      title: "Are you sure you want to revert data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, revert it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // resetTimer()
        // console.log("dddd", checkboxList);
        const sendData = {
          is_deleted: false,
          brideandgrooms: [id],
        };

        multiDeleteBridenGroom.mutate(sendData);
      }
    });
  };


  const handleMultiAssign = (e) => {
    const mybrideGroom = checkboxList?.map((each) => {
      return { ...each, id: each?.brideandgroom }
    })
    setBrideAndGroomId(mybrideGroom);
    settoggleAssignModel(true);
  };
  const handleMultiShare = (e) => {
    const mybrideGroom = checkboxList?.map((each) => {
      return { ...each, id: each?.brideandgroom }
    })
    setBrideAndGroomId(mybrideGroom);
    setShareModel(true);
  };


  const handleMultiRevertData = (id) => {
    Swal.fire({
      title: "Are you sure you want to revert data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, revert it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // resetTimer()
        // console.log("dddd", checkboxList);
        const sendData = {
          is_deleted: false,
          brideandgrooms: checkboxList?.map((ele) => ele?.brideandgroom),
        };

        multiDeleteBridenGroom.mutate(sendData);
      }
    });
  };

  // Function to toggle between tabs
  const toggleTab = (tab, value, name) => {
    if (activeTab !== name) {
      setTabValue(value);
      setPageNumber(1);
      queryParams.set("tab", name);
      queryParams.set("page", 1);
      setCurrentInd("0");
      navigate(`${location.pathname}?${queryParams.toString()}`);
      setActiveTab(name);
    }
  };

  const { data: shareData, isLoading: isShareDataLoad } = useQuery(
    ["bride-groom-data-shared", bridengroomId],
    () =>
      BridenGroomServices.getBridenGroomShareDataById(
        `?brideandgroom=${bridengroomId}`
      ),
    {
      enabled: !!bridengroomId,
      select: (data) => {
        const franchises = data?.data?.results?.filter(
          (each) => each?.tenant?.account_type == "franchise"
        );
        const organizations = data?.data?.results?.filter(
          (each) => each?.tenant?.account_type == "org"
        );
        return {
          franchise: franchises,
          organization: organizations,
        };
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


  const handleNavigate = (id) => {
    navigate("/bridengroom/customer/matchreport/" + btoa(id));
  };

  const handleLimit = (e) => {
    let value = e?.target?.value || 10;
    console.log(value);
    // Update the 'limit' query parameter in the URL
    queryParams.set("limit", value);
    setPageNumber(1);
    queryParams.set("page", 1);

    // Set the limit state
    setLimit(value);

    // Navigate to the updated URL with the new 'limit' query parameter
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  useEffect(() => {
    if (initialTabValue) {
      const findValue = tabs?.find((ele) => ele?.name == initialTabValue);
      setTabValue(findValue?.value);
    }
  }, [initialTabValue]);

  const AssignBrideandgroomMutation = useMutation(
    (formdata) => {
      return BridenGroomServices.assignbrideandgroom(formdata);
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          title: "Successfull",
          text: "Successfully personalized",
          icon: "success",
        });
        handleCloseAssignModel();
        setCheckBoxList([])

        // queryClient.invalidateQueries("subscription-organization");
      },
      onError: (err) => {
        let msg = err?.message;
        const erroBlankObj = err?.response?.data?.filter((each) => {
          return each['error']
        })




        if (erroBlankObj?.length) {
          const findDuplicateData = erroBlankObj.map((each) => {
            const firstName = each?.data?.user?.first_name || "";
            const lastName = each?.data?.user?.last_name || "";
            return `${firstName} ${lastName}`.trim();
          });

          msg = `${findDuplicateData.join(", ")} already shared. Please remove and try again.`;
          console.log(msg, "==="); // Optional: Log for debugging
          // setShareModel(false)
          // setToggleDuplicateDataModel(true)
          // setBrideAndGroomId(erroBlankObj);
          settoggleAssignModel(true);
          setDuplicateData(erroBlankObj)


          // handleDuplicateModelData(e, erroBlankObj)
          return

        }




        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
        });
        handleCloseAssignModel();

        // alert(err?.response?.data?.error || err?.message);
      },
    }
  );





  const handleSearchModel = (e) => {
    const name = e.target.name
    const value = e.target.value
    const prevValue = { ...findYourMatch }
    prevValue[name] = value

    if (name == "birth_age_start") {
      prevValue.birth_age_start = value
      prevValue.date_of_birth__lte = value && calculateDOB(value)


    }
    if (name == "birth_age_end") {
      prevValue.birth_age_end = value
      prevValue.date_of_birth__gte = value && calculateDOB(value)


    }
    if (name == "hight_start") {
      prevValue.hight_start = value
      prevValue.hight__gte = value


    }
    if (name == "hight_end") {
      prevValue.hight_end = value
      prevValue.hight__lte = value



    }
    if (name == "lead_create_by__account_type") {
      findYourMatch.lead_create_by__id = ""
      prevValue[name] = value
      setOrgFraType({})



    }



    setFindYourMatch(prevValue)


  }




  const { data: countryList, isLoading: isCountryLoad } = useQuery(
    ["all-country-list-dropdown-member-bride"],
    () => MasterServices.getCountryList(),
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
    ["all-state-list-member-bride", countryName],
    () =>
      MasterServices.getStateListByCountryWithFilter(
        `?country__iso3=${countryName}`
      ),
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
  const { data: cityListDropdown, isLoading: isCityLaod } = useQuery(
    ["all-city-list-member-bride", countryName, stateName],
    () =>
      MasterServices.getCityListByFilter(
        `?state__state_code=${stateName}&country__iso3=${countryName}`
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

  const ShareDataOrganizationFranchiseMutation = useMutation(
    (formdata) => ShareDataServices.ShareDataCreate(formdata),

    {
      onSuccess: (data) => {
        console.log("Data==>", data?.data);
        Swal.fire({
          title: "Successfull",
          text: "Data shared successfully ",
          icon: "success",
        });
        handleCloseShareDataModel()
        setCheckBoxList([])

        return;
      },
      onError: (err) => {
        console.log(err?.response, "================")
        let msg = err?.message;
        if (err?.response?.data?.errors) {
          // Case 1: When errors exist in the response
          msg = "Insufficient Balance";
        } else if (Array.isArray(err?.response?.data)) {
          // Case 2: When data is an array
          const erroBlankObj = err.response.data.filter((each) => each?.error);
          if (erroBlankObj?.length) {
            const findDuplicateData = erroBlankObj.map((each) => {
              const firstName = each?.data?.user?.first_name || "";
              const lastName = each?.data?.user?.last_name || "";
              return `${firstName} ${lastName}`.trim();
            });

            msg = `${findDuplicateData.join(", ")} already shared. Please remove and try again.`;
            console.log(msg, "==="); // Optional: Log for debugging

            // Update the state for handling duplicates
            setDuplicateData(erroBlankObj);

            // Optional: Toggle modals or perform further actions
            // setShareModel(false);
            // setToggleDuplicateDataModel(true);
            return; // Exit the function after handling this case
          }
        }

        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
        });
        // handleCloseShareDataModel()

        return;
      },
    }
  );


  const useOrgFranchiseDropDownList = (type) => {
    const {
      data,
      isLoading,

    } = useQuery(
      ["share-data-org-franchise-share-dropdown", type],
      () => {
        let queryParams = ""
        if (loggedInStaffId) queryParams += `staff=${loggedInStaffId}`
        if (type) queryParams += `&account_type=${type}`
        return ShareDataServices?.getOrganizationFrachiseList(queryParams)
      },
      {
        enabled: !!type,
        refetchOnWindowFocus: false,
        select: (data) => {
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
          // Swal.fire({
          //     title: "Error",
          //     text: err?.response?.data?.message || err?.message,
          //     icon: "error",
          // });
        },
      }
    );

    return { data, isLoading }
  }




  const handleSelectId = (e) => {
    setSelectId(e)
    setDuplicateData([])
    formik.setFieldValue("orgfranchiseId", e?.value)
  }




  const handleOrganization = (e) => {
    setSelectId(e)
    // setShareModel(true)

    setShareType({ name: "Organization", type: 'org' })
    setFranchiseId({ label: "Select Franchise", value: "" })
    setOrganizationId(e)
  }
  const handleFrachise = (e) => {
    setSelectId(e)
    // setShareModel(true)
    // handleMultiShare()
    setFranchiseId(e)
    setOrganizationId({ label: "Select Organization", value: "" })


    setShareType({ name: "Franchise", type: 'franchise' })

  }
  const { data: OrganizationList, isLoading: isLoadOrganization } = useOrgFranchiseDropDownList("org")
  const { data: FranchiseList, isLoading: isLoadFranchise } = useOrgFranchiseDropDownList("franchise")

  const isFromMemberPanel = false;






  // View Comment modal

  const loggedInUserId = StorageData.getUserData()?.staffId
  const isSuperUser = StorageData.getUserData()?.is_superuser
  const [toggleViewAddComment, setToggleViewAddComment] = useState(false);
  const today = moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(today)
  const [text, setText] = useState("");
  const [textErr, setTextErr] = useState("");
  const [editId, setEditId] = useState("")
  const [activityId, setActivityId] = useState("")
  const [AddCommentTab, setAddCommentTab] = useState(0);


  const handleDateFilter = (e) => {
    setDate(e?.target?.value)
  }

  const handleResetDateFilter = () => {
    setDate(today)
  }
  const handleViewAddComment = (e, id) => {
    queryClient.invalidateQueries("comment-listing");
    setId(id)
    setToggleViewAddComment(!toggleViewAddComment)
  };
  const handleCloseAddComment = () => {
    setToggleViewAddComment(false)
    setAddCommentTab(0)
    setEditId("")
    setText("")
    setTextErr("")
    setActivityId("")
    queryClient.invalidateQueries("comment-listing");
    queryClient.refetchQueries(["comment-listing", 1]);

  }

  // horizontal tab
  const toggleAddCommentTab = (id) => {
    if (AddCommentTab != id) {
      setAddCommentTab(id);
      id != 0 && setActivityId(id)
    }
  };


  const handleEditorChange = (e) => {
    setText(e.htmlValue);
  };




  const handleSubmit = () => {
    if (!!!text) {
      setTextErr("Required");
      return;
    }
    if (!activityId) {

      Swal.fire({
        title: "Error",
        text: "Activity required",
        icon: "error",
      });
      return;
    }

    const sendObj = {
      content: text,
      categoryoption: activityId,
      masterbrideandgroom: id,
      is_admin: false,
      masterstaff: null
    }
    if (loggedInUserId) {
      sendObj.masterstaff = loggedInUserId;
    } else {
      sendObj.is_admin = true;
    }
    if (editId) {
      sendObj.id = editId
      sendObj.categoryoption = activityId,
        UpdateComment?.mutate(sendObj)
      return
    }
    CommentModuleApi.mutate(sendObj)
  }






  const UpdateComment = useMutation(
    (formdata) => {
      return StaffServices.updateComment(formdata);
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          title: "Successfull",
          text: editId ? "Comment updated" : "Comment added ",
          icon: "success",
        });
        handleCloseAddComment()
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        // alert(err?.response?.data?.error || err?.message);
      },
    }
  );
  const CommentDelete = useMutation(
    (formdata) => {
      return StaffServices.deleteComment(formdata);
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          title: "Successfull",
          text: "Comment deleted ",
          icon: "success",
        });

        handleCloseAddComment()
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        // alert(err?.response?.data?.error || err?.message);
      },
    }
  );


  const CommentModuleApi = useMutation(
    (formdata) => {
      return StaffServices.addComment(formdata);
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          title: "Successfull",
          text: editId ? "Comment updated" : "Comment added ",
          icon: "success",
        });
        handleCloseAddComment()
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.error || err?.message,
          icon: "error",
        });
        // alert(err?.response?.data?.error || err?.message);
      },
    }
  );

  const handleDeleteComment = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // resetTimer()
        CommentDelete.mutate({ id: id });
      }
    });

  }

  const handleEditComment = (each) => {
    console.log(toggleAddCommentTab)
    !toggleViewAddComment && setToggleViewAddComment(true)
    setEditId(each?.id)
    setActivityId(each?.categoryoption?.id)
    setAddCommentTab(each?.categoryoption?.id)
    setText(each?.content)
  }





  const brideandGroomPermission = PermissionSets.bridengroom.bridengroomListing

  const keys = Object.keys(brideandGroomPermission);
  const brideandGroomReadPermission = Object.keys(brideandGroomPermission.Share);

  return (
    <>
      <Wrapper>
        {
          <div className="view-profile-wrapper">
            <div className="view-profile-head">
              <div className="d-flex flex-wrap">
                <div className="profile-headleft">
                  <ul>
                    {
                      <li className="select-all">
                        <FormGroup>
                          <Input
                            id="select-all"
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                          <Label for="select-all">Select All</Label>
                        </FormGroup>
                      </li>
                    }
                    {/* <li className="delete-btn">
                      <Button className="btn btn-outline-style1">
                        <RiDeleteBin6Line />
                      </Button>
                    </li>
                    <li className="like-btn">
                      <Button className="btn green-btn">
                        <AiOutlineLike />
                      </Button>
                    </li>
                    <li className="dislike-btn">
                      <Button className="btn btn-outline-style1">
                        <AiOutlineDislike />
                      </Button>
                    </li>
                    <li className="suspended-member-btn">
                      <Button className="btn orange-btn">
                        <LiaUserTimesSolid />
                      </Button>
                    </li>
                    <li className="personalized-btn">
                      <Button className="btn blue-btn">
                        <GiHumanTarget />
                      </Button>
                    </li> */}
                    {!isLoadingData && data?.data?.count > 10 && (
                      <li className="select-show">
                        <Input
                          id=""
                          type="select"
                          value={limit}
                          onChange={(e) => handleLimit(e)}
                        >
                          <option value={10}>10</option>
                          <option value={15}> 15</option>
                          <option value={20}> 20</option>
                          <option value={25}> 25</option>
                          <option value={30}> 30</option>
                          <option value={100}> 100</option>
                        </Input>
                      </li>
                    )}
                    <li>
                      <FormGroup className="common-formgroup mb-0 mb-md-0">
                        {isLoadOrganization ? <ButtonLoader /> : <Select
                          className="basic-single"
                          classNamePrefix="select"

                          isDisabled={isLoadOrganization}
                          isLoading={isLoadOrganization}
                          options={[{ label: "Select Organization", value: "" }, ...OrganizationList?.map((each) => { return { label: each?.name, value: each?.id } })]}
                          onChange={handleOrganization}
                          value={organizationId}
                          placeholder="Select  Organization"
                        />}

                      </FormGroup>
                    </li>
                    <li>
                      <FormGroup className="common-formgroup mb-0 mb-md-0">
                        {isLoadFranchise ? <ButtonLoader /> : <Select
                          className="basic-single"
                          classNamePrefix="select"

                          isDisabled={isLoadFranchise}
                          isLoading={isLoadFranchise}
                          options={[{ label: "Select Franchise", value: "" }, ...FranchiseList?.map((each) => { return { label: each?.name, value: each?.id } })]}
                          onChange={handleFrachise}
                          value={franchiseId}
                          placeholder="Select Frachise"
                        />}

                      </FormGroup>
                    </li>
                  </ul>
                </div>

                {/* <Row className="mt-2">
                  <Col xs="12" md="12" lg="12">
                    <FormGroup className="common-formgroup">
                      <Label>Organization</Label>
                      {isLoadOrganization ? <ButtonLoader /> : <Select
                        className="basic-single"
                        classNamePrefix="select"

                        isDisabled={isLoadOrganization}
                        isLoading={isLoadOrganization}
                        options={[{ label: "Select Organization", value: "" }, ...OrganizationList?.map((each) => { return { label: each?.name, value: each?.id } })]}
                        onChange={handleOrganization}
                        value={organizationId}
                        placeholder="Select  Organization"
                      />}

                    </FormGroup>
                  </Col>
                  <Col xs="12" md="12" lg="12">
                    <FormGroup className="common-formgroup">
                      <Label>Franchise</Label>
                      {isLoadFranchise ? <ButtonLoader /> : <Select
                        className="basic-single"
                        classNamePrefix="select"

                        isDisabled={isLoadFranchise}
                        isLoading={isLoadFranchise}
                        options={[{ label: "Select Organization", value: "" }, ...FranchiseList?.map((each) => { return { label: each?.name, value: each?.id } })]}
                        onChange={handleFrachise}
                        value={franchiseId}
                        placeholder="Select Frachise"
                      />}

                    </FormGroup>
                  </Col>
                </Row> */}
                <div className="profile-headright">
                  <ul>
                    <IsAccessibleMethodBMS
                      method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Create)[0]}
                      route={window.location.pathname}
                      name={"Create"}

                    >
                      <li className="add-btn-wrap">
                        <Button className="btn btn-style1" onClick={handleNav}>
                          {" "}
                          Add <FiPlus />
                        </Button>
                      </li>
                    </IsAccessibleMethodBMS>

                    {toggleFilter ? <li className="filter-btn-wrap">
                      <Button
                        className="btn btn-outline-style1" onClick={handleCloseFilter}

                      >
                        {" "}
                        Filter <IoMdClose />
                      </Button>
                    </li> : <li className="filter-btn-wrap">
                      <Button
                        className="btn btn-outline-style1"
                        onClick={handleCloseFilter}
                      >
                        {" "}
                        Filter <VscFilter />
                      </Button>
                    </li>}
                  </ul>
                </div>
              </div>
            </div>

            {toggleFilter && (
              <BrideandGroomFilter loggedInStaffId={loggedInStaffId} setOrgFraType={setOrgFraType} selectOrgFracType={selectOrgFracType} countryList={countryList} isCountryLoad={isCountryLoad} stateListDropdown={stateListDropdown} isLoadState={isLoadState} cityListDropdown={cityListDropdown} isCityLaod={isCityLaod} handleCityName={handleCityName} handleCountryChange={handleCountryChange} handleStateChange={handleStateChange} findYourMatch={findYourMatch} handleSearchModel={handleSearchModel} countryName={countryName} cityName={cityName} stateName={stateName} handleResetFilter={handleResetFilter} />
            )}

            <div className="selected-append-box text-end mt-3">
              <ul className="d-flex flex-wrap justify-content-end gap-2">
                {checkboxList?.length !== 0 && !/Archived/.test(activeTab) && (
                  <>
                    <IsAccessibleMethodBMS
                      method={Object.keys(PermissionSets.bridengroom.bridengroomListing.staffAssign)[0]}
                      route={window.location.pathname}
                      name={"staffAssign"}

                    >

                      {!userData?.role?.code !== config.staffRoleExecutive && <li>
                        <Button
                          disabled={AssignBrideandgroomMutation?.isLoading}
                          className="btn purple-btn mb-2 ms-2"
                          onClick={handleMultiAssign}
                        >
                          {AssignBrideandgroomMutation?.isLoading ? (
                            <ButtonLoader />
                          ) : (
                            <>{"Staff Assign"}</>
                          )}
                        </Button>
                      </li>}
                    </IsAccessibleMethodBMS>
                    <IsAccessibleMethodBMS
                      method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Share)[0]}
                      route={window.location.pathname}
                      name={"Share"}

                    >
                      {(activeTab != "All" && activeTab != "Leads") && <li>
                        <Button
                          disabled={ShareDataOrganizationFranchiseMutation?.isLoading}
                          className="btn green-btn mb-2 ms-2"
                          onClick={handleMultiShare}
                        >
                          {ShareDataOrganizationFranchiseMutation?.isLoading ? (
                            <ButtonLoader />
                          ) : (
                            <> {"Share "}<FiShare2 /></>
                          )}
                        </Button>
                      </li>}
                    </IsAccessibleMethodBMS>
                    <IsAccessibleMethodBMS
                      method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Delete)[0]}
                      route={window.location.pathname}
                      name={"Delete"}

                    >
                      <li>
                        <Button
                          disabled={multiDeleteBridenGroom?.isLoading}
                          className="btn btn-outline-style1 mb-2 ms-2"
                          onClick={handleMultiDelete}
                        >
                          {multiDeleteBridenGroom?.isLoading ? (
                            <ButtonLoader />
                          ) : (
                            <>{"Archive"} <MdOutlineArchive /></>
                          )}
                        </Button>
                      </li>
                    </IsAccessibleMethodBMS>
                  </>
                )}
                {checkboxList?.length !== 0 && /Archived/.test(activeTab) && (
                  <IsAccessibleMethodBMS
                    method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Revert)[0]}
                    route={window.location.pathname}
                    name={"Revert"}

                  >
                    <li>
                      <Button
                        disabled={multiDeleteBridenGroom?.isLoading}
                        className="btn btn-style1 mb-2 ms-2"
                        onClick={handleMultiRevertData}
                      >
                        {multiDeleteBridenGroom?.isLoading ? (
                          <ButtonLoader />
                        ) : (
                          "Revert All"
                        )}
                      </Button>
                    </li>
                  </IsAccessibleMethodBMS>

                )}
              </ul>
            </div>

            {/* {filterValue == "online" ? (
              <OnlineMembers />
            ) : filterValue == "advance" ? (
              <MemberAdvanceSearch />
            ) : filterValue == "plan" ? (
              <PlanwisePaidMembers />
            ) : filterValue == "personalized" ? (
              <PersonalizedMember />
            ) : filterValue == "activetopaid" ? (
              <MemberActiveToPaid />
            ) : filterValue == "paidfeature" ? (
              <MemberPaidToFeatured />
            ) : filterValue == "lapsedmembership" ? (
              <LapsedMembership />
            ) : filterValue == "upgrade" ? (
              <UpgradeDowngradePlan />
            ) : filterValue == "lapsedmembership" ? (
              <LapsedMembership />
            ) : filterValue == "countrywisemember" ? (
              <CountryWiseMembers />
            ) : filterValue == "homepagemember" ? (
              <HomePageMembers />
            ) : filterValue == "membershiphold" ? (
              <MembershipOnHold />
            ) : filterValue == "searchpendingprofilemember" ? (
              <SearchPendingProfileMembers />
            ) : filterValue == "deleteprofile" ? (
              <DeleteProfileRequest />
            ) : filterValue == "inquirymember" ? (
              <InquiryMembers />
            ) : ( */}
            <>
              <div className="view-profile-tab-wrap">
                <Nav tabs>
                  {tabs?.map((ele) => {
                    return (
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === ele?.name,
                          })}
                          onClick={() =>
                            toggleTab(ele?.id, ele?.value, ele?.name)
                          }
                        >
                          {ele?.name} ({activeTab == ele?.name && data?.data?.count || 0})
                        </NavLink>
                      </NavItem>
                    );
                  })}
                </Nav>
              </div>

              <div className="view-profile-wrap">
                {isLoadingData ? (
                  <Loader />
                ) : data?.data?.results?.length == 0 ? (
                  <NoActiveDataFound msg={"No Data Found"} />
                ) : (
                  data?.data?.results?.map((each, index) => {
                    const isChecked = checkboxList.some(
                      (user) => user.brideandgroom === each.id
                    );
                    return (
                      <div
                        className={
                          currentInd === index
                            ? "view-profile-list open"
                            : "view-profile-list"
                        }
                      >
                        <div className="view-profile-content">
                          <div className="profile-img-wrap">
                            {
                              <div className="checkbox">
                                <FormGroup>
                                  <Input
                                    id="select-all"
                                    type="checkbox"
                                    checked={isChecked}
                                    onClick={(e) =>
                                      handleCheckedUser(e, each?.id)
                                    }
                                  />
                                </FormGroup>
                              </div>
                            }
                            <div className="profile-img-box online">
                              <div className="profile-img">
                                <img
                                  className="img-fluid"
                                  src={
                                    each?.photos?.length > 0
                                      ? `${config.apiUrl}${each?.photos[0]?.upload_url}`
                                      : profileUser
                                  }
                                  alt=""
                                />
                                <div className="profile-hover">
                                  <Link to="/">
                                    <IoImagesOutline />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="profile-details-wrap">
                            <div className="profile-details-top">
                              <Row>
                                <Col
                                  md="12"
                                  lg="12"
                                  xl="4"
                                  xxl="4"
                                  className="mb-3 mb-xxl-0"
                                >
                                  <div className="profile-name-wrap">
                                    {/* <Link
                                    to={
                                      "/bridengroom/customer/" + btoa(each?.id)
                                    }
                                  > */}
                                    <h3>
                                      {each?.user?.first_name || ""}{" "}
                                      {each?.user?.last_name || ""}
                                      {each?.is_premium && (
                                        <span
                                          className="premium-tag"
                                          style={{
                                            color: "#ea8c21",
                                            fontSize: "20px",
                                          }}
                                        >
                                          {" "}
                                          <GiQueenCrown />
                                        </span>
                                      )}
                                      {each?.is_approve && (
                                        <span
                                          className="premium-tag"
                                          style={{
                                            color: "#ea8c21",
                                            fontSize: "20px",
                                          }}
                                        >
                                          {" "}
                                          <MdVerified />
                                        </span>
                                      )}
                                    </h3>

                                    <h5>
                                      <div className="member-code">
                                        {" "}
                                        {each?.code || "N/A"}
                                      </div>
                                    </h5>
                                    {/* </Link> */}
                                    {each?.lead_create_by?.account_type ==
                                      "org" ? (
                                      <Button className="btn orange-btn me-2 mb-2">
                                        {each?.lead_create_by?.domain_name ||
                                          each?.lead_create_by?.host}
                                      </Button>
                                    ) : each?.lead_create_by?.account_type ==
                                      "franchise" ? (
                                      <Button className="btn orange-btn me-2 mb-2">
                                        {each?.lead_create_by?.name
                                          ? [
                                            each.lead_create_by.name,
                                            " ",
                                            <FaFlag key="flag" />,
                                          ]
                                          : "N/A"}
                                      </Button>
                                    ) : null}
                                    <h5>
                                      {
                                        each?.is_approve
                                          ? each?.amount ? `C$ ${each.amount}` : "Ca$ 0"
                                          : each?.lead_create_by && (
                                            <>
                                              Asking amount {each?.lead_create_by?.user?.first_name || ""}{" "}
                                              {each?.lead_create_by?.user?.last_name || ""}{" "}
                                              {each?.amount ? `C$ ${each.amount}` : "Ca$ 0"}
                                            </>
                                          )
                                      }
                                    </h5>

                                    <IsAccessibleMethodBMS
                                      method={Object.keys(PermissionSets.bridengroom.bridengroomListing.MatchReport)[0]}
                                      route={window.location.pathname}
                                      name={"MatchReport"}

                                    >

                                      <Button
                                        className="btn blue-btn me-2 mb-2"
                                        onClick={() => handleNavigate(each?.id)}
                                      >
                                        Match Report
                                      </Button>
                                    </IsAccessibleMethodBMS>
                                    <IsAccessibleMethodBMS
                                      method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Message)[0]}
                                      route={window.location.pathname}
                                      name={"Message"}

                                    >

                                      {/* <Button className="btn green-btn me-2 mb-2"> */}
                                      <a
                                        className="btn green-btn me-2 mb-2"
                                        target="_sb"
                                        href={`https://wa.me/${each?.phone}`}
                                      >
                                        <img
                                          className="img-fluid"
                                          src={whatsappIcon}
                                          alt=""
                                        />
                                        Message
                                      </a >
                                    </IsAccessibleMethodBMS>
                                    {/* </Button> */}
                                    {/* <Button
                                        className="btn purple-btn me-2 mb-2"
                                        onClick={(e) =>
                                          handleAssignModel(e, each?.id)
                                        }
                                      >
                                        Personalized
                                      </Button> */}
                                  </div >
                                  {each?.interest_type && (
                                    <div className="interest mt-4">
                                      <span className="interest-name">
                                        Interest{" "}
                                      </span>{" "}
                                      <span
                                        className={
                                          each?.interest_type
                                            ? "interest-color text-capitalize " +
                                            each?.interest_type
                                            : "interest-color orange"
                                        }
                                      >
                                        {each?.interest_type || ""}
                                      </span>
                                    </div>
                                  )}
                                </Col >

                                <Col
                                  md="12"
                                  lg="6"
                                  xl="4"
                                  xxl="4"
                                  className="mb-3 mb-xxl-0"
                                >
                                  <div className="profile-status-wrap">
                                    <p>
                                      <span>Status :</span> N/A
                                    </p>
                                    <p>
                                      <span>Marital Status :</span>{" "}
                                      {each?.marital_status || ""}
                                    </p>
                                    <p>
                                      <span>Religion :</span>{" "}
                                      {each?.religion || ""}
                                    </p>
                                    <p>
                                      <span>Location :</span>{" "}
                                      {each?.country || ""}
                                    </p>
                                  </div>
                                </Col>
                                <IsAccessibleMethodBMS
                                  method={"credential"}
                                  route={window.location.pathname}
                                  name={"Read"}

                                >
                                  <Col
                                    md="12"
                                    lg="6"
                                    xl="4"
                                    xxl="4"
                                    className="mb-3 mb-xxl-0"
                                  >
                                    <div className="profile-contact-wrap">
                                      <div className="contact-list">
                                        <div className="icon">
                                          <LuMailOpen />
                                        </div>
                                        <div className="info">
                                          <p>
                                            <a
                                              href={`mailto:${each?.user?.email}`}
                                            >
                                              {each?.user?.email || ""}
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="contact-list">
                                        <div className="icon">
                                          <IoCallOutline />
                                        </div>
                                        <div className="info">
                                          <p>
                                            <a
                                              href={`tel:${each?.phone_code}${each?.phone}`}
                                            >
                                              {each?.phone_code} {each?.phone}
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </Col>
                                </IsAccessibleMethodBMS>
                              </Row >
                            </div >
                            <div className="profile-details-bottom">
                              <Row>
                                <Col
                                  md="12"
                                  lg="12"
                                  xl="6"
                                  xxl="4"
                                  className="mb-3"
                                >
                                  <div className="profile-info-list">
                                    <h4>
                                      <span>Next Followup :</span> N/A{" "}
                                    </h4>
                                  </div>
                                </Col>
                                <Col
                                  md="12"
                                  lg="12"
                                  xl="6"
                                  xxl="4"
                                  className="mb-3"
                                >
                                  <div className="profile-info-list">
                                    <h4>
                                      <span>Registered On: </span>{" "}
                                      {moment(each?.createdAt).format("ll")}
                                    </h4>
                                  </div>
                                </Col>
                                <Col
                                  md="12"
                                  lg="12"
                                  xl="6"
                                  xxl="4"
                                  className="mb-3"
                                >
                                  <div className="profile-info-list">
                                    <h4>
                                      <span>Assigned To : </span> Not Assigned{" "}
                                    </h4>
                                  </div>
                                </Col>
                                <Col
                                  md="12"
                                  lg="12"
                                  xl="6"
                                  xxl="4"
                                  className="mb-3"
                                >
                                  <div className="profile-info-list">
                                    <h4>
                                      <span>Plan Name : </span> N/A{" "}
                                    </h4>
                                  </div>
                                </Col>
                                <Col
                                  md="12"
                                  lg="12"
                                  xl="6"
                                  xxl="4"
                                  className="mb-3"
                                >
                                  <div className="profile-info-list">
                                    <h4>
                                      <span>Plan Activated On: </span> N/A{" "}
                                    </h4>
                                  </div>
                                </Col>
                                <Col
                                  md="12"
                                  lg="12"
                                  xl="6"
                                  xxl="4"
                                  className="mb-3"
                                >
                                  <div className="profile-info-list">
                                    <h4>
                                      <span>Plan Expired On: </span> N/A{" "}
                                    </h4>
                                  </div>
                                </Col>
                                <Col
                                  md="12"
                                  lg="12"
                                  xl="12"
                                  xxl="12"
                                  className="mb-3"
                                >

                                  {!isShareDataLoad &&
                                    shareData?.franchise?.length == 0 &&
                                    shareData?.organization.length == 0 ? (
                                    <p>
                                      Data not shared with any
                                      organization/franchise
                                    </p>
                                  ) : (
                                    <>
                                      {!isShareDataLoad &&
                                        shareData?.franchise?.length > 0 && (
                                          <div className="profile-org-franchise-wrap border-0 pt-0">
                                            <div className="profile-org-franchise-title">
                                              <h4>Franchise</h4>
                                            </div>
                                            <div className="profile-org-franchise-list-wrap">
                                              <ul>
                                                {!isShareDataLoad &&
                                                  shareData?.franchise?.map(
                                                    (each) => {
                                                      return (
                                                        <li>
                                                          {each?.tenant
                                                            ?.name || ""}
                                                        </li>
                                                      );
                                                    }
                                                  )}
                                              </ul>
                                            </div>
                                          </div>
                                        )}
                                      {!isShareDataLoad &&
                                        shareData?.organization.length >
                                        0 && (
                                          <div className="profile-org-franchise-wrap border-top-0">
                                            <div className="profile-org-franchise-title">
                                              <h4>Organization</h4>
                                            </div>
                                            <div className="profile-org-franchise-list-wrap">
                                              <ul>
                                                {!isShareDataLoad &&
                                                  shareData?.organization?.map(
                                                    (each) => {
                                                      return (
                                                        <li>
                                                          {each?.tenant
                                                            ?.name || ""}
                                                        </li>
                                                      );
                                                    }
                                                  )}
                                              </ul>
                                            </div>
                                          </div>
                                        )}
                                    </>
                                  )}
                                </Col>
                              </Row>
                            </div>
                          </div >
                          <div className="profile-button-wrap">
                            <ul>
                              {!/Archived/.test(activeTab) && (
                                <>
                                  <li>
                                    <Button className="btn dark-blue-btn">
                                      {" "}
                                      <FiPlus />
                                    </Button>
                                  </li>
                                  {/* <li>
                                    <Button className="btn yellow-btn">
                                      {" "}
                                      <FaRegComments />
                                    </Button>
                                  </li> */}
                                  <IsAccessibleMethodBMS
                                    method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Update)[0]}
                                    route={window.location.pathname}
                                    name={"Update"}

                                  >
                                    <li>
                                      <Button className="btn light-green-btn">
                                        {" "}
                                        <AiOutlineEdit />{" "}
                                      </Button>
                                    </li>
                                  </IsAccessibleMethodBMS>
                                  {/* <li>
                                    <Button className="btn blue-btn">
                                      {" "}
                                      <BiMessageDetail />{" "}
                                    </Button>
                                  </li> */}
                                  <IsAccessibleMethodBMS
                                    method={Object.keys(PermissionSets.bridengroom.bridengroomListing.staffAssign)[0]}
                                    route={window.location.pathname}
                                    name={"staffAssign"}

                                  >
                                    {(userData?.role?.code !== config.staffRoleExecutive) && <li>
                                      <Button
                                        className="btn purple-btn me-2 mb-2"
                                        onClick={(e) =>
                                          handleAssignModel(e, each)
                                        }
                                      >
                                        <FaUserTie />

                                      </Button>
                                    </li>}
                                  </IsAccessibleMethodBMS>
                                  <IsAccessibleMethodBMS
                                    method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Comment)[0]}
                                    route={window.location.pathname}
                                    name={"Comment"}

                                  >
                                    <li>
                                      <Button className="btn blue-btn" onClick={(e) => handleViewAddComment(e, each?.id)}><BiMessageDetail /></Button>
                                    </li>
                                  </IsAccessibleMethodBMS>
                                  {each?.is_approve && <li>
                                    <IsAccessibleMethodBMS
                                      method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Share)[0]}
                                      route={window.location.pathname}
                                      name={"Share"}

                                    >
                                      <Button
                                        className="btn purple-btn me-2 mb-2"
                                        onClick={(e) =>
                                          handleShareModel(e, each)
                                        }
                                      >
                                        <FaShare />

                                      </Button>
                                    </IsAccessibleMethodBMS>
                                  </li>



                                  }
                                  <IsAccessibleMethodBMS
                                    method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Delete)[0]}
                                    route={window.location.pathname}
                                    name={"Delete"}

                                  >
                                    <li>
                                      <Button
                                        className="btn btn-outline-style1"
                                        disabled={
                                          deleteBridenGroom?.isLoading
                                        }
                                        onClick={() => handleDelete(each?.id)}
                                      >
                                        {" "}
                                        {deleteBridenGroom?.isLoading ? (
                                          <ButtonLoader />
                                        ) : (
                                          <FaFileArchive />
                                        )}{" "}
                                      </Button>
                                    </li>
                                  </IsAccessibleMethodBMS>


                                </>
                              )}
                              {!/Archived/.test(activeTab) &&
                                !each?.is_approve ? (
                                <li>
                                  <Button
                                    className="btn orange-btn"
                                    onClick={() =>
                                      navigate(
                                        "/bridengroom/customer/" +
                                        btoa(each?.id) +
                                        "?details=" +
                                        btoa("leads")
                                      )
                                    }
                                  >
                                    {" "}
                                    <AiOutlineEye />{" "}
                                  </Button>
                                </li>
                              ) : (
                                !/Archived/.test(activeTab) && (
                                  <li>
                                    <Button
                                      className="btn orange-btn"
                                      onClick={() =>
                                        navigate(
                                          "/bridengroom/customer/" +
                                          btoa(each?.id) +
                                          "?details=" +
                                          btoa("approve")
                                        )
                                      }
                                    >
                                      {" "}
                                      <AiOutlineEye />{" "}
                                    </Button>
                                  </li>
                                )
                              )}
                              {/Archived/.test(activeTab) && (
                                <IsAccessibleMethodBMS
                                  method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Revert)[0]}
                                  route={window.location.pathname}
                                  name={"Revert"}

                                >
                                  <li>
                                    <Button
                                      type="click"
                                      className="btn green-btn"
                                      onClick={() =>
                                        handleRevertData(each?.id)
                                      }
                                    >
                                      {" "}
                                      <GrUpdate />{" "}
                                    </Button>
                                  </li>
                                </IsAccessibleMethodBMS>
                              )}
                            </ul>
                          </div>
                        </div >
                        <div className="profile-toggle-button">
                          <Button
                            className="profile-toggle-btn"
                            onClick={() =>
                              handleCurrentActiveIndex(index, each?.id)
                            }
                          >
                            <IoIosArrowDown />
                          </Button>
                        </div>
                      </div >
                    );
                  })
                )}
              </div >
            </>


            {!isLoadingData && data?.data?.results?.length > 0 && (
              <Pagination count={data?.data?.count} pageSize={limit} />
            )}
          </div >
        }
      </Wrapper >


      {/* Add Comment modal */}
      <CommentModule isFromMemberPanel={isFromMemberPanel} loggedInUserId={loggedInUserId} isSuperUser={isSuperUser} AddCommentTab={AddCommentTab} toggleAddCommentTab={toggleAddCommentTab} date={date} toggleViewAddComment={toggleViewAddComment} handleViewAddComment={handleViewAddComment} handleResetDateFilter={handleResetDateFilter} handleSubmit={handleSubmit} setTextErr={setTextErr} text={text} textErr={textErr} setText={setText} handleEditorChange={handleEditorChange} CommentModuleApi={CommentModuleApi} UpdateComment={UpdateComment} handleDelete={handleDelete} handleEditComment={handleEditComment} brideandgroom={id} handleDeleteComment={handleDeleteComment} editId={editId} />

      <AssignModel
        teamExecutive={teamExecutive}
        setTeamExecutive={setTeamExecutive}
        teamExecutiveErr={teamExecutiveErr}
        setTeamExecutiveErr={setTeamExecutiveErr}
        teamHead={teamHead}
        setTeamHead={setTeamHead}
        teamHeadErr={teamHeadErr}
        setTeamHeadErr={setTeamHeadErr}
        toggleAssignModel={toggleAssignModel}
        handleAssignModel={handleAssignModel}
        handleCloseAssignModel={handleCloseAssignModel}
        brideandgroom={brideandGroomId}
        AssignBrideandgroomMutation={AssignBrideandgroomMutation}
        setDuplicateData={setDuplicateData}
        duplicateDataList={duplicateData || []}
        setBrideAndGroomId={setBrideAndGroomId}
        setCheckBoxList={setCheckBoxList}


      />
      <ShareDataModel
        ShareDataModel={ShareDataModel}
        handleShareModel={handleShareModel}
        toggleShareModel={toggleShareModel}
        handleCloseShareDataModel={handleCloseShareDataModel}
        brideandgroom={brideandGroomId}
        ShareDataOrganizationFranchiseMutation={ShareDataOrganizationFranchiseMutation}
        setShareType={setShareType}
        shareType={shareType}
        duplicateDataList={duplicateData || []}
        handleDuplicateModelData={handleDuplicateModelData}
        setDuplicateData={setDuplicateData}
        setBrideAndGroomId={setBrideAndGroomId}
        setCheckBoxList={setCheckBoxList}
        selectId={selectId}
        handleSelectId={handleSelectId

        }
        isdropdownIsBeenActive={organizationId && organizationId?.value}
        setShowErr={setShowErr}
        showErr={showErr}
        setSelectId={setSelectId}


      />



    </>
  );
};

export default ViewProfile;
