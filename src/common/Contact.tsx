export default function Contact(props: ContactType): JSX.Element {
  return (
    <div className="w-2/6 mx-auto m-2 text-xl bg-white p-4">
      <h2 className="text-center text-2xl">Contact</h2>
      <div className="flex">
        <h3 className="px-4">First: {props.firstname}</h3>
        <h3 className="px-4">Last: {props.lastname}</h3>
      </div>
      <div className="flex">
        <h3 className="px-4">Email: {props.email}</h3>
        <h3 className="px-4">Phone: {props.phone}</h3>
      </div>
      <div className="flex">
        <h3 className="px-4">Address: </h3>
        <div>
          <h4 className="px-4">Street: {props.street}</h4>
          <h4 className="px-4">City: {props.city}</h4>
          <h4 className="px-4">State: {props.state}</h4>
          <h4 className="px-4">Zip: {props.zip}</h4>
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
