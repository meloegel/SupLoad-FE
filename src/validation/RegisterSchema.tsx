import * as yup from "yup";

const registerSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .trim()
      .min(3, "Username must be more than 3 characters")
      .required("Obviously username is required, dummy"),
    password: yup
      .string()
      .trim()
      .min(3, "Password must be more than 3 characters")
      .required("Obviously password is required, dummy"),
    email: yup.string().email("Must be a valid email address"),
  })
  .required();

export default registerSchema;
