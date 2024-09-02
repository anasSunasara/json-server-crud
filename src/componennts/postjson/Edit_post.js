import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Edit_post() {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostForEdit();
    fetchPosts();
  }, [id]);

  // State to hold posts data
  // ********************* GET POST ******************//
  const [posts, setPosts] = useState([]);
  const fetchPosts = () => {
    fetch("http://localhost:3001/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  };
  // ***************** Fetch the post to edit *******************//
  // State to hold form data
  const [updatedData, setUpdatedData] = useState({
    title: "",
    content: "",
    author: "",
    date: "",
    tags: "",
    image: "",
  });
  const fetchPostForEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${id}`);
      const data = await response.json();
      setUpdatedData({
        title: data.title,
        content: data.content,
        author: data.author,
        date: data.date,
        tags: data.tags.join(", "), // Convert tags array to comma-separated string
        image: data.image,
      });
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  // ******************* EDIT POST ********************* //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedData((prevData) => ({ ...prevData, image: reader.result }));
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };
  // Update post data
  const updatePost = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedData,
          tags: updatedData.tags.split(",").map((tag) => tag.trim()), // Convert tags back to array
        }),
      });

      if (response.ok) {
        navigate("/"); // Redirect to home page after successful update
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

 

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full max-w-lg mx-auto ">
      <div className="rounded-lg border border-2 px-5 py-3 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">Edit Post</h1>
        <form onSubmit={updatePost}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={updatedData.title}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg border border-gray-300 w-full"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="content"
              placeholder="Content"
              value={updatedData.content}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg border border-gray-300 w-full h-24"
            />
          </div>
          <div className="mb-4">
            <select
              name="author"
              value={updatedData.author}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg border border-gray-300 w-full"
            >
              <option value="">Search an author</option>
              {posts.map((post, index) => (
                <option key={index} value={post.author}>
                  {post.author}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="date"
              value={updatedData.date}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg border border-gray-300 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={updatedData.tags}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-lg border border-gray-300 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="px-4 py-2 rounded-lg border border-gray-300 w-full"
            />
            {updatedData.image && (
              <img
                src={updatedData.image}
                alt="Current"
                className="mt-2 w-24 h-24 object-cover"
              />
            )}
          </div>
          <div className="flex justify-start">
            <button
              className="px-6 py-2 mr-2 rounded bg-blue-600 text-white"
              type="submit"
            >
              Save
            </button>
            <button
              className="px-6 py-2 rounded bg-gray-600 text-white"
              type="button"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit_post;
