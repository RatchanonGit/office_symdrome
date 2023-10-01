import axios from "axios";

export const listTitle = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/option/titles", {
    headers: {
      authtoken,
    },
  });
};

export const createTitle = async (authtoken,value) =>
  await axios.post(process.env.REACT_APP_API + "/option/title", value,{
    headers: {
      authtoken,
    },
  });

  
export const removeTitle = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_API + "/option/title/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const updateTitle = async (authtoken, id, values) => {
  return await axios.put(process.env.REACT_APP_API + "/option/title/" + id, values, {
    headers: {
      authtoken,
    },
  });
};