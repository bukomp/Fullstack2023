const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0
  );
};

const favoriteBlog = (blogs) => {
  return _.cloneDeep(blogs)
    .sort((a, b) => {
      return a.likes - b.likes;
    })
    .slice(-1)[0];
};

const mostBlogs = (blogs) => {
  return _.uniqBy(blogs, (blog) => blog.author)
    .map((blog) => ({
      author: blog.author,
      blogs: 0,
    }))
    .map((author) => {
      author.blogs = blogs.filter(
        (blog) => blog.author === author.author
      ).length;
      return author;
    })
    .sort((a, b) => {
      return a.blogs - b.blogs;
    })
    .slice(-1)[0];
};

const mostLikes = (blogs) => {
  return _.uniqBy(blogs, (blog) => blog.author)
    .map((blog) => ({
      author: blog.author,
      likes: 0,
    }))
    .map((author) => {
      author.likes = totalLikes(
        blogs.filter((blog) => blog.author === author.author)
      );
      return author;
    })
    .sort((a, b) => {
      return a.likes - b.likes;
    })
    .slice(-1)[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
