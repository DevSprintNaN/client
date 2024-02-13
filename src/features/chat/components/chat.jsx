import { useState } from "react";
import IonIcon from "@reacticons/ionicons";
const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ text: "inputValue", sender: 'nuser' }]);
    const [inputValue, setInputValue] = useState('');

    const toggleChat = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const sendMessage = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, { text: inputValue, sender: 'user' }]);
            setInputValue('');
        }
    };

    return (
        <div className="fixed bottom-0 right-0 mb-6 mr-6 z-50">
            <div className="flex flex-col bg-white border rounded-lg shadow-lg w-full max-h-96 max-w-96 ">
                <div className={`${isOpen ? "" : "rounded-full"} flex justify-between items-center bg-violet-900 px-4 py-2 text-white`} onClick={toggleChat}>
                    <h2 className="text-lg font-semibold">Chat</h2>
                </div>
                {isOpen && (
                    <div className="px-4 py-2 flex flex-col grow-0 overflow-y-scroll">
                        {messages.map((message, index) => (
                            <div className="message">
                                <div className={`text-xs text-gray-500 ${message.sender === 'user' ? 'text-left' : 'text-right'}`}>
                                    {message.sender === 'user' ? 'You' : 'Bot'}
                                </div>
                                <div
                                    key={index}
                                    className={`mb-2 p-2 rounded-lg w-3/4 ${message.sender === 'user' ? 'bg-violet-200 float-left' : 'bg-gray-200 float-right'
                                        } whitespace-normal break-words`}
                                    style={{ wordWrap: 'break-word' }}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {isOpen && (
                    <div className="flex items-center justify-between bg-whitesmoke-200 px-4 py-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-1 px-2 py-1 rounded-full border focus:outline-none focus:border-blue-500"
                            placeholder="Type a message..."

                        />
                        <button
                            onClick={sendMessage}
                            className="ml-2 px-4 py-1 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-900 focus:outline-none"
                        >
                            Send
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
