import calculateAgeByDateOfBirth from "./CalculateAge";

function isKeyValueMatch(obj, key, value) {
  console.log(obj, key, value, "OBJ");

  // Corrected comparison for "gender"
  if (key == "gender") {
    return obj[key] == value;
  }

  // Handle specific case for age range comparison
  if (key == "date_of_birth" && typeof value === "object") {
    const { partner_age_min, partner_age_max } = value;

    if (obj.hasOwnProperty("date_of_birth")) {
      const age = calculateAgeByDateOfBirth(obj.date_of_birth);
      return age >= partner_age_min && age <= partner_age_max;
    }
    return false;
  }

  // Check annual income range
  if (key == "annual_income" && typeof value == "object") {
    const { partner_annual_income_start, partner_annual_income_end } = value;

    if (obj.hasOwnProperty("annual_income")) {
      const [incomeStart, incomeEnd] = obj.annual_income
        .split("-")
        .map(parseFloat);
      return (
        incomeStart >= partner_annual_income_start &&
        incomeEnd <= partner_annual_income_end
      );
    }
    return false;
  }

  // Check hight range
  if (key === "hight" && typeof value === "object") {
    const { partner_hight_min, partner_hight_max } = value;

    if (obj.hasOwnProperty("hight")) {
      const hight = parseFloat(obj.hight);
      return hight >= partner_hight_min && hight <= partner_hight_max;
    }
    return false;
  }

  // Standard key-value check for specific "looking_for" case
  if (key == "looking_for") {
    return obj.hasOwnProperty(key) && obj[key] == value;
  }

  // Standard key-value check if no specific conditions apply
  return obj.hasOwnProperty(key) && obj[key] == value;
}

export default isKeyValueMatch;

export function calculateMatchPercentage(obj, criteria) {
  let matchCount = 0;
  let totalTraits = Object.keys(criteria).length;

  for (let key in criteria) {
    if (isKeyValueMatch(obj, key, criteria[key])) {
      matchCount++;
    }
  }

  return (matchCount / totalTraits) * 100;
}
