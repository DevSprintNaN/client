import React, { useState } from "react";

export const useViewAttachments = () => {
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false) 
  const [type, setType] = useState("");

  const handleUploadedAttachmentView = (url, type) => {
    setUrl(url);
    setType(type);
    setShow(true);
    console.log("Comes Here");
  };

  const closeModal = () => {
    setShow(false);
    setUrl("");
    setType("");
  };
  const handleAddedAttachmentView = (objectURL,filename) => {
    setUrl(objectURL);
    console.log(objectURL)
    console.log(filename)
    const parts = filename.split('.');
    const extension= parts[parts.length - 1];
    setType(extension);
  };

  return { handleUploadedAttachmentView, handleAddedAttachmentView, show, setShow, closeModal, url, type};
};
