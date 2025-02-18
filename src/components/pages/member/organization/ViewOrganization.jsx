import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  Row,
  Table,
  NavLink as NavLinkReact,
} from "reactstrap";
import { VscFilter } from "react-icons/vsc";

import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";
import Wrapper from "../../../layouts/Wrapper";
import AddOrganization from "./AddOrganization";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MemberServices from "../../../../services/MemberServices";
import ValidateAuthenticationKey from "../../../../utils/ValidationAuthenticationKey";
import Loader from "../../../../utils/Loader/Loader";
import Pagination from "../../../../utils/Pagination";
import { FiPlus } from "react-icons/fi";
import { TbFilterPause, TbXboxXFilled } from "react-icons/tb";
import {
  LiaCheckCircle,
  LiaEdit,
  LiaExchangeAltSolid,
  LiaUndoAltSolid,
} from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import Organization from "../../../../assets/images/organization-avatar-img.jpg";
import NoImageFound from "../../../../utils/NoImageFound";
import config from "../../../../../config";
import Swal from "sweetalert2";
import { TiTick } from "react-icons/ti";
import { FaCheck, FaComment, FaEye, FaRegComments, FaUserTie } from "react-icons/fa";
import countries from "../../../../utils/CountryList";
import { FcAndroidOs } from "react-icons/fc";
import { FaAppStoreIos } from "react-icons/fa";
import { SiConvertio, SiPostman } from "react-icons/si";
import profileUser from "../../../../assets/images/no-images-available.jpg";
import { LuMailOpen } from "react-icons/lu";
import {
  IoCallOutline,
  IoClose,
  IoCloseSharp,
  IoImagesOutline,
} from "react-icons/io5";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { IoIosArrowDown, IoMdCheckmark, IoMdClose } from "react-icons/io";
import whatsappIcon from "../../../../assets/images/whatsapp-icon.svg";
import { MdBlockFlipped, MdVerified } from "react-icons/md";
import ButtonLoader from "../../../../utils/Loader/ButtonLoader";
import classnames from "classnames";
import NoActiveDataFound from "../../../../utils/NoActiveDataFound";
import ConvertToFranchise from "./ConvertToFranchise";
import { GrUpdate } from "react-icons/gr";
import MasterServices from "../../../../services/MasterServices";
import PermissionSets from "../../../../guard/Method";
import { checkMethodsAndRouteBMS, IsAccessibleMethod, IsAccessibleMethodBMS } from "../../../../guard/Rbac";
import MemberSectionFilter from "../MemberSectionFilter";
import StorageData from "../../../../helper/storagehelper/StorageData";
import CommentModule from "../../../../utils/CommentModule";
import moment from "moment";
import StaffServices from "../../../../services/StaffServices";
import BridenGroomServices from "../../../../services/BridenGroomServices";
import AssignModel from "../../bride&groom/bridengroomListing/AssignModel";
import customContext from "../../../../contexts/Context";

