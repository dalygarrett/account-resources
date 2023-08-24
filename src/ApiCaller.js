import React, { useState } from 'react';

function ApiCaller({ apiKey, githubUrl, csvData }) {
  const [statusResponses, setStatusResponses] = useState([]);
  const [progress, setProgress] = useState(0); // Track progress

  const makeApiCalls = async () => {
    const lines = csvData.split('\n');
    const responses = [];

    for (let i = 0; i < lines.length; i++) {
      const accountId = lines[i].trim();

      const corsProxy = 'https://corsproxy.io/?';

      // POST request
      const postResponse = await fetch(`${corsProxy}https://api.yextapis.com/v2/accounts/me/resourcesapplyrequests?api_key=${apiKey}&v=20230824`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetAccountId: accountId,
          source: {
            type: 'GitHub',
            url: githubUrl,
          },
        }),
      });

      const postResponseData = await postResponse.json();
      const requestId = postResponseData.response.id;

      // Delay for 4 seconds before making the GET request
      await new Promise(resolve => setTimeout(resolve, 4000));

      // GET request
      const getResponse = await fetch(`${corsProxy}https://api.yextapis.com/v2/accounts/me/resourcesapplyrequests/${requestId}?api_key=${apiKey}&v=20230824`);
      const getResponseData = await getResponse.json();

      const response = { accountId, status: getResponseData.response.status };
      responses.push(response);

      // Update progress based on the current index
      setProgress(((i + 1) / lines.length) * 100);
    }

    setStatusResponses(responses); // Update statusResponses after all API calls are complete
    setProgress(0); // Reset progress
  };

  return (
    <div className="api-caller-container"> {/* Apply styling to this container */}
      <button onClick={makeApiCalls}>Make API Calls</button>
      {progress > 0 && progress < 100 && <div>Progress: {progress.toFixed(2)}%</div>}
      <div className="api-status-list-container"> {/* Apply styling to this container */}
        <div className="api-status-list">
          {statusResponses.map((response, index) => (
            <div key={index}>
              Account ID: {response.accountId}, Status: {response.status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApiCaller;
