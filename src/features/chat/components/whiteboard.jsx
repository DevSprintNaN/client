import IonIcon from '@reacticons/ionicons';
import React, { useEffect, useRef, useState } from 'react';

const Whiteboard = ({ show, setShow }) => {
    let timeout; // Declaring timeout variable
    const colorInputRef = useRef(null);
    const [imgData, setImgData] = useState('')
    
    const handleClose=()=>{
        setImgData('')
        setShow(false)
    }

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

            /* Mouse Capturing Work */
            canvas.addEventListener('mousemove', function (e) {
                last_mouse.x = mouse.x;
                last_mouse.y = mouse.y;

                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;
            }, false);

            /* Drawing on Paint App */
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.strokeStyle = colorInputRef.current.value || 'blue'; // Set default color
            // Update color when input changes
            colorInputRef.current.addEventListener('input', () => {
                ctx.strokeStyle = colorInputRef.current.value;
            });

            canvas.addEventListener('mousedown', function (e) {
                canvas.addEventListener('mousemove', onPaint, false);
            }, false);

            canvas.addEventListener('mouseup', function () {
                canvas.removeEventListener('mousemove', onPaint, false);
            }, false);

            const onPaint = () => {
                ctx.beginPath();
                ctx.moveTo(last_mouse.x, last_mouse.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.closePath();
                ctx.stroke();

                if (timeout !== undefined) clearTimeout(timeout);
                timeout = setTimeout(() => {
                    var base64ImageData = canvas.toDataURL("image/png");
                    setImgData(base64ImageData)
                }, 1000);
            };
        }

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
