import axios from "axios";

export const listSchedules = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/schedules", {
    headers: {
      authtoken,
    },
  });
};

export const createSchedules = async (authtoken,value) =>
  await axios.post(process.env.REACT_APP_API + "/schedules", value, {
    headers: {
      authtoken,
    },
  });

export const removeSchedules = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_API + "/schedules/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const updateSchedules = async (authtoken, id, values) => {
  return await axios.put(process.env.REACT_APP_API + "/schedules/" + id, values, {
    headers: {
      authtoken,
    },
  });
};