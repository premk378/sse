import React, { useRef } from "react";
import "./drop-file-input.css";

import uploadImg from "../assets/cloud-upload-regular-240.png";
import { Flex, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addFile, addFileEvent } from "../filesSlice";
import { HOSTNAME, UPLOAD_API } from "../constants";

const DropFileInput = () => {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const uploadURL = HOSTNAME + UPLOAD_API;

  const getMetaData = (
    customData = {
      Versioning: "CreateNewVersion",
      Locale: "en_US",
    }
  ) => {
    return {
      eventType: "clamav-tika-scan",
      subject: "new File Uploaded by iportal",
      consumerName: "ihub",
      consumerId: "123456",
      consumerSubscriptionName: "ihub-subscription",
      customData: customData,
    };
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      handleUpload(newFile);
    }
  };

  const handleUpload = (file) => {
    console.log(file);
    const id = Date.now() + Math.ceil(Math.random() * 1000);
    dispatch(
      addFile({ id: id, filename: file.name, size: file.size, events: [] })
    );
    const formData = new FormData();
    formData.append("files", file);
    formData.append("metadata", JSON.stringify(getMetaData({
      Versioning: "CreateNewVersion",
      Locale: "en_US",
      id: id
    })));

    fetch(uploadURL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        dispatch(addFileEvent({ id: id, ev: {dateTime: Date.now(), fileStatus: 'waiting', message: 'File Uploaded'} }));
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
          <Flex justifyContent="center">
            <img src={uploadImg} alt="" />
          </Flex>
          <Text color="#5c5c5c" fontWeight="500">
            Drag & Drop files here
          </Text>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
    </>
  );
};

export default DropFileInput;
