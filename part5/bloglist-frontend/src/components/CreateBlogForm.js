import React, { useState } from 'react';

const CreateBlogForm = ({ handleBlogCreation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [toggle, setToggle] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleBlogCreation(title, author, url);
  };

  const toggleBlogCreationForm = (event) => {
    event.preventDefault();
    setToggle(!toggle);
  };

  if (!toggle) {
    return <button onClick={toggleBlogCreationForm}>new blog</button>;
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">title:</label>
          <input
            type="text"
            name="title"
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="authorInput">author:</label>
          <input
            type="text"
            name="author"
            id="authorInput"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="urlInput">url:</label>
          <input
            type="text"
            name="url"
            id="urlInput"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
        <button onClick={toggleBlogCreationForm}>cancel</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
