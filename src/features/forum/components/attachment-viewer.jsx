import React from 'react'
import ImageViewer from '../../view-project/components/image-viewer'
import VideoViewer from '../../view-project/components/video-viewer'
import CodeViewer from '../../view-project/components/code-viewer'
import PDFViewer from '../../view-project/components/cloudinary-viewer'
import IonIcon from '@reacticons/ionicons'

const AttachmentViewer = ({show, setShow, type, url}) => {
    const imageTypes = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "avif", "tiff", "ico"];
    const videoTypes = ["mp4", "webm", "mov", "avi", "wmv", "mkv", "flv", "mpeg", "mpg", "m4v", "3gp", "3g2", "mxf", "roq", "nsv", "f4v", "f4p", "f4a", "f4b", "f4r", "f4x", "f4m", "f4"];
    return show && (
        <>
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-violet-100/75 transition-opacity z-20">
                <div className="flex justify-end w-full max-w-screen">
                    {/* Close button on the far right */}
                    <IonIcon name="close-circle" className="pr-2 text-3xl text-purple-800 cursor-pointer float-right" onClick={()=>setShow(false)} />
                </div>
                <div id="sketch" className="overflow-hidden rounded-md bg-white shadow-xl transition-all">
                    <div className="h-[95vh] w-[95vw] overflow-y-auto">
                        {!imageTypes.includes(type) && !videoTypes.includes(type) && type === "pdf" && (<PDFViewer src={url} />)}
                        {imageTypes.includes(type) && type !== "null" && (<ImageViewer src={url} />)}
                        {videoTypes.includes(type) && type !== "null" && (<VideoViewer src={url} />)}
                        {type === "null" && (<CodeViewer src={url} />)}
                    </div>
                </div>
            </div>

        </>
    )
}

export default AttachmentViewer