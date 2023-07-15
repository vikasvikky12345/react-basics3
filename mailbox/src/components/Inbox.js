import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onValue, query, orderByChild, equalTo, ref, off } from 'firebase/database';
import { fetchEmails, markAsRead,} from '../inboxSlice';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import './Inbox.css';

const Inbox = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [emails, setEmails] = useState([]);
  const userEmailsQueryRef = useRef(null); // Use useRef to store userEmailsQuery

  useEffect(() => {
    const fetchUserEmails = async () => {
      if (user && user.email) {
        const emailsRef = ref(db, 'emails');
        const queryRef = query(emailsRef, orderByChild('receiver'), equalTo(user.email));

        userEmailsQueryRef.current = queryRef; // Assign the useRef value

        onValue(queryRef, (snapshot) => {
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

        dispatch(fetchEmails(user.email));
        console.log('User:', user);
      }
    };

    fetchUserEmails();

    return () => {
      if (userEmailsQueryRef.current) {
        off(userEmailsQueryRef.current); // Unsubscribe from the Firebase listener
      }
    };
  }, [user, dispatch]);

  const handleEmailClick = (emailId) => {
    dispatch(markAsRead(emailId));
  };

  return (
    <div className="inbox-container">
      <h2>Inbox</h2>
      <div className="email-list-container">
        <ul className="email-list">
          {emails.map((email) => (
            <li key={email.id} className={`email-item ${email.read ? 'read' : 'unread'}`}>
              <Link to={`/inbox/${email.id}`} onClick={() => handleEmailClick(email.id)}>
                <div className="email-info">
                  <p className="email-subject">{email.subject}</p>
                  <p className="email-sender">From: {email.sender}</p>
                  {!email.read && <div className="blue-dot" />}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Inbox;
