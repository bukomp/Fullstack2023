import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "../components/Blog"; // replace with the path to your Blog component

test("renders blog title and author but not url or likes", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "https://testurl.com",
    likes: 5,
  };

  render(<Blog blog={blog} />);

  // Check that the title and author are in the document
  // Using a regex to ignore extra whitespace
  const title = new RegExp(blog.title, "i");
  const author = new RegExp(blog.author, "i");

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(author)).toBeInTheDocument();

  // Check that the URL and likes are not in the document
  // If you have used specific CSS classes for these elements, replace 'blog.url' and 'blog.likes' with those
  const url = new RegExp(blog.url, "i");
  const likes = new RegExp(String(blog.likes), "i");
  expect(screen.queryByText(url)).not.toBeInTheDocument();
  expect(screen.queryByText(likes)).not.toBeInTheDocument();
});
