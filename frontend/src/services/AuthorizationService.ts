import axiosInstance from '../axios/customAxios.ts';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name : string,
  email : string,
  password : string,
  confirmPassword : string
}

const AuthorizationService = {
  login(data: LoginRequest) {
    return axiosInstance.post('/Authorization/login', data);
  },
  register(data : RegisterRequest) {
    return axiosInstance.post("/Authorization/register", data)
  }
};

export default AuthorizationService;
