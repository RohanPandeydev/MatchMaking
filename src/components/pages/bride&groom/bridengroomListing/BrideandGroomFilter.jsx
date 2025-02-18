import React, { useEffect, useState } from 'react'
import { BiMessageX, BiReset, BiUserX } from 'react-icons/bi'
import { LuShieldCheck, LuUsers2 } from 'react-icons/lu'
import { MdOutlineKeyboardAlt } from 'react-icons/md'
import { PiCalendarStar, PiUserGearBold } from 'react-icons/pi'
import { RiChatHistoryLine, RiVipCrown2Line } from 'react-icons/ri'
import { TbListSearch } from 'react-icons/tb'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import ButtonLoader from '../../../../utils/Loader/ButtonLoader'
import useFetchMasterData from '../../../../helper/FetchMasterContent'
import config from '../../../../../config'
import heightOptions from '../../../../utils/JSON/Height'
import { useQuery } from '@tanstack/react-query'
import StaffServices from '../../../../services/StaffServices'
import ShareDataServices from '../../../../services/ShareDataServices'
import ValidateAuthenticationKey from '../../../../utils/ValidationAuthenticationKey'
import Swal from 'sweetalert2'
import Select from 'react-select';
import { useMemo } from 'react'

const BrideandGroomFilter = ({loggedInStaffId, selectOrgFracType, setOrgFraType, setFilterValue, handleSearchModel, findYourMatch, countryList, isCountryLoad, stateListDropdown, isLoadState, cityListDropdown, isCityLaod, handleCityName, handleCountryChange, handleStateChange, countryName, cityName, stateName, handleResetFilter }) => {
    const handleSelectType = (e) => {
        setOrgFraType(e)
        findYourMatch.lead_create_by__id = e?.value
    }

    const { data: ProfileCreateByListing, isLoading: isProfileCreateByLoad } =
        useFetchMasterData(
            config.masterList[2],
            "all-profile-create-by-bride-n-groom-filter"
        );
    const { data: ReligionsListing, isLoading: isReligionLoad } =
        useFetchMasterData(config.masterList[3], "all-religion-bride-n-groom-filter");
    const { data: CasteListing, isLoading: isCasteLoad } = useFetchMasterData(
        config.masterList[4],
        "all-caste-bride-n-groom-filter"
    );
    const { data: AgeListing, isLoading: isAgeLoad } = useFetchMasterData(
        config.masterList[16],
        "all-age-load-bride-n-groom-filter"
    );
    const { data: EducationQualification, isLoading: isEducationLoad } =
        useFetchMasterData(config.masterList[5], "all-education-bride-n-groom-filter");
    const { data: LanguageListing, isLoading: isLanguageLoaded } =
        useFetchMasterData(config.masterList[0], "all-lang-list-bride-n-groom-filter");
    const [casteListingData, setCasteListingData] = useState([])
    const { data: OccupationListing, isLoading: isOccupationLoad } =
        useFetchMasterData(config.masterList[8], "all-occupation-bride-n-groom-filter");

    const { data: IncomeRangeListing, isLoading: isIncomeLoad } =
        useFetchMasterData(config.masterList[9], "all-income-bride-n-groom-filter");

    const { data: DietListing, isLoading: isDietLoad } = useFetchMasterData(
        config.masterList[14],
        "all-diet-load-bride-n-groom-filter"
    );


    const { data: staffList, isLoading: isStaffLoad } = useQuery(
        ["staff-list-without-pagination-filter"],
        () => StaffServices.staffListWithoutPagination(),
        {
            refetchOnWindowFocus: false,
            select: (data) => {
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


    const {
        data: organizationFranchiseList,
        isLoading: isLoadedOrganizationFracnhiseList,
        isError,
        error,
        refetch,
    } = useQuery(
        ["share-data-organization-filter", findYourMatch?.lead_create_by__account_type],
        () => {
            return ShareDataServices?.getOrganizationFrachiseList(`account_type=${findYourMatch?.lead_create_by__account_type}`)
        },
        {
            enabled: findYourMatch?.lead_create_by__account_type && findYourMatch?.lead_create_by__account_type != "admin" ? true : false,
            refetchOnWindowFocus: false,
            select: (data) => {
                // console.log("DataOrganization", data?.data);
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

    useEffect(() => {
        if (findYourMatch?.religion) {
            const filteredCasteList = CasteListing?.filter((each) => {
                const descReligion = each?.description ? JSON.parse(each.description)?.religion : null;
                return descReligion === findYourMatch?.religion;
            });

            // console.log(filteredCasteList,"=============",findYourMatch?.religion,CasteListing)
            setCasteListingData(filteredCasteList);
        }
    }, [findYourMatch?.religion, CasteListing]);


    const genderListing = [{
        name: "Male",
        value: "male"
    }, {
        name: "Female",
        value: "female"
    }]

    const maritalStatus = [{
        name: "Unmarried",
        value: "unmarried"

    }, {
        name: "Divorcee",
        value: "divorcee"

    }, {
        name: "Widow/Widower",
        value: "widow_widower"

    }]


    const StatusList = [{
        name: "Lead", value: false,

    }, {
        name: "Approved ", value: true
    }]

    const Drinking_SmokingTypeLis = [
        {
            name: "Yes", value: 'yes'
        },
        {
            name: "No", value: 'no'
        },
        {
            name: "Occasionally", value: 'occasionally'
        },

    ]

    const personalizedTypeList = [
        { name: "Expired/Non-Personalized", value: "no" },
        { name: "Personalized/Scheduled Data", value: "yes" },
    ];

    const BrideandGroomCreatedByList = [{ name: "Admin", value: 'admin' }, { name: "Organization", value: "org" }, { name: "Franchise", value: "franchise" }]



    let isAccountTypeValid = useMemo(() => {

        return findYourMatch?.lead_create_by__account_type && findYourMatch?.lead_create_by__account_type !== "admin";
    }, [findYourMatch?.lead_create_by__account_type])


    // const isAccountTypeValid =
    // findYourMatch?.lead_create_by__account_type &&
    // findYourMatch?.lead_create_by__account_type !== "admin";


    // console.log(organizationFranchiseList, 'organizationFranchiseList', findYourMatch?.lead_create_by__account_type &&
    //     findYourMatch?.lead_create_by__account_type !== "admin")


    return (
        <>
            <div className="filter-wrapper">
                <Row>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Name/Email/Code/Phone/ </Label>
                            <Input
                                id=""
                                name="search"
                                placeholder="Search"
                                onChange={handleSearchModel}
                                value={findYourMatch?.search}
                                type="text"
                            />
                        </FormGroup>
                    </Col>
                    {/* <Col xs="12" sm="6" md="4" lg="2">
                    <FormGroup className="common-formgroup">
                        <Label> Email </Label>
                        <Input
                        id=""
                        name="email"
                        placeholder="email"
                        type="text"
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="2">
                    <FormGroup className="common-formgroup">
                        <Label> Phone </Label>
                        <Input
                        id=""
                        name=""
                        placeholder="Phone"
                        type="text"
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="4" lg="2">
                    <FormGroup className="common-formgroup">
                        <Label> Matri ID </Label>
                        <Input
                        id=""
                        name=""
                        placeholder="Matri ID"
                        type="text"
                        />
                    </FormGroup>
                </Col> */}
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Select Country </Label>
                            <Input
                                id=""
                                type="select"
                                value={countryName}
                                onChange={handleCountryChange}
                                disabled={isCountryLoad}
                            >
                                <option value={""}>Select Country</option>
                                {isCountryLoad ? (
                                    <ButtonLoader />
                                ) : (
                                    countryList?.length > 0 &&
                                    countryList.map((country) => (
                                        <option
                                            key={country?.name}
                                            value={country?.iso3 || ""}
                                        >
                                            {country?.name || ""}
                                        </option>
                                    ))
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Select State </Label>
                            <Input
                                id=""
                                name="state"
                                type="select"
                                value={stateName}
                                onChange={handleStateChange}
                                disabled={!!!countryName}
                            >
                                <option value={""}>Select State</option>
                                {isLoadState ? (
                                    <ButtonLoader />
                                ) : (
                                    stateListDropdown?.length > 0 &&
                                    stateListDropdown?.map((each) => {
                                        return (
                                            <option value={each?.state_code}>
                                                {each?.name || ""}
                                            </option>
                                        );
                                    })
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Select City </Label>
                            <Input
                                id=""
                                name="city"
                                type="select"
                                value={cityName}
                                onChange={handleCityName}
                                disabled={!!!stateName || !!!countryName}
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
                        </FormGroup>
                    </Col>
                    {/* <Col xs="12" sm="6" md="4" lg="2">
                        <FormGroup className="common-formgroup">
                            <Label> Assigned to </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    Select Any
                                </option>
                                <option>
                                    Assigned to 1
                                </option>
                                <option>
                                    Assigned to 2
                                </option>
                                <option>
                                    Assigned to 3
                                </option>
                                <option>
                                    Assigned to 4
                                </option>
                            </Input>
                        </FormGroup>
                    </Col> */}
                    {/* <Col xs="12" sm="6" md="4" lg="2">
                        <FormGroup className="common-formgroup">
                            <Label> Registered from i.e  </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    Select Any
                                </option>
                                <option>
                                    Android
                                </option>
                                <option>
                                    IOS
                                </option>

                            </Input>

                        </FormGroup>
                    </Col> */}
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Profile Created By </Label>
                            <Input
                                id=""
                                name="profile_create_by"
                                onChange={handleSearchModel}
                                value={findYourMatch?.profile_create_by}


                                type="select"
                            >
                                <option value={""}>Profile Created By</option>
                                {isProfileCreateByLoad ? (
                                    <ButtonLoader />
                                ) : (
                                    ProfileCreateByListing?.length > 0 &&
                                    ProfileCreateByListing?.map((create) => {
                                        return (
                                            <option
                                                value={
                                                    create?.description
                                                        ? JSON.parse(create?.description)
                                                        : create?.name
                                                }
                                            >
                                                {create?.name}
                                            </option>
                                        );
                                    })
                                )}
                            </Input>

                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Religion * </Label>
                            <Input
                                id=""
                                type="select"
                                name="religion"
                                onChange={handleSearchModel}
                                value={findYourMatch?.religion}
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

                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Caste * </Label>
                            <Input
                                id=""

                                name="caste"
                                type="select"
                                value={findYourMatch?.caste}
                                onChange={handleSearchModel}
                                disabled={!!!findYourMatch?.religion}

                            >
                                <option value={""}>Select Caste</option>
                                {isCasteLoad ? (
                                    <ButtonLoader />
                                ) : (
                                    casteListingData?.length > 0 &&
                                    casteListingData?.map((caste) => {
                                        return (
                                            <option
                                                value={

                                                    caste?.name
                                                }
                                            >
                                                {caste?.name}
                                            </option>
                                        );
                                    })
                                )}
                            </Input>

                        </FormGroup>
                    </Col>

                    {/* <Col xs="12" sm="6" md="4" lg="2">
                        <FormGroup className="common-formgroup">
                            <Label> Religion </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    Select Any
                                </option>
                                <option>
                                    Religion 1
                                </option>
                                <option>
                                    Religion 2
                                </option>
                                <option>
                                    Religion 3
                                </option>
                                <option>
                                    Religion 4
                                </option>
                            </Input>
                        </FormGroup>
                    </Col> */}
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Registered on date </Label>
                            <Input
                                id="exampleSelect"
                                name="created_at"
                                onChange={handleSearchModel}
                                value={findYourMatch.created_at}
                                type="date"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Gender </Label>
                            <Input
                                id="exampleSelect"
                                name="gender"
                                value={findYourMatch?.gender}
                                onChange={handleSearchModel}
                                type="select"
                            >
                                <option value={''}>Select Gender</option>
                                {
                                    genderListing?.map((each) => {
                                        return <option value={each?.value}>{each?.name}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Marital Status </Label>
                            <Input
                                id="exampleSelect"
                                name="marital_status"
                                type="select"
                                value={findYourMatch?.marital_status}
                                onChange={handleSearchModel}
                            >
                                <option value={""}>Select Marital Status</option>
                                {
                                    maritalStatus?.map((each) => {
                                        return <option value={each?.value}>{each?.name}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Price Start Range </Label>
                            <Input
                                id="exampleSelect"
                                name="amount__gte"
                                type="text"
                                onChange={handleSearchModel}
                                value={findYourMatch?.amount__gte}
                                placeholder='Start Range'
                            >

                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Price End Range </Label>
                            <Input
                                id="exampleSelect"
                                name="amount__lte"
                                type="text"
                                onChange={handleSearchModel}
                                value={findYourMatch?.amount__lte}
                                placeholder='End Range'
                            >

                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Age Start Range </Label>
                            <Input
                                id="exampleSelect"
                                name="birth_age_start"
                                type="select"
                                onChange={handleSearchModel}
                                value={findYourMatch?.birth_age}
                            >
                                <option value={""}>Select Age</option>
                                {isAgeLoad ? (
                                    <ButtonLoader />
                                ) : (
                                    AgeListing?.length > 0 &&
                                    AgeListing.map((age) => (
                                        <option
                                            key={age?.name}
                                            value={
                                                age.description && JSON.parse(age.description)
                                            }
                                        >
                                            {age?.name || ""}
                                        </option>
                                    ))
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Age End Range </Label>
                            <Input
                                id="exampleSelect"
                                name="birth_age_end"
                                type="select"
                                onChange={handleSearchModel}
                                value={findYourMatch?.birth_age_end}
                            >
                                <option value={""}>Select Age</option>
                                {isAgeLoad ? (
                                    <ButtonLoader />
                                ) : (
                                    AgeListing?.length > 0 &&
                                    AgeListing.map((age) => (
                                        <option
                                            key={age?.name}
                                            value={
                                                age.description && JSON.parse(age.description)
                                            }
                                        >
                                            {age?.name || ""}
                                        </option>
                                    ))
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Height Start Range </Label>
                            <Input
                                id="exampleSelect"
                                name="hight_start"
                                value={findYourMatch?.hight_start}
                                onChange={handleSearchModel}
                                type="select"
                            >
                                <option value={""}>Select Start Height Range</option>

                                {
                                    heightOptions?.map((each) => {
                                        return <option value={each?.value}>{each?.height}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Height End Range </Label>
                            <Input
                                id="exampleSelect"
                                name="hight_end"
                                value={findYourMatch?.hight_end}
                                onChange={handleSearchModel}
                                type="select"
                            >
                                <option value={""}>Select End Height Range</option>
                                {
                                    heightOptions?.map((each) => {
                                        return <option value={each?.value}>{each?.height}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Mother Tongue </Label>
                            <Input
                                id="exampleSelect"
                                name="mother_tongue"
                                value={findYourMatch?.mother_tongue}

                                onChange={handleSearchModel}
                                type="select"
                            >
                                <option>Select Mother Tongue</option>
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
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Education </Label>
                            <Input
                                id="exampleSelect"
                                name="education"
                                type="select"
                                onChange={handleSearchModel}
                                value={findYourMatch?.education}
                            >
                                <option value={""}>Select Education</option>
                                {isEducationLoad ? (
                                    <ButtonLoader />
                                ) : (
                                    EducationQualification?.length > 0 &&
                                    EducationQualification?.map((education) => {
                                        return (
                                            <option
                                                value={
                                                    education?.description
                                                        ? JSON.parse(education?.description)
                                                        : education?.name
                                                }
                                            >
                                                {education?.name}
                                            </option>
                                        );
                                    })
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Occupation </Label>
                            <Input
                                id="exampleSelect"
                                name="occupation"
                                type="select"
                                onChange={handleSearchModel}
                                value={findYourMatch?.occupation}
                            >
                                <option>Select Occupation</option>

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
                        </FormGroup>
                    </Col>

                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Status </Label>
                            <Input
                                id="exampleSelect"
                                name="is_approve"
                                value={findYourMatch?.is_approve}
                                onChange={handleSearchModel}
                                type="select"
                            >
                                <option value={""}>select Status</option>
                                {
                                    StatusList?.map((each) => {
                                        return <option value={each.value}>{each?.name}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Income </Label>
                            <Input
                                id="exampleSelect"
                                name="annual_income"
                                type="select"
                                onChange={handleSearchModel}
                                value={findYourMatch?.annual_income}
                            >
                                <option value={""}>Select Annual Income</option>

                                {isIncomeLoad ? (
                                    <ButtonLoader />
                                ) : (
                                    IncomeRangeListing?.length > 0 &&
                                    IncomeRangeListing?.map((incomeRange) => {
                                        return (
                                            <option
                                                value={
                                                    incomeRange?.description
                                                        ? `${JSON.parse(incomeRange?.description)
                                                            ?.startRange
                                                        } - ${JSON.parse(incomeRange?.description)
                                                            ?.endRange
                                                        }`
                                                        : incomeRange?.name
                                                }
                                            >
                                                {incomeRange?.description
                                                    ? JSON.parse(incomeRange?.description)
                                                        ?.startRange +
                                                    + JSON.parse(incomeRange?.description)
                                                        ?.symbol + " - " +
                                                    JSON.parse(incomeRange?.description)
                                                        ?.endRange +
                                                    JSON.parse(incomeRange?.description)
                                                        ?.symbol
                                                    : incomeRange?.name}
                                            </option>
                                        );
                                    })
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    {/* <Col xs="12" sm="6" md="4" lg="2">
                        <FormGroup className="common-formgroup">
                            <Label> Family Income </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    Select Any
                                </option>
                                <option>
                                    Family Income
                                </option>
                                <option>
                                    Family Income
                                </option>
                            </Input>
                        </FormGroup>
                    </Col> */}
                    {/* <Col xs="12" sm="6" md="4" lg="2">
                        <FormGroup className="common-formgroup">
                            <Label> Family Employment </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    Select Any
                                </option>
                                <option>
                                    Family Employment
                                </option>
                                <option>
                                    Family Employment
                                </option>
                            </Input>
                        </FormGroup>
                    </Col> */}
                    {/* <Col xs="12" sm="6" md="4" lg="2">
                        <FormGroup className="common-formgroup">
                            <Label> Siblings </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    Select Any
                                </option>
                                <option>
                                    Siblings
                                </option>
                                <option>
                                    Siblings
                                </option>
                            </Input>
                        </FormGroup>
                    </Col> */}
                    {/* <Col xs="12" sm="6" md="4" lg="2">
                        <FormGroup className="common-formgroup">
                            <Label> Siblings Status </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    Select Any
                                </option>
                                <option>
                                    Siblings status
                                </option>
                                <option>
                                    Siblings status
                                </option>
                            </Input>
                        </FormGroup>
                    </Col> */}
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Drinking Habit </Label>
                            <Input
                                id="exampleSelect"
                                name="drinking"
                                value={findYourMatch?.drinking}
                                onChange={handleSearchModel}
                                type="select"
                            >
                                <option value={""}>Select Drinking</option>

                                {Drinking_SmokingTypeLis?.map((each) => {
                                    return <option value={each?.value}>{each?.name}</option>
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Smoking Habit </Label>
                            <Input
                                id="exampleSelect"
                                name="smoking"
                                type="select"
                                value={findYourMatch?.smoking}
                                onChange={handleSearchModel}
                            >
                                <option value={""}>Select Smoking</option>

                                {Drinking_SmokingTypeLis?.map((each) => {
                                    return <option value={each?.value}>{each?.name}</option>
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Eating Habit </Label>
                            <Input
                                id="exampleSelect"
                                name="diet"
                                type="select"
                                value={findYourMatch?.diet}
                                onChange={handleSearchModel}
                            >
                                <option value={""}>Select Diet</option>
                                {isDietLoad ? (
                                    <ButtonLoader />
                                ) : (
                                    DietListing?.length > 0 &&
                                    DietListing.map((diet) => (
                                        <option
                                            key={diet?.name}
                                            value={
                                                diet.description && JSON.parse(diet.description)
                                            }
                                        >
                                            {diet?.name || ""}
                                        </option>
                                    ))
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                   {!loggedInStaffId && <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Assigned to </Label>
                            <Input
                                id="exampleSelect"
                                name="staff"
                                type="select"
                                value={findYourMatch?.staff}
                                onChange={handleSearchModel}
                            >
                                <option value="">Select Staff</option>
                                {!isStaffLoad &&
                                    staffList?.map((each, index) => (
                                        <option key={index} value={each?.id}>
                                            {each?.user?.first_name || ""}
                                            {each?.user?.last_name}
                                        </option>
                                    ))}
                            </Input>
                        </FormGroup>
                    </Col>}
                    {/* <Col xs="12" sm="6" md="4" lg="2">
                        <FormGroup className="common-formgroup">
                            <Label> Price Range </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    Select Any
                                </option>
                                <option>
                                    Price Range
                                </option>
                                <option>
                                    Price Range
                                </option>
                            </Input>
                        </FormGroup>
                    </Col> */}
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Personalised member </Label>
                            <Input
                                id="exampleSelect"
                                name="is_personalized"
                                type="select"
                                onChange={handleSearchModel}
                                value={findYourMatch?.is_personalized}
                            >
                                {/* <option value={""}>Select Data</option> */}
                                {
                                    personalizedTypeList?.map((each) => {
                                        return <option value={each?.value}>{each?.name}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Added by </Label>
                            <Input
                                id="exampleSelect"
                                name="lead_create_by__account_type"
                                type="select"
                                onChange={handleSearchModel}
                                value={findYourMatch?.lead_create_by__account_type}
                            >
                                <option value={""}>Select Data Added by</option>
                                {
                                    BrideandGroomCreatedByList?.map((each) => {
                                        return <option value={each?.value}>{each?.name}</option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>

                    {
                        isAccountTypeValid ? isLoadedOrganizationFracnhiseList && organizationFranchiseList?.length == 0 ? <ButtonLoader /> : <Col xs="12" sm="6" md="4" lg="3" xl="2"><FormGroup className="common-formgroup">
                            <Label> {findYourMatch?.lead_create_by__account_type == "org" ? "Organization" : findYourMatch?.lead_create_by__account_type == "franchise" ? "Franchise" : ""} </Label>

                            {isLoadedOrganizationFracnhiseList ? <ButtonLoader /> : <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={isLoadedOrganizationFracnhiseList}
                                isLoading={isLoadedOrganizationFracnhiseList}
                                options={organizationFranchiseList?.map((each) => { return { label: each?.name, value: each?.id } })}
                                onChange={handleSelectType}
                                value={selectOrgFracType}
                                placeholder="Select Data"
                            />}
                        </FormGroup>
                        </Col> : null

                        // (findYourMatch?.lead_create_by__account_type != "" || findYourMatch?.lead_create_by__account_type != "admin") ?  : null

                    }
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Performance </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    Select Any
                                </option>
                                <option>
                                    Performance
                                </option>
                                <option>
                                    Performance
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Revenue generated </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    Select Any
                                </option>
                                <option>
                                    Revenue generated
                                </option>
                                <option>
                                    Revenue generated
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Paid member </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    Select Any
                                </option>
                                <option>
                                    Paid member
                                </option>
                                <option>
                                    Paid member
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <FormGroup className="common-formgroup">
                            <Label> Data with no comment </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                            >
                                <option>
                                    Select Any
                                </option>
                                <option>
                                    Data with no comment
                                </option>
                                <option>
                                    Data with no comment
                                </option>
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col xs="12" className="text-end">
                        <Button className="btn btn-outline-style1 text-dark" onClick={handleResetFilter}>Reset <BiReset /></Button>
                    </Col>
                </Row>


                {/* <ul>
            <li>
                <Button className="btn filter-button1 active" onClick={()=>setFilterValue("online")}>
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 16.523 16.535">
                            <g id="user-online" transform="translate(-11.7 -11.7)">
                                <circle id="Ellipse_15" data-name="Ellipse 15" cx="2.273" cy="2.273" r="2.273" transform="translate(23.377 17.694)" strokeWidth="0.6"/>
                                <path id="Path_13382" data-name="Path 13382" d="M23.382,114.829H22.244v-2.846a2.846,2.846,0,0,0-2.846-2.846H15.984a2.846,2.846,0,0,0-2.846,2.846v2.846H12v-2.846A3.984,3.984,0,0,1,15.984,108H19.4a3.984,3.984,0,0,1,3.984,3.984Z" transform="translate(0 -86.894)" strokeWidth="0.6"/>
                                <path id="Path_13383" data-name="Path 13383" d="M33.984,13.138a2.846,2.846,0,1,1-2.846,2.846,2.846,2.846,0,0,1,2.846-2.846m0-1.138a3.984,3.984,0,1,0,3.984,3.984A3.984,3.984,0,0,0,33.984,12Z" transform="translate(-16.293 0)" strokeWidth="0.6"/>
                            </g>
                        </svg>
                    </span>
                    <span className="text" >Online Members</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button2" onClick={()=>setFilterValue("advance")}>
                    <span className="icon">
                        <TbListSearch /> 
                    </span>
                    <span className="text" >Member Advance Search</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button3" onClick={()=>setFilterValue("member")}>
                    <span className="icon">
                        <MdOutlineKeyboardAlt />
                    </span>
                    <span className="text">Member Keyword Search</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button4" onClick={()=>setFilterValue("plan")}>
                    <span className="icon">
                        <LuUsers2 />
                    </span>
                    <span className="text">Plan wise Paid Members</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button5" onClick={()=>setFilterValue("personalized")}>
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 14.838 15.205">
                            <g id="noun-personalization-6932089" transform="translate(-13.407 -12.504)">
                                <g id="Group_14322" data-name="Group 14322" transform="translate(13.407 12.504)">
                                <path id="Path_13399" data-name="Path 13399" d="M36.289,12.5a3.485,3.485,0,1,0,3.484,3.485A3.494,3.494,0,0,0,36.289,12.5Zm0,1.267a2.217,2.217,0,1,1-2.217,2.217,2.207,2.207,0,0,1,2.217-2.217Z" transform="translate(-28.871 -12.504)"/>
                                <path id="Path_13400" data-name="Path 13400" d="M25.67,53.125a3.551,3.551,0,0,0-2.8,1.431,4.922,4.922,0,0,0-1.006,3v.636a1.911,1.911,0,0,0,1.9,1.9h7.6a1.911,1.911,0,0,0,1.9-1.9v-.636a4.92,4.92,0,0,0-1.006-3,3.551,3.551,0,0,0-2.8-1.431Zm0,1.267h3.8a2.227,2.227,0,0,1,1.8.945,3.716,3.716,0,0,1,.739,2.221v.636a.625.625,0,0,1-.636.631h-7.6a.625.625,0,0,1-.636-.631v-.636a3.714,3.714,0,0,1,.739-2.221,2.225,2.225,0,0,1,1.8-.945Z" transform="translate(-20.152 -44.889)"/>
                                <path id="Path_13401" data-name="Path 13401" d="M72.075,37.5a.549.549,0,0,0-.479.284l-.31.566-.566.31a.546.546,0,0,0,0,.957l.566.31.31.566a.546.546,0,0,0,.957,0l.309-.566.566-.31a.546.546,0,0,0,0-.957l-.566-.31-.309-.566a.546.546,0,0,0-.479-.284Z" transform="translate(-58.874 -32.432)"/>
                                <path id="Path_13402" data-name="Path 13402" d="M17.62,40.625a.424.424,0,0,0-.371.219l-.239.438-.438.239a.422.422,0,0,0,0,.74l.438.239.239.438a.423.423,0,0,0,.741,0l.239-.438.438-.239a.422.422,0,0,0,0-.74l-.438-.239-.239-.438A.422.422,0,0,0,17.62,40.625Z" transform="translate(-15.756 -34.924)"/>
                                <path id="Path_13403" data-name="Path 13403" d="M14.091,26.641l-.182.335-.335.183a.324.324,0,0,0,0,.566l.335.183.182.335a.323.323,0,0,0,.566,0l.182-.335.335-.183a.324.324,0,0,0,0-.566l-.335-.183-.182-.335a.323.323,0,0,0-.566,0Z" transform="translate(-13.407 -23.641)"/>
                                </g>
                            </g>
                        </svg>
                    </span>
                    <span className="text">Personalized Member</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button6" onClick={()=>setFilterValue("activetopaid")}>
                    <span className="icon">
                        <LuShieldCheck />
                    </span>
                    <span className="text">Member Active To Paid</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button7" onClick={()=>setFilterValue("paidfeature")}>
                    <span className="icon">
                        <RiVipCrown2Line />
                    </span>
                    <span className="text" >Member Paid To Featured</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button5"onClick={()=>setFilterValue("lapsedmembership")}>
                    <span className="icon">
                        <svg id="noun-membership-6204180" xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 21.281 15.607">
                            <path id="Path_13407" data-name="Path 13407" d="M6.256,10A4.256,4.256,0,0,0,2,14.256V21.35a4.256,4.256,0,0,0,4.256,4.256H13.35a.709.709,0,1,0,0-1.419H6.256A2.837,2.837,0,0,1,3.419,21.35V15.675H20.443v2.483a.709.709,0,1,0,1.419,0v-3.9A4.256,4.256,0,0,0,17.606,10Z" transform="translate(-2 -10)"/>
                            <path id="Path_13408" data-name="Path 13408" d="M37.152,37.616a4.508,4.508,0,0,1,6.917,0l.975,1.107a.709.709,0,0,1,0,.938l-.975,1.107a4.508,4.508,0,0,1-6.917,0l-.975-1.107a.709.709,0,0,1,0-.938Zm3.458.867a.709.709,0,1,0,.709.709A.709.709,0,0,0,40.611,38.483Z" transform="translate(-23.941 -26.778)" fillRule="evenodd"/>
                            <path id="Path_13409" data-name="Path 13409" d="M10,30.709A.709.709,0,0,1,10.709,30h2.837a.709.709,0,0,1,0,1.419H10.709A.709.709,0,0,1,10,30.709Z" transform="translate(-7.163 -22.906)"/>
                        </svg>
                    </span>
                    <span className="text">Lapsed Membership</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button6"onClick={()=>setFilterValue("forthcoming")}>
                    <span className="icon">
                        <PiCalendarStar />
                    </span>
                    <span className="text">Forthcoming Membership</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button1"onClick={()=>setFilterValue("upgrade")}>
                    <span className="icon">
                        <RiChatHistoryLine />
                    </span>
                    <span className="text">Upgrade Downgrade Plan</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button3"onClick={()=>setFilterValue("paidapproval")}>
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 11.873 17.809">
                            <g id="noun-request-6922939" transform="translate(-145.068 95.873)">
                                <g id="Group_14335" data-name="Group 14335" transform="translate(126.318 -98.999)">
                                <path id="Path_13416" data-name="Path 13416" d="M39.062,23.95a2.036,2.036,0,0,1,2-2.075h.124a2.079,2.079,0,0,1,2.036,2.118,2.111,2.111,0,0,1-1.5,2.045v.612a.594.594,0,1,1-1.187,0V25.518a.593.593,0,0,1,.594-.594h.059a.935.935,0,0,0,0-1.862h-.124a.85.85,0,0,0-.808.887.594.594,0,0,1-1.187,0Z" transform="translate(-16.454 -15.188)"/>
                                <path id="Path_13417" data-name="Path 13417" d="M47.469,53.629a.593.593,0,0,1,.594.594v.2a.594.594,0,1,1-1.187,0v-.2A.593.593,0,0,1,47.469,53.629Z" transform="translate(-22.782 -40.91)"/>
                                <path id="Path_13418" data-name="Path 13418" d="M18.75,18.559a2.375,2.375,0,0,0,2.374,2.374h7.123a2.375,2.375,0,0,0,2.374-2.374V5.5a2.375,2.375,0,0,0-2.374-2.374H21.124A2.375,2.375,0,0,0,18.75,5.5Zm10.685-2.671V5.5a1.187,1.187,0,0,0-1.187-1.187H21.124A1.187,1.187,0,0,0,19.937,5.5V15.888Zm-9.5,1.187h9.5v1.484a1.187,1.187,0,0,1-1.187,1.187H21.124a1.187,1.187,0,0,1-1.187-1.187Z" fillRule="evenodd"/>
                                </g>
                            </g>
                        </svg>
                    </span>
                    <span className="text">Paid Approval Request</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button8"onClick={()=>setFilterValue("countrywisemember")}>
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 16.875 18">
                            <g id="noun-country-6212471" transform="translate(-20 -18)">
                                <path id="Path_13419" data-name="Path 13419" d="M47.951,69.993a.894.894,0,0,0-.135,0,.755.755,0,1,0,.135,0Z" transform="translate(-19.378 -37.368)"/>
                                <path id="Path_13420" data-name="Path 13420" d="M36.038,59.719a.844.844,0,0,0,.844-.844V57.66a3.375,3.375,0,0,0-1.5-2.812L30.368,51.6a3.473,3.473,0,0,0-1.207-.526,3.375,3.375,0,0,0-2.59.484l-5.063,3.282a3.375,3.375,0,0,0-1.5,2.813v1.218a.844.844,0,0,0,1.688,0V57.66a1.688,1.688,0,0,1,.751-1.406l5.063-3.285a1.687,1.687,0,0,1,1.868,0l5.063,3.279a1.688,1.688,0,0,1,.754,1.406v1.221A.844.844,0,0,0,36.038,59.719Z" transform="translate(-0.007 -23.719)"/>
                                <path id="Path_13421" data-name="Path 13421" d="M36.031,25.594H34.287l-.042-.231a5.839,5.839,0,0,0-.942-2.27l-.132-.194,1.434-1.434a.844.844,0,0,0-1.192-1.192l-1.434,1.434-.194-.132a5.839,5.839,0,0,0-2.27-.942l-.233-.045V18.844a.844.844,0,0,0-1.687,0v1.744l-.231.042a5.839,5.839,0,0,0-2.27.942L24.9,21.7,23.465,20.27a.863.863,0,0,0-1.192,0,.844.844,0,0,0,0,1.193L23.707,22.9l-.132.194a5.839,5.839,0,0,0-.942,2.27l-.045.233H20.844a.844.844,0,0,0,0,1.688h1.727a1.721,1.721,0,0,0,1.238-.526,1.609,1.609,0,0,0,.45-.88,4.219,4.219,0,0,1,8.359,0,1.609,1.609,0,0,0,.453.889,1.721,1.721,0,0,0,1.235.517h1.727a.844.844,0,0,0,0-1.687Z"/>
                            </g>
                        </svg>
                    </span>
                    <span className="text">Country wise Members</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button7"onClick={()=>setFilterValue("commentmember")}>
                    <span className="icon">
                        <BiMessageX />
                    </span>
                    <span className="text">No Comment Members</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button9" onClick={()=>setFilterValue("homepagemember")}>
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 13.024 13.023">
                            <g id="noun-home-page-6588350" transform="translate(-29.228 -30.228)">
                                <g id="_1" data-name="1" transform="translate(23.148 24.148)">
                                <path id="Path_13424" data-name="Path 13424" d="M17.395,6.08H7.789A1.709,1.709,0,0,0,6.08,7.789v9.606A1.709,1.709,0,0,0,7.789,19.1h9.606A1.709,1.709,0,0,0,19.1,17.395V7.789A1.709,1.709,0,0,0,17.395,6.08ZM7.012,7.789a.777.777,0,0,1,.777-.777h9.606a.777.777,0,0,1,.777.777V9.415H7.012Zm11.159,9.606a.777.777,0,0,1-.777.777H7.789a.777.777,0,0,1-.777-.777V10.347H18.171ZM7.831,7.711h.944v.932H7.831Zm1.709,0h.944v.932H9.539Zm1.709,0h.944v.932h-.944Zm-.621,9.522h3.935a.932.932,0,0,0,.932-.932V13.69a.932.932,0,0,0-.388-.758l-1.97-1.414a.932.932,0,0,0-1.087,0l-1.97,1.414a.932.932,0,0,0-.388.758V16.3a.932.932,0,0,0,.932.932Zm0-3.543,1.965-1.409,1.97,1.414V16.3H10.622Z"/>
                                </g>
                            </g>
                        </svg>
                    </span>
                    <span className="text">Home Page Members</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button6"onClick={()=>setFilterValue("membershiphold")}>
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 17.905 17.904">
                            <g id="noun-hold-4518170" transform="translate(-18.002 -17.998)">
                                <path id="Path_13425" data-name="Path 13425" d="M57.786,52.654a2.238,2.238,0,0,0-3.164,0l-1.958,1.958a2.238,2.238,0,0,0,0,3.164l1.958,1.958a2.238,2.238,0,0,0,3.164,0l1.958-1.958a2.238,2.238,0,0,0,0-3.164Zm-1.584,5.5L54.244,56.2,56.2,54.237,58.161,56.2Z" transform="translate(-24.493 -24.489)"/>
                                <path id="Path_13426" data-name="Path 13426" d="M37.637,33.119v3.357H35.119a1.119,1.119,0,0,0,0,2.238h2.8a1.958,1.958,0,0,0,1.958-1.958V33.119a1.119,1.119,0,1,0-2.238,0Z" transform="translate(-11.522 -10.085)"/>
                                <path id="Path_13427" data-name="Path 13427" d="M25.413,35.769a1.094,1.094,0,0,0,1.262-1.049V34.7a1.119,1.119,0,0,0-.9-1.139,6.715,6.715,0,1,1,7.744-8.038,1.094,1.094,0,0,0,1.139.867h.053a1.1,1.1,0,0,0,1-1.307,8.953,8.953,0,1,0-10.3,10.684Z" transform="translate(0)"/>
                            </g>
                        </svg>
                    </span>
                    <span className="text">Membership on hold</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button4"onClick={()=>setFilterValue("searchpendingprofilemember")}>
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 13.606 17.461">
                            <g id="noun-profile-7003592" transform="translate(-52.193 108.016)">
                                <path id="Path_13428" data-name="Path 13428" d="M20.944,3.984A4.574,4.574,0,1,1,16.37,8.559,4.574,4.574,0,0,1,20.944,3.984ZM20.784,19.9a.77.77,0,1,1,0,1.541H14.912a.771.771,0,0,1-.771-.77,6.8,6.8,0,1,1,13.606,0,.77.77,0,0,1-.77.77H24.252a.77.77,0,0,1,0-1.541h1.9a5.263,5.263,0,0,0-10.413,0ZM23.089,6.413a3.033,3.033,0,1,0,0,4.29A3.034,3.034,0,0,0,23.089,6.413Z" transform="translate(38.052 -112)" fillRule="evenodd"/>
                            </g>
                        </svg>
                    </span>
                    <span className="text">Search Pending Profile Members</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button5" onClick={()=>setFilterValue("deleteprofile")}>
                    <span className="icon">
                        <BiUserX />
                    </span>
                    <span className="text">Delete Profile Request</span>
                </Button>
            </li>
            <li>
                <Button className="btn filter-button1" onClick={()=>setFilterValue("inquirymember")}>
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="0" stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 16.926 16.926">
                            <path id="Path_13433" data-name="Path 13433" d="M21.814,20.294l-1.048-2.551a8.409,8.409,0,0,0,1.152-4.661,8.463,8.463,0,1,0-8.839,8.839c.129.006.258.009.386.009a8.4,8.4,0,0,0,4.275-1.16l2.551,1.048.028.011a1.172,1.172,0,0,0,1.505-1.505l-.011-.028Zm-2.8-2.308.719,1.751-1.751-.719a.854.854,0,0,0-.8.079,6.708,6.708,0,0,1-4.032,1.114,6.751,6.751,0,0,1,.319-13.5q.171,0,.342.009a6.8,6.8,0,0,1,6.393,6.434,6.712,6.712,0,0,1-1.114,4.032.858.858,0,0,0-.079.8Zm-2.2-6.381a3.015,3.015,0,0,1-3.007,3.177v.347a.782.782,0,0,1-1.563,0V13.883a.782.782,0,0,1,.782-.782h.782a1.329,1.329,0,1,0-1.153-1.985.812.812,0,0,1-.7.428h-.071a.817.817,0,0,1-.724-1.2,3.009,3.009,0,0,1,5.656,1.261Zm-2.85,5.627a.938.938,0,1,1-.938-.938A.938.938,0,0,1,13.97,17.232Z" transform="translate(-5.001 -5.004)"/>
                        </svg>
                    </span>
                    <span className="text">Inquiry Members</span>
                </Button>
            </li>
        </ul> */}
            </div>
        </>
    )
}

export default BrideandGroomFilter
