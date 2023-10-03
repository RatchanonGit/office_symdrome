import axios from "axios";

export const listSumUser = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/dashboard/sum-user", {
      headers: {
        authtoken,
      },
    });
  };

export const listSumScore = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/dashboard/sum-score", {
      headers: {
        authtoken,
      },
    });
  };

export const listSumTime  = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/dashboard/sum-time", {
      headers: {
        authtoken,
      },
    });
  };

export const listSumScoreLimitDate = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/dashboard/score-limit-date", {
      headers: {
        authtoken,
      },
    });
  };

export const listSumUserOnInstitution = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/dashboard/user-on-institution", {
      headers: {
        authtoken,
      },
    });
  };

export const listTopTenScore = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/dashboard/topten", {
      headers: {
        authtoken,
      },
    });
  };
  