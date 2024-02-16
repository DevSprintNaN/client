import React from 'react'

const HeaderCard = () => {
    return (

        <>
            <div
                className="relative block p-5 overflow-hidden border bg-white border-slate-100 rounded-lg mx-2"
                href=""
            >
                <span
                    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-violet-800 via-purple-500 to-purple-800"
                ></span>

                <div className="justify-between sm:flex">
                    <div>
                        <div className="text-purple-800">
                            <div className="justify-between sm:flex">
                                <div>
                                    <h5 className="text-2xl font-bold text-purple-800">
                                        Hey There, Let's Explore the Top 100 Projects!
                                    </h5>
                                </div>
                            </div>

                            <div className="mt-4 sm:pr-8">
                                <p className="text-sm text-black">
                                    Check the latest trending projects to see what people are working on. From cutting-edge innovation to trendsetting ideas, we've got it all!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderCard