import React from 'react';
import './GithubUrlInput.css';

function GithubUrlInput({ onGithubUrlSubmit }) {
  const handleInputChange = (e) => {
    const githubUrl = e.target.value;
    onGithubUrlSubmit(githubUrl);
  };

  return (
    <div className="centered-content">
      <input
        type="text"
        placeholder="Enter GitHub URL"
        className="input-field"
        onChange={handleInputChange}
      />
    </div>
  );
}

export default GithubUrlInput;
