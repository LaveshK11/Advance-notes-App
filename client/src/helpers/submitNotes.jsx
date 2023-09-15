import AxiosInstance from '../config/axiosIntance';

const subitNotes = async (payload) => {
  return new Promise((resolve, reject) => {

    let data = {
      "Content": payload,
      "user_id": 13
    }
    AxiosInstance.post('/upload/addNotes', data)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  });

};

export { subitNotes };
