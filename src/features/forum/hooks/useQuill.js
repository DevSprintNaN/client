import React, { useRef, useState } from "react";

export const useQuill = () => {
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const quillRef = useRef();
  const contentModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ size: [] }],
      [{ color: [] }, { background: [] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bulleted" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
    ],
  };

  const modulesDescription = {
    toolbar: [["bold", "italic", "underline", "strike"], ["link"]],
  };

  const checkQuillCharacterCount = (event) => {
    const unprivilegedEditor = quillRef.current.unprivilegedEditor;
    if (unprivilegedEditor.getLength() > 280 && event.key !== "Backspace") event.preventDefault();
  };


  const getStringFromHtml = (html) => {
    if (html === null || html === "") return "";
    else return html.replace(/<[^>]*>/g, "");
  };

  const handleQuillLengthCheck=(prevValue, change, maxLength, setChanges)=>{
    console.log("content ",content)
    console.log("descr ", description)
      const stringContent = getStringFromHtml(change)
      console.log(prevValue)
      console.log(stringContent.length)
      if(Number(stringContent.length)<=Number(maxLength)){
        setChanges(change)
        console.log("entered if cond")
      } else{
        setChanges(prevValue)
      }
  }
  return {content, setContent, description, setDescription, checkQuillCharacterCount, getStringFromHtml, contentModules, modulesDescription, quillRef, handleQuillLengthCheck};
};
