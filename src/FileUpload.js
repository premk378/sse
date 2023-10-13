import React, { useRef } from "react";

const FileUpload = () => {
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  }
  return (
    <div className="file-upload">
      <div className="file-input-container">
        <input type="text" placeholder="No file chosen"></input>
        <button type="button" onClick={handleButtonClick}>BROWSE FILE</button>
      </div>
      <input type="file" ref={fileInputRef} hidden></input>
    </div>
  );
};

export default FileUpload;
