import axios from "axios";

export const listInstitution = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/option/institutions", {
    headers: {
      authtoken,
    },
  });
};

export const createInstitution = async (authtoken, value) =>
  await axios.post(process.env.REACT_APP_API + "/option/institution", value, {
    headers: {
      authtoken,
    },
  });


export const removeInstitution = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_API + "/option/institution/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const updateInstitution = async (authtoken, id, values) => {
  return await axios.put(process.env.REACT_APP_API + "/option/institution/" + id, values, {
    headers: {
      authtoken,
    },
  });
};