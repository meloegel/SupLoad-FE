export default function Contact(props: ContactType): JSX.Element {
  return (
    <div className="w-5/12 mx-auto m-2 text-xl bg-gray-400 p-4">
      <h2 className="text-center text-2xl">Contact</h2>
      <table className="m-auto">
        <tr>
          <td>
            <h3 className="px-4 py-.5">First: {props.firstname}</h3>
          </td>
          <td>
            <h3 className="px-4 py-.5">Last: {props.lastname}</h3>
          </td>
        </tr>
        <tr>
          <td>
            <h3 className="px-4 py-.5">Email: {props.email}</h3>
          </td>
          <td>
            <h3 className="px-4 py-.5">Phone: {props.phone}</h3>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className="px-4 py-.5">Street: {props.street}</h4>
          </td>
          <td>
            <h4 className="px-4 py-.5">City: {props.city}</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className="px-4 py-.5">State: {props.state}</h4>
          </td>
          <td>
            <h4 className="px-4 py-.5">Zip: {props.zip}</h4>
          </td>
        </tr>
      </table>
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
