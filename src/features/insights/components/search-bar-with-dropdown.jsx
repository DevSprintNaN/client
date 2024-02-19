import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import SearchResultModal from './search-result-modal';
import { useInsights } from '../hooks/useInsights';

const SearchBarWithDropdown = () => {
  const { projects, navigate } = useInsights()

  const [formData,setFormData]=useState();
  const [show, setShow] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
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
    const results = projects.filter((project) => project.name.toLowerCase().includes(formData.search.toLowerCase()));
    setSearchResults(results);
    setShow(true);
  }

  return (
    <>
      {show && (<SearchResultModal show={show} setShow={setShow} searchResults={searchResults} navigate={navigate} />)}
      <form className="max-w-lg my-3" onSubmit={handleSubmit}>
        <div className="flex">
          <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-purple-900 sr-only ">Project Name</label>
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
