const VideoViewer = ({ src }) => {

    return (
        <div className="h-full p-2 bg-gray-100 min-h-screen flex flex-col">
            <div className="flex justify-center items-center h-full mb-10">
                <video
                    src={src}
                    className="object-contain"
                    controls
                />
            </div>
        </div>
    );
};

export default VideoViewer;