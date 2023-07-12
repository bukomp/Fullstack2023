import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";

import blogService from "./services/blogs.service";
import userService from "./services/user.service";

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("loggedInUserToken");
    if (token) {
      setToken(token);
      // Fetch the blogs after loading the token
      fetchBlogs(token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const data = await userService.login(username, password);
      setUser({
        name: data.name,
        username: data.username,
      });
      setToken(data.token);

      window.localStorage.setItem("loggedInUserToken", data.token);

      fetchBlogs(data.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    setToken(null);
    window.localStorage.removeItem("loggedInUserToken");
  };

  const fetchBlogs = async (token) => {
    try {
      const data = await blogService.fetchBlogs(token);
      setBlogs(data);
    } catch (error) {
      console.error("Fetching blogs failed:", error);
    }
  };

  return !token ? (
    <LoginForm handleLogin={handleLogin} />
  ) : (
    <>
      <h1>blogs</h1>
      <p>
        {user.name} logged in{" "}
        <span>
          <button onClick={handleLogout}>Logout</button>
        </span>
      </p>

      <BlogList blogs={blogs} />
    </>
  );

  /*
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );*/
};

export default App;
