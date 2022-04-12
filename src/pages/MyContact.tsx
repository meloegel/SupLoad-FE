import { useEffect, useState } from "react";
import Contact, { ContactType } from "../common/Contact";
import useFetch from "../hooks/useFetch";

export default function MyContact(): JSX.Element {
  const [userContact, setUserContact] = useState<ContactType>();
  const [request, data, statusCode] = useFetch<any>();
  const username = window.localStorage.getItem("username");

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    request(`http://localhost:8080/${username}`, {
      method: "GET",
      headers: headers,
    });
    if (data) {
      setUserContact(data);
    }
    if (statusCode === 400) {
      console.log("Oh No!");
    }
  }, [data, userContact, username, request, statusCode]);

  return (
    <div>
      {userContact !== undefined ? (
        <Contact
          firstname={userContact.firstname}
          lastname={userContact.lastname}
          email={userContact.email}
          street={userContact.street}
          city={userContact.city}
          state={userContact.state}
          zip={userContact.zip}
          phone={userContact.phone}
        />
      ) : (
        <p>You have not published your own contact with username: {username}</p>
      )}
    </div>
  );
}
