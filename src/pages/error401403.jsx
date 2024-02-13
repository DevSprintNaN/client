const Error401 = () => {
    return (
        <div>
             <div className="w-full text-center mt-5 mb-5">
                <h1 className="text-6xl text-bold">Uh-Oh</h1>
            </div>
            <div className="w-full text-center">
                <p className="text-3xl">You are not authorized to view this page</p>
            </div>
            <div className="w-full text-center mt-5 mb-5">
                <h1 className="text-6xl text-bold text-red-500">Error 401</h1>
            </div>
            <div>
                <img src={'error401.jpg'} className="w-1/4 mx-auto" />
            </div>
        </div>
    );
}

export default Error401;