const ViewOrganization = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentInd, setCurrentInd] = useState("0");
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [checkboxList, setCheckBoxList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [id, setId] = useState("")

  // Extract initial page from query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialLimit = useMemo(
    () => parseInt(queryParams.get("limit")) || 10,
    [parseInt(queryParams.get("limit"))]
  );
  const initialTabValue = queryParams.get("tab");

  const [limit, setLimit] = useState(initialLimit || 10);
  const [tabValue, setTabValue] = useState("");
  const [activeTab, setActiveTab] = useState(initialTabValue || "All");
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [searchValue, setSearchValue] = useState({
    search: "",
    is_verified: false,
    subscription: false,
    subscription__name: "",

  })
  const { loggedInStaffId } = customContext()

  const tabs = [
    {
      id: 1,
      value: {},
      name: "All",
    },
    {
      id: 2,
      value: { is_active: 1 },
      name: "Active",
    },
    {
      id: 3,
      value: { is_active: 0 },
      name: "Deactive",
    },
    {
      id: 3,
      value: { is_deleted: true },
      name: "Archived",
    },
  ];

  const [memberId, setMemberId] = useState([]);
  const [toggleAssignModel, settoggleAssignModel] = useState(false);


  const [teamExecutive, setTeamExecutive] = useState(false)
  const [teamExecutiveErr, setTeamExecutiveErr] = useState(false)
  const [teamHead, setTeamHead] = useState(false)
  const [teamHeadErr, setTeamHeadErr] = useState("")


  // Function to convert tabValue object to query string
  const convertToQueryString = (params) => {
    console.log("Params", params);
    if (params.hasOwnProperty("is_deleted")) {
      return `is_deleted=${true}`;
    }

    return Object.entries(params)
      .map(([key, value]) => `user__is_active=${value}`)
      .join("&");
  };

  const handleDelete = (id) => {
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
        deleteOrganization.mutate(id);
      }
    });
  };

  const deleteOrganization = useMutation(
    (formdata) => {
      return MemberServices.deleteOrganization(formdata);
    },
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        // alert("Created Successfully")
        Swal.fire({
          title: "Successfull",
          text: "Deleted",
          icon: "success",
        });
        setCheckBoxList([]);
        setSelectAll(false);
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries("member-organization");
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
  const handleStatusChange = (id, active) => {
    Swal.fire({
      title: active
        ? "Are you sure want to Deactive organization"
        : "Are you sure want to Active organization",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // resetTimer()
        statusChangeOrganization.mutate({ id, is_active: !active });
      }
    });
  };

  const statusChangeOrganization = useMutation(
    (formdata) => {
      return MemberServices.statusChangeUserOrganization(formdata);
    },
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        // alert("Created Successfully")
        setCheckBoxList([]);
        setSelectAll(false);
        Swal.fire({
          title: "Successfull",
          text: "Updated Successfully",
          icon: "success",
        });
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries("member-organization");
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

  const handleNav = () => {
    navigate("/member/organization/add");
    // setShowForm(true);
    // clearQueryParams()
  };

  const accessPermission =
    (StorageData?.getUserData() &&
      StorageData?.getUserData()?.permission) ||
    [];
  const checkMethod = loggedInStaffId && checkMethodsAndRouteBMS(accessPermission.content, "Read", "allData", window.location.pathname)

  const {
    data: organizationList,
    isLoading: isLoadedOrganizationList,
    isError,
    error,
    refetch,
  } = useQuery(
    [
      "member-organization",
      pageNumber,
      countryName,
      stateName,
      cityName,
      limit,
      tabValue,
      searchValue?.search,

      searchValue?.is_verified,
      searchValue?.subscription,
      searchValue?.subscription__name,
    ],
    () => {
      // Dynamically build the query string
      let queryParams = `?page=${pageNumber}&page_size=${limit}`;
      if (countryName) queryParams += `&country=${countryName}`;
      if (stateName) queryParams += `&state=${stateName}`;
      if (cityName) queryParams += `&city=${cityName}`;
      if (searchValue?.search) queryParams += `&search=${searchValue.search}`;

      if (searchValue?.is_verified) queryParams += `&is_verified=${searchValue.is_verified}`;
      if (searchValue?.subscription) queryParams += `&subscription=${searchValue.subscription}`;
      if (searchValue?.subscription__name) queryParams += `&subscription__name=${searchValue.subscription__name}`;
      if (!checkMethod && loggedInStaffId)
        queryParams += `&staff=${loggedInStaffId}`;
      if (tabValue) queryParams += `&${convertToQueryString(tabValue)}`;
      return MemberServices.getOrganizationMemberList(queryParams);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log("Data Franchise ", data?.data);
        const total = Math.ceil(data?.data?.count / 10);
        setTotalPages(total);
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

  useEffect(() => {
    // console.log("Page Number",initialPage)
    setCurrentInd("0");
    setPageNumber(() => initialPage);
  }, [initialPage]);

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

  const handleResetFilter = () => {
    setCityName("");
    setStateName("");
    setCountryName("");
    setSearchValue({
      search: "",
      is_verified: false,
      subscription: false,
      subscription__name: "",
    })

    setPageNumber(1);
    queryParams.set("page", 1);
    queryParams.set("limit", limit);
    navigate(`${location.pathname}?${queryParams.toString()}`);
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

  // New add

  const handleCurrentActiveIndex = (index) => {
    // If the clicked index is the same as the currently opened one, close it
    if (currentInd === index) {
      setCurrentInd(null);
    } else {
      // Otherwise, open the clicked index
      setCurrentInd(index);
    }
  };
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      const allCheckedUsers = organizationList?.data?.results.map((each) => ({
        brideandgroom: each.id,
      }));
      setCheckBoxList(allCheckedUsers);
    } else {
      setCheckBoxList([]);
    }
  };

  const handleMultiCheck = (bool) => {
    if (checkboxList?.length == 0) {
      Swal.fire({
        title: "Error",
        text: "Please Select Data ",
        icon: "error",
      });
      return;
    }

    const sendData = {
      tenants: checkboxList?.map((ele) => ele.brideandgroom),
      is_active: Boolean(bool),
    };
    updateMultiSelect.mutate(sendData);
  };
  const handleMultiDelete = () => {
    if (checkboxList?.length == 0) {
      Swal.fire({
        title: "Error",
        text: "Please Select Data ",
        icon: "error",
      });
      return;
    }
    Swal.fire({
      title: "Are you sure you want to delete data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const sendData = {
          tenants: checkboxList?.map((ele) => ele.brideandgroom),
          is_deleted: true,
        };
        multiDeleteOrganization.mutate(sendData);
      }
    });
  };

  const updateMultiSelect = useMutation(
    (formdata) => {
      return MemberServices.multiSelectOrganizationAction(formdata);
    },
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        // alert("Created Successfully")
        Swal.fire({
          title: "Successfull",
          text: "Successfull Updated",
          icon: "success",
        });
        setCheckBoxList([]);
        setSelectAll(false);
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries("member-organization");
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
  const multiDeleteOrganization = useMutation(
    (formdata) => {
      return MemberServices.multiSelectOrganizationDelete(formdata);
    },
    {
      onSuccess: (data) => {
        // console.log("Data after submission organization", data?.data);
        // alert("Created Successfully")
        Swal.fire({
          title: "Successfull",
          text: /Archived/.test(activeTab)
            ? "Revert Successfull"
            : "Deleted Successfull",
          icon: "success",
        });
        setCheckBoxList([]);
        setSelectAll(false);
        // queryClient.invalidateQueries("subscription-organization");
        queryClient.refetchQueries("member-organization");
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

  const handleMultiRevert = () => {
    if (checkboxList?.length == 0) {
      Swal.fire({
        title: "Error",
        text: "Please Select Data ",
        icon: "error",
      });
      return;
    }
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
        const sendData = {
          tenants: checkboxList?.map((ele) => ele.brideandgroom),
          is_deleted: false,
        };
        multiDeleteOrganization.mutate(sendData);
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

  useEffect(() => {
    if (initialTabValue) {
      const findValue = tabs?.find((ele) => ele?.name == initialTabValue);
      setTabValue(findValue?.value);
    }
  }, [initialTabValue]);

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
          tenants: [id],
        };

        multiDeleteOrganization.mutate(sendData);
      }
    });
  };
  // model Toggle
  const [toggleModel, setToggleModel] = useState(false);
  const [modelData, setModelData] = useState({});

  const handleToggleModel = (data) => {
    setModelData(data);
    setToggleModel(!toggleModel);
  };

  const { data: countryList, isLoading: isCountryLoad } = useQuery(
    ["all-country-list-dropdown-member-org"],
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
    ["all-state-list-member-org", countryName],
    () =>
      MasterServices.getStateListByCountryWithFilter(
        `?country__name=${countryName}`
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
    ["all-city-list-member-org", countryName, stateName],
    () =>
      MasterServices.getCityListByFilter(
        `?state__name=${stateName}&country__name=${countryName}`
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



  // Filter Dropdown List
  const accountTypeList = [
    {
      name: "Purchased", value: true,

    },
    {
      name: "Free", value: false,

    }
  ]
  const DataType = [

    {
      name: "Own By", value: false,

    },
    {
      name: "Purchased By", value: false,

    }
  ]
  const AccountStatus = [

    {
      name: "Active ", value: true,

    },
    {
      name: "Deactive", value: false,

    }
  ]
  const OrgType = [

    {
      name: "Paid ", value: true,

    },
    {
      name: "Free", value: false,

    }
  ]
  const OrgVerification = [

    {
      name: "verified ", value: true,

    },
    {
      name: "Non Verfied", value: false,

    }
  ]

  const handleChangeSearch = (e) => {
    const name = e.target.name
    const value = e.target.value
    const prevValue = { ...searchValue }
    prevValue[name] = value
    setSearchValue(prevValue)


  }

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
      tenant: id,
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

  const handleNavToChat = (e, id) => {
    navigate(
      "/chat/" + btoa(id) + "?tab=Organization"
    )
  }

  const handleMultiAssign = (e) => {
    const mybrideGroom = checkboxList?.map((each) => {
      return { ...each, id: each?.brideandgroom }
    })
    setMemberId(mybrideGroom);
    settoggleAssignModel(true);
  };
  const handleAssignModel = (e, data) => {
    setMemberId([data]);
    settoggleAssignModel(!toggleAssignModel);
  };
  const handleCloseAssignModel = () => {
    queryClient.refetchQueries("member-organization");
    setMemberId("");
    // setDuplicateData([])
    settoggleAssignModel(false);
    setSelectAll(false)
    setTeamExecutive(false)
    setTeamExecutiveErr("")
    setTeamHead(false)
    setTeamHeadErr("")
  };

  const AssignTenantMutation = useMutation(
    (formdata) => {
      return BridenGroomServices.assignstafftotenant(formdata);
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

  return (
    <>
      <>
        <Wrapper>
          <div className="member-view-wrapper">
            <div className="view-profile-head mb-4">
              <div className="d-flex flex-wrap">
                <div className="profile-headleft">
                  <MemberSectionFilter countryName={countryName} isCountryLoad={isCountryLoad} handleCountryChange={handleCountryChange} isLoaded={isLoadedOrganizationList} isLoadState={isLoadState} stateListDropdown={stateListDropdown} isCityLaod={isCityLaod} cityListDropdown={cityListDropdown} memberList={organizationList} stateName={stateName} handleCityName={handleCityName} cityName={cityName} handleStateChange={handleStateChange} handleLimit={handleLimit} limit={limit} selectAll={selectAll} handleSelectAll={handleSelectAll} countryList={countryList} type={'Organization'} membertype={"org"} accountTypeList={accountTypeList} DataType={DataType} AccountStatus={AccountStatus} memberType={OrgType} searchValue={searchValue} handleChangeSearch={handleChangeSearch} typeVerification={OrgVerification} />


                </div>
                <div className="profile-headright">
                  <ul>
                    <li>
                      {
                        <IsAccessibleMethodBMS
                          method={Object.keys(PermissionSets.member.Member.Create)[0]}
                          route={window.location.pathname}
                          name={"Create"}

                        >
                          {" "}
                          <Button
                            className="btn btn-style1"
                            onClick={handleNav}
                          >
                            Add +
                          </Button>
                        </IsAccessibleMethodBMS>
                      }
                    </li>
                    <li>
                      <Button
                        className="btn btn-outline-style1"
                        onClick={handleResetFilter}
                      >
                        Reset <LiaUndoAltSolid />
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="d-flex flex-wrap align-items-center">
                <div className="profile-headleft">
                  <ul>
                    <li className="select-all">
                      <FormGroup className="mb-0 mb-sm-0">
                        <Input
                          id="select-all"
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                        <Label for="select-all">Select All</Label>
                      </FormGroup>
                    </li>
                  </ul>
                </div>
                <div className="profile-headright">
                  <ul>
                    {!isLoadedOrganizationList &&
                      organizationList?.data?.count > 10 && (
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
                  </ul>
                </div>
              </div>
            </div>
            <div className="selected-append-box text-end">
              <ul className="d-flex flex-wrap justify-content-end gap-2">

                {checkboxList?.length !== 0 && !/Archived/.test(activeTab) && <li>
                  <IsAccessibleMethodBMS
                    method={Object.keys(PermissionSets.member.Member.staffAssign)[0]}
                    route={window.location.pathname}
                    name={"staffAssign"}

                  >
                    <Button
                      disabled={AssignTenantMutation?.isLoading}
                      className="btn purple-btn mb-2 ms-2"
                      onClick={handleMultiAssign}
                    >
                      {AssignTenantMutation?.isLoading ? (
                        <ButtonLoader />
                      ) : (
                        <>{"Staff Assign"}</>
                      )}
                    </Button>
                  </IsAccessibleMethodBMS>
                </li>}



                {checkboxList?.length !== 0 && !/Archived/.test(activeTab) && (

                  <IsAccessibleMethodBMS
                    method={Object.keys(PermissionSets.member.Member.AccountStatus)[0]}
                    route={window.location.pathname}
                    name={"AccountStatus"}

                  >
                    <li>
                      <Button
                        className="btn green-btn active mb-2 ms-2"
                        onClick={() => handleMultiCheck(1)}
                        disabled={updateMultiSelect?.isLoading}
                      >
                        {updateMultiSelect?.isLoading ? (
                          <ButtonLoader />
                        ) : (
                          "Active "
                        )}
                      </Button>
                    </li>
                  </IsAccessibleMethodBMS>
                )}
                {checkboxList?.length !== 0 && !/Archived/.test(activeTab) && (
                  <IsAccessibleMethodBMS
                    method={Object.keys(PermissionSets.member.Member.AccountStatus)[0]}
                    route={window.location.pathname}
                    name={"AccountStatus"}

                  >
                    <li>
                      <Button
                        className="btn orange-btn active mb-2 ms-2"
                        disabled={updateMultiSelect?.isLoading}
                        onClick={() => handleMultiDelete(0)}
                      >
                        {updateMultiSelect?.isLoading ? (
                          <ButtonLoader />
                        ) : (
                          "Deactive "
                        )}
                      </Button>
                    </li>
                  </IsAccessibleMethodBMS>
                )}
                {checkboxList?.length !== 0 && !/Archived/.test(activeTab) && (
                  <IsAccessibleMethodBMS
                    method={Object.keys(PermissionSets.member.Member.Delete)[0]}
                    route={window.location.pathname}
                    name={"Delete"}

                  >
                    <li>
                      <Button
                        className="btn btn-style1 mb-2 ms-2"
                        disabled={multiDeleteOrganization?.isLoading}
                        onClick={() => handleMultiDelete()}
                      >
                        {multiDeleteOrganization?.isLoading ? (
                          <ButtonLoader />
                        ) : (
                          "Delete "
                        )}
                      </Button>
                    </li>
                  </IsAccessibleMethodBMS>
                )}
                {checkboxList?.length !== 0 && /Archived/.test(activeTab) && (
                  <IsAccessibleMethodBMS
                    method={Object.keys(PermissionSets.member.Member.Revert)[0]}
                    route={window.location.pathname}
                    name={"Revert"}

                  >
                    <li>
                      <Button
                        className="btn btn-style1 mb-2 ms-2"
                        disabled={multiDeleteOrganization?.isLoading}
                        onClick={() => handleMultiRevert()}
                      >
                        {multiDeleteOrganization?.isLoading ? (
                          <ButtonLoader />
                        ) : (
                          "Revert All "
                        )}
                      </Button>
                    </li>
                  </IsAccessibleMethodBMS>
                )}
              </ul>
            </div>
            <div className="view-profile-tab-wrap">
              <Nav tabs>
                {tabs?.map((ele) => {
                  return (
                    <NavItem>
                      <NavLinkReact
                        className={classnames({
                          active: activeTab === ele?.name,
                        })}
                        onClick={() =>
                          toggleTab(ele?.id, ele?.value, ele?.name)
                        }
                      >
                        {ele?.name}
                      </NavLinkReact>
                    </NavItem>
                  );
                })}
              </Nav>
            </div>
            {/* New HTML */}

            {isLoadedOrganizationList ? (
              <Loader />
            ) : organizationList?.data?.results?.length == 0 ? (
              <NoActiveDataFound msg={"No Organization Found"} />
            ) : (
              <div className="view-profile-wrap">
                {organizationList?.data?.results?.map((each, index) => {
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
                                  (each?.image_url && `${each?.image_url}`) ||
                                  profileUser
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="profile-details-wrap">
                          <div className="profile-details-top">
                            <Row>
                              <Col
                                md="12"
                                lg="12"
                                xl="2"
                                xxl="2"
                                className="mb-3 mb-xxl-0"
                              >
                                <div className="profile-name-wrap">
                                  <h3>
                                    {" "}
                                    {each?.owner_name || ""}
                                    <span className={`verified-tag blue-color`}>
                                      {each?.is_verified && <MdVerified />}
                                    </span>
                                  </h3>
                                  <h5>{each?.name || ""}</h5>
                                  <h5>
                                    <div className="member-code">
                                      {each?.code || "N/A"}
                                    </div>
                                  </h5>
                                  <h5>
                                    <Link className="btn dark-blue-btn" to={"/member/organization/performance/" + btoa(each?.id)}>Performance</Link>
                                  </h5>
                                </div>
                              </Col>
                              <Col
                                md="12"
                                lg="12"
                                xl="6"
                                xxl="6"
                                className="mb-3 mb-xxl-0"
                              >
                                <div className="profile-status-wrap">
                                  <Row>
                                    <IsAccessibleMethodBMS
                                      method={Object.keys(PermissionSets.member.Member.Credential)[0]}
                                      route={window.location.pathname}
                                      name={"Credential"}
                                    >
                                      <Col md="12" xxl="6" className="mb-1">
                                        <p>
                                          <span>Country :</span>
                                          {each?.country || ""}
                                        </p>
                                      </Col>
                                      <Col md="12" xxl="6" className="mb-1">
                                        <p>
                                          <span>State :</span> {each?.state || ""}
                                        </p>
                                      </Col>
                                      <Col md="12" xxl="6" className="mb-1">
                                        <p>
                                          <span>City :</span> {each?.city || ""}
                                        </p>
                                      </Col>
                                      <Col md="12" xxl="6" className="mb-1">
                                        <p>
                                          <span>Address :</span>{" "}
                                          {each?.address || ""}
                                        </p>
                                      </Col>
                                    </IsAccessibleMethodBMS>
                                    <Col md="12" xxl="6" className="mb-1">
                                      <p>
                                        <span>Reg No:</span>{" "}
                                        {each?.registration_num || ""}
                                      </p>
                                    </Col>
                                    <Col md="12" xxl="6" className="mb-1">
                                      <p>
                                        <span>Verification No :</span>{" "}
                                        {each?.verification_num || ""}
                                      </p>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>
                              <IsAccessibleMethodBMS
                                method={Object.keys(PermissionSets.member.Member.Credential)[0]}
                                route={window.location.pathname}
                                name={"Credential"}
                              >
                                <Col
                                  md="12"
                                  lg="12"
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
                                            href={
                                              "mailto:" + each?.user?.email || ""
                                            }
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
                                          <a href={each?.phone || ""}>
                                            {each?.phone || ""}
                                          </a>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                              </IsAccessibleMethodBMS>
                            </Row>
                          </div>
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
                                    <span>Sub Domain : </span>{" "}
                                    <a
                                      target="_blank"
                                      href={
                                        (each?.host &&
                                          `https://${each?.host}.supermatrimonysbdevs.xyz`) ||
                                        ""
                                      }
                                    >
                                      {(each?.host && each?.host) || ""}
                                    </a>
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
                                    <span>Domain : </span>{" "}
                                    {each?.domain_name ? (
                                      <a href={"https://" + each?.domain_name}>
                                        {each?.domain_name}
                                      </a>
                                    ) : (
                                      "N/A"
                                    )}
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
                                    <span>Apps :</span>{" "}
                                    {each?.apps &&
                                      JSON.parse(each?.apps)?.android && (
                                        <FcAndroidOs />
                                      )}
                                    {each?.apps &&
                                      JSON.parse(each?.apps)?.ios && (
                                        <p>
                                          {" "}
                                          <FaAppStoreIos />
                                        </p>
                                      )}
                                    {each?.apps &&
                                      JSON.parse(each?.apps)?.api && (
                                        <p>
                                          <SiPostman />
                                        </p>
                                      )}
                                  </h4>
                                </div>
                              </Col>
                              <IsAccessibleMethodBMS
                                method={Object.keys(PermissionSets.member.Member.Subscription)[0]}
                                route={window.location.pathname}
                                name={"Subscription"}
                              >
                                <Col
                                  md="12"
                                  lg="12"
                                  xl="6"
                                  xxl="4"
                                  className="mb-3"
                                >
                                  <div className="profile-info-list">
                                    <h4>
                                      <span>Active Subscription : </span>{" "}
                                      {each?.subscription?.name || ""} (
                                      {each?.subscription?.cost || "0"} ca$)
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
                                      <span>Balance : </span> {each?.balance || 0}{" "}
                                      {"Ca$"}
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
                                      <span>
                                        No Of Subscriptions Purchased :{" "}
                                      </span>{" "}
                                      {each?.subscription_count || 0}
                                    </h4>
                                  </div>
                                </Col>
                              </IsAccessibleMethodBMS>

                              <Col
                                md="12"
                                lg="12"
                                xl="6"
                                xxl="4"
                                className="mb-3"
                              >
                                <div className="profile-info-list">
                                  <h4>
                                    <span>No Of Bride n Groom Shared : </span>{" "}
                                    {each?.brideandgroom_count || 0}
                                  </h4>
                                </div>
                              </Col>
                            </Row>
                            <div className="profile-org-franchise-wrap">
                              <div className="profile-org-franchise-title">
                                <h4>Male</h4>
                              </div>
                              <div className="profile-org-franchise-list-wrap">
                                <ul>
                                  <li>{each?.male_count || 0}</li>
                                </ul>
                              </div>
                            </div>
                            <div className="profile-org-franchise-wrap border-top-0">
                              <div className="profile-org-franchise-title">
                                <h4>Female</h4>
                              </div>
                              <div className="profile-org-franchise-list-wrap">
                                <ul>
                                  <li>{each?.female_count || 0}</li>
                                </ul>
                              </div>
                            </div>
                            {/* <div className="profile-org-franchise-wrap border-top-0">
                                <div className="profile-org-franchise-title">
                                  <h4>Other</h4>
                                </div>
                                <div className="profile-org-franchise-list-wrap">
                                  <ul>
                                    <li>{each?.other_count || 0}</li>
                                    
                                  </ul>
                                </div>
                              </div> */}
                          </div>
                        </div>
                        <div className="profile-button-wrap">
                          <ul>
                            {!/Archived/.test(activeTab) && (
                              <>
                                <IsAccessibleMethodBMS
                                  method={Object.keys(PermissionSets.member.Member.staffAssign)[0]}
                                  route={window.location.pathname}
                                  name={"staffAssign"}

                                >
                                  <li>
                                    <Button
                                      className="btn purple-btn me-2 mb-2"
                                      onClick={(e) =>
                                        handleAssignModel(e, each)
                                      }
                                    >
                                      <FaUserTie />

                                    </Button>
                                  </li>
                                </IsAccessibleMethodBMS>
                                <li>
                                  <NavLink
                                    to={
                                      "/member/organization/details/" +
                                      btoa(each?.id)
                                    }
                                  >
                                    <Button className="dark-blue-btn ">
                                      <FaEye />
                                    </Button>
                                  </NavLink>
                                </li>
                                <IsAccessibleMethodBMS
                                  method={Object.keys(PermissionSets.member.Member.Update)[0]}
                                  route={window.location.pathname}
                                  name={"Update"}

                                >
                                  <li>
                                    <NavLink
                                      to={
                                        "/member/organization/" + btoa(each?.id)
                                      }
                                    >
                                      <Button className="light-green-btn">
                                        <LiaEdit />
                                      </Button>
                                    </NavLink>
                                  </li>
                                </IsAccessibleMethodBMS>
                                <IsAccessibleMethodBMS
                                  method={Object.keys(PermissionSets.member.Member.Delete)[0]}
                                  route={window.location.pathname}
                                  name={"Delete"}

                                >
                                  <li>
                                    <Button
                                      className="btn-outline-style1"
                                      onClick={() => handleDelete(each?.id)}
                                    >
                                      <RiDeleteBin6Line />
                                    </Button>
                                  </li>
                                </IsAccessibleMethodBMS>
                                <IsAccessibleMethodBMS
                                  method={Object.keys(PermissionSets.member.Member.AccountStatus)[0]}
                                  route={window.location.pathname}
                                  name={"AccountStatus"}

                                >
                                  <li>
                                    <Button
                                      className={
                                        each?.user?.is_active
                                          ? "active green-btn text-light"
                                          : "btn-style1 text-light"
                                      }
                                      onClick={() =>
                                        handleStatusChange(
                                          each?.user?.id,
                                          each?.user?.is_active
                                        )
                                      }
                                    >
                                      {each?.user?.is_active ? (
                                        <LiaCheckCircle />
                                      ) : (
                                        <MdBlockFlipped />
                                      )}
                                    </Button>
                                  </li>
                                </IsAccessibleMethodBMS>
                                <IsAccessibleMethodBMS
                                  method={Object.keys(PermissionSets.member.Member.Chat)[0]}
                                  route={window.location.pathname}
                                  name={"Chat"}

                                >

                                  <li>
                                    <Button onClick={(e) => handleNavToChat(e, each?.id)} className="btn yellow-btn">
                                      {" "}
                                      <FaRegComments />
                                    </Button>
                                  </li>
                                </IsAccessibleMethodBMS>
                                <IsAccessibleMethodBMS
                                  method={Object.keys(PermissionSets.member.Member.Transfer)[0]}
                                  route={window.location.pathname}
                                  name={"Transfer"}

                                >
                                  <li>
                                    <Button
                                      className={"btn orange-btn"}
                                      onClick={() => handleToggleModel(each)}
                                    >
                                      <LiaExchangeAltSolid />
                                    </Button>
                                  </li>
                                </IsAccessibleMethodBMS>
                                <IsAccessibleMethodBMS
                                  method={Object.keys(PermissionSets.member.Member.Comment)[0]}
                                  route={window.location.pathname}
                                  name={"Comment"}

                                >



                                  <li>
                                    <Button className="btn blue-btn" onClick={(e) => handleViewAddComment(e, each?.id)}><BiMessageDetail /></Button>
                                  </li>
                                </IsAccessibleMethodBMS>
                              </>
                            )}
                            {/Archived/.test(activeTab) && (
                              <IsAccessibleMethodBMS
                                method={Object.keys(PermissionSets.member.Member.Revert)[0]}
                                route={window.location.pathname}
                                name={"Revert"}

                              >
                                <li>
                                  <Button
                                    type="click"
                                    className="btn green-btn"
                                    disabled={
                                      multiDeleteOrganization?.isLoading
                                    }
                                    onClick={() => handleRevertData(each?.id)}
                                  >
                                    {" "}
                                    {multiDeleteOrganization?.isLoading ? (
                                      <ButtonLoader />
                                    ) : (
                                      <GrUpdate />
                                    )}
                                  </Button>
                                </li>
                              </IsAccessibleMethodBMS>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="profile-toggle-button">
                        <Button
                          className="profile-toggle-btn"
                          onClick={() => handleCurrentActiveIndex(index)}
                        >
                          <IoIosArrowDown />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* New HTML end */}

            {!isLoadedOrganizationList &&
              organizationList?.data?.results?.length > 0 && (
                <Pagination
                  count={organizationList?.data?.count}
                  pageSize={limit}
                />
              )}
          </div>
        </Wrapper>
        <CommentModule loggedInUserId={loggedInUserId} isSuperUser={isSuperUser} AddCommentTab={AddCommentTab} toggleAddCommentTab={toggleAddCommentTab} date={date} toggleViewAddComment={toggleViewAddComment} handleViewAddComment={handleViewAddComment} handleResetDateFilter={handleResetDateFilter} handleSubmit={handleSubmit} setTextErr={setTextErr} text={text} textErr={textErr} setText={setText} handleEditorChange={handleEditorChange} CommentModuleApi={CommentModuleApi} UpdateComment={UpdateComment} handleDelete={handleDelete} handleEditComment={handleEditComment} tenant={id} handleDeleteComment={handleDeleteComment} editId={editId} />
        <ConvertToFranchise
          modelData={modelData}
          setModelData={setModelData}
          toggleModel={toggleModel}
          setToggleModel={setToggleModel}
          handleToggleModel={handleToggleModel}
          pageNumber={pageNumber}
        />
        <AssignModel
          toggleAssignModel={toggleAssignModel}
          handleAssignModel={handleAssignModel}
          handleCloseAssignModel={handleCloseAssignModel}
          brideandgroom={memberId}
          AssignBrideandgroomMutation={AssignTenantMutation}
          isFromMember={true}
          teamExecutive={teamExecutive}
          setTeamExecutive={setTeamExecutive}
          teamExecutiveErr={teamExecutiveErr}
          setTeamExecutiveErr={setTeamExecutiveErr}
          teamHead={teamHead}
          setTeamHead={setTeamHead}
          teamHeadErr={teamHeadErr}
          setTeamHeadErr={setTeamHeadErr}

          setBrideAndGroomId={setMemberId}
          setCheckBoxList={setCheckBoxList}


        />
      </>
    </>
  );
};

export default ViewOrganization;
