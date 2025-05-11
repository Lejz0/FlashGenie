import axiosInstance from '../axios/customAxios.ts';

interface LoginRequest {
  email: string;
  password: string;
}

const AuthorizationService = {
  login(data: LoginRequest) {
    return axiosInstance.post('/Authorization/login', data);
  },
};

export default AuthorizationService;
