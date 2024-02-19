import { useEffect, useState } from "react";

export const useForgotOTP = (validityPeriodInSeconds, email) => {
  const [otp, setOTP] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLocked, setisLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(validityPeriodInSeconds);
  const [error, setError] = useState("");
  const [enterotp, setEnterotp] = useState(true);

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
    // await axios.get(import.meta.env.VITE_SERVER+`/api/forgot/${email}`).then(()=>{
    //     setRemainingTime(validityPeriodInSeconds);
    // }).catch((err)=>{
    //     console.log(err);
    // });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnterotp(false)

    // await axios
    //   .post(import.meta.env.VITE_SERVER + `/api/forgot/otp/${email}`, {
    //     otp,
    //   })
    //   .then(() => {
    //     setEnterotp(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setError(err.response.data.error);
    //   });
  };

  return {
    enterotp,
    setEnterotp,
    otp,
    setOTP,
    isDisabled,
    isLocked,
    remainingTime,
    error,
    handleSubmit,
    onResend,
  };
};
