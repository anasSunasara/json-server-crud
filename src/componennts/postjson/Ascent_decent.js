import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../componennts/postjson/Pagination";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Ascent_decent() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    search_all_Data_and_Sortdata();
  }, [posts, searchQuery, sortConfig]);

  //--------get data from json-------------------//
  const [filteredPosts, setFilteredPosts] = useState([]);
  const fetchPosts = () => {
    fetch("http://localhost:3001/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  };

  // -------FILTER FORE DATE AND AUTHOR-----------//
  const [searchDate, setSearchDate] = useState("");
  const [selectedAuthur, setSelectedAuthur] = useState("");
//  --------------FILTER POST AND DATE-------------//
  const FilterPosts_Date_and_authour = () => {
    let sortedPosts = [...posts];

    // Filter by date
    if (searchDate) {
      sortedPosts = sortedPosts.filter(
        (post) => post.date.includes(searchDate) // Adjust based on date format
      );
    }

    // Filter by author
    if (selectedAuthur) {
      sortedPosts = sortedPosts.filter((post) =>
        post.author.toLowerCase().includes(selectedAuthur.toLowerCase())
      );
    }

    setFilteredPosts(sortedPosts);
    setIsFiltered(true);
  };

  // --------SEARCH ALL DATA AND SORT DATA---------//
  const search_all_Data_and_Sortdata = () => {
    let sortedquerydata = [...posts];
    if (sortConfig) {
      sortedquerydata.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return -1;
      });
    }

    if (searchQuery) {
      sortedquerydata = sortedquerydata.filter(
        (post) =>
          post.id.toString().includes(searchQuery.toLowerCase()) ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredPosts(sortedquerydata);
  };

  // ------------------Clear filter----------------//
  const [isFiltered, setIsFiltered] = useState(false);
  const clearFilter = () => {
    setSelectedAuthur("");
    setSearchQuery("");
    setSearchDate("");
    setFilteredPosts(posts);
    setIsFiltered(false);
  };

  // ---------SORT Request FUNCTION----------------//
  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? faSortUp : faSortDown;
    }
    return faSort;
  };

  // -------------------Pagination-----------------//
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  // Get items for the current page
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

 
  // ------------------DELETE POST---------//
  const [IsDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const openDeletePopup = (id) => {
    setIsDeletePopupOpen(true);
    setDeleteId(id);
  };
  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setDeleteId(null);
  };
  const deletePost = async () => {
    if (deleteId !== null) {
      try {
        // DELETE request json-server ke liye
        await fetch(`hhttp://localhost:3001/posts/${deleteId}`, {
          method: "DELETE",
        });
        // Successfully delete hone par post ko local state se bhi remove karna
        setPosts(posts.filter((post) => post.id !== deleteId));
        fetchPosts()
        closeDeletePopup();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };
  // -----------------TRUNCADE------------//
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  

  return (
    <>
   
      <div className="p-4">
        <div className="flex justify-between justify-center">
          <h2 className="text-xl font-bold mb-4 underline">Posts</h2>
          <div>
            {/* FILTER POST SEARCH */}
            <input
              type="text"
              placeholder="Search post..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded"
            />
            {/*FILTER AUTHER SEARCH*/}
            <select
              value={selectedAuthur}
              onChange={(e) => setSelectedAuthur(e.target.value)}
              className="p-2 mx-2 border border-gray-300 rounded-md bg-white text-gray-700 "
            >
              <option value="">Search an author</option>
              {posts.map((post, index) => (
                <option key={index} value={post.author}>
                  {post.author}
                </option>
              ))}
            </select>
            
            {/* FILTER DATE SEARCH */}
            <input
              type="date"
              placeholder="Search..."
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="mb-4 p-2 me- border border-gray-300 rounded"
            />
            {/* FILTER CLEAR BUTTON */}
            <button
              className="border py-2 px-3 rounded ms-2  me-1 bg-blue-600 text-white"
              onClick={isFiltered ? clearFilter : FilterPosts_Date_and_authour}
            >
              {isFiltered ? "Clear" : "Filter"}
            </button>{" "}
            
            {/* ADD BUTTON */}
            <NavLink to="/add_post"
              className="border py-2 px-3 rounded bg-blue-600 text-white"
            >
              ADD NEW POST
            </NavLink>
          </div>
        </div>

        {/*  TABLE FORE JSON DATA*/}
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("title")}
              >
                Title <FontAwesomeIcon icon={getSortIcon("title")} />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("content")}
              >
                Content <FontAwesomeIcon icon={getSortIcon("content")} />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("author")}
              >
                Author <FontAwesomeIcon icon={getSortIcon("author")} />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("date")}
              >
                Date <FontAwesomeIcon icon={getSortIcon("date")} />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider "
                
              >
                images
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("tags")}
              >
                Tags <FontAwesomeIcon icon={getSortIcon("tags")} />
              </th>
              <th className="px-6 py-3 text-left text-xs font- text-gray-600 uppercase tracking-wider cursor-pointer">
                Opration
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedPosts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {post.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {truncateText(post.content,15)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.date}
                </td>
                <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                  {post.image ? (
                    <img
                      src={post.image} // Relative path to image
                      alt="title"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {Array.isArray(post.tags) ? post.tags.join(", ") : post.tags}
                </td>
                <td className="flex	px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button onClick={() => openDeletePopup(post.id)}>
                    <MdDelete className=" me-5 text-red-600 text-2xl" />
                  </button>
                  <button>
                  <NavLink to={`/Edit_post/${post.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    <FaEdit className="me-5 text-blue-600 text-xl" />
                  </NavLink>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        

        {/* Delete modal */}
        {IsDeletePopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
              <h2 className="text-xl mb-4">
                Are you sure you want to delete this post?
              </h2>
              <button
                className="px-3 py-2 border-2 rounded text-white bg-red-600 me-2"
                onClick={deletePost}
              >
                Yes, Delete
              </button>
              <button
                className="px-3 py-2 border-2 rounded text-white bg-gray-500"
                onClick={closeDeletePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

       
      </div>
    </>
  );
}

export default Ascent_decent;
