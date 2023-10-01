import axios from "axios";

export const createUser = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_API + "/user/create", value, {
    headers: {
      authtoken,
    },
  });
};

export const listUser = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/users", {
    headers: {
      authtoken,
    },
  });
};

export const updateUser = async (authtoken, id, values) => {
  return await axios.put(process.env.REACT_APP_API + "/user/" + id, values, {
    headers: {
      authtoken,
    },
  });
};

export const removeUser = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_API + "/user/" + id, {
    headers: {
      authtoken,
    },
  });
};

// export const resetPassword = async (authtoken, id, values) => {
//   return await axios.put(process.env.REACT_APP_API + "/users/" + id, values, {
//     headers: {
//       authtoken,
//     },
//   });
// };