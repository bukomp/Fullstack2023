import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const fetchBlogs = async (token) => {
  const response = await axios.get(`${baseUrl}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const createBlog = async (token, title, author, url) => {
  const response = await axios.post(
    `${baseUrl}`,
    { title, author, url },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const updateBlogLikes = async (token, id, likes) => {
  const response = await axios.put(
    `${baseUrl}/${id}`,
    { likes: likes },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const deleteBlog = async (token, id) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, fetchBlogs, createBlog, updateBlogLikes, deleteBlog };
