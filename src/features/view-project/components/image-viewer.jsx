const ImageViewer = ({ src }) => {

    return (
        <div className="h-full p-2 bg-gray-100 min-h-screen flex flex-col">
            <div className="flex justify-center items-center h-full mb-10">
                <img
                    src={src}
                    alt={`url-${src}`}
                    className="object-contain"
                    loading='lazy'
                />
            </div>
        </div>
    );
};

export default ImageViewer;