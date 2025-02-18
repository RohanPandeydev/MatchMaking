import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { LuUser } from "react-icons/lu";
import { RiHome6Line } from "react-icons/ri";
import { TbLayoutDashboard } from "react-icons/tb";
import { ImUserTie } from "react-icons/im";
import { PiUsers } from "react-icons/pi";
import { BiImageAdd } from "react-icons/bi";
import BasicDetails from "./BasicDetails";
import Residence from "./Residence";
import PhysicalInfo from "./PhysicalInfo";
import OtherInfo from "./OtherInfo";
import PartnerPreferance from "./PartnerPreferance";
import OtherPhotos from "./OtherPhotos";
import Wrapper from "../../../../layouts/Wrapper";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import BridenGroomServices from "../../../../../services/BridenGroomServices";
import ValidateAuthenticationKey from "../../../../../utils/ValidationAuthenticationKey";
import Swal from "sweetalert2";
import useFetchMasterData from "../../../../../helper/FetchMasterContent";
import config from "../../../../../../config";
import MasterServices from "../../../../../services/MasterServices";
import PermissionSets from "../../../../../guard/Method";
import { IsAccessibleMethodBMS, IsAccessibleMethodBMSPage } from "../../../../../guard/Rbac";

const ProfilesDetailsAdd = () => {
  // Initial tab setup
  const initialTabName = "basic";
  const initialTabId = "1";

  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState(initialTabId);
  const [activeTabName, setActiveTabName] = useState(initialTabName);
  const [allData, setAllData] = useState({});
  const [idxDisableTabIndex, setIdxDisableTabIndex] = useState(1);
  const [id, setId] = useState("");
  const [isFromDetails, setIsFromDetails] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idValue = queryParams.get("id");
  const tabValue = queryParams.get("tab");
  let isDetails = queryParams.get("details");
  const queryClient = useQueryClient();
  const [refetchData, setRefetchData] = useState(false);

  const tabs = [
    { name: "basic", id: "1" },
    { name: "residence", id: "2" },
    { name: "physical", id: "3" },
    { name: "other", id: "4" },
    { name: "partner", id: "5" },
    { name: "upload", id: "6" },
  ];

  const handleNavToDetails = () => {
    queryClient.refetchQueries(["bridengroomdatabyid-details", id]);

    navigate("/bridengroom/customer/" + btoa(id));
  };
  // Set the active tab based on the query parameter
  useEffect(() => {
    if (tabValue) {
      const decodedTabName = atob(tabValue);
      const matchedTab = tabs.find((tab) => tab.name === decodedTabName);
      if (matchedTab) {
        setCurrentActiveTab(matchedTab.id);
        setActiveTabName(matchedTab.name);
      }
    }
  }, [tabValue]);

  // Toggle active state for Tab
  const toggle = (tab, name) => {
    if (currentActiveTab !== tab) {
      setActiveTabName(name);
      setCurrentActiveTab(tab);
    }
  };

  const { data, isLoading } = useQuery(
    ["bridengroomdatabyid-main", id],
    () => {
      return BridenGroomServices.getBridenGroomDetailsById({ id: id });
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      onSuccess: (data) => {
        setRefetchData(!refetchData);
        setAllData(data?.data);
        if (data?.data?.tab_partner_preferance) {
          setIdxDisableTabIndex(6);
          return;
        }
        if (data?.data?.tab_other_info) {
          setIdxDisableTabIndex(5);
          return;
        }
        if (data?.data?.tab_physical_info) {
          setIdxDisableTabIndex(4);
          return;
        }
        if (data?.data?.tab_residence) {
          setIdxDisableTabIndex(3);
          return;
        }
        if (data?.data?.tab_basic_details) {
          setIdxDisableTabIndex(2);
          return;
        }

        // if (data?.data?.tab_upload_photos) {
        //   setIdxDisableTabIndex(6);
        //   return;
        // }
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

  // Update query parameters when the active tab changes
  useEffect(() => {
    if (activeTabName != "basic") {
      // console.log("id55555", id);
      if (!id) return;
      queryParams.set("id", btoa(id ? id : 1));
      queryParams.set("tab", btoa(activeTabName));

      // Replace the current history entry with the updated query parameters
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      });
    }
  }, [activeTabName]);

  useEffect(() => {
    try {
      const decodeId = isDetails && atob(isDetails);
      console.log("decodeId", !!isDetails, isDetails);

      isDetails && setIsFromDetails(() => decodeId || "");
    } catch (error) {
      // console.error("Error decoding user ID:", error.message);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }, [isDetails]);

  // Master Content Fetch Data
  const { data: LanguageListing, isLoading: isLanguageLoaded } =
    useFetchMasterData(config.masterList[0], "all-lang-list-bride-n-groom");
  // Master Content Fetch Data
  const { data: NoOfChild, isLoading: isNoOfChildrenLoad } = useFetchMasterData(
    config.masterList[1],
    "all-no-of-children-bride-n-groom"
  );

  const { data: ProfileCreateByListing, isLoading: isProfileCreateByLoad } =
    useFetchMasterData(
      config.masterList[2],
      "all-profile-create-by-bride-n-groom"
    );
  const { data: ReligionsListing, isLoading: isReligionLoad } =
    useFetchMasterData(config.masterList[3], "all-religion-bride-n-groom");
  const { data: CasteListing, isLoading: isCasteLoad } = useFetchMasterData(
    config.masterList[4],
    "all-caste-bride-n-groom"
  );
  const { data: EducationQualification, isLoading: isEducationLoad } =
    useFetchMasterData(config.masterList[5], "all-education-bride-n-groom");
  const { data: ManglikStatusListing, isLoading: isManglikLoad } =
    useFetchMasterData(config.masterList[6], "all-manglik-bride-n-groom");
  const { data: EmployeeInListing, isLoading: isEmpLoad } = useFetchMasterData(
    config.masterList[7],
    "all-emp-bride-n-groom"
  );
  const { data: OccupationListing, isLoading: isOccupationLoad } =
    useFetchMasterData(config.masterList[8], "all-occupation-bride-n-groom");
  const { data: IncomeRangeListing, isLoading: isIncomeLoad } =
    useFetchMasterData(config.masterList[9], "all-income-bride-n-groom");
  const { data: ResidenceStatusListing, isLoading: isResidenceLoad } =
    useFetchMasterData(
      config.masterList[10],
      "all-residence-status-bride-n-groom"
    );
  const { data: PhoneCodeListing, isLoading: isPhoneCodeLoad } =
    useFetchMasterData(config.masterList[11], "all-phone-code-bride-n-groom");

  const { data: ComplexionListing, isLoading: isComplexionLoad } =
    useFetchMasterData(config.masterList[12], "all-complexion-bride-n-groom");
  const { data: BodyListing, isLoading: isBodyLoad } = useFetchMasterData(
    config.masterList[13],
    "all-body-load-bride-n-groom"
  );

  const { data: DietListing, isLoading: isDietLoad } = useFetchMasterData(
    config.masterList[14],
    "all-diet-load-bride-n-groom"
  );
  const { data: LookingForListing, isLoading: isLookingForLoad } =
    useFetchMasterData(config.masterList[15], "all-looking-load-bride-n-groom");
  const { data: AgeListing, isLoading: isAgeLoad } = useFetchMasterData(
    config.masterList[16],
    "all-age-load-bride-n-groom"
  );

  return (
    <Wrapper>
      <IsAccessibleMethodBMSPage
        method={Object.keys(PermissionSets.bridengroom.bridengroomListing.Update)[0]}
        route={"/bridengroom/customer"}
        name={"Update"}

      >
        <div className="profile-details-wrapper profile-details-add-wrapper">
          {
            <Nav className={`profile-nav-wrap ${activeTabName}-line `} tabs>
              <NavItem className="basic-nav">
                <NavLink
                  className={classnames({ active: currentActiveTab === "1" })}
                  onClick={() => {
                    toggle("1", "basic");
                  }}
                >
                  <span className="icon">
                    <LuUser />
                  </span>{" "}
                  Basic Details{" "}
                </NavLink>
              </NavItem>

              {!isLoading && data?.data?.tab_basic_details ? (
                <NavItem
                  className="residence-nav"
                // style={{display:(!isLoading && data?.data?.tab_basic_details)?"block":"none"}}
                >
                  <NavLink
                    className={classnames({ active: currentActiveTab === "2" })}
                    onClick={() => {
                      toggle("2", "residence");
                    }}
                  >
                    <span className="icon">
                      <RiHome6Line />
                    </span>{" "}
                    Residence{" "}
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem
                  disabled={!data?.data?.tab_basic_details}
                  className="residence-nav"
                >
                  <NavLink
                    className={classnames({ active: currentActiveTab === "2" })}
                  // onClick={() => {
                  //   toggle("2", "residence");
                  // }}
                  >
                    <span className="icon">
                      <RiHome6Line />
                    </span>{" "}
                    Residence{" "}
                  </NavLink>
                </NavItem>
              )}

              {!isLoading && data?.data?.tab_residence ? (
                <NavItem className="physical-nav">
                  <NavLink
                    className={classnames({ active: currentActiveTab === "3" })}
                    onClick={() => {
                      toggle("3", "physical");
                    }}
                  >
                    <span className="icon">
                      <ImUserTie />
                    </span>{" "}
                    Physical Info{" "}
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem
                  className="physical-nav"
                  disabled={!data?.data?.tab_residence}
                >
                  <NavLink
                    className={classnames({ active: currentActiveTab === "3" })}
                  // onClick={() => {
                  //   toggle("3", "physical");
                  // }}
                  >
                    <span className="icon">
                      <ImUserTie />
                    </span>{" "}
                    Physical Info{" "}
                  </NavLink>
                </NavItem>
              )}

              {!isLoading && data?.data?.tab_physical_info ? (
                <NavItem
                  className="other-nav"
                  disabled={!data?.data?.tab_physical_info}
                >
                  <NavLink
                    className={classnames({ active: currentActiveTab === "4" })}
                    onClick={() => {
                      toggle("4", "other");
                    }}
                  >
                    <span className="icon">
                      <TbLayoutDashboard />
                    </span>{" "}
                    Other Info{" "}
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem
                  className="other-nav"
                  disabled={!data?.data?.tab_physical_info}
                >
                  <NavLink
                    className={classnames({ active: currentActiveTab === "4" })}
                  // onClick={() => {
                  //   toggle("4", "other");
                  // }}
                  >
                    <span className="icon">
                      <TbLayoutDashboard />
                    </span>{" "}
                    Other Info{" "}
                  </NavLink>
                </NavItem>
              )}

              {!isLoading && data?.data?.tab_other_info ? (
                <NavItem
                  className="partner-nav"
                  disabled={!data?.data?.tab_other_info}
                >
                  <NavLink
                    className={classnames({ active: currentActiveTab === "5" })}
                    onClick={() => {
                      toggle("5", "partner");
                    }}
                  >
                    <span className="icon">
                      <PiUsers />
                    </span>{" "}
                    Partner Preference{" "}
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem
                  className="partner-nav"
                  disabled={!data?.data?.tab_other_info}
                >
                  <NavLink
                    className={classnames({ active: currentActiveTab === "5" })}
                  // onClick={() => {
                  //   toggle("5", "partner");
                  // }}
                  >
                    <span className="icon">
                      <PiUsers />
                    </span>{" "}
                    Partner Preference{" "}
                  </NavLink>
                </NavItem>
              )}

              {data?.data?.tab_partner_preferance ? (
                <NavItem
                  className="upload-nav"
                  disabled={!data?.data?.tab_partner_preferance}
                >
                  <NavLink
                    // disabled={data?.data?.tab_partner_preferance}
                    className={classnames({ active: currentActiveTab === "6" })}
                    onClick={() => {
                      toggle("6", "upload");
                    }}
                  >
                    <span className="icon">
                      <BiImageAdd />
                    </span>{" "}
                    Upload Photos{" "}
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem
                  className="upload-nav"
                  disabled={!data?.data?.tab_partner_preferance}
                >
                  <NavLink
                    // disabled={data?.data?.tab_partner_preferance}
                    className={classnames({ active: currentActiveTab === "6" })}
                  // onClick={() => {
                  //   toggle("6", "upload");
                  // }}
                  >
                    <span className="icon">
                      <BiImageAdd />
                    </span>{" "}
                    Upload Photos{" "}
                  </NavLink>
                </NavItem>
              )}

              <div className="line"></div>
            </Nav>
          }
          <TabContent activeTab={currentActiveTab}>
            {currentActiveTab === "1" ? (
              <BasicDetails
                setId={setId}
                id={id}
                setActiveTabName={setActiveTabName}
                setCurrentActiveTab={setCurrentActiveTab}
                toggle={toggle}
                isFromDetails={isFromDetails}
                allData={allData}
                refetchData={refetchData}
                handleNavToDetails={handleNavToDetails}
                LanguageListing={LanguageListing}
                isLanguageLoaded={isLanguageLoaded}
                NoOfChild={NoOfChild}
                isNoOfChildrenLoad={isNoOfChildrenLoad}
                ProfileCreateByListing={ProfileCreateByListing}
                isProfileCreateByLoad={isProfileCreateByLoad}
                ReligionsListing={ReligionsListing}
                isReligionLoad={isReligionLoad}
                CasteListing={CasteListing}
                isCasteLoad={isCasteLoad}
                EducationQualification={EducationQualification}
                isEducationLoad={isEducationLoad}
                ManglikStatusListing={ManglikStatusListing}
                isManglikLoad={isManglikLoad}
                EmployeeInListing={EmployeeInListing}
                isEmpLoad={isEmpLoad}
                OccupationListing={OccupationListing}
                isOccupationLoad={isOccupationLoad}
                IncomeRangeListing={IncomeRangeListing}
                isIncomeLoad={isIncomeLoad}
              />
            ) : currentActiveTab === "2" ? (
              <Residence
                setId={setId}
                id={id}
                setActiveTabName={setActiveTabName}
                setCurrentActiveTab={setCurrentActiveTab}
                toggle={toggle}
                isFromDetails={isFromDetails}
                allData={allData}
                refetchData={refetchData}
                handleNavToDetails={handleNavToDetails}
                ResidenceStatusListing={ResidenceStatusListing}
                isResidenceLoad={isResidenceLoad}
                isPhoneCodeLoad={isPhoneCodeLoad}
                PhoneCodeListing={PhoneCodeListing}
              />
            ) : currentActiveTab === "3" ? (
              <PhysicalInfo
                setId={setId}
                id={id}
                setActiveTabName={setActiveTabName}
                setCurrentActiveTab={setCurrentActiveTab}
                toggle={toggle}
                isFromDetails={isFromDetails}
                allData={allData}
                refetchData={refetchData}
                handleNavToDetails={handleNavToDetails}
                ComplexionListing={ComplexionListing}
                isComplexionLoad={isComplexionLoad}
                BodyListing={BodyListing}
                isBodyLoad={isBodyLoad}
                DietListing={DietListing}
                isDietLoad={isDietLoad}
              />
            ) : currentActiveTab === "4" ? (
              <OtherInfo
                setId={setId}
                id={id}
                setActiveTabName={setActiveTabName}
                setCurrentActiveTab={setCurrentActiveTab}
                toggle={toggle}
                isFromDetails={isFromDetails}
                allData={allData}
                refetchData={refetchData}
                handleNavToDetails={handleNavToDetails}
                NoOfChild={NoOfChild}
                isNoOfChildrenLoad={isNoOfChildrenLoad}
              />
            ) : currentActiveTab === "5" ? (
              <PartnerPreferance
                setId={setId}
                id={id}
                setActiveTabName={setActiveTabName}
                setCurrentActiveTab={setCurrentActiveTab}
                toggle={toggle}
                isFromDetails={isFromDetails}
                allData={allData}
                refetchData={refetchData}
                handleNavToDetails={handleNavToDetails}
                LookingForListing={LookingForListing}
                isLookingForLoad={isLookingForLoad}
                ComplexionListing={ComplexionListing}
                isComplexionLoad={isComplexionLoad}
                AgeListing={AgeListing}
                isAgeLoad={isAgeLoad}
                LanguageListing={LanguageListing}
                isLanguageLoaded={isLanguageLoaded}
                ReligionsListing={ReligionsListing}
                isReligionLoad={isReligionLoad}
                CasteListing={CasteListing}
                isCasteLoad={isCasteLoad}
                IncomeRangeListing={IncomeRangeListing}
                isIncomeLoad={isIncomeLoad}
                EducationQualification={EducationQualification}
                isEducationLoad={isEducationLoad}
                ResidenceStatusListing={ResidenceStatusListing}
                isResidenceLoad={isResidenceLoad}
              />
            ) : (
              <OtherPhotos
                setId={setId}
                id={id}
                setActiveTabName={setActiveTabName}
                setCurrentActiveTab={setCurrentActiveTab}
                toggle={toggle}
                isFromDetails={isFromDetails}
                allData={allData}
                refetchData={refetchData}
                isLoadingPhoto={isLoading}
                handleNavToDetails={handleNavToDetails}
              />
            )}
          </TabContent>
        </div>
      </IsAccessibleMethodBMSPage>
    </Wrapper>

  );
};

export default ProfilesDetailsAdd;
