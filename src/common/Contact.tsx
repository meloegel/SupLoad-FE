export default function Contact(props: ContactType): JSX.Element {
  return (
    <div className="w-2/6 m-auto text-xl bg-white p-4">
      <h2 className="text-center text-2xl">Contact</h2>
      <h3>
        Name: {props.firstname} {props.lastname}
      </h3>
      <h3>Email: {props.email}</h3>
      <h3>Phone: {props.phone}</h3>
      <div className="flex">
        <h3>Address: </h3>
        <div>
          <h4>{props.street}</h4>
          <h4>
            {props.city} {props.state} {props.zip}
          </h4>
        </div>
      </div>
    </div>
  );
}

type ContactType = {
  firstname: string;
  lastname: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  phone: string;
};
