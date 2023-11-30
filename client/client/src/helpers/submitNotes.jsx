import AxiosInstance from '../config/axiosIntance';

const submitNotes = async (payload) => {

  const data = {
    "Content": payload,
  };

  try {

    if (payload) {
      const response = await AxiosInstance.post('/upload/addNotes', { "Content": payload })

      return response.status === 200 ? true : false;
    }
    else {
      return false;
    }

  } catch (error) {

    return error.response.status

  }
};

export { submitNotes };
