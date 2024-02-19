import { useEffect, useState } from "react";
import dispatch from "../../../context/dispatch/dispatch";
import actions from "../../../context/dispatch/actions";

export const useOTP = (validityPeriodInSeconds, email) => {
  const [otp, setOTP] = useState("");
  const [otpDisabled, setIsDisabled] = useState(true);
  const [isLocked, setisLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(validityPeriodInSeconds);
  const [error, setError] = useState(null);

  const onTimerExpired = () => {
    setIsDisabled(false);
    setisLocked(true);
  };

  const onResend = async () => {
    setRemainingTime(180);
    setIsDisabled(true);
    setisLocked(false);
    await fetchOTP();
  };

  const fetchOTP = async () => {
    // setError(null);
    // const response=await dispatch(actions.emailVerification);
    // if(response.status==="success"){
    //   console.log("OTP sent successfully");
    // }
    // else{
    //   setError("Error sending OTP");
    // }
  };

  useEffect(() => {
    fetchOTP();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          onTimerExpired();
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [validityPeriodInSeconds, onTimerExpired]);

  return {
    otp,
    otpDisabled,
    setOTP,
    isLocked,
    remainingTime,
    error,
    onResend,
  };
};
