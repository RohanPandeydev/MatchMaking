import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import StorageData from "../../helper/storagehelper/StorageData";
import SideBarListing from "../../utils/SideBarListing";
import customContext from "../../contexts/Context";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../utils/Loader/Loader";
import UserServices from "../../services/UserServices";

const LeftSidebar = ({ toggleMenu }) => {
  const { userData } = customContext();
  const userToken = StorageData?.getToken();
  const [leftSidebarListing, setLeftSidebarListing] = useState([]);
  const [activeParent, setActiveParent] = useState(null);
  const location = useLocation();
  const handleParentClick = (parent) => {
    setActiveParent((prev) => (prev === parent ? null : parent));
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["userdetails-left-side-bar", userToken, location.pathname],
    () => UserServices.getUserDetails(),
    {
      enabled: !!userToken, // Enable query only if token exists
      refetchOnWindowFocus: true, // Avoid unnecessary refetch
      staleTime: false,
      onSuccess: (responseData) => {
        console.log(responseData?.data, "responseData?.data");

        const userData = responseData?.data?.user || responseData?.data;
        const userDepartment = responseData?.data;
        if (!userData) return;

        let sideBarValue;

        if (userData.is_superuser) {
          // If the user is a superuser, show the entire sidebar
          sideBarValue = SideBarListing;
        } else if (userDepartment?.department?.permissions) {
          // Filter the sidebar based on the user's permissions
          sideBarValue = SideBarListing?.filter((ele) => {
            return userDepartment.department.permissions.some(
              (perm) => perm.parent === ele.parent
            );
          });
        }

        setLeftSidebarListing(() => sideBarValue || []);
      },
      onError: (err) => {
        // Show error message and handle errors
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  useEffect(() => {
    if (isLoading || leftSidebarListing?.length === 0) {
      return;
    }

    const userData = data?.data?.user || data?.data;
    const userDepartment = data?.data;
    if (!userData) return;

    // Collect matching permission links if the user is not a superuser
    const matchingPermissionLinks = userDepartment?.department?.permissions?.reduce(
      (acc, perm) => {
        perm.children.forEach((child) => {
          acc.push(child.link);
        });
        return acc;
      },
      []
    );

    // Filter sidebar items based on whether the user is a superuser or not
    let filteredSideBarListing;
    if (userData.is_superuser) {
      // Show all sidebar items for superuser
      filteredSideBarListing = SideBarListing;
    } else {
      // Filter sidebar items based on permissions for non-superusers
      filteredSideBarListing = SideBarListing?.filter((each) => {
        if (each.children) {
          each.children = each.children.filter((child) =>
            matchingPermissionLinks.includes(child.link)
          );
          return each.children.length > 0; // Keep the parent if it has any matching children
        } else {
          if (each?.link === "/chat") {
            return true;
          }
          return matchingPermissionLinks.includes(each.link); // Check parent link
        }
      });
    }

    // Update the leftSidebarListing with the filtered data (or all for superuser)
    setLeftSidebarListing(() => filteredSideBarListing);

    // Find the active parent based on the current path
    filteredSideBarListing?.forEach((each) => {
      if (each.children) {
        each.children.forEach((child) => {
          if (child.link === location.pathname) {
            setActiveParent(each.parent);
          }
        });
      } else if (each.link === location.pathname) {
        setActiveParent(each.parent);
      }
    });
  }, [location.pathname, isLoading, leftSidebarListing?.length, data?.data]);

  return (
    <>
      <div className={toggleMenu ? "left-sidebar open" : "left-sidebar"}>
        {isLoading ? (
          <Loader />
        ) : (
          <ul className="sidebarnav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#F8615E" : "",
                  color: isActive ? "#fff" : "#000",
                })}
              >
                <span className="menu-icon">
                  <RxDashboard />{" "}
                </span>{" "}
                Dashboard
              </NavLink>
            </li>
            {leftSidebarListing?.length > 0 &&
              leftSidebarListing?.map((each) => {
                const isParentActive =
                  activeParent === each.parent ||
                  (each.children &&
                    each.children.some((child) =>
                      window.location.pathname
                        .toLowerCase()
                        .includes(child.link.toLowerCase())
                    )) ||
                  (!each.children &&
                    window.location.pathname
                      .toLowerCase()
                      .includes(each.link?.toLowerCase()));

                return (
                  <li className="nav-item" key={each.parent}>
                    {each.children ? (
                      <a
                        className="nav-link"
                        data-bs-toggle="collapse"
                        href={`#${each.parent.replace(/\s+/g, "-")}`}
                        aria-expanded={isParentActive}
                        aria-controls={each.parent.replace(/\s+/g, "-")}
                        onClick={() => handleParentClick(each.parent)}
                      >
                        <span className="menu-icon">{each.icon}</span>
                        <span className="menu-title">{each.parent}</span>
                        <i className="menu-arrow">
                          <FiChevronRight />
                        </i>
                      </a>
                    ) : (
                      <NavLink
                        className="nav-link"
                        to={each.link}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? "#F8615E" : "",
                          color: isActive ? "#fff" : "#000",
                        })}
                      >
                        <span className="menu-icon">{each.icon}</span>
                        <span className="menu-title">{each.parent}</span>
                      </NavLink>
                    )}

                    {each.children && (
                      <div
                        className={`collapse ${isParentActive ? "show" : ""}`}
                        id={each.parent.replace(/\s+/g, "-")}
                      >
                        <ul className="nav flex-column sub-menu">
                          {each.children.map((child) => (
                            <li className="nav-item" key={child.id}>
                              <NavLink
                                className="nav-link"
                                to={child.link}
                                style={({ isActive }) => ({
                                  color: isActive ? "#F8615E" : "#000",
                                })}
                              >
                                {child.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </>
  );
};

export default LeftSidebar;
