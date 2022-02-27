import { useState } from "react";
import { useForm } from "react-hook-form";
import loginSchema from "../validation/LoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const initialFormValues = {
  username: "",
  password: "",
};

export default function Login(): JSX.Element {
  const [formValues, setFormValues] = useState(initialFormValues);
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

  return (
    <form onSubmit={() => {}}>
      <h1>Login</h1>
      <div>
        <div>
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
        <div>
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
