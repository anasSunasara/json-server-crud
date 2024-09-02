import React, { useState, useEffect } from "react";

function Filter() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedAuthur, setSelectedAuthur] = useState("");


  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch data from API
  const fetchPosts = () => {
    fetch("http://192.168.1.4:3001/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  };
  // Filter posts based on search query and date
  const filterPosts = () => {
    let searchedPosts = [...posts];
    
    // Filter by search query
    if (searchQuery) {
      searchedPosts = searchedPosts.filter((post) =>
        post.id.toString().includes(searchQuery.toLowerCase()) ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by date
    if (searchDate) {
      searchedPosts = searchedPosts.filter((post) =>
        post.date.includes(searchDate) // Adjust based on date format
      );
    }
    
    // Filter by authur
    if (selectedAuthur) {
      searchedPosts = searchedPosts.filter((post) =>
        post.author.toLowerCase().includes(selectedAuthur.toLowerCase())
      );
    }


    setFilteredPosts(searchedPosts);
    setIsFiltered(true);
  };
  // Clear filter
  const clearFilter = () => {
    setSelectedAuthur("")
    setSearchQuery("");
    setSearchDate("");
    setFilteredPosts(posts);
    setIsFiltered(false);
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between">
      <h2 className="text-xl font-bold mb-4">Posts</h2>
      <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 me-3 border border-gray-300 rounded"
      />
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      
      <select
        value={selectedAuthur}
        onChange={(e)=> setSelectedAuthur(e.target.value)}
        className="p-2 border border-gray-300 rounded-md bg-white text-gray-700 ms-3"
      >
        <option value="">
          Search an Author
        </option>
        {posts.map((post, index) => (
        
          <option key={index} value={post.author}>
            {post.author}
          </option>
        ))}
      </select>
      <button
        className="border py-2 px-3 rounded ms-3"
        onClick={isFiltered ? clearFilter : filterPosts}
      >
        {isFiltered ? "Clear" : "Filter"}
      </button>
     
      </div>
      
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              Content
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
              Tags
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {post.id}
              </td>
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
                    src={post.image}// Path relative to public folder
                    alt="Not image"
                    className="w-10 h-5 object-cover"
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

export default Filter;
