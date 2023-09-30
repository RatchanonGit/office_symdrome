import axios from "axios";

export const listInstitution = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/institutions", {
    headers: {
      authtoken,
    },
  });
};

export const createInstitution = async (value) =>
  await axios.post(process.env.REACT_APP_API + "/institution", value);


export const removeInstitution = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_API + "/institution/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const updateInstitution  = async (authtoken, id, values) => {
  return await axios.put(process.env.REACT_APP_API + "/institution/" + id, values, {
    headers: {
      authtoken,
    },
  });
};