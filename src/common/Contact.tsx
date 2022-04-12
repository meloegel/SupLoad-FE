export type ContactType = {
  firstname: string;
  lastname: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  phone: string;
};

export default function Contact(props: ContactType): JSX.Element {
  return (
    <div className="w-5/12 mx-auto m-2 bg-slate-300 border-2 p-4">
      <h2 className="text-center text-3xl">Contact</h2>
      <table className="m-auto text-2xl">
        <tr>
          <td>
            <h3 className="px-4 py-1 mx-2">First Name: {props.firstname}</h3>
          </td>
          <td>
            <h3 className="px-4 py-1 mx-2">Last Name: {props.lastname}</h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 className="px-4 py-1 mx-2">Email: {props.email}</h3>
          </td>
          <td>
            <h3 className="px-4 py-1 mx-2">Phone: {props.phone}</h3>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className="px-4 py-1 mx-2">Street: {props.street}</h4>
          </td>
          <td>
            <h4 className="px-4 py-1 mx-2">City: {props.city}</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className="px-4 py-1 mx-2">State: {props.state}</h4>
          </td>
          <td>
            <h4 className="px-4 py-1 mx-2">Zip: {props.zip}</h4>
          </td>
        </tr>
      </table>
    </div>
  );
}
