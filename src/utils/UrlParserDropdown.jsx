const getValueBetweenMasterAndAdd = (url) => {
  // Parse the URL to get the pathname
  const parsedUrl = new URL(url);
  const pathSegments = parsedUrl.pathname.split("/").filter(Boolean); // Split and remove empty values

  // Find the 'master' segment and get the value after it
  const masterIndex = pathSegments.indexOf("master");

  // If 'master' is found and there's a value after it, return it
  if (masterIndex !== -1 && masterIndex + 1 < pathSegments.length) {
    return pathSegments[masterIndex + 1]; // Value after 'master'
  } else {
    return "No value found after master";
  }
};
export default getValueBetweenMasterAndAdd;
