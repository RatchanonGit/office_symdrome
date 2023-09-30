import axios from "axios";

//axios
export const listRole = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/roles", {
    headers: {
      authtoken,
    },
  });
};

export const createRole = async (value) =>
  await axios.post(process.env.REACT_APP_API + "/role", value);

export const removeRole = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_API + "/role/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const updateRole = async (authtoken, id, values) => {
  return await axios.put(process.env.REACT_APP_API + "/role/" + id, values, {
    headers: {
      authtoken,
    },
  });
};

