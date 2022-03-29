import * as yup from "yup";

const contactUploadSchema = yup.object().shape({
  contact: yup.mixed().required("You must include a contact"),
});

export default contactUploadSchema;
