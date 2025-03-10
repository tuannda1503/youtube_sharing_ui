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
  listMovies(): Promise<Movie> {
    const url = '/movie';
    return axiosClient.get(url);
  },
};

export default userApi;