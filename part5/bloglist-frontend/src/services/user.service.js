import axios from "axios";

const baseURL = "/api/login";

const login = async (username, password) => {
  const response = await axios.post(`${baseURL}`, { username, password });
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
