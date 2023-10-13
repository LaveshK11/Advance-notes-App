import AxiosInstance from '../config/axiosIntance';

const userRegister = async (userData) => {
  try {

    const response = await AxiosInstance.post('/user/register', userData);

    if (response.data.statusCode === 400) {
      return false;
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error)
    console.error(error);
    throw error;
  }
};

export { userRegister };
