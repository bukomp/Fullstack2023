const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toStrictEqual(1);
});

describe("total likes", () => {
  const blogList = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "66422aa71b54b676234d17f8",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
      __v: 0,
      url: "null",
    },
    {
      _id: "2b422aa71b55a676234d17f8",
      title: "Go To",
      author: "Chichita",
      url: "http://www.u.arizona.edu/",
      likes: 4,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(blogList.slice(0, 1));
    expect(result).toStrictEqual(5);
  });

  test("find out which blog has the most likes", () => {
    const result = listHelper.favoriteBlog(blogList);
    expect(result).toStrictEqual(blogList[1]);
  });

  test("find author with most blogs", () => {
    const authorWithTheMostBlogs = {
      author: "Edsger W. Dijkstra",
      blogs: 2,
    };
    const result = listHelper.mostBlogs(blogList);
    expect(result).toStrictEqual(authorWithTheMostBlogs);
  });

  test("find author with most likes", () => {
    const authorWithTheMostLikes = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    const result = listHelper.mostLikes(blogList);
    expect(result).toStrictEqual(authorWithTheMostLikes);
  });
});
