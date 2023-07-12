import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs.service";
import userService from "./services/user.service";

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("loggedInUserToken");
    if (token) {
      setToken(token);
      // Fetch the blogs after loading the token
      fetchBlogs(token);
    }
  }, []);

  const toggleNotification = (message, status = "notification" || "error") => {
    const newNotification = { message, status };
    setNotification(newNotification);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

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
      console.log(error);
      toggleNotification(error.response.data.error, "error");
    }
  };

  const handleBlogCreation = async (title, author, url) => {
    try {
      const newBlog = await blogService.createBlog(token, title, author, url);
      toggleNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "notification"
      );
      setBlogs([...blogs, newBlog]);
    } catch (error) {
      toggleNotification(error.message, "error");
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
    <LoginForm handleLogin={handleLogin} notification={notification} />
  ) : (
    <>
      <h1>blogs</h1>

      <Notification notification={notification}></Notification>

      <p>
        {user.name} logged in{" "}
        <span>
          <button onClick={handleLogout}>Logout</button>
        </span>
      </p>
      <CreateBlogForm handleBlogCreation={handleBlogCreation} />
      <BlogList blogs={blogs} />
    </>
  );
};

export default App;
