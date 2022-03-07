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
          <div className="p-2">
            <label>Last Name</label>
            <input
              {...register("lastname")}
              value={formValues.lastname}
              onChange={onInputChange}
              name="lastname"
              type="text"
            />
            {errors.lastname && (
              <p className="text-red-600 text-xs m-2">
                {errors.lastname?.message}
              </p>
            )}
          </div>
          <div className="p-2">
            <label>Email</label>
            <input
              {...register("email")}
              value={formValues.email}
              onChange={onInputChange}
              name="email"
              type="text"
            />
            {errors.email && (
              <p className="text-red-600 text-xs m-2">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="p-2">
            <label>Street</label>
            <input
              {...register("street")}
              value={formValues.street}
              onChange={onInputChange}
              name="street"
              type="text"
            />
            {errors.street && (
              <p className="text-red-600 text-xs m-2">
                {errors.street?.message}
              </p>
            )}
          </div>
          <div className="p-2">
            <label>City</label>
            <input
              {...register("city")}
              value={formValues.city}
              onChange={onInputChange}
              name="city"
              type="text"
            />
            {errors.city && (
              <p className="text-red-600 text-xs m-2">
                {errors.city?.message}
              </p>
            )}
          </div>
          <div className="p-2">
            <label>State</label>
            <input
              {...register("state")}
              value={formValues.state}
              onChange={onInputChange}
              name="state"
              type="text"
            />
            {errors.state && (
              <p className="text-red-600 text-xs m-2">
                {errors.state?.message}
              </p>
            )}
          </div>
          <div className="p-2">
            <label>Zip</label>
            <input
              {...register("zip")}
              value={formValues.zip}
              onChange={onInputChange}
              name="zip"
              type="text"
            />
            {errors.zip && (
              <p className="text-red-600 text-xs m-2">
                {errors.zip?.message}
              </p>
            )}
          </div>
          <div className="p-2">
            <label>Phone Number</label>
            <input
              {...register("phone")}
              value={formValues.phone}
              onChange={onInputChange}
              name="phone"
              type="text"
            />
            {errors.phone && (
              <p className="text-red-600 text-xs m-2">
                {errors.phone?.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
