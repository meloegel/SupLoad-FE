import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../validation/RegisterSchema";
import Button from "../common/Button";

const initialFormValues = {
  username: "",
  password: "",
  email: "",
};

export default function Register(): JSX.Element {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [request, data] = useFetch<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(registerSchema),
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
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
    };
    request(`http://localhost:8080/user`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", `Bearer ${data.access_token}`);
      localStorage.setItem("username", `${formValues.username}`);
      navigate("/home");
    }
  }, [data, navigate, formValues]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-1/3 m-auto my-8 p-4 text-center"
    >
      <h1 className="text-2xl my-2 text-white">Register</h1>
      <table className="m-auto">
        <tr>
          <td className="p-2">
            <label className="inline-block text-right w-24 text-white">Username</label>
            <input
              {...register("username")}
             className="rounded p-1 mx-2"
              value={formValues.username}
              onChange={onInputChange}
              name="username"
              type="text"
            />
            {errors.username && (
              <p className="text-red-600 text-xs m-2">
                {errors.username?.message}
              </p>
            )}
          </td>
        </tr>
        <tr>
          <td className="p-2">
            <label className="inline-block text-right w-24 text-white">Password</label>
            <input
              {...register("password")}
             className="rounded p-1 mx-2"
              value={formValues.password}
              onChange={onInputChange}
              name="password"
              type="text"
            />
            {errors.password && (
              <p className="text-red-600 text-xs m-2">
                {errors.password?.message}
              </p>
            )}
          </td>
        </tr>
        <tr>
          <td className="p-2">
            <label className="inline-block text-right w-24 text-white">Email</label>
            <input
              {...register("email")}
             className="rounded p-1 mx-2"
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
          </td>
        </tr>
      </table>
      <div className="flex justify-evenly p-6">
        <Button text="Register" className="text-white" onClick={() => {}} />
        <Button
          text="Login"
          className="text-white"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </form>
  );
}
