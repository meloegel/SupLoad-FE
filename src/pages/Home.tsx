import Contact from "../common/Contact";

export default function Home(): JSX.Element {
  return (
    <div>
      <h1>Home</h1>
      <Contact 
      firstname="FirstName"
      lastname="LastName"
      email="Email@email.com"
      street="123 Main St"
      city="City"
      state="State"
      zip={12345}
      phone="555-555-5555"
      />
    </div>
  );
}
