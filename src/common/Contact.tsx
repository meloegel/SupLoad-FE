export default function Contact(props: ContactType): JSX.Element {
  return (
    <div>
      <h2>Contact</h2>
      <h3>
        Name: {props.firstname} {props.lastname}
      </h3>
      <div className="flex justify-evenly">
        <h3>Email: {props.email}</h3>
        <h3>Phone: {props.phone}</h3>
      </div>
      <div>
        <h3>Address</h3>
        <h4>Street: {props.street}</h4>
        <h4>City: {props.city}</h4>
        <h4>State: {props.state}</h4>
        <h4>Zip: {props.zip}</h4>
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
