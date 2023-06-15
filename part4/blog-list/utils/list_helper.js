const _ = require("lodash/core");

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
  return blogs
    .sort((a, b) => {
      return a.likes - b.likes;
    })
    .slice(-1)[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
