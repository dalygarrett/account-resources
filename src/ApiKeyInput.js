import React from 'react';
import './ApiKeyInput.css';

function ApiKeyInput({ onApiKeySubmit }) {
  const handleInputChange = (e) => {
    const apiKey = e.target.value;
    onApiKeySubmit(apiKey);
  };

  return (
    <div className="centered-content">
      <input
        type="text"
        placeholder="Enter API Key"
        className="input-field"
        onChange={handleInputChange}
      />
    </div>
  );
}

export default ApiKeyInput;
