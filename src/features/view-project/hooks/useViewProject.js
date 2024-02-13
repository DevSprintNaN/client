import { useState } from "react"

export const useViewProject=(id)=>{
    const [directories]=useState([]);
    return {directories}
}