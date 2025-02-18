function CsvDownloader(fileName) {
      // Path to the CSV file in the public folder
      const csvFilePath = 'public/samplecountries.csv';
  
      // Create a link element
      const link = document.createElement('a');
      link.href = csvFilePath;
      
      // Set the download attribute with desired filename
      link.download = `${fileName||'data'}.csv`;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    
}
export default CsvDownloader;