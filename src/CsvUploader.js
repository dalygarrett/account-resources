import React, { useState } from 'react';

function CsvUploader({ onCsvUpload }) {
  const [csvFile, setCsvFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
    setUploadStatus('');
  };

  const handleUpload = () => {
    if (csvFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        onCsvUpload(csvData);
        setUploadStatus('CSV successfully uploaded!');
      };
      reader.readAsText(csvFile);
    } else {
      setUploadStatus('Please select a CSV file before uploading.');
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
      <p>{uploadStatus}</p>
    </div>
  );
}

export default CsvUploader;
