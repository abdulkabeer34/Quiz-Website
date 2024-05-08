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

const PrivatePages = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/quiz-area/:id/:question", element: <QuizArea /> },
      { path: "/quiz-result/:id", element: <QuizResult /> },
      { path: "/quiz-history", element: <QuizHistory /> },
      { path: "/create-quiz", element: <CreateQuiz /> },
      { path: "/notifications", element: <Notifications /> },
    ],
  },
]);

const PublicPages = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
]);

export { PrivatePages, PublicPages };
