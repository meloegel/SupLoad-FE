import * as yup from "yup";

const contactSchema = yup.object().shape({
  firstname: yup.string().trim().required("Please enter a first name"),
  lastname: yup.string().trim().required("Please enter a last name"),
  email: yup.string().email("Must be a valid email address"),
  street: yup.string().trim().required("Please enter the street address"),
  city: yup.string().trim().required("Please enter the city"),
  state: yup.string().trim().required("Please enter the state"),
  zip: yup.string().trim().required("Please enter the zip"),
  phone: yup.string().trim().required("Please enter your phone number"),
});

export default contactSchema;
