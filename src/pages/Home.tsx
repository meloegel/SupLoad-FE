import Contact from "../common/Contact";

export default function Home(): JSX.Element {
  return (
    <div>
      <h1 className="p-4">Home</h1>
      <Contact 
      firstname="Firstname"
      lastname="Lastname"
      email="Email@email.com"
      street="123 Main St"
      city="Detroit"
      state="MI"
      zip={12345}
      phone="555-555-5555"
      />
    </div>
  );
}
