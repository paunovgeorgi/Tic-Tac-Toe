import { useState } from "react";

const Player = ({ name, symbol, isActive, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleEditClick() {
    setIsEditing((prev) => (!prev));
    if (isEditing) {   
      onNameChange(symbol, playerName)
    }
  }

  function handleChange(e){
    setPlayerName(e.target.value)
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {isEditing ? (
          <input value={playerName} onChange={handleChange}/>
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{!isEditing ? "Edit" : "Save"}</button>
    </li>
  );
};

export default Player;
