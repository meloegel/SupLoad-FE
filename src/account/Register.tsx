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
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 m-auto p-4">
      <h1 className="text-center text-2xl">Register</h1>
      <div className="w-4/6 text-right p-4">
        <div className="p-2 ">
          <label className="text-white mr-2">Username</label>
          <input
            {...register("username")}
            className="bg-gray-200 border border-black"
            value={formValues.username}
            onChange={onInputChange}
            name="username"
            type="text"
          />
        </div>
        {errors.username && (
          <p className="text-red-600 text-xs m-2">{errors.username?.message}</p>
        )}
        <div className="p-2">
          <label className="text-white mr-2">Password</label>
          <input
            {...register("password")}
            className="bg-gray-200 border border-black"
            value={formValues.password}
            onChange={onInputChange}
            name="password"
            type="text"
          />
        </div>
        {errors.password && (
          <p className="text-red-600 text-xs m-2">{errors.password?.message}</p>
        )}
        <div className="p-2">
          <label className="text-white mr-2">Email</label>
          <input
            {...register("email")}
            className="bg-gray-200 border border-black"
            value={formValues.email}
            onChange={onInputChange}
            name="email"
            type="text"
          />
        </div>
        {errors.email && (
          <p className="text-red-600 text-xs m-2">{errors.email?.message}</p>
        )}
      </div>
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
