import { useState } from "react";
import Contact, { ContactType } from "../common/Contact";

export default function MyContact(): JSX.Element {
  const [userContact, setUserContact] = useState<ContactType>();
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
      ) : null}
    </div>
  );
}
