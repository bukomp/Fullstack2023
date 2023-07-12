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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, fetchBlogs, createBlog };
