import React from 'react'

const OTPValidityTimer = ({ remainingTime }) => {
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return <span style={{ color: 'red'}}>{formatTime(remainingTime)}</span>;
};

export default OTPValidityTimer