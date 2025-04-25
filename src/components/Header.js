import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { toggleMenu } from "../utils/navSlice";
import { cacheResults } from "../utils/searchSlice";
import SearchBar from "./SearchBar";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
const Header = () => {
  const dispatch = useDispatch();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showProfilePopup, setShowProfilePopup] = useState(false); // <-- NEW

  const searchCacheResults = useSelector((store) => store.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCacheResults[searchQuery]) {
        setSearchSuggestions(searchCacheResults[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const getSearchSuggestions = async () => {
    try {
      const res = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const json = await res.json();
      setSearchSuggestions(json[1]);
      if (searchQuery) dispatch(cacheResults({ [searchQuery]: json[1] }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!showSearchBar && (
        <div className="flex md:grid-flow-col md:grid justify-between items-center border-b-2 shadow-sm md:shadow-none md:border-none relative">
          <div className="flex items-center md:col-span-3">
            <button onClick={toggleMenuHandler}>
              <AiOutlineMenu className="hidden md:block mx-4 text-xl cursor-pointer" />
            </button>
            <Link to={"/"} className="flex items-center">
              <img
                className="w-10 cursor-pointer"
                src="https://www.freeiconspng.com/uploads/hd-youtube-logo-png-transparent-background-20.png"
                alt="Youtube Logo"
              />
              <b className="cursor-pointer text-lg">MyYouTube</b>
            </Link>
          </div>

          <div className="hidden md:block col-span-8">
            <SearchBar
              showSearchBar={showSearchBar}
              setShowSearchBar={setShowSearchBar}
              setSearchQuery={setSearchQuery}
              searchSuggestions={searchSuggestions}
            />
          </div>

          <div className="flex space-x-2 mr-2 md:mr-4 text-xl md:col-span-1 relative">
            <AiOutlineSearch
              className="md:hidden"
              onClick={() => setShowSearchBar(!showSearchBar)}
            />
            <FaUserCircle
              className="md:text-4xl cursor-pointer"
              onClick={() => setShowProfilePopup(!showProfilePopup)}
            />

            {showProfilePopup && (
              <div className="absolute top-10 right-0 bg-white border rounded shadow-md p-4 w-48 z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xs" >Profile</span>
                  <button onClick={() => setShowProfilePopup(false)} className="text-gray-600 hover:text-black text-sm">
                    ✕
                  </button>
                </div>
                <div className="text-gray-800 text-sm     "  >Abhishek Powar</div>
              </div>
            )}
          </div>
        </div>
      )}

      {showSearchBar && (
        <SearchBar
          showSearchBar={showSearchBar}
          setShowSearchBar={setShowSearchBar}
          setSearchQuery={setSearchQuery}
          searchSuggestions={searchSuggestions}
        />
      )}
    </>
  );
};

export default Header;
