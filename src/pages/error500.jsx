const Error500 = () => {
    return ( 
        <div>
            <div className="w-full text-center mt-5 mb-5">
                <h1 className="text-6xl text-bold">Uh-Oh</h1>
            </div>
            <div className="w-full text-center">
                <p className="text-3xl">Sorry the server failed to obtain a response, please try again later...</p>
            </div>
            <div className="w-full text-center mt-5 mb-5">
                <h1 className="text-6xl text-bold text-red-500">Error 500</h1>
            </div>
            <div>
                <img src={'broken_robot.jpg'} className="w-full" />
            </div>
        </div>
     );
}
 
export default Error500;