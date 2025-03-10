import axiosClient from "./axiosClient";
import userApi from "./userApi";
import MockAdapter from "axios-mock-adapter";

describe("userApi", () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axiosClient);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it("listMovies sends a GET request to /movie", async () => {
    const responseData = {
      id: 1,
      title: "Movie Title",
      description: "Movie Description",
      url: "https://example.com/movie",
    };
    mockAxios.onGet("/movie").reply(200, responseData);

    const result = await userApi.listMovies();
    expect(result).toEqual(responseData);
  });
});
