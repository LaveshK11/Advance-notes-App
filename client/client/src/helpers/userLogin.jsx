import AxiosInstance from '../config/axiosIntance';

const userLogin = async (userData) => {
  try {

    const response = await AxiosInstance.post('/user/login', userData);

    return response.data

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { userLogin };
