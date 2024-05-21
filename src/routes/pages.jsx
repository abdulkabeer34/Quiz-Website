import { Navbar } from "../Components";
import {
  CreateQuiz,
  Home,
  Login,
  Notifications,
  QuizArea,
  QuizHistory,
  QuizResult,
} from "../Pages";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../Pages/ErrorPage/ErrorPage";

 const PrivatePages = createBrowserRouter([
   {path:"/",element:<Navbar/>,errorElement:<ErrorPage/>,children:[
    { path: "/", element: <Home />,errorElement:<ErrorPage/>, },
    { path: "/home", element: <Home /> ,errorElement:<ErrorPage/>,},
    { path: "/quiz-area/:id/:question", element: <QuizArea />,errorElement:<ErrorPage/>, },
    { path: "/quiz-result/:id", element: <QuizResult /> ,errorElement:<ErrorPage/>,},
    { path: "/quiz-history", element: <QuizHistory />,errorElement:<ErrorPage/>, },
    { path: "/create-quiz", element: <CreateQuiz /> ,errorElement:<ErrorPage/>,},
    { path: "/notifications", element: <Notifications /> ,errorElement:<ErrorPage/>,},
   ]}
]);

const PublicPages = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
]);

export { PrivatePages, PublicPages };
