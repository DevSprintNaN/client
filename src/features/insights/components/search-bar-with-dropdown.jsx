import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import SearchResultModal from './search-result-modal';
import { useInsights } from '../hooks/useInsights';

const SearchBarWithDropdown = () => {
  const { projects, navigate } = useInsights()

  const options = ["By Name", "By Skill"];
  const [formData, setFormData] = useState({
    type: options[0],
    search: "",
  });
  const [show, setShow] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleDropdown = () => {
    setShow(!show);
  };
  const handleOptionSelect = (option) => {
    setFormData({ ...formData, type: option });
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const success =1;
    if (success){
      setShow(true)
    }
  }

  return (
    <>
      {show && (<SearchResultModal show={show} setShow={setShow} searchResults={projects} navigate={navigate} />)}
      <form className="max-w-lg my-3" onSubmit={handleSubmit}>
        <div className="flex">
          <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-purple-900 sr-only ">Project Name</label>
          <div id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 inline-flex items-center px-0.5 sm:px-4 text-sm font-medium text-center  text-purple-900 bg-violet-100 border border-purple-300 rounded-s-lg hover:bg-violet-200 cursor-pointer" type="button" onClick={toggleDropdown}>
            <span className='hidden sm:block mx-0.5'>{formData.type}</span>
            <IoIosArrowDown />
          </div>
          {show && (
            <div id="dropdown" className="absolute block mt-9 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
              <ul className="py-2 text-sm text-purple-700" aria-labelledby="dropdown-button">
                {options.map((option, index) => (
                  <li key={index}>
                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-purple-100" onClick={() => handleOptionSelect(option)}>{option}</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="relative w-full truncate overflow-ellipsis">
            <input
              type="search"
              id="search-dropdown"
              name="search"
              className="block p-2.5 w-full text-sm text-purple-900 bg-white rounded-e-lg sm:rounded-s-none rounded-s-lg border-s-purple-50 border-s-2 sm:border-e-none border-e-purple-50 border-e-sm border focus:outline-none focus:border-purple-800 sm:border placeholder:truncate truncate overflow-ellipsis"
              placeholder="Search projects..."
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-purple-700 rounded-e-lg border border-purple-700 hover:bg-purple-800">
              <FaSearch />
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

    </>
  );
};

export default SearchBarWithDropdown;
