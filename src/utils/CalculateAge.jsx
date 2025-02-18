export default function calculateAgeByDateOfBirth(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // If the birth month has not yet occurred this year, subtract one year from the age
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}






export function calculateDOB(age) {
    if(!age)return
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthYear = currentYear - age;
  
    // Set the birth date to January 1 of the calculated year
    const dob = new Date(birthYear, 0, 1);
  
    // Format the date as "YYYY-MM-DD"
    const formattedDOB = dob.toISOString().split("T")[0];
  
    return formattedDOB;
  }