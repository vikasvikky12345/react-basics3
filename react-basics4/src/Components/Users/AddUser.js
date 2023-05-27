import React,{useState,useRef} from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';


const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const collegeRef = useRef();
    const [error, setError] = useState();
  const addUserHandler = (event) => {
    event.preventDefault()
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    const eneteredCollege = collegeRef.current.value
    if(enteredName.trim().length === 0 || enteredUserAge.trim().length === 0 || eneteredCollege.trim().length === 0){
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if(+enteredUserAge < 1){
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    event.preventDefault();
    props.onAddUser(enteredName,enteredUserAge,eneteredCollege)
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
    collegeRef.current.value = '';
  };
  const errorHandler = () => {
    setError(null);
  };

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
          <input id="username" type="text" ref ={nameInputRef}/>
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <label htmlFor="collegename">College Name :</label>
          <input id="collegename" type="text" ref={collegeRef} />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;