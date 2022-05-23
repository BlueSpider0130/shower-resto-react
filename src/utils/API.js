/* eslint-disable consistent-return */
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
import { CONSTANTS } from './constants';
import Axios from './axios';

Axios.defaults.baseURL = CONSTANTS.serverURL;

export const test = async (data) => {
  const DATA = await Axios.post(CONSTANTS.testURL, data)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } 
    })
    .catch((err) => {
      console.log(err);
    });
  return DATA;
};

export const upload = async (data) => {
  const DATA = await Axios.post(CONSTANTS.uploadPhotosURL, data)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } 
    })
    .catch((err) => {
      console.log(err);
    });
  return DATA;
};

export const submitContact = async (data) => {
  const DATA = await Axios.post(CONSTANTS.submitContactURL, data)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } 
    })
    .catch((err) => {
      console.log(err);
    });
  return DATA;
};

