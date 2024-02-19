import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

export const useOTPVerify = (email,otp) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorConfirmPassword, setErrorCPassword] = useState("");
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState("password");
  const [isDisabled, setIsDisabled] = useState(false);
  const [submitPassword, setSubmitPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false)

  const passwordChange = (input) => {
    setPassword(input);
    if (input.length < 8) {
      setErrorPassword(
        "Password should be atleast 8 characters long with numbers, alphabets and special characters"
      );
    } else {
      setErrorPassword("");
    }
    setSubmitPassword(CryptoJS.SHA512(input).toString());
    if (input !== password) {
      setErrorCPassword("Password does not match");
    } else {
      setErrorCPassword("");
    }
  };

  const confirmPasswordChange = (input) => {
    setConfirmPassword(input);
    if (input !== password) {
      setErrorCPassword("Password does not match");
    } else {
      setErrorCPassword("");
    }
  };

  useEffect(() => {
    if (errorConfirmPassword === "" && errorPassword === "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [confirmPasswordChange, passwordChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return {
    password,
    passwordChange,
    confirmPassword,
    confirmPasswordChange,
    passwordVisibility,
    confirmPasswordVisibility,
    setConfirmPasswordVisibility,
    setPasswordVisibility,
    handleSubmit,
    isDisabled,
    errorPassword,
    errorMessage,
    errorConfirmPassword,
    passwordVisible, setPasswordVisible
  };
};
