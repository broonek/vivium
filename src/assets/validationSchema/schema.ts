import * as yup from "yup";
export const schema = yup.object({
  email: yup
    .string()
    .email("Please Enter correct email adress!")
    .required("Please Enter your email adress"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain minimum 8 characters, at least one letter and one number"
    ),
});
