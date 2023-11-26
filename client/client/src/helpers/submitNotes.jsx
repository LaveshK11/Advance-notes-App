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
        'Authorization': `Bearer ${tokens.accessToken} `,
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios.request(config);

    return response.status === 200 ? true : false;

  } catch (error) {

    if (error.response && error.response.status === 401) {

      try {
        const newTokens = await generateTokenFromOld(tokens.refreshToken);

        if (newTokens.status) {
          return submitNotes(payload, newTokens); // Return the result of the recursive call
        } else {
          return newTokens.status === 200 ? true : 401
        }
      } catch (error) {
        return false;
      }
    } else {
      3
      return false;
    }
  }
};

export { submitNotes };
