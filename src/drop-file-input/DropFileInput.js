import React, { useRef } from "react";
import "./drop-file-input.css";

import uploadImg from "../assets/cloud-upload-regular-240.png";
import { Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addFile } from "../filesSlice";

const DropFileInput = () => {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      handleUpload(newFile);
    }
  };

  const handleUpload = (file) => {
    const id = Date.now() + (Math.ceil(Math.random() * 1000 ));
    dispatch(addFile({id: id, filename: file.name, size: file.size, events: []}));
    const formData = new FormData();
    formData.append('file', file);

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
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <Flex justifyContent='center'><img src={uploadImg} alt="" /></Flex>
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
    </>
  );
};

export default DropFileInput;
