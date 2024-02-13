const Error404 = () => {
    return (
        <div>
             <div className="w-full text-center mt-5 mb-5">
                <h1 className="text-6xl text-bold">Uh-Oh</h1>
            </div>
            <div className="w-full text-center">
                <p className="text-3xl">The page you are looking for has been moved, deleted or never existed</p>
            </div>
            <div className="w-full text-center mt-5 mb-5">
                <h1 className="text-6xl text-bold text-red-500">Error 404</h1>
            </div>
            <div>
                <img src={'404.png'} className="w-full" />
            </div>
        </div>
    );
}

export default Error404;