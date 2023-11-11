import axios from 'axios';
import AxiosInstance from '../config/axiosIntance';

import { generateTokenFromOld } from './generateAccessToken';

const submitNotes = async (payload, tokens) => {

  const data = {
    "Content": payload,
  };

  try {

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/api/v1/upload/addNotes',
      headers: {
        'Authorization': `Bearer ${tokens.userAccessToken} `,
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios.request(config)

    if (response.status === 200) {
      return true
    } else {
      return false
    }

  } catch (error) {
    if (error.response.status === 401) {

      let response = await generateTokenFromOld(tokens.refreshToken)

      if (response.status) {
        return response
      }

      else return response
    }

  }
};

export { submitNotes };
