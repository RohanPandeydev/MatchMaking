import React, { useEffect, useState, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import StorageData from "../../helper/storagehelper/StorageData";
import SideBarListing from "../../utils/SideBarListing";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../utils/Loader/Loader";
import UserServices from "../../services/UserServices";

const LeftSidebar = ({ toggleMenu }) => {
  const userToken = StorageData?.getToken();
  const [leftSidebarListing, setLeftSidebarListing] = useState([]);
  const [activeParent, setActiveParent] = useState(null);
  const location = useLocation();

  const handleParentClick = (parent) => {
    setActiveParent((prev) => (prev === parent ? null : parent));
  };

  const filterSidebarByPermissions = useMemo(() => {
    return (SideBarListing, userPermission) => {
      // Prevent unnecessary filtering if no permissions exist
      if (!userPermission?.content?.length) return SideBarListing;

      return SideBarListing.filter((sidebarItem) => {
        // Find matching permission for this parent
        const matchedParent = userPermission.content.find(
          (perm) => {
            // Create a case-insensitive regex that matches variations
            const permRegex = new RegExp(perm.parent, 'i');
            return permRegex.test(sidebarItem.parent);
          }
        );

        // If no matching parent, return false
        if (!matchedParent) return false;
        if (matchedParent.children.length == 0) {
          return matchedParent.link == sidebarItem.link
        }

        // For items with children, filter children based on permissions
        sidebarItem.children = sidebarItem.children.filter((child) =>
          matchedParent.children.some(
            (permChild) => permChild.link === child.link
          )
        );

        // Keep parent if it has matching children
        return sidebarItem.children.length > 0;
      });
    };
  }, []); // Empty dependency array ensures this is created only once

  const { data, isLoading, isError } = useQuery(
    ["userdetails-left-side-bar", userToken],
    () => UserServices.getUserDetails(),
    {
      enabled: !!userToken,
      refetchOnWindowFocus: true,
      staleTime: false,
      onSuccess: (responseData) => {
        const userData = responseData?.data?.user || responseData?.data;
        const userPermission = responseData?.data?.permission;

        if (!userData) return;

        let filteredSidebar = [];

        // Filter the sidebar based on permissions
        if (!userData.is_superuser && userPermission?.content) {
          filteredSidebar = filterSidebarByPermissions(SideBarListing, userPermission);
        } else {
          filteredSidebar = SideBarListing;
        }

        // Only update if the filtered sidebar has actually changed
        setLeftSidebarListing(prevListing => {
          const isEqual = JSON.stringify(prevListing) === JSON.stringify(filteredSidebar);
          return isEqual ? prevListing : filteredSidebar;
        });
      },
      onError: (err) => {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || err?.message,
          icon: "error",
        });
      },
    }
  );

  useEffect(() => {
    // Set the active parent based on the current path
    leftSidebarListing?.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (child.link === location.pathname) {
            setActiveParent(item.parent);
          }
        });
      } else if (item.link === location.pathname) {
        setActiveParent(item.parent);
      }
    });
  }, [location.pathname, leftSidebarListing]);

  return (
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
          {leftSidebarListing.map((item) => {
            const isParentActive =
              activeParent === item.parent ||
              (item.children &&
                item.children.some((child) =>
                  location.pathname.toLowerCase().includes(child.link.toLowerCase())
                ));

            return (
              <li className="nav-item" key={item.parent}>
                {item.children ? (
                  <>
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      href={`#${item.parent.replace(/\s+/g, "-")}`}
                      aria-expanded={isParentActive}
                      aria-controls={item.parent.replace(/\s+/g, "-")}
                      onClick={() => handleParentClick(item.parent)}
                    >
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-title">{item.parent}</span>
                      <i className="menu-arrow">
                        <FiChevronRight />
                      </i>
                    </a>
                    <div
                      className={`collapse ${isParentActive ? "show" : ""}`}
                      id={item.parent.replace(/\s+/g, "-")}
                    >
                      <ul className="nav flex-column sub-menu">
                        {item.children.map((child) => (
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
                  </>
                ) : (
                  <NavLink
                    className="nav-link"
                    to={item.link}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "#F8615E" : "",
                      color: isActive ? "#fff" : "#000",
                    })}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-title">{item.parent}</span>
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LeftSidebar;