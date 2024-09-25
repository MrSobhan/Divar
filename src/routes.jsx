import Index from "./pages/Index/Index";
import Main from "./pages/Main/Main";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/main", element: <Main /> },
  { path: "/main/:categoryId", element: <Main /> }
];

export default routes;
