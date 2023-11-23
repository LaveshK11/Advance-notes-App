import AxiosInstance from '../config/axiosIntance';
import axios from 'axios';

const generateTokenFromOld = async (userToken) => {

  try {

    console.log(userToken)


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/api/v1/user/refresh-token',
      headers: {
        'Authorization': `Bearer ${userToken} `,
        'Content-Type': 'application/json'
      },
    };

    const response = await axios.request(config)
    

    return response.data

  } catch (error) {

    return false;
  }
};

export { generateTokenFromOld };
