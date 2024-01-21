// Channel.js
import React, { useState } from 'react';

const Channel = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChannel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`channel ${isOpen ? 'open' : 'closed'}`}>
      <div className="channel-header" onClick={toggleChannel}>
        <span>{name}</span>
        <span>{isOpen ? '▼' : '►'}</span>
      </div>
      {isOpen && <div className="channel-children">{children}</div>}
    </div>
  );
};

export default Channel;
