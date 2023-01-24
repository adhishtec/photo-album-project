import axios from "axios";
// const apiKey = process.env.REACT_APP_API_KEY;
const getData = (url) => {
  return axios.get(url);
};

export default getData;
