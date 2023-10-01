import axios from "axios";

//axios
export const listRole = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/option/roles", {
    headers: {
      authtoken,
    },
  });
};

export const createRole = async (authtoken, value) =>
  await axios.post(process.env.REACT_APP_API + "/option/role", value, {
    headers: {
      authtoken,
    },
  });

export const removeRole = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_API + "/option/role/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const updateRole = async (authtoken, id, values) => {
  return await axios.put(process.env.REACT_APP_API + "/option/role/" + id, values, {
    headers: {
      authtoken,
    },
  });
};

