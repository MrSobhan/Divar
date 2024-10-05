import Article from "./pages/Article/Article";
import Articles from "./pages/Articles/Articles";
import Index from "./pages/Index/Index";
import MainPage from "./pages/MainPage/MainPage";
import Post from "./pages/Post/Post";
import Support from "./pages/Support/Support";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/main", element: <MainPage /> },
  { path: "/main/:categoryId", element: <MainPage /> },
  { path: "/post/:postId", element: <Post /> },
  { path: "/support", element: <Support/>},
  { path: "/article/:articleId", element: <Article/>},
  { path: "/articles/:articlesId", element: <Articles/>}
];

export default routes;
