import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Contact, { ContactType } from "../common/Contact";
import useFetch from "../hooks/useFetch";

export default function MyContact(): JSX.Element {
  const navigate = useNavigate();
  const [userContact, setUserContact] = useState<ContactType>();
  const [request, data, statusCode] = useFetch<any>();
  const username = window.localStorage.getItem("username");

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    request(`http://localhost:8080/contact/username/${username}`, {
      method: "GET",
      headers: headers,
    });
  }, [username, request]);

  useEffect(() => {
    if (data) {
      setUserContact(data); 
      console.log(data);
    }
    if (statusCode === 400) {
      console.log("Oh No!");
    }
  }, [statusCode, data]);

  return (
    <div>
      <Button
        className="text-slate-200 ml-2"
        text="Home"
        onClick={() => {
          navigate("/home");
        }}
      />
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
