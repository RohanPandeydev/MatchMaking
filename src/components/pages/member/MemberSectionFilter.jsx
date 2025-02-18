import React from 'react'
import ButtonLoader from '../../../utils/Loader/ButtonLoader';
import { FormGroup, Input, Label } from 'reactstrap';
import SubscriptionServices from '../../../services/SubscriptionServices';
import ValidateAuthenticationKey from '../../../utils/ValidationAuthenticationKey';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const MemberSectionFilter = ({ countryName, isCountryLoad, handleCountryChange, isLoaded, isLoadState, stateListDropdown, isCityLaod, cityListDropdown, memberList, handleCityName, handleStateChange, handleLimit, limit
    , selectAll, handleSelectAll, stateName, cityName, countryList, type, membertype, accountTypeList, DataType, AccountStatus, memberType, handleChangeSearch, searchValue, typeVerification }) => {


    const {
        data: organizationList,
        isLoading: isLoadedOrganizationList,
        isError,
        error,
        refetch,
    } = useQuery(
        [`subscription-${membertype}-plan`],
        () =>
            SubscriptionServices.getSubscriptionOrganizationList(
                `?subscriber_type=${membertype}`
            ),
        {
            refetchOnWindowFocus: false,
            select: (data) => {
                console.log("DataOrganization", data?.data);
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
    return (
        <>
            <ul>


                <li className="select-all">
                    <FormGroup className="common-formgroup">
                        {/* <Label> Name/Email/Code/Phone/</Label> */}
                        <Input
                            id=""
                            name="search"
                            value={searchValue?.search}
                            onChange={handleChangeSearch}
                            placeholder="Search Name/Email/Code/Phone/"
                            type="text"
                        />
                    </FormGroup>
                </li>
                

                {/* Bride and Groom */}
                {/* <li className="select-staff-dropdown">
                    <Input
                        id=""
                        type="select"
                        value={countryName}
                        onChange={handleCountryChange}
                        disabled={isCountryLoad}
                    >
                        <option value={""}>Select Bride and groom Type</option>

                        {
                            DataType?.map((each) => {
                                return <option value={each}>{each?.name}</option>
                            })
                        }

                    </Input>
                </li> */}
                <li className="select-staff-dropdown">
                    <Input
                        id=""
                        type="select"
                        name="subscription"
                        value={searchValue?.subscription}
                        onChange={handleChangeSearch}
                    >
                        <option value={""}>Select {type} Type</option>

                        {
                            memberType?.map((each) => {
                                return <option value={each?.value}>{each?.name}</option>
                            })
                        }

                    </Input>
                </li>



                {/* <li className="select-all">
                    <FormGroup className="mb-0 mb-sm-0">
                        <Input
                            id="select-all"
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                        />
                        <Label for="select-all">Verified {type}</Label>
                    </FormGroup>
                </li> */}
                <li className="select-staff-dropdown">
                    <Input
                        id=""
                        type="select"
                        name="is_verified"
                        value={searchValue?.is_verified}
                        onChange={handleChangeSearch}
                    >
                        <option value={""}>Select {type} Status</option>

                        {
                            typeVerification?.map((each) => {
                                return <option value={each?.value}>{each?.name}</option>
                            })
                        }

                    </Input>
                </li>
                <li className="select-staff-dropdown">
                    <Input
                        id=""
                        type="select"
                        name="subscription__name"
                        value={searchValue?.subscription__name}
                        onChange={handleChangeSearch}
                    >
                        <option value={""}>Select Plan</option>
                        {isLoadedOrganizationList ? (
                            <ButtonLoader />
                        ) : (
                            organizationList?.length > 0 &&
                            organizationList.map((each) => (
                                <option
                                    key={each?.id}
                                    value={each?.id || ""}
                                >
                                    {each?.name || ""}
                                </option>
                            ))
                        )}
                    </Input>
                </li>


                {
                 
                }
                
                <li className="select-staff-dropdown">
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
                                    value={country?.name || ""}
                                >
                                    {country?.name || ""}
                                </option>
                            ))
                        )}
                    </Input>
                </li>

                <li className="select-staff-dropdown">
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
                                    <option value={each?.name}>
                                        {each?.name || ""}
                                    </option>
                                );
                            })
                        )}
                    </Input>
                </li>

                <li className="select-staff-dropdown">
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
                </li>
            </ul>
        </>
    )
}

export default MemberSectionFilter