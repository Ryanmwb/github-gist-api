import axios from "axios";

const baseUrl = "https://api.github.com";

async function getGistsByUsername(username) {
  const { data } = await axios.get(`${baseUrl}/users/${username}/gists`);
  return data;
}

async function getGistById(gistId) {
  const { data } = await axios.get(`${baseUrl}/gists/${gistId}`);
  return data;
}

export { getGistsByUsername, getGistById };
