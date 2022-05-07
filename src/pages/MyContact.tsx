import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Contact, { ContactType } from "../common/Contact";
import useFetch from "../hooks/useFetch";

type ContactInfo = {
  firstname: string;
  lastname: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  phone: string;
  contactid: number;
};

export default function MyContact(): JSX.Element {
  const navigate = useNavigate();
  const [userContact, setUserContact] = useState<ContactType>();
  const [contactId, setContactId] = useState<number>();
  const [request, data, statusCode] = useFetch<ContactInfo>();
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
      setContactId(data.contactid);
    }
    if (statusCode === 400) {
      console.log("Oh No!");
    }
  }, [statusCode, data]);

  const deleteContact = () => {
    console.log(contactId)
    const headers = {
      "Content-Type": "application/json",
    };
    request(`http://localhost:8080/contact/${contactId}`, {
      method: "DELETE",
      headers: headers,
    });
  };

  return (
    <div>
      <div className="text-center">
        <Button
          className="text-slate-200 ml-2"
          text="Home"
          onClick={() => {
            navigate("/home");
          }}
        />
      </div>
      <hr className="border-bottom-2 w-1/4 m-auto my-4 border-white" />
      {userContact !== undefined ? (
        <>
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
          <div className="text-center">
            <Button
              className="text-slate-200 ml-2"
              text="Delete My Contact"
              onClick={() => {
                deleteContact();
              }}
            />
          </div>
        </>
      ) : (
        <div className="text-center">
          <p>
            You have not published your own contact with username: {username}
          </p>
          <Button
            className="text-slate-200 ml-2"
            text="Click here to add contact"
            onClick={() => {
              navigate("/add-contact");
            }}
          />
        </div>
      )}
    </div>
  );
}
