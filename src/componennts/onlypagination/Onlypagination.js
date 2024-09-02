import React from 'react';
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";

const Onlypagination = ({ currentPage, totalPages, onPageChange }) => {

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-end mt-3">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-gray-300 border border-gray-400 rounded-md text-gray-700 disabled:opacity-50"
      >
       <FcPrevious/>
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 mx-1 border rounded-md ${
            currentPage === index + 1
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500'
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-gray-300 border border-gray-400 rounded-md text-gray-700 disabled:opacity-50"
      >
        <FcNext/>
      </button>
    </div>
  );
};

export default Onlypagination;
