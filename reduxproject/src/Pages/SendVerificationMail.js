import React from 'react';
import { getAuth } from 'firebase/auth';

const SendVerificationEmail = () => {
  const handleSendVerificationEmail = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBePOlrRjt7rixWrm4c79EgFI6bAvMeJLE`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: await user.getIdToken(),
          }),
        }
      );
      alert('Verification email sent. Please check your email inbox.');
    } catch (error) {
      console.error('Error sending verification email:', error);
      alert('Failed to send verification email. Please try again later.');
    }
  };

  return (
    <div>
      <h4>Verify Email</h4>
      <button onClick={handleSendVerificationEmail}>Send Verification Email</button>
    </div>
  );
};

export default SendVerificationEmail;
