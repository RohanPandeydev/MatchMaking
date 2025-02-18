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

  // console.log(accessPermission, loggedInUserRole, matchingPermissionLinks, "RBAC")
  // console.log(matchingPermissionLinks &&matchingPermissionLinks.includes(pathname), pathname);
  if (loggedInUserRole?.is_superuser) return children;
  else if (
    matchingPermissionLinks &&
    matchingPermissionLinks?.includes(pathname)
  )
    return children;
  return <Navigate to="/denied" />;
};


// NEW rbac LOGIC 

export const IsAccessible = ({ method, route, children }) => {

  const accessPermission =
    (StorageData?.getUserData() &&
      StorageData?.getUserData()?.permission) ||
    [];
  const loggedInUserRole =
    (StorageData?.getUserData() && StorageData?.getUserData()) || "";

  // console.log(accessPermission, loggedInUserRole, "Superuser", method, route)

  if (loggedInUserRole.is_superuser) return children

  const methodCheck = checkMethodsAndRoute(accessPermission.content, method, route)
  // console.log(accessPermission, loggedInUserRole, "NotSuperuser", methodCheck)
  if (methodCheck) {
    return children;
  }
  return <Navigate to="/denied" />;
}
// Method Checking
export const IsAccessibleMethod = ({ method, route, children }) => {
  const accessPermission =
    (StorageData?.getUserData() &&
      StorageData?.getUserData()?.permission) ||
    [];
  const loggedInUserRole =
    (StorageData?.getUserData() && StorageData?.getUserData()) || "";


  // console.log(accessPermission, loggedInUserRole, "Superuser", method, route)

  if (loggedInUserRole.is_superuser) return children

  // console.log(method, route, "=====123456")
  if (!method || !route) return false
  const methodCheck = checkMethodsAndRoute(accessPermission.content, method, route)
  // console.log("NotSuperuser", methodCheck)
  if (methodCheck) {
    return children;
  }
  return false;
};
function checkMethodsAndRoute(data, method, route) {
  if (!data) return
  // Loop through each item in the data array
  for (const item of data) {
    // Check if "Read" exists in parent methods and the route matches the link
    if (item.methods?.length > 0) {
      for (const methodGroup of item.methods) {
        console.log("Chat788", method, route, methodGroup)
        const check = methodGroup.name.toLowerCase() === method.toLowerCase() || methodGroup.method.includes(method.toLowerCase())

        if (check) {
          // /^\/bridengroom\/customer(?:\/.*)?$/;
          const matchUrl = new RegExp(`^${item.link}(?:\/.*)?$`);
          if (matchUrl.test(route)) {
            return true;
          }
        }
      }
    }
    // Check children for the same conditions
    if (item.children?.length > 0) {
      for (const child of item.children) {
        if (child.methods) {
          for (const methodGroup of child.methods) {
            const check = methodGroup.name.toLowerCase() === method.toLowerCase() || methodGroup.method
              .map(m => m.toLowerCase()) // Convert all to lowercase
              .includes(method.toLowerCase()); // Check if it includes the method

            console.log(check, "Chat788", method, route, methodGroup)
            if (check) {
              const matchUrl = new RegExp(`^${child.link}(?:\/.*)?$`);
              if (matchUrl.test(route)) {
                return true;
              }

            }
          }
        }
      }
    }
  }

  // Return false if no match is found
  return false;
}






// Bride Member Share 
// Method Checking
export const IsAccessibleMethodBMSPage = ({ method, name, route, children }) => {
  const accessPermission =
    (StorageData?.getUserData() &&
      StorageData?.getUserData()?.permission) ||
    [];
  const loggedInUserRole =
    (StorageData?.getUserData() && StorageData?.getUserData()) || "";



  if (loggedInUserRole.is_superuser) return children

  // console.log("NotSuperuser", method, name, route)
  if (!method || !route) return false
  const methodCheck = checkMethodsAndRouteBMS(accessPermission.content, name, method, route)
  // console.log("NotSuperuser", methodCheck)
  if (methodCheck) {
    return children;
  }
  return <Navigate to="/denied" />;
};
export const IsAccessibleMethodBMS = ({ method, name, route, children }) => {
  const accessPermission =
    (StorageData?.getUserData() &&
      StorageData?.getUserData()?.permission) ||
    [];
  const loggedInUserRole =
    (StorageData?.getUserData() && StorageData?.getUserData()) || "";



  if (loggedInUserRole.is_superuser) return children

  // console.log("NotSuperuser", method, name, route)
  if (!method || !route) return false
  const methodCheck = checkMethodsAndRouteBMS(accessPermission.content, name, method, route)
  // console.log("NotSuperuser", methodCheck)
  if (methodCheck) {
    return children;
  }
  return false;
};
export function checkMethodsAndRouteBMS(data, name, method, route) {
  if (!data) return false;

  // Loop through each item in the data array
  for (const item of data) {
    // Prioritize matching the name first
    if (item.name?.toLowerCase() === name.toLowerCase()) {
      console.log("Matched Name:", name, item);

      // Check if "Read" exists in parent methods and the route matches the link
      if (item.methods?.length > 0) {
        for (const methodGroup of item.methods) {
          // console.log("Chat788", method, route, methodGroup);

          const check =
            methodGroup.name.toLowerCase() === name.toLowerCase() &&
            methodGroup.method
              .map((m) => m.toLowerCase())
              .includes(method.toLowerCase());

          if (check) {
            const matchUrl = new RegExp(`^${item.link}(?:\/.*)?$`);
            if (matchUrl.test(route)) {
              return true;
            }
          }
        }
      }
    }

    // Check children for the same conditions
    if (item.children?.length > 0) {
      for (const child of item.children) {
        // Prioritize matching the child name
        // console.log(child, name, "1234567890")
        // console.log("Matched Child Name:", name, child);

        if (child.methods?.length > 0) {
          for (const methodGroup of child.methods) {

            const check =
              methodGroup.name.toLowerCase() === name.toLowerCase() &&
              methodGroup.method
                .map((m) => m.toLowerCase())
                .includes(method.toLowerCase());
            // console.log(
            //   check,
            //   "Chat788",
            //   method,
            //   route,
            //   name,
            //   methodGroup
            // );

            if (check) {
              const matchUrl = new RegExp(`^${child.link}(?:\/.*)?$`);
              if (matchUrl.test(route)) {
                return true;
              }
            }
          }
        }

      }
    }
  }

  // If no matches are found
  return false;
}