import axiosInstance from '../axios/customAxios.ts';

const QuestionsService = {
  generate(data: string) {
    return axiosInstance.post('/Questions/generate', data);
  },
  getQuestionsByCollectionId(id: string) {
    return axiosInstance.get(`/Collection/${id}/questions`);
  },
};

export default QuestionsService;
