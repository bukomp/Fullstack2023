import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "../components/CreateBlogForm";

test("new blog form calls event handler with correct data when submitted", async () => {
  const createBlog = jest.fn();

  render(<CreateBlogForm handleBlogCreation={createBlog} />);

  // Click the 'new note' button to display the form
  const newNoteButton = screen.getByText("new note");
  await userEvent.click(newNoteButton);

  const titleInput = screen.getByLabelText("title:");
  const authorInput = screen.getByLabelText("author:");
  const urlInput = screen.getByLabelText("url:");

  await userEvent.type(titleInput, "Test Blog");
  await userEvent.type(authorInput, "Test Author");
  await userEvent.type(urlInput, "https://testurl.com");

  const submitButton = screen.getByText("create");
  await userEvent.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0]).toEqual([
    "Test Blog",
    "Test Author",
    "https://testurl.com",
  ]);
});
