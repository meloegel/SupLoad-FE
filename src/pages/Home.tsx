import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "../common/Contact";
import useFetch from "../hooks/useFetch";

export default function Home(): JSX.Element {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([] as any[]);
  const [request, data, statusCode] = useFetch<any>();

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    request(`http://localhost:8080/contacts`, {
      method: "GET",
      headers: headers,
    });
    if (data) {
      setContacts(data);
    }
    if (statusCode === 400) {
      console.log("Oh No!");
    }
  }, [request, data, statusCode]);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/add-contact");
        }}
      >
        Add Contact
      </button>
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
              key={key}
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
