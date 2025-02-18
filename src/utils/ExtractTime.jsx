export default function extractTimeFromTimestamp(timestamp) {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);
    
    // Format the time using toLocaleTimeString in 24-hour format (hours and minutes only)
    const timeString = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Ensure 24-hour format
    });
    
    return timeString;
  }
  