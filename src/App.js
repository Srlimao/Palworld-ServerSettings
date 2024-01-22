import React, { useState } from 'react';
import './App.css';

function App() {
  const [fileContent, setFileContent] = useState('');
  const [parsedOptions, setParsedOptions] = useState({});

  const saveSettings = () => {
    // Add logic to save settings here
    console.log('Settings saved!');
  };

  const parseFileContent = (content) => {
    // Implement the parsing logic here
    // This is just a placeholder for now
    const dummyParsedOptions = {
      Difficulty: 'Hard',
      DayTimeSpeedRate: '1.000000',
      NightTimeSpeedRate: '1.000000',
      // Add more dummy options as needed
    };
    setParsedOptions(dummyParsedOptions);
  };

  const readFile = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);
        parseFileContent(content);
      };
      reader.readAsText(file);
    } else {
      alert('Please select a file.');
    }
  };

  return (
    <div className="App">
      <h1>PalWorld Game Settings</h1>

      <div id="upload-container">
        <input type="file" id="fileInput" accept=".txt" onChange={readFile} />
      </div>

      <div id="settings-container">
        {Object.keys(parsedOptions).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}:</label>
            <input type="text" id={key} value={parsedOptions[key]} />
          </div>
        ))}
        <button onClick={saveSettings}>Save Settings</button>
      </div>
    </div>
  );
}

export default App;
