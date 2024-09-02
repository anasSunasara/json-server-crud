import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";

function App() {
  // --------GET DATA FROM JSON FILE----->
  const [posts, setPosts] = useState([]);
  const [sortPosts, setSortPosts] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "id", // Default key for sorting
    direction: "ascending", // Default direction for sorting
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    sortAndFilterPosts();
  }, [posts, sortConfig]);

  const fetchPosts = () => {
    fetch("http://192.168.1.4:3001/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setSortPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  };

  // ----------SORT CODE ---------->
  const sortAndFilterPosts = () => {
    let sortedPosts = [...posts];
    if (sortConfig) {
      sortedPosts.sort((a, b) => {
        // Convert to numbers if possible, else compare as strings
        const aValue = isNaN(a[sortConfig.key]) ? a[sortConfig.key] : +a[sortConfig.key];
        const bValue = isNaN(b[sortConfig.key]) ? b[sortConfig.key] : +b[sortConfig.key];

        // Determine the sort order
        return sortConfig.direction === "ascending"
          ? aValue > bValue ? 1 : -1
          : aValue < bValue ? 1 : -1;
      });
    }
    setSortPosts(sortedPosts);
  };
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Posts</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("title")}
            >
              Title <FontAwesomeIcon icon={getSortIcon("title")} />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("content")}
            >
              Content <FontAwesomeIcon icon={getSortIcon("content")} />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("author")}
            >
              Author <FontAwesomeIcon icon={getSortIcon("author")} />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("date")}
            >
              Date <FontAwesomeIcon icon={getSortIcon("date")} />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("image")}
            >
              Image <FontAwesomeIcon icon={getSortIcon("image")} />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("tags")}
            >
              Tags <FontAwesomeIcon icon={getSortIcon("tags")} />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortPosts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {post.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.content}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.author}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.image ? (
                  <img
                    src={post.image} // Path relative to public folder
                    alt="Image not" 
                    className="w-10 h-8 object-cover"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.tags.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
