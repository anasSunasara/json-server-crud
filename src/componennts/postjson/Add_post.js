import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Add_post() {
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);
// ******************* GET POST ******************* //
  const [posts, setPosts] = useState([]);
  const fetchPosts = () => {
    fetch("http://localhost:3001/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  };
//  ****************** ADD POST ****************** //
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    date: "",
    tags: "",
    image: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const savePostData = async (e) => {
    e.preventDefault();
  
    const { title, content, author, date, tags, image } = formData;
    const tagsArray = tags.split(",").map((tag) => tag.trim());
    const postData = {
      title,
      content,
      author,
      date,
      tags: tagsArray,
      image,
    };

    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log("Post saved successfully.");

        // Navigate to the home page after saving the post
        navigate("/");
      } else {
        console.error("Failed to add post. Status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <form
        onSubmit={savePostData}
        className="rounded-lg border border-2 px-5 py-3 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-start text-gray-600">
          Add New Post
        </h1>

        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="px-4 py-2 rounded-lg border border-gray-300 w-full"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            name="content"
            placeholder="Content"
            className="px-4 py-2 rounded-lg border border-gray-300 w-full h-24"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <select
            name="author"
            className="px-4 py-2 rounded-lg border border-gray-300 w-full"
            value={formData.author}
            onChange={handleInputChange}
            required
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
            placeholder="Date"
            className="px-4 py-2 rounded-lg border border-gray-300 w-full"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="px-4 py-2 rounded-lg border border-gray-300 w-full"
            value={formData.tags}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="file"
            name="image"
            className="px-4 py-2 my-2 rounded-lg border border-gray-300 w-full"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="flex justify-start mt-6">
          <button
            className="px-6 py-2 border rounded text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            type="submit"
          >
            Save
          </button>
          <button
            className="px-6 py-2 ml-2 border rounded text-white bg-gray-500 hover:bg-gray-600 transition-colors"
            type="button"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add_post;
