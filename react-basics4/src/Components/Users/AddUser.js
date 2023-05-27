import React,{useState} from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';


const AddUser = (props) => {
    const[username,setUserName] = useState('');
    const[age,setAge] = useState('')
    const [error, setError] = useState();
  const addUserHandler = (event) => {
    event.preventDefault()
    if(username.trim().length === 0 || age.trim().length === 0){
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if(+age < 1){
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    event.preventDefault();
    props.onAddUser(username,age)
    setUserName('')
    setAge('')
  };
  const usernameChangehandler = event =>{
    setUserName(event.target.value)
  }
  const ageChangeHandler = event =>{
    setAge(event.target.value)
  }
  const errorHandler = () => {
    setError(null);
  }

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" value={username} onChange={usernameChangehandler}/>
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" value={age} onChange={ageChangeHandler}/>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;