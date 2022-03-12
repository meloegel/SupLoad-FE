import { useState } from "react";
import Contact from "../common/Contact";

export default function Home(): JSX.Element {
  const [contacts, setContacts] = useState([] as any[]);
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
      {contacts !== []
        ? contacts.map((contact, key): any => (
            <Contact
              firstname={contact.firstname}
              lastname={contact.lastname}
              email={contact.email}
              street={contact.street}
              city={contact.city}
              state={contact.state}
              zip={contact.zip}
              phone={contact.phone}
            />
          ))
        : null}
    </div>
  );
}
