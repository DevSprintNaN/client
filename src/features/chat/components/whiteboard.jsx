import IonIcon from '@reacticons/ionicons';
import  { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import dispatch from '../../../context/dispatch/dispatch';
import actions from '../../../context/dispatch/actions';

const Whiteboard = ({ show, setShow,projectID }) => {
    const colorInputRef = useRef(null);
    const [imgData, setImgData] = useState('');
    const timeoutRef = useRef(undefined);
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState('');
    const [id, setID] = useState('');

    const handleClose = () => {
        setImgData('');
        setShow(false);
    };

    useEffect(() => {
        const fetchUserInformation = async () => {
            const response = await dispatch(actions.getUser);
            console.log(response);
            setUsername(response.user.username);
            setID(response.user._id);
            const newSocket = io(import.meta.env.VITE_CHAT_SERVER, { transports: ['websocket'] }); 
            newSocket.on('connect', () => {
                console.log("Socket connected");
                newSocket.emit('join room', projectID);
            });

            newSocket.on('disconnect', () => {
                console.log("Socket disconnected");
                newSocket.emit('leave room', projectID);
            });

            setSocket(newSocket);
        };

        fetchUserInformation();
    }, [projectID]);

    useEffect(() => {
        if (socket) {
            socket.on("canvas-data", function (data) {
                const canvas = document.querySelector('#paint');
                const ctx = canvas.getContext('2d');
                var image = new Image();
                image.onload = function () {
                    ctx.drawImage(image, 0, 0);
                };
                image.src = data;
            });
        }
    }, [socket]);

    useEffect(() => {
        const boardDraw = () => {
            const canvas = document.querySelector('#paint');
            const ctx = canvas.getContext('2d');
            const sketch = document.querySelector('#sketch');
            const sketch_style = getComputedStyle(sketch);
            canvas.width = parseInt(sketch_style.getPropertyValue('width'));
            canvas.height = parseInt(sketch_style.getPropertyValue('height'));

            const mouse = { x: 0, y: 0 };
            const last_mouse = { x: 0, y: 0 };

            canvas.addEventListener('mousemove', function (e) {
                last_mouse.x = mouse.x;
                last_mouse.y = mouse.y;

                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;
            }, false);

            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.strokeStyle = colorInputRef.current.value || 'blue';
            colorInputRef.current.addEventListener('input', () => {
                ctx.strokeStyle = colorInputRef.current.value;
            });

            canvas.addEventListener('mousedown', function (e) {
                canvas.addEventListener('mousemove', onPaint, false);
            }, false);

            canvas.addEventListener('mouseup', function () {
                canvas.removeEventListener('mousemove', onPaint, false);
                sendCanvasData(canvas);
            }, false);

            const onPaint = () => {
                ctx.beginPath();
                ctx.moveTo(last_mouse.x, last_mouse.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.closePath();
                ctx.stroke();

                if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                    var base64ImageData = canvas.toDataURL('image/png');
                    setImgData(base64ImageData);
                }, 1000);
            };

            const sendCanvasData = (canvas) => {
                if (socket) {
                    var base64ImageData = canvas.toDataURL('image/png');
                    socket.emit("canvas-data", {...base64ImageData, username, id});
                }
            };
        };

        boardDraw();
    }, []);

    return (
        show && (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-violet-100/75 transition-opacity">
                <div className="flex justify-between w-full max-w-screen">
                    {/* Centered color input */}
                    <div className="flex justify-center w-full">
                    <div className="h-full flex justify-center items-center text-md font-medium text-purple-900 mx-2">Select Your Ink: </div>

                        <input ref={colorInputRef} type="color" />
                    </div>
                    {/* Close button on the far right */}
                    <IonIcon name="close-circle" className="pr-2 text-3xl text-purple-800 cursor-pointer float-right" onClick={handleClose}/>
                </div>
                <div id="sketch" className="overflow-hidden rounded-md bg-white shadow-xl transition-all">
                    <canvas id="paint" className="h-[90vh] w-[90vw]"></canvas>
                </div>
            </div>


        )
    );
}

export default Whiteboard;
