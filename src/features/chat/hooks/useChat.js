import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { io } from 'socket.io-client';
import dispatch from '../../../context/dispatch/dispatch';
import actions from '../../../context/dispatch/actions';

export const useChat = (projectID) => {
    const [username, setUsername] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showBoard, setShowBoard] = useState(false);
    const [newMessage, setNewMessage] = useState({});
    const [id, setID] = useState('');
    const [socket, setSocket] = useState(null); 
    const messagesEndRef = useRef(null);

    const toggleChat = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const fetchUserInformation = async () => {
        const response = await dispatch(actions.getUser);
        console.log(response);
        setUsername(response.user.username);
        setID(response.user._id);
        const server_fetch=await dispatch(actions.getMessages,projectID);
        console.log(server_fetch.messages)
        setMessages(server_fetch.messages);

        const newSocket = io(import.meta.env.VITE_CHAT_SERVER, { transports: ['websocket'] });
        newSocket.on('connect', () => {
            console.log(newSocket.id);
            newSocket.emit('join room', projectID);
        });

        newSocket.on('message', (message) => {
            setNewMessage(message);
        });

        newSocket.on('disconnect', () => {
            newSocket.emit('leave room', projectID);
        });

        setSocket(newSocket); 
    };

    useEffect(()=>{
        if(newMessage!==""){
            setMessages([...messages,newMessage]);
        }
    },[newMessage])

    useLayoutEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        fetchUserInformation();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = () => {
        if (inputValue.trim() !== '' && socket) {
            const message = { text: inputValue, username, id, date: new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString() };
            setInputValue('');
            socket.emit('message', message); 
        }
    };

    return { id, username, isOpen, toggleChat, messages, inputValue, setInputValue, showBoard, setShowBoard, sendMessage, messagesEndRef };
};
