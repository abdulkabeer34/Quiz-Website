import * as Yup from "yup";

export const signupSchema = Yup.object({
  username: Yup.string()
    .min(8)
    .required("The Username should be at least 8 characters long"),
  password: Yup.string()
    .min(8)
    .required("The Password should be at Least 8 characters long"),
});
