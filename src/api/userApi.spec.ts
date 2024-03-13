import axiosClient from './axiosClient';
import userApi from './userApi';
import MockAdapter from 'axios-mock-adapter';

describe('userApi', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axiosClient);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('register sends a POST request to /auth/signup', async () => {
    const userData = { email: 'test@example.com', password: 'password' };
    const responseData = { email: 'test@example.com' };
    mockAxios.onPost('/auth/signup', userData).reply(200, responseData);

    const result = await userApi.register(userData);
    expect(result).toEqual(responseData);
  });

  it('login sends a POST request to /auth/login', async () => {
    const userData = { email: 'test@example.com', password: 'password' };
    const responseData = { email: 'test@example.com' };
    mockAxios.onPost('/auth/login', userData).reply(200, responseData);

    const result = await userApi.login(userData);
    expect(result).toEqual(responseData);
  });

  it('listMovies sends a GET request to /movie', async () => {
    const responseData = { id: 1, title: 'Movie Title', description: 'Movie Description', url: 'https://example.com/movie' };
    mockAxios.onGet('/movie').reply(200, responseData);

    const result = await userApi.listMovies();
    expect(result).toEqual(responseData);
  });
});
