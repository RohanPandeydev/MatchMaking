import React from "react";
import Wrapper from "../../../layouts/Wrapper";
import { LiaEdit } from "react-icons/lia";
import NoActiveDataFound from "../../../../utils/NoActiveDataFound";
import { Permissions } from "../staffpermission/Permission";
import PermissionRow from "./PermissionRow";

const StaffPermission = () => {
  return (
    <Wrapper>
   
      {Permissions.length == 0 ? (
        <NoActiveDataFound msg="No Data Found" />
      ) : (
        Permissions?.map((item) => {
          return <PermissionRow item={item} />;
        })
      )}

     
    </Wrapper>
  );
};

export default StaffPermission;
