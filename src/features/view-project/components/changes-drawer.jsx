import React from "react";
import dispatch from "../../../context/dispatch/dispatch";
import { useState, useEffect } from "react";
import actions from "../../../context/dispatch/actions";
import Loading from "../../../components/Loading";
const ChangesDrawer = ({ toggleDrawer, changes }) => {

    if(changes){
        const [users, setUsers] = useState({}); 
    const fetchUser = async (id) => {
        const username = await dispatch(actions.getUserName, id);
        return username.user.username;
    };

    useEffect(() => {
        const fetchUsernames = async () => {
            const userMap = {};
            await Promise.all(changes.map(async (change, index) => {
                const username = await fetchUser(change.user);
                userMap[change.user] = username;
            }));
            setUsers(userMap);
        };
        fetchUsernames();
    }, [changes]);

    return (
        <div className="mx-2 mt-3 mb-1 w-full flex items-center justify-center shadow-md rounded-md ">
            <div className="flex flex-col w-full">
                <div className="w-full p-2 bg-violet-200">
                    <h1 className="text-lg font-semibold">
                        {changes.length > 0 ? "Version History" : "No version history available"}
                    </h1>           
                </div>
                <div className="w-full bg-violet-50 max-h-80 overflow-auto">
                    {changes &&
                        changes.map((change, index) => (
                            <div key={index} className="w-full">
                                <div className="w-full px-4 py-1 bg-violet-600 text-sm text-white flex justify-between">
                                    <span>{new Date(change.date).toLocaleDateString()} {new Date(change.date).toLocaleTimeString()}</span>
                                    <span> by {users[change.user]}</span>
                                </div>
                                <div className="w-full bg-violet-50 text-sm text-black">
                                    {change && change.changes.map((eachChange, index)=>(
                                        <div className="w-full">
                                            <div className="w-full px-4 py-1 bg-indigo-600 text-normal text-white">{eachChange.heading}</div>
                                            <div className="w-full bg-indigo-100 text-normal text-black px-4 py-2">
                                            {eachChange.content.split('\n').map((line, index) => (
                                                <React.Fragment key={index}>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            ))}    
                                            </div>
                                        </div>
                                    ))}
                                    
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
    }else{
        <Loading></Loading>
    }
};

export default ChangesDrawer;
