import axiosInstance from '../axios/customAxios.ts';

const QuestionsService = {
  create(data) {
    return axiosInstance.post('/Questions/generate', data);
  },
};

export default QuestionsService;
