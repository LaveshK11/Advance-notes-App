import AxiosInstance from '../config/axiosIntance';

const submitNotes = async (payload, user_id) => {
  try {
    const data = {
      "Content": payload,
      "user_id": user_id || 12
    };

    const response = await AxiosInstance.post('/upload/addNotes', data);
    if (response.data.statusCode === 400) {
      return false;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { submitNotes };
