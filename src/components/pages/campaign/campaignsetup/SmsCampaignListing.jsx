
import React, { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ValidateAuthenticationKey from '../../../../utils/ValidationAuthenticationKey';
import Swal from 'sweetalert2';
import Loader from '../../../../utils/Loader/Loader';
import CampaignServices from '../../../../services/CampaignServices'
import parse from 'html-react-parser'
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Modal, ModalBody, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane } from 'reactstrap'
import ButtonLoader from '../../../../utils/Loader/ButtonLoader';
import { useLocation, useNavigate } from 'react-router';
import Pagination from '../../../../utils/Pagination';
import NoActiveDataFound from '../../../../utils/NoActiveDataFound';
import { IsAccessibleMethod } from '../../../../guard/Rbac';
import PermissionSets from '../../../../guard/Method';

function SmsCampaignListing({ currentSelectedTab, pageNumber, limit, setPageNumber }) {
  const queryClient = useQueryClient()




  const {
    data: SmsCampaignList,
    isLoading: isSmsCampaignListLoad,
    isError,
    error,
    refetch,
  } = useQuery(
    ["sms-campaign-listing", pageNumber, currentSelectedTab],
    () => {

      let queryParams = [];

    
      if (pageNumber) {
        queryParams.push('page=' + pageNumber)
      }
      if (limit) {
        queryParams.push('page_size=' + limit)
      }


      const formattedQueryParams = queryParams.length ? '?' + queryParams.join('&') : '';

      if (currentSelectedTab == "brideandgroom") {
        return CampaignServices.SmsCampaignListBrideandgroom(formattedQueryParams)
      }
      else if (currentSelectedTab == "organization" || currentSelectedTab == "franchise") {
        return CampaignServices.SmsCampaignListTenant(formattedQueryParams)
      }
      return []
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {




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


  const handleStartCampaign = (e, id) => {
    Swal.fire({
      title: "Are you sure you want to start the campaign?",
      text: "Starting the campaign will send emails to the selected recipients. You can also save it as a draft to review later.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, start campaign",
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with sending the campaign
        SmsCampaignSend.mutate({ id: id });
      } else {
        // Handle saving as draft

      }
    });

  }




  const SmsCampaignSend = useMutation(
    (data) => {
      if (currentSelectedTab == "brideandgroom") {
        return CampaignServices.SmsCampaignSendBrideandgroom(data)
      }
      else if (currentSelectedTab == "organization" || currentSelectedTab == "franchise") {
        return CampaignServices.SmsCampaignSendTenant(data)
      }
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          title: "Succssfull",
          text: "Send Successfully ",
          icon: "success",
        });


        // setId("")
        setPageNumber(1)
        queryClient.refetchQueries(["sms-campaign-listing", 1])



      },
      onError: (err) => {
        const msg = !!err.response?.data?.detail
          ? err.response?.data?.detail
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


  // console.log(SmsCampaignList,"SmsCampaignList")
  return (
    <>
      <div className="common-table">
        {isSmsCampaignListLoad ? <Loader /> : SmsCampaignList?.data?.results?.length == 0 ? <NoActiveDataFound msg={"No data found"} /> : <Table responsive>
          <thead>
            <tr>

              <th>Subject</th>
              <th>Title</th>
              <th>Body</th>
              <th></th>
            </tr>
            <tr>
              <br />
            </tr>
          </thead>
          <tbody>


            {
              SmsCampaignList?.data?.results?.map((each) => {
                return <>
                  <tr>

                    <td>{each?.subject || "N/A"}</td>
                    <td>{each?.template?.title || "N/A"}</td>
                    <td>{each?.template?.body && parse(each?.template?.body) || "N/A"}</td>
                     <IsAccessibleMethod
                                          method={Object.keys(PermissionSets.Campign.Campaign_Listing.Campaign)[0]}
                                          route={window.location.pathname}
                    
                                        >
                    <td>
                      <Button disabled={SmsCampaignSend?.isLoading} type='click' onClick={(e) => handleStartCampaign(e, each?.id)} className='btn btn-style1'>{SmsCampaignSend?.isLoading ? <ButtonLoader /> : "Start Campaign"}</Button>
                    </td>
                    </IsAccessibleMethod>
                  </tr>

                </>
              })
            }
          </tbody>
        </Table>}
      </div>
      {!isSmsCampaignListLoad && SmsCampaignList?.data?.results?.length > 0 && (
        <Pagination count={SmsCampaignList?.data?.count || 10} pageSize={limit} />
      )}
    </>
  )
}

export default SmsCampaignListing