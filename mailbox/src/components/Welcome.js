import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { push, ref } from 'firebase/database';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const user = useSelector((state) => state.auth.user);
  const [receiver, setReceiver] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSendEmail = (e) => {
    e.preventDefault();

    // Prepare the email data
    const emailData = {
      receiver,
      subject,
      content,
      sender: user.email, // Assuming user.email contains the sender's email
    };

    // Save the email to the database
    const emailsRef = ref(db, 'emails');
    push(emailsRef, emailData)
      .then(() => {
        // Email saved successfully
        // Clear the form fields
        setReceiver('');
        setSubject('');
        setContent('');
      })
      .catch((error) => {
        // Handle the error
        console.log('Error sending email:', error);
      });
  };

  return (
    <div className="welcome-container">
      <div className="compose-email-container">
        <h2>Compose Email</h2>
        <form onSubmit={handleSendEmail}>
          <input
            type="text"
            placeholder="Receiver"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <ReactQuill value={content} onChange={(value) => setContent(value)} />
          <button type="submit">Send Email</button>
        </form>
      </div>
      <div className="inbox-link-container">
        <Link to="/inbox">Go to Inbox</Link>
      </div>
    </div>
  );
};

export default Welcome;
