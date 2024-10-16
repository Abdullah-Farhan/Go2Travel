import React, { useState } from "react";
import sort from "../../assets/svg/sort.svg";
import arrows from "../../assets/svg/Sortingarrowheads.svg";
import Hotel from "../../Cards/Hotel";
import hotels from "../../utils/Hotels/Hotels.jsx";

const Results = ({ searchedValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(hotels.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hotels.slice(indexOfFirstItem, indexOfLastItem);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortByValue, setSortByValue] = useState("Our Top Picks");

  const searchedResults = hotels.length;
  const toggleDropdown = () => {
    console.log(dropdownOpen);

    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    setDropdownOpen(false);
    setSortByValue(option);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <section className="w-full flex flex-row justify-center">
      <div className="w-full max-w-[954px] mt-14 flex flex-row">
        <p className="text-[#525B31] absolute">
          <span className="text-[#D2B57A]">Home</span> &gt;{" "}
          <span className="text-[#D2B57A]">{searchedValue}</span> &gt; search
          results{" "}
        </p>

        {/* Filter Section */}
        <div className="w-72 h-[2993px] bg-slate-400 border border-[#525B31] rounded-lg mt-8">
          <div className="w-full h-12 flex justify-center items-center border-b border-[#525B31]">
            <p className="text-lg font-bold text-[#525B31]">Filter by</p>
          </div>
          <div className="h-40 w-full border-b border-[#525B31]">
            {/* Charts to be added here */}
          </div>
          <div className="h-80 w-full border-b border-[#525B31] p-2">
            <p className="font-semibold text-[#525B31]">Popular Filters</p>
          </div>
          <div className="h-20 w-full border-b border-[#525B31]"></div>
          <div className="h-64 w-full border-b border-[#525B31]"></div>
          <div className="h-56 w-full border-b border-[#525B31]"></div>
          <div className="h-40 w-full border-b border-[#525B31]"></div>
          <div className="h-72 w-full border-b border-[#525B31]"></div>
          <div className="h-64 w-full border-b border-[#525B31]"></div>
          <div className="h-56 w-full border-b border-[#525B31]"></div>
        </div>

        {/* Card Components Section */}
        <div className="w-[680px] h-[2993px] mt-8 pl-5 flex flex-col">
          <p className="text-custom-green text2xl font-bold">
            {searchedValue}: {searchedResults} results found
          </p>
          <div
            className="flex flex-row justify-center items-center w-96 h-16 rounded-[40px] shadow-result mt-2 mb-5"
            onClick={() => toggleDropdown()}
          >
            <img src={sort} />
            <p className="font-medium text-2xl text-custom-green w-72 flex justify-center">
              Sort By: {sortByValue}
            </p>
            <img src={arrows} />
            {dropdownOpen && (
              <div className="absolute z-10 mt-56 w-96 bg-white rounded-lg shadow-lg">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("Option 1")}
                  >
                    Option 1
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("Option 2")}
                  >
                    Option 2
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("Option 3")}
                  >
                    Option 3
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex-grow overflow-auto">
            <Hotel hotelData={currentItems} />
          </div>
          <p className="text-xl text-custom-green mb-3">
            {searchedValue}: {searchedResults} results found{" "}
          </p>

          {/* Pagination controls */}
          <div className="flex justify-between mt-4 mb-5 border border-[#B5B2B2]">
            <div>
              <button
                onClick={() =>
                  handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                }
                disabled={currentPage === 1}
                className="px-3 py-1 disabled:opacity-50 text-black"
              >
                &lt;
              </button>

              {/* First Page */}
              <button
                onClick={() => handlePageChange(1)}
                className={`mx-1 px-3 text-xl py-1 ${
                  currentPage === 1 ? "text-custom-gold" : "text-custom-green"
                }`}
              >
                1
              </button>

              {/* Pages 2-4 when on early pages */}
              {currentPage <= 4 && totalPages > 4 && (
                <>
                  {Array.from({ length: 3 }, (_, index) => index + 2).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`mx-1 px-3 py-1 text-xl ${
                          currentPage === page
                            ? "text-custom-gold"
                            : "text-custom-green"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  {totalPages > 4 && <span className="mx-1">...</span>}
                </>
              )}

              {/* Ellipsis around the current page when currentPage > 4 and not near the end */}
              {currentPage > 4 && currentPage < totalPages - 3 && (
                <>
                  <span className="mx-1">...</span>
                  <button
                    onClick={() => handlePageChange(currentPage)}
                    className={`mx-1 px-3 py-1 text-xl ${
                      currentPage === currentPage
                        ? "text-custom-gold"
                        : "text-custom-green"
                    }`}
                  >
                    {currentPage}
                  </button>
                  <span className="mx-1">...</span>
                </>
              )}

              {/* Last few pages (e.g., totalPages - 3 to totalPages - 1) */}
              {currentPage >= totalPages - 3 && totalPages > 4 && (
                <>
                  {Array.from(
                    { length: 3 },
                    (_, index) => totalPages - 3 + index
                  ).map(
                    (page) =>
                      page < totalPages && (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`mx-1 px-3 py-1 text-xl ${
                            currentPage === page
                              ? "text-custom-gold"
                              : "text-custom-green"
                          }`}
                        >
                          {page}
                        </button>
                      )
                  )}
                </>
              )}

              {/* Last Page */}
              {totalPages > 1 && (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`mx-1 px-3 py-1 text-xl ${
                    currentPage === totalPages
                      ? "text-custom-gold"
                      : "text-custom-green"
                  }`}
                >
                  {totalPages}
                </button>
              )}

              <button
                onClick={() =>
                  handlePageChange(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
            <div className="text-custom-gold h-full flex justify-center items-center mr-5">
              <p>showing (1-{totalPages})</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
