import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { onValue, query, orderByChild, equalTo,ref,off } from 'firebase/database';
import { db } from '../firebase';

const Inbox = () => {
  const user = useSelector((state) => state.auth.user);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    // Retrieve the emails for the current user
    const emailsRef = ref(db, 'emails');
    const userEmailsQuery = query(emailsRef, orderByChild('receiver'), equalTo(user.email));

    onValue(userEmailsQuery, (snapshot) => {
      if (snapshot.exists()) {
        const emailData = snapshot.val();
        const emailList = Object.keys(emailData).map((key) => ({
          id: key,
          ...emailData[key],
        }));
        setEmails(emailList);
      } else {
        setEmails([]);
      }
    });

    // Clean up the event listener
    return () => {
      // Detach the listener when the component unmounts
      // This prevents memory leaks and unnecessary database queries
      off(userEmailsQuery);
    };
  }, [user.email]);

  return (
    <div className="inbox-container">
      <h2>Inbox</h2>
      {emails.length > 0 ? (
        <ul>
          {emails.map((email) => (
            <li key={email.id}>
              <p>Sender: {email.sender}</p>
              <p>Subject: {email.subject}</p>
              <p>Content: {email.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No emails found.</p>
      )}
    </div>
  );
};

export default Inbox;
