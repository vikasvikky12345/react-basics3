import React from 'react';
import { getAuth } from 'firebase/auth';

const SendVerificationEmail = () => {
  const handleSendVerificationEmail = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Send the verification email
      await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBAPsEERRbf7-2ZQjXKUgxUR7FXJZLevU8`,
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

      // Show a success message to the user
      alert('Verification email sent. Please check your email inbox.');
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error sending verification email:', error);
      alert('Failed to send verification email. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Verify Email</h2>
      <button onClick={handleSendVerificationEmail}>Send Verification Email</button>
    </div>
  );
};

export default SendVerificationEmail;
