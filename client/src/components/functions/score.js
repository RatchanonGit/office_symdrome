import axios from "axios";

export const listscore = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/scores", {
    headers: {
      authtoken,
    },
  });
};

