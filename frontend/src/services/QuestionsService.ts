import axiosInstance from '../axios/customAxios.ts';

const QuestionsService = {
  generate(data) {
    return axiosInstance.post('/Questions/generate', data);
  },
};

export default QuestionsService;
