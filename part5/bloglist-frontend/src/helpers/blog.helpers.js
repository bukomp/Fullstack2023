const sortBlogsByLikes = (arrayOfBlogs) => {
  let sortedBlogs = [...arrayOfBlogs];
  sortedBlogs.sort((a, b) => b.likes - a.likes);
  return sortedBlogs;
};

export { sortBlogsByLikes };
