import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import loginSchema from "../validation/LoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const initialFormValues = {
  username: "",
  password: "",
};

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [request, data] = useFetch<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(loginSchema),
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
      grant_type: "password",
      username: formValues.username,
      password: formValues.password,
    };
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
    };
    const grant_type = `?grant_type=password&username=${formValues.username}&password=${formValues.password}`;

    request(`http://localhost:2019/login${grant_type}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("username", `${formValues.username}`);
      localStorage.setItem("token", `Bearer ${data.access_token}`);
      navigate("/home");
    }
  }, [data, navigate, formValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 m-auto p-4">
      <h1>Login</h1>
      <div>
        <div className="p-2">
          <label>Username</label>
          <input
            {...register("username")}
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
        </div>
        <div className="p-2">
          <label>Password</label>
          <input
            {...register("password")}
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
        </div>
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
}
