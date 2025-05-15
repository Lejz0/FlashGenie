import axiosInstance from '../axios/customAxios.ts';

const CollectionsService = {
  getAll() {
    return axiosInstance.get('/Collection');
  },
  getById(id: string) {
    return axiosInstance.get(`/Collection/${id}`);
  },
  deleteById(id: string) {
    return axiosInstance.delete(`/Collection/${id}`);
  },
};

export default CollectionsService;
