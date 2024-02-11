import React, { useState } from 'react';

const AccountPage = () => {
    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
        } catch (error) {
        }
    };

    return (
        <>
            <div className="h-full p-2">
                <div className="block md:flex shadow">
                    <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white rounded-md">
                        <div className="flex justify-between">
                            <span className="text-xl text-center font-semibold block">Account</span>
                        </div>
                        <img src={'account.png'} className='p-2' />

                        {/* <span className="text-gray-600">View Your Profile Details</span> */}
                        {/* <div className="w-full p-8 mx-2 flex justify-center">
                            <img id="showImage" className="max-w-xs w-32 items-center border" src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200" alt="" />
                        </div> */}
                    </div>

                    <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                        {!editMode && (
                            <div>
                                <button type="button" className="float-right bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300" onClick={() => setEditMode(true)}>Edit</button>
                            </div>
                        )}
                        <div className="rounded p-6">
                            <div className="pb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300"
                                    value={formData.email} disabled />
                            </div>
                            {editMode && (<>
                                <form onSubmit={handleSubmit}>
                                    <div className="pb-4">
                                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700"> Current Password</label>
                                        <input type="password" id="currentPassword" name="currentPassword" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
                                            value={formData.currentPassword}
                                            onChange={handleInputChange} />

                                        {/* <span className="text-gray-600 pt-4 block opacity-70">Personal login information of your account</span> */}
                                    </div>

                                    <div className="pb-4">
                                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700"> New Password</label>
                                        <input type="password" id="newPassword" name="newPassword" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
                                            value={formData.newPassword}
                                            onChange={handleInputChange} />
                                    </div>

                                    <div className="pb-4">
                                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                        <input type="password" id="confirmNewPassword" name="confirmNewPassword" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
                                            value={formData.confirmNewPassword}
                                            onChange={handleInputChange} />
                                    </div>

                                    <div>
                                        <button type="submit" className="w-full  bg-purple-700 text-white p-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300">Save Changes</button>
                                    </div>
                                </form>
                            </>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountPage;
