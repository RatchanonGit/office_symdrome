import axios from "axios";

export const listscore = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/scores", {
    headers: {
      authtoken,
    },
  });
};

export const removeScore = async (authtoken, id) => {
  return await axios.get(process.env.REACT_APP_API + "/scores" , {
    headers: {
      authtoken,
    },
  })
}