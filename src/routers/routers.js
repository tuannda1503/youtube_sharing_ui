import ShareYoutubeMovie from "../components/Share";
import FunnyMovie from "../pages/funny_movies";

const routers = [
  {
    path: "/",
    exact: true,
    public: true,
    element: <FunnyMovie />,
  },
  {
    path: "/share",
    exact: true,
    public: true,
    element: <ShareYoutubeMovie />,
  },
  // Additional routers...
];

export default routers;
