import axiosClient from './axiosClient';

interface User {
    email: string;
    password: string;
}

interface Movie {
    id: number;
    title: string;
    description: string;
    url: string;
}

const userApi = {
  register(data: User): Promise<User> {
    const url = '/auth/signup';
    return axiosClient.post(url, data);
  },

  login(data: User): Promise<User> {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },

  listMovies(): Promise<Movie> {
    const url = '/movie';
    return axiosClient.get(url);
  },
};

export default userApi;