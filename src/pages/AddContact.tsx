import { useState } from "react";
import Contact from "../common/Contact";

const initialFormValues = {
  firstname: "",
  lastname:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zip:0,
  phone:""
}

export default function AddContact(): JSX.Element {
  const [formValues, setFormValues] = useState(initialFormValues);

  
  const onInputChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [name]: value,
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
      <div className="p-2">
          <label>Username</label>
          <input
            // {...register("firstname")}
            value={formValues.firstname}
            onChange={onInputChange}
            name="username"
            type="text"
          />
          {/* {errors.username && (
            <p className="text-red-600 text-xs m-2">
              {errors.username?.message}
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}
