
const validateCsvFile = (file, state, setState) => {
    // Reset previous errors
    const newState = { ...state, fileError: '' };
  
    // Check if file exists
    if (!file) {
      setState({ ...newState, fileError: 'No file selected' });
      return false;
    }
  
    // Check file type (must be CSV)
    const isCSV = file.name.toLowerCase().endsWith('.csv');
    if (!isCSV) {
      setState({ 
        ...newState, 
        fileError: 'Invalid file type. Please select a CSV file.' 
      });
      return false;
    }
  
    // Check file size (max 5 MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      setState({ 
        ...newState, 
        fileError: 'File is too large. Maximum file size is 5 MB.' 
      });
      return false;
    }
  
    // If all checks pass, clear any previous errors
    setState(newState);
    return true;
  };
  
  export default validateCsvFile;