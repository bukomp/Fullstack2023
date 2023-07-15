import Blog from "./Blog";

const BlogList = ({ blogs, handleLike, handleDelete }) => (
  <div>
    {blogs.map((blog, i) => (
      <Blog
        key={i}
        blog={blog}
        handleLike={handleLike}
        handleDelete={handleDelete}
      />
    ))}
  </div>
);

export default BlogList;
