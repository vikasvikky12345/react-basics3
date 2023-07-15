import React,{useEffect,useRef,useState} from 'react';
import { onValue, query, orderByChild, equalTo, ref, off } from 'firebase/database';
import {useSelector,useDispatch} from 'react-redux';
import { fetchEmails} from '../inboxSlice';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const [unreadCount, setUnreadCount] = useState(0);
  const [emails, setEmails] = useState([]);
  const userEmailsQueryRef = useRef(null);
  const user = useSelector((state) => state.auth.user);


  useEffect(() => {
    const fetchUserEmails = async () => {
      if (user && user.email) {
        const emailsRef = ref(db, 'emails');
        const queryRef = query(emailsRef, orderByChild('receiver'), equalTo(user.email));

        userEmailsQueryRef.current = queryRef;

        onValue(queryRef, (snapshot) => {
          if (snapshot.exists()) {
            const emailData = snapshot.val();
            const emailList = Object.keys(emailData).map((key) => ({
              id: key,
              ...emailData[key],
            }));
            setEmails(emailList);
            updateUnreadCount(emailList);
          } else {
            setEmails([]);
            updateUnreadCount([]);
          }
        });

        dispatch(fetchEmails(user.email));
        console.log('User:', user);
      }
    };

    const updateUnreadCount = (emails) => {
      const count = emails.reduce((acc, email) => {
        return acc + (email.read ? 0 : 1);
      }, 0);
      setUnreadCount(count);
    };

    fetchUserEmails();

    return () => {
      if (userEmailsQueryRef.current) {
        off(userEmailsQueryRef.current);
      }
    };
  }, [user, dispatch]);

  return (
    <nav className="navbar-container">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/welcome" className="nav-link" activeClassName="active-link">
            Compose
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/sent" className="nav-link" activeClassName="active-link">
            Sent
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/inbox" className="nav-link" activeClassName="active-link">
            Inbox {unreadCount}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
