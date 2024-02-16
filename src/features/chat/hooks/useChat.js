import { useEffect, useState } from 'react';
import {io} from 'socket.io-client';
import dispatch from '../../../context/dispatch/dispatch';
import actions from '../../../context/dispatch/actions';

export const useChat=()=>{
    const [username,setUsername]=useState('');
    const socket = io(import.meta.env.VITE_CHAT_SERVER, { transports: ['websocket'] });
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ text: "inputValue", sender: 'nuser' }]);
    const [inputValue, setInputValue] = useState('');
    const [showBoard, setShowBoard] = useState(false)
    const [id,setID]=useState('');

    const toggleChat = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const fetchUserInformation=async()=>{
        await dispatch(actions.getUser).then((response)=>{
            console.log(response);
            setUsername(response.user.username);
            setID(response.user._id);
        });
        socket.on('connect', () => {
            console.log(socket.id);
            socket.emit('join room', id);
        });
    
        socket.on('message', (message) => {
            socket.emit('message', message);
        });
    
        socket.on('disconnect', () => {
            socket.emit('leave room', id);
        });

        socket.connect();
    }

    useEffect(()=>{
        fetchUserInformation();
    },[])

    const sendMessage = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, { text: inputValue, sender: 'user' }]);
            setInputValue('');
            socket.emit('message', { text: inputValue, sender: username, id });
        }
    };

    return {id,username,isOpen,toggleChat,messages,inputValue,setInputValue,showBoard,setShowBoard,sendMessage};
}