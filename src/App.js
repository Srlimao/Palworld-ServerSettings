import React, { useState } from 'react';
import './App.css';

function App() {
  const [fileContent, setFileContent] = useState('');
  const [parsedOptions, setParsedOptions] = useState({});

  const saveSettings = () => {
    // Generate the updated options string
    const updatedOptionsString = generateOptionsString(parsedOptions);

    // Trigger file download
    downloadFile(updatedOptionsString, 'PalWorldSettings.ini');
  };

  const parseFileContent = (content) => {
    // Implement the parsing logic here
    // This is just a placeholder for now
    const dummyParsedOptions = {
      Difficulty:"Hard",

      DayTimeSpeedRate:"1.000000",

      NightTimeSpeedRate:"1.000000",

      ExpRate:"1.000000",

      PalCaptureRate:"1.000000",

      PalSpawnNumRate:"1.000000",

      PalDamageRateAttack:"1.000000",

      PalDamageRateDefense:"1.000000",

      PlayerDamageRateAttack:"1.000000",

      PlayerDamageRateDefense:"1.000000",

      PlayerStomachDecreaceRate:"1.000000",

      PlayerStaminaDecreaceRate:"1.000000",

      PlayerAutoHPRegeneRate:"1.000000",

      PlayerAutoHpRegeneRateInSleep:"1.000000",

      PalStomachDecreaceRate:"1.000000",

      PalStaminaDecreaceRate:"1.000000",

      PalAutoHPRegeneRate:"1.000000",

      PalAutoHpRegeneRateInSleep:"1.000000",

      BuildObjectDamageRate:"1.000000",

      BuildObjectDeteriorationDamageRate:"1.000000",

      CollectionDropRate:"1.000000",

      CollectionObjectHpRate:"1.000000",

      CollectionObjectRespawnSpeedRate:"1.000000",

      EnemyDropItemRate:"1.000000",

      DeathPenalty:"All",

      bEnablePlayerToPlayerDamage:"False",

      bEnableFriendlyFire:"False",

      bEnableInvaderEnemy:"True",

      bActiveUNKO:"False",

      bEnableAimAssistPad:"True",

      bEnableAimAssistKeyboard:"False",

      DropItemMaxNum:"3000",

      DropItemMaxNum_UNKO:"100",

      BaseCampMaxNum:"128",

      BaseCampWorkerMaxNum:"15",

      DropItemAliveMaxHours:"1.000000",

      bAutoResetGuildNoOnlinePlayers:"False",

      AutoResetGuildTimeNoOnlinePlayers:"72.000000",

      GuildPlayerMaxNum:"20",

      PalEggDefaultHatchingTime:"72.000000",

      WorkSpeedRate:"1.000000",

      bIsMultiplay:"False",

      bIsPvP:"False",

      bCanPickupOtherGuildDeathPenaltyDrop:"False",

      bEnableNonLoginPenalty:"True",

      bEnableFastTravel:"True",

      bIsStartLocationSelectByMap:"True",

      bExistPlayerAfterLogout:"False",

      bEnableDefenseOtherGuildPlayer:"False",

      CoopPlayerMaxNum:"4",

      ServerPlayerMaxNum:"32",

      ServerName:"DTsC",

      ServerDescription:"Dunhasssss",

      AdminPassword:"",

      ServerPassword:"",

      PublicPort:"8211",

      PublicIP:"85.240.179.61",

      RCONEnabled:"False",

      RCONPort:"25575",

      Region:"",

      bUseAuth:"True",

      BanListURL:"https://api.palworldgame.com/api/banlist.txt"
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

  const generateOptionsString = (options) => {
    const optionsString = Object.entries(options)
      .map(([key, value]) => {
        if (key === 'ServerName'
        || key === 'ServerDescription'
        || key === 'AdminPassword'
        || key === 'ServerPassword'
        || key === 'PublicIP'
        || key === 'Region'
        || key === 'BanListURL'

        ) 
        
        {
          return `${key}="${value}"`;
        } else {
          return `${key}=${value}`;
        }
      })
      .join(',');
    return `[/Script/Pal.PalGameWorldSettings] 
OptionSettings=(${optionsString})`;;
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleInputChange = (key, value) => {
    setParsedOptions((prevOptions) => ({
      ...prevOptions,
      [key]: value,
    }));
  };

  return (
    <div className="App">
      <h1>PalWorld Game Settings</h1>

      <div id="upload-container">
        <p>Default folder: "server_folder\Pal\Saved\Config\WindowsServer\PalWorldSettings.ini" </p>
        <input type="file" id="fileInput" accept=".ini" onChange={readFile} />
      </div>

      <div id="settings-container">
        {Object.keys(parsedOptions).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}:</label>
            <input type="text" id={key} value={parsedOptions[key]} onChange={(e) => handleInputChange(key, e.target.value)} />
          </div>
        ))}
        <button onClick={saveSettings}>Save Settings</button>
      </div>
    </div>
  );
}

export default App;
