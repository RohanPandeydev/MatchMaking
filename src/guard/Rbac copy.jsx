import { Navigate, useNavigate } from "react-router-dom";
import StorageData from "../helper/storagehelper/StorageData";

// Method Checking with page checking
const matchingLinkPermission = (children, pathname, methodName) => {
  const accessPermission =
    (StorageData?.getUserData() &&
      StorageData?.getUserData()?.department?.permissions) ||
    [];
  const loggedInUserRole =
    (StorageData?.getUserData() && StorageData?.getUserData()) || "";

  // console.log(accessPermission,"AccessPermission")

  const matchingPermissionLinks = accessPermission?.reduce((acc, perm) => {
    perm.children.forEach((child) => {
      acc.push(child.link); // Collect all links from accessPermission
    });
    return acc;
  }, []);
  const permission = accessPermission.find((ele) => {
    const matchingChild = ele?.children?.find((each) => each?.link == pathname);
    console.log(matchingChild, pathname, methodName, "Matching Child");
    if (matchingChild) {
      const hasMethodAccess = matchingChild?.methods?.some(
        (method) => method?.value == methodName
      );
      return hasMethodAccess;
    }
    return false;
  });

  if (!permission) {
    // Redirect if no permission is found
    return false;
  }

  // Return children if permission is valid
  return children;
};
// Page Checking
export const IsAccessiblePage = ({ children, pathname }) => {
  const accessPermission =
    (StorageData?.getUserData() &&
      StorageData?.getUserData()?.permissions) ||
    [];
  const loggedInUserRole =
    (StorageData?.getUserData() && StorageData?.getUserData()) || "";

  // console.log(accessPermission,"AccessPermission")

  const matchingPermissionLinks = accessPermission?.reduce((acc, perm) => {
    perm.children.forEach((child) => {
      acc.push(child.link); // Collect all links from accessPermission
    });
    return acc;
  }, []);
  //   console.log(matchingPermissionLinks &&matchingPermissionLinks.includes(pathname), pathname);
  if (loggedInUserRole?.is_superuser) return children;
  else if (
    matchingPermissionLinks &&
    matchingPermissionLinks?.includes(pathname)
  )
    return children;
  return <Navigate to="/denied" />;
};
// Method Checking
export const IsAccessibleMethod = ({ children, pathname, methodName }) => {
  const loggedInUserRole =
    (StorageData?.getUserData() && StorageData?.getUserData()) || "";

  if (loggedInUserRole?.is_superuser) return children;

  return matchingLinkPermission(children, pathname, methodName);
};
