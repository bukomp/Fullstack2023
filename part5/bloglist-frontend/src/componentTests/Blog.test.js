import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from '../components/Blog'; // replace with the path to your Blog component

test('renders blog title and author but not url or likes', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://testurl.com',
    likes: 5,
  };

  render(<Blog blog={blog} />);

  // Check that the title and author are in the document
  // Using a regex to ignore extra whitespace
  const title = new RegExp(blog.title, 'i');
  const author = new RegExp(blog.author, 'i');

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByText(author)).toBeInTheDocument();

  // Check that the URL and likes are not in the document
  // If you have used specific CSS classes for these elements, replace 'blog.url' and 'blog.likes' with those
  const url = new RegExp(blog.url, 'i');
  const likes = new RegExp(String(blog.likes), 'i');
  expect(screen.queryByText(url)).not.toBeInTheDocument();
  expect(screen.queryByText(likes)).not.toBeInTheDocument();
});

test('shows blog url and likes when view details button is clicked', () => {
  const blog = {
    id: '5fffd4f8d4f7f10004f6e6a0',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://testurl.com',
    likes: 5,
    user: {
      name: 'John Doe',
      username: 'johndoe',
      passwordHash: 'hashedpassword',
      id: '60b6c0f9d4f7f10004f6e6a0',
      blogs: ['5fffd4f8d4f7f10004f6e6a0'],
    },
  };

  render(<Blog blog={blog} />);

  // Find the view details button and click it
  // If the button text is different, replace 'view' with the actual text
  const button = screen.getByText('view');
  fireEvent.click(button);

  // Check that the URL and likes are now in the document
  // Using a regex to ignore extra whitespace
  const url = new RegExp(blog.url, 'i');
  const likes = new RegExp(String(blog.likes), 'i');
  expect(screen.getByText(url)).toBeInTheDocument();
  expect(screen.getByText(likes)).toBeInTheDocument();
});

test('clicking the like button twice calls event handler twice', () => {
  const blog = {
    id: '5fffd4f8d4f7f10004f6e6a0',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://testurl.com',
    likes: 5,
    user: {
      name: 'John Doe',
      username: 'johndoe',
      passwordHash: 'hashedpassword',
      id: '60b6c0f9d4f7f10004f6e6a0',
      blogs: ['5fffd4f8d4f7f10004f6e6a0'],
    },
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} handleLike={mockHandler} />);

  const viewButton = screen.getByText('view');
  fireEvent.click(viewButton);

  // Find the like button and click it twice
  // If the button text is different, replace 'like' with the actual text
  const likeButton = screen.getByText('like');

  expect(likeButton).toBeInTheDocument();
  expect(likeButton).toBeVisible();

  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  // Check that the mock handler was called twice
  expect(mockHandler.mock.calls).toHaveLength(2);
});
