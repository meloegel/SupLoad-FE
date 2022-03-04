import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import loginSchema from "../validation/LoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const initialFormValues = {
  username: "",
  password: "",
};

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [request, data, statusCode] = useFetch<any>();
  const [hideError, setHideError] = useState(false)
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
      username: formValues.username,
      password: formValues.password,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    request(`http://localhost:8080/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
  };

  useEffect(() => {
    if (data && statusCode === 200) {
      localStorage.setItem("username", `${formValues.username}`);
      localStorage.setItem("token", `Bearer ${data}`);
      navigate("/home");
    }
    if (statusCode === 400){
      setHideError(true)
    }
  }, [data, navigate, formValues, statusCode]);

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
        <p className={`text-red-600 text-xs mx-4 ${!hideError ? "hidden" : "" } `}>
          Username and password did not match
        </p>
      </div>
      <div className="flex justify-evenly p-6">
        <Button text="Login" className="text-white" onClick={() => {}} />
        <Button
          text="Register"
          className="text-white"
          onClick={() => {
            navigate("/register");
          }}
        />
      </div>
    </form>
  );
}
