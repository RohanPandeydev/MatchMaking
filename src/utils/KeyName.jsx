import extractTimeFromTimestamp from "./ExtractTime";

const  keyNames = {
    email: "Email",
    first_name: "First Name",
    last_name: "Last Name",
    is_valid_email: "Valid Email",
    is_priority: "Priority",
    gender: "Gender",
    marital_status: "Marital Status",
    num_of_child: "No Of Children",
    living_with_me: "Children Living Status",
    mother_tongue: "Mother Tongue",
    date_of_birth: "Date Of Birth",
    birth_place: "Birth Place",
    birth_time: "Birth Time",
    profile_create_by: "Profile Created By",
    taiking_head: "Talking Head",
    description: "Description",
    religion: "Religion",
    caste: "Caste",
    manglik: "Manglik",
    gothra: "Gothra",
    education: "Education",
    education_details: "Education Details",
    occupation: "Occupation",
    employed_in: "Employed In",
    annual_income: "Annual Income",
    country: "Country",
    state: "State",
    city: "City",
    residence_status: "Residence Status",
    phone_code: "Phone Code",
    phone: "Phone Number",
    father_name: "Father's Name",
    profile_text: "Profile Text",
    num_of_brother: "No Of Brothers",
    num_of_sister: "No Of Sisters",
    hight: "Height",
    weight: "Weight",
    complexion: "Complexion",
    body_type: "Body Type",
    smoking: "Smoking",
    drinking: "Drinking",
    diet: "Diet",
    looking_for: "Looking For",
    partner_complexion: "Partner's Complexion",
    partner_age_min: "Partner's Minimum Age",
    partner_age_max: "Partner's Maximum Age",
    partner_hight_min: "Partner's Minimum Height",
    partner_hight_max: "Partner's Maximum Height",
    partner_mother_tongue: "Partner's Mother Tongue",
    partner_religion: "Partner's Religion",
    partner_caste: "Partner's Caste",
    partner_education: "Partner's Education",
    partner_annual_income: "Partner's Annual Income",
    partner_country: "Partner's Country",
    partner_residence_status: "Partner's Residence Status",
    partner_gender: "Partner's Gender",
    partner_marital_status: "Partner's Marital Status",
  };
  function flattenObject(obj, parentKey = "", result = {}) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = parentKey ? `${parentKey} ${key}` : key; // Replace dot with space for key names
        if (typeof obj[key] === "object" && obj[key] !== null) {
          // Recursive call for nested objects
          flattenObject(obj[key], newKey, result);
        } else {
          result[newKey] = obj[key];
        }
      }
    }
    return result;
  }

  function compareObjects(obj1, obj2) {
    // Flatten both objects
    const flatObj1 = flattenObject(obj1);
    const flatObj2 = flattenObject(obj2);

    let result = "";

    // Define a map for unit representation
    const unitMap = {
      height: "ft", // Apply to any key that includes "height"
      weight: "kg",
    };

    // Utility function to convert string to Pascal Case
    const toPascalCase = (str) => {
      return str
        .replace(/_/g, " ") // Replace underscores with spaces
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
    };

    for (let key in flatObj1) {
      // Correct misspelled keys using keyNames or fallback to original key
      const correctedKey = keyNames[key] || key;

      if (flatObj2.hasOwnProperty(key)) {
        // Remove underscores and convert to Pascal Case for key names
        const formattedKey = toPascalCase(correctedKey);

        // Extract values from both objects
        let value1 = flatObj1[key];
        let value2 = flatObj2[key];

        // Convert value to Pascal Case
        if (typeof value1 === "string") value1 = toPascalCase(value1);
        if (typeof value2 === "string") value2 = toPascalCase(value2);

        if (key === "birth_time") {
          value1 = extractTimeFromTimestamp(value1);
          value2 = extractTimeFromTimestamp(value2);
        } else {
          // Convert boolean values to Yes/No
          value1 =
            typeof value1 === "boolean" ? (value1 ? "Yes" : "No") : value1;
          value2 =
            typeof value2 === "boolean" ? (value2 ? "Yes" : "No") : value2;

          // Add units for keys containing "height" or "weight"
          if (/height/i.test(correctedKey)) {
            value1 = `${value1} ${unitMap["height"]}`;
            value2 = `${value2} ${unitMap["height"]}`;
          } else if (/weight/i.test(correctedKey)) {
            value1 = `${value1} ${unitMap["weight"]}`;
            value2 = `${value2} ${unitMap["weight"]}`;
          }
        }

        // Build the result as HTML with colored values
        result += ` <tr>
                      <td>
                        <div className="name">${formattedKey}</div>
                      </td>
                      <td>
                        <div className="change">
                          ${value2}
                        </div>
                      </td>
                      <td>
                        <div className="changes">${value1}</div>
                      </td>
                    </tr>`;
      }
    }

    return result;
  }
  export default compareObjects