import Index from "./pages/Index/Index";
import MainPage from "./pages/MainPage/MainPage";
import Post from "./pages/Post/Post";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/main", element: <MainPage /> },
  { path: "/main/:categoryId", element: <MainPage /> },
  { path: "/post/:postId", element: <Post /> }
];

export default routes;
