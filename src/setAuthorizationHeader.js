import axios from "axios";

export default (token) => {
  // console.log(token)
  if (token !== null) {
    axios.defaults.headers.common.authorisation = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common.authorisation;
  }
};
