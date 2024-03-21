import { Home, Login, QuizArea, QuizHistory, QuizResult } from "../pages";
import { paths } from "./paths";

export const PrivatPages = [
  { path: ["/", paths.Home], component: Home },
  { path: paths.QuizArea, component: QuizArea },
  { path: paths.QuizResult, component: QuizResult },
  { path: paths.QuizHistory, component: QuizHistory },
];

export const Publicpages = [{ path: ["/", paths.Login], component: Login }];
