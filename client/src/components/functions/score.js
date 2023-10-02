import axios from "axios";

export const listscore = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/scores", {
    headers: {
      authtoken,
    },
  });
};

export const listSumScoreAndSumTime = async (id, authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/score/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const listScoreLimitDate = async (id, authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/score/user_scores/" + id, {
    headers: {
      authtoken,
    },
  });
};

