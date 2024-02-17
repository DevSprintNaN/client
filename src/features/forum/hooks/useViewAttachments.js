import React, { useState } from "react";

export const useViewAttachments = () => {
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");

  const handleUploadedAttachmentView = (entry) => {
    setUrl(entry.files);
    setType(entry.fileType);
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
    setUrl("");
    setType("");
  };
  const handleAddedAttachmentView = (entry) => {
    setUrl(entry);
  };

  return { handleUploadedAttachmentView, show, setShow, closeModal, url, type };
};
