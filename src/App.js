import React, { useState } from 'react';
import ApiKeyInput from './ApiKeyInput';
import CsvUploader from './CsvUploader';
import ApiCaller from './ApiCaller';
import GithubUrlInput from './GithubUrlInput';
import './App.css';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [csvData, setCsvData] = useState('');

  const handleApiKeySubmit = (key) => {
    setApiKey(key);
  };

  const handleGithubUrlSubmit = (url) => {
    setGithubUrl(url);
  };

  const handleCsvUpload = (data) => {
    setCsvData(data);
  };

  return (
    <div className="app-container">
      <div className="centered-content">
        <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
        <div className="vertical-spacing" />
        <GithubUrlInput onGithubUrlSubmit={handleGithubUrlSubmit} />
        <div className="vertical-spacing" />
        <CsvUploader onCsvUpload={handleCsvUpload} />
        <div className="vertical-spacing" />
        <ApiCaller apiKey={apiKey} githubUrl={githubUrl} csvData={csvData} />
      </div>
    </div>
  );
}

export default App;
