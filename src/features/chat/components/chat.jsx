import { MdOutlineDraw } from "react-icons/md";
import Whiteboard from "./whiteboard";
import { useChat } from "../hooks/useChat";

const Chat = ({ projectID }) => {
    const { id, isOpen, toggleChat, messages, inputValue, setInputValue, showBoard, setShowBoard, sendMessage, messagesEndRef } = useChat(projectID);


    return (
        <div className="fixed bottom-0 right-0 md:mb-2 md:mr-2 z-50 ml-2">
            {showBoard && <Whiteboard show={showBoard} setShow={setShowBoard} projectID={projectID}/>}
            <div className="flex flex-col bg-transparent rounded-lg shadow-lg w-full max-h-96 max-w-full sm:max-w-96">
                <div className={`${isOpen ? "rounded-tl rounded-tr" : "rounded-full"} flex justify-between items-center bg-violet-900 px-4 py-2 text-white  hover:cursor-pointer`} onClick={toggleChat}>
                    <h2 className="text-lg font-semibold">Chat</h2>
                </div>
                {isOpen && (
                    <>
                        <div className="px-4 py-2 flex flex-col grow-0 overflow-y-scroll bg-white">
                            {messages.map((message, index) => (
                                <div className={`message ${message.id === id ? 'text-left' : 'text-right'}`} key={index}>
                                    <div className={`text-xs font-bold text-gray-500`}>
                                        {message.id === id ? 'You' : message.username}
                                    </div>
                                    <div className={`mb-2 p-2 rounded-lg w-3/4 ${message.id === id ? 'bg-violet-200 float-left' : 'bg-gray-200 float-right'}`} style={{ wordWrap: 'break-word' }}>
                                        {message.text}
                                    </div>
                                    <div className={`text-xs text-gray-500 ${message.id === id ? 'float-left' : 'float-right'}`}>
                                        {message.date}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="flex items-center justify-between bg-gray-200 px-4 py-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="flex-1 px-2 py-1 rounded-full border focus:outline-none focus:border-blue-500"
                                placeholder="Type a message..."
                            />
                            <div className="border-0.5 border-transparent p-0.5 rounded-md transition duration-300 hover:bg-violet-400 cursor-pointer" onClick={() => setShowBoard(true)}>
                                <MdOutlineDraw className="text-2xl font-bold text-purple-900 h-6" />
                            </div>


                            <button
                                onClick={sendMessage}
                                className="ml-2 px-4 py-1 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-900 focus:outline-none"
                            >
                                Send
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Chat;
