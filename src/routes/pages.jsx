import { Home, Login, QuizArea, QuizHistory, QuizResult } from "../pages";
import { Webcam } from "../pages/webcam";
import { paths } from "./paths";

export const PrivatPages = [
  { path: ["/", paths.Home], component: Home },
  { path: paths.QuizArea, component: QuizArea },
  { path: paths.QuizResult, component: QuizResult },
  { path: paths.QuizHistory, component:  QuizHistory},
  { path: paths.Webcam, component:  Webcam},
];

export const Publicpages = [{ path: ["/", paths.Login], component: Login }];
