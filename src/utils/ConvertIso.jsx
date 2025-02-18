function convertToISO(date, time) {
    // Ensure date and time are in the correct format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new Error('Date must be in YYYY-MM-DD format');
    }
    if (!/^\d{2}:\d{2}$/.test(time)) {
        throw new Error('Time must be in HH:mm format');
    }
    
    // Combine date and time
    const datetime = `${date}T${time}:00Z`;

    // Return ISO 8601 formatted datetime
    return datetime;
}
export default convertToISO