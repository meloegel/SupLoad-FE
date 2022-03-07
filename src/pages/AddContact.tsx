import { useState } from "react";
import { useForm } from "react-hook-form";
import Contact from "../common/Contact";
import contactSchema from "../validation/ContactSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetch from "../hooks/useFetch";

const initialFormValues = {
  firstname: "",
  lastname: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zip: 0,
  phone: "",
};

export default function AddContact(): JSX.Element {
  const [formValues, setFormValues] = useState(initialFormValues);
   const [request, data, statusCode] = useFetch<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(contactSchema),
  });

  const onInputChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = () => {
    const body = {
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      email: formValues.email,
      street: formValues.street,
      city: formValues.city,
      state: formValues.state,
      zip: formValues.zip,
      phone: formValues.phone,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    request(`http://localhost:8080/contact`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
  };

  return (
    <div>
      <h2>Add Contact</h2>
      <Contact
        firstname={formValues.firstname}
        lastname={formValues.lastname}
        email={formValues.email}
        street={formValues.street}
        city={formValues.city}
        state={formValues.state}
        zip={formValues.zip}
        phone={formValues.phone}
      />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-2">
            <label>First Name</label>
            <input
              {...register("firstname")}
              value={formValues.firstname}
              onChange={onInputChange}
              name="firstname"
              type="text"
            />
            {errors.firstname && (
              <p className="text-red-600 text-xs m-2">
                {errors.firstname?.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
