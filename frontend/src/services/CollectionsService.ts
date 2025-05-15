import axiosInstance from '../axios/customAxios.ts';

const CollectionsService = {
  getAll() {
    return axiosInstance.get('/Collection');
  },
  deleteById(id: string) {
    return axiosInstance.delete(`/Collection/${id}`);
  },
};

export default CollectionsService;
