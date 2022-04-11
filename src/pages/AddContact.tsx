import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import contactSchema from "../validation/ContactSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const initialFormValues = {
  firstname: "",
  lastname: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
};

export default function AddContact(): JSX.Element {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (statusCode === 400) {
      console.log("Oh No!");
    }
    if (data) {
      console.log("Success");
      navigate("/home");
    }
  }, [data, statusCode, navigate]);

  return (
    <div>
      <div className="text-center">
        <h2 className="p-4 text-slate-300 text-4xl">Add Contact</h2>
        <Button
          text="Home"
          className="text-slate-300"
          onClick={() => {
            navigate("/home");
          }}
        />
      </div>
      <hr className="border-bottom-2 w-1/4 m-auto my-4 border-white"/>
      <div>
        <div className="w-1/2 m-auto text-xl bg-slate-300 p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center text-2xl pb-2">Contact</h2>
            <table className="m-auto">
              <tr>
                <td className="p-2">
                  <label className="inline-block text-right w-24">
                    First Name
                  </label>
                  <input
                    {...register("firstname")}
                    value={formValues.firstname}
                    onChange={onInputChange}
                    name="firstname"
                    type="text"
                    className="border-2 rounded p-1 mx-2 bg-slate-300"
                  />
                  {errors.firstname && (
                    <p className="text-red-600 text-xs m-2">
                      {errors.firstname?.message}
                    </p>
                  )}
                </td>
                <td className="p-2">
                  <label>Last Name</label>
                  <input
                    {...register("lastname")}
                    value={formValues.lastname}
                    onChange={onInputChange}
                    name="lastname"
                    type="text"
                    className="border-2 rounded p-1 mx-2 bg-slate-300"
                  />
                  {errors.lastname && (
                    <p className="text-red-600 text-xs m-2">
                      {errors.lastname?.message}
                    </p>
                  )}
                </td>
              </tr>
              <tr>
                <td className="p-2">
                  <label className="inline-block text-right w-24">Email</label>
                  <input
                    {...register("email")}
                    value={formValues.email}
                    onChange={onInputChange}
                    name="email"
                    type="text"
                    className="border-2 rounded p-1 mx-2 bg-slate-300"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs m-2">
                      {errors.email?.message}
                    </p>
                  )}
                </td>
                <td className="p-2">
                  <label className="inline-block text-right w-24">Phone</label>
                  <input
                    {...register("phone")}
                    value={formValues.phone}
                    onChange={onInputChange}
                    name="phone"
                    type="text"
                    className="border-2 rounded p-1 mx-2 bg-slate-300"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs m-2">
                      {errors.phone?.message}
                    </p>
                  )}
                </td>
              </tr>
              <tr>
                <td className="p-2">
                  <label className="inline-block text-right w-24">Street</label>
                  <input
                    {...register("street")}
                    value={formValues.street}
                    onChange={onInputChange}
                    name="street"
                    type="text"
                    className="border-2 rounded p-1 mx-2 bg-slate-300"
                  />
                  {errors.street && (
                    <p className="text-red-600 text-xs m-2">
                      {errors.street?.message}
                    </p>
                  )}
                </td>
                <td className="p-2">
                  <label className="inline-block text-right w-24">City</label>
                  <input
                    {...register("city")}
                    value={formValues.city}
                    onChange={onInputChange}
                    name="city"
                    type="text"
                    className="border-2 rounded p-1 mx-2 bg-slate-300"
                  />
                  {errors.city && (
                    <p className="text-red-600 text-xs m-2">
                      {errors.city?.message}
                    </p>
                  )}
                </td>
              </tr>
              <tr>
                <td className="p-2">
                  <label className="inline-block text-right w-24">State</label>
                  <input
                    {...register("state")}
                    value={formValues.state}
                    onChange={onInputChange}
                    name="state"
                    type="text"
                    className="border-2 rounded p-1 mx-2 bg-slate-300"
                  />
                  {errors.state && (
                    <p className="text-red-600 text-xs m-2">
                      {errors.state?.message}
                    </p>
                  )}
                </td>
                <td className="p-2">
                  <label className="inline-block text-right w-24">Zip</label>
                  <input
                    {...register("zip")}
                    value={formValues.zip}
                    onChange={onInputChange}
                    name="zip"
                    type="text"
                    className="border-2 rounded p-1 mx-2 bg-slate-300"
                  />
                  {errors.zip && (
                    <p className="text-red-600 text-xs m-2">
                      {errors.zip?.message}
                    </p>
                  )}
                </td>
              </tr>
            </table>
            <div className="w-full text-center ">
              <Button text="Add Contact" className="my-4" onClick={() => {}} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
