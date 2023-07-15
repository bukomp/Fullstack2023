import Blog from "./Blog";

const BlogList = ({ blogs, handleLike }) => (
  <div>
    {blogs.map((blog, i) => (
      <Blog key={i} blog={blog} handleLike={handleLike} />
    ))}
  </div>
);

export default BlogList;
