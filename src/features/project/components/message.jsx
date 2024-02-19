import React from 'react'

const Message = ({message, text_color}) => {
  return (
    <span className={`block text-sm font-medium ${text_color? text_color:'text-gray-700'}`}>{message}</span>
  )
}

export default Message