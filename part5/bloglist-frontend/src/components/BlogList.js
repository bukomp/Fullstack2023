import Blog from "./Blog";

const BlogList = ({ blogs, user }) => (
  <div>
    <h1>blogs</h1>
    <p>{user.name} logged in</p>
    {blogs.map((blog, i) => (
      <Blog key={i} blog={blog} />
    ))}
  </div>
);

export default BlogList;
