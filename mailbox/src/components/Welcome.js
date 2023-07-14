import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmail } from '../authSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Welcome = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const sentEmails = useSelector((state) => state.auth.sentEmails);
  const [receiver, setReceiver] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSendEmail = (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const emailData = {
      sender: user.email,
      receiver,
      subject,
      content,
    };

    dispatch(sendEmail(emailData));
    setReceiver('');
    setSubject('');
    setContent('');
  };

  return (
    <div className="compose-email-container">
      <h2>Compose Email</h2>
      <form onSubmit={handleSendEmail}>
        <input type="text" placeholder="Receiver" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <ReactQuill value={content} onChange={(value) => setContent(value)} />
        <button type="submit">Send Email</button>
      </form>

      <div className="sent-emails-container">
        <h2>Sentbox</h2>
        {sentEmails.map((email, index) => (
          <div key={index}>
            <p>Receiver: {email.receiver}</p>
            <p>Subject: {email.subject}</p>
            <p>Content: {email.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
