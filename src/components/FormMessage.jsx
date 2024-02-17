import React from 'react'

const FormMessage = ({bg_class, message}) => {
    return (
        <div className={`flex items-center ${bg_class} p-4 mb-3 rounded w-full`}>

            <div className={`flex-grow text-center ${bg_class} text-black text-bold rounded-[7px]  text-md`}>
                {message}
            </div>
        </div>
    )
}

export default FormMessage