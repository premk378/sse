import { Button, Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addFile } from "./filesSlice";

const FileUpload = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileName(e.target.value);
  };

  const handleUpload = () => {
    const id = Date.now() + (Math.ceil(Math.random() * 1000 ));
    dispatch(addFile({id: id, filename: fileName, events: []}));
    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch(`http://localhost:8081/upload?id=${id}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="file-upload">
      <Flex className="file-input-container" gap='10px' alignItems='center'>
        <InputGroup size="md">
          <Input type="text" placeholder="No file chosen" readOnly value={fileName}/>
          <InputRightElement width="4.5rem">
            <Button  h="1.75rem" size="sm" mr='8px' onClick={handleButtonClick}>
              Browse
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button h='35px' colorScheme="purple" variant='solid' fontSize='14px' onClick={handleUpload}>UPLOAD</Button>
      </Flex>
      <input
        type="file"
        onChange={(e) => handleFileSelect(e)}
        ref={fileInputRef}
        hidden
      ></input>
    </div>
  );
};

export default FileUpload;
