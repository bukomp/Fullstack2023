import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [toggle, setToggle] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleBlogData = (event) => {
    event.preventDefault();
    setToggle(!toggle);
  };

  if (!toggle) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleBlogData}>view</button>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleBlogData}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button>like</button>
        <br />
        {blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
