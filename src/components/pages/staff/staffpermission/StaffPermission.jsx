import React, { useState } from "react";
import _ from "lodash";
import { Label } from "reactstrap";
import Permissions  from "./Permission";

const StaffPermission = ({  setSelectedPermissions }) => {
  const [permissionData, setPermissionData] = useState(
    Permissions.map(parent => ({
      ...parent,
      children: parent.children || [],
      isChecked: false,
      methods: parent.methods || []
    }))
  );
  const updatePermissionState = (updatedData, callback) => {
    setPermissionData(updatedData);
    callback && callback(updatedData);
  };
  const checkAncestors = (data, targetParentIndex) => {
    // Check if any sibling or direct method is checked
    const checkParentRecursively = (parentIndex) => {
      const parent = data[parentIndex];

      // Check if any children are checked
      const childrenChecked = parent.children.some(child =>
        child.isChecked ||
        child.methods.some(method => method.isChecked)
      );

      // Check if any direct methods are checked
      const directMethodsChecked = parent.methods.some(method => method.isChecked);

      // Update parent's checked state
      parent.isChecked = childrenChecked || directMethodsChecked;

      // If this parent's state changes, check its parent
      return parent.isChecked;
    };

    // Recursively check parents
    let currentIndex = targetParentIndex;
    while (checkParentRecursively(currentIndex)) {
      // Stop if we reach the top-level (no more parents)
      if (currentIndex === 0) break;
      currentIndex--;
    }

    return data;
  };
  const handleParentCheckbox = (parentIndex, isChecked) => {
    const updatedData = _.cloneDeep(permissionData);
    const parent = updatedData[parentIndex];

    // Check the parent, its children, and all methods
    parent.isChecked = isChecked;

    // Handle children
    parent.children?.forEach(child => {
      child.isChecked = isChecked;
      child.methods?.forEach(method => {
        method.isChecked = isChecked;
        if (typeof method.value === "object") {
          Object.keys(method.value).forEach(key => {
            method.value[key] = isChecked;
          });
        }
      });
    });

    // Handle direct methods
    parent.methods?.forEach(method => {
      method.isChecked = isChecked;
      if (typeof method.value === "object") {
        Object.keys(method.value).forEach(key => {
          method.value[key] = isChecked;
        });
      }
    });

    // Check ancestors recursively
    const ancestorsCheckedData = checkAncestors(updatedData, parentIndex);

    updatePermissionState(ancestorsCheckedData, updateSelectedPermissions);
  };
  const handleMethodCheckbox = (parentIndex, childIndex, methodIndex, isChecked) => {
    const updatedData = _.cloneDeep(permissionData);
    const parent = updatedData[parentIndex];
    const child = parent.children[childIndex];
    const method = child.methods[methodIndex];

    // Check the specific method
    method.isChecked = isChecked;

    // If method has nested values (like an object)
    if (typeof method.value === "object") {
      Object.keys(method.value).forEach(key => {
        method.value[key] = isChecked;
      });
    }

    // Check the child if any method is checked
    child.isChecked = child.methods.some(m => m.isChecked);

    // Check the parent if any child is checked
    parent.isChecked = parent.children.some(c => c.isChecked);

    updatePermissionState(updatedData, updateSelectedPermissions);
  };
  const updateSelectedPermissions = (data) => {
    const selected = [];
    data.forEach(parent => {
      // Handle children
      parent.children?.forEach(child => {
        child.methods?.forEach(method => {
          if (method.isChecked) {
            const selectedDetails = Object.fromEntries(
              Object.entries(method.value || {}).filter(([_, value]) => value)
            );

            selected.push({
              parent: parent.parent,
              feature: child.feature,
              link: child.link,
              method: method.label,
              details: selectedDetails,
            });
          }
        });
      });

      // Handle direct methods
      parent.methods?.forEach(method => {
        if (method.isChecked) {
          const selectedDetails = Object.fromEntries(
            Object.entries(method.value || {}).filter(([_, value]) => value)
          );

          selected.push({
            parent: parent.parent,
            method: method.label,
            details: selectedDetails,
            link:parent.link
          });
        }
      });
    });

    setSelectedPermissions(selected);
  };
  const handleDirectMethodCheckbox = (parentIndex, methodIndex, isChecked) => {
    const updatedData = _.cloneDeep(permissionData);
    const parent = updatedData[parentIndex];
    const method = parent.methods[methodIndex];

    method.isChecked = isChecked;

    if (typeof method.value === "object") {
      Object.keys(method.value).forEach(key => {
        method.value[key] = isChecked;
      });
    }

    // Check the parent if any direct method is checked
    parent.isChecked = parent.methods.some(m => m.isChecked);

    updatePermissionState(updatedData, updateSelectedPermissions);
  };
  return (
    <div className="department-checkbox-wrap">
      {permissionData.map((item, parentIndex) => (
        <div key={parentIndex} className="department-checkbox-box mb-4">
          <div className="department-parent-checkbox">
            <input
              className="form-check-input"
              type="checkbox"
              id={`parent-${parentIndex}`}
              checked={item.isChecked}
              onChange={(e) => handleParentCheckbox(parentIndex, e.target.checked)}
            />
            <label className="form-check-label" htmlFor={`parent-${parentIndex}`}>
              {item.parent}
            </label>
          </div>

          {/* Render direct methods */}
          {item.methods && item.methods.length > 0 && (
            <ul className="department-sub-children-wrap mt-2">
              {item.methods.map((method, methodIndex) => (
                <li
                  key={`direct-method-${method.label}`}
                  className="department-sub-children-list"
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`direct-method-${parentIndex}-${method.label}`}
                    checked={method.isChecked}
                    onChange={(e) => handleDirectMethodCheckbox(
                      parentIndex,
                      methodIndex,
                      e.target.checked
                    )}
                  />
                  <Label
                    className="form-check-label"
                    htmlFor={`direct-method-${parentIndex}-${method.label}`}
                  >
                    {method.label}
                  </Label>

                  {typeof method.value === "object" && method.isChecked && (
                    <div className="ml-4 mt-2">
                      {Object.entries(method.value).map(([key, value]) => (
                        <div key={key} className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`direct-method-${method.label}-${key}`}
                            checked={value}
                            onChange={(e) => {
                              const updatedData = _.cloneDeep(permissionData);
                              const parent = updatedData[parentIndex];
                              const method = parent.methods[methodIndex];

                              method.value[key] = e.target.checked;
                              method.isChecked = Object.values(method.value).some(val => val);

                              // Check the parent if any direct method is checked
                              parent.isChecked = parent.methods.some(m => m.isChecked);

                              updatePermissionState(updatedData, updateSelectedPermissions);
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`direct-method-${method.label}-${key}`}
                          >
                            {key}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          {/* Existing children rendering */}
          <div className="department-sub-checkbox-wrap row">
            {item?.children?.map((child, childIndex) => (
              <div key={child.id} className="col-12 col-md-6 col-lg-4 mb-3">
                {/* Existing child rendering logic remains the same */}
                <div className="department-sub-checkbox-list">
                  <div className="department-sub-checkbox-heading">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`child-${child.id}`}
                      checked={child.isChecked}
                      onChange={(e) => {
                        const updatedData = _.cloneDeep(permissionData);
                        const parent = updatedData[parentIndex];
                        const child = parent.children[childIndex];

                        child.isChecked = e.target.checked;
                        child.methods.forEach(method => {
                          method.isChecked = e.target.checked;
                          if (typeof method.value === "object") {
                            Object.keys(method.value).forEach(key => {
                              method.value[key] = e.target.checked;
                            });
                          }
                        });

                        parent.isChecked = parent.children.some(c => c.isChecked) ||
                          (parent.methods && parent.methods.some(m => m.isChecked));

                        updatePermissionState(updatedData, updateSelectedPermissions);
                      }}
                    />
                    <label className="form-check-label" htmlFor={`child-${child.id}`}>
                      {child.name}
                    </label>
                  </div>

                  {/* Existing methods rendering */}
                  <ul className="department-sub-children-wrap">
                    {child.methods.map((method, methodIndex) => (
                      <li
                        key={`${child.id}-${method.label}`}
                        className="department-sub-children-list"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`method-${child.id}-${method.label}`}
                          checked={method.isChecked}
                          onChange={(e) => handleMethodCheckbox(
                            parentIndex,
                            childIndex,
                            methodIndex,
                            e.target.checked
                          )}
                        />
                        <Label
                          className="form-check-label"
                          htmlFor={`method-${child.id}-${method.label}`}
                        >
                          {method.label}
                        </Label>

                        {/* Nested value handling remains the same */}
                        {typeof method.value === "object" && method.isChecked && (
                          <div className="ml-4 mt-2">
                            {Object.entries(method.value).map(([key, value]) => (
                              <div key={key} className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`${method.label}-${key}`}
                                  checked={value}
                                  onChange={(e) => {
                                    const updatedData = _.cloneDeep(permissionData);
                                    const parent = updatedData[parentIndex];
                                    const child = parent.children[childIndex];
                                    const method = child.methods[methodIndex];

                                    method.value[key] = e.target.checked;
                                    method.isChecked = Object.values(method.value).some(val => val);

                                    // Check the child if any method is checked
                                    child.isChecked = child.methods.some(m => m.isChecked);

                                    // Check the parent if any child is checked
                                    parent.isChecked = parent.children.some(c => c.isChecked);

                                    updatePermissionState(updatedData, updateSelectedPermissions);
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`${method.label}-${key}`}
                                >
                                  {key}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffPermission;