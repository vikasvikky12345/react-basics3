import React,{useState} from 'react';
import AddUser from './Components/Users/AddUser';
import UserList from './Components/Users/UserList';
function App(){
  const[userList,setUserList] = useState([])
  const addUserHandler = (uname,uage) =>{
    setUserList((prevList)=>{
      return[...prevList,{name:uname ,age:uage, id:Math.random().toString()}]
    })
  }
  return (
    <div>
      <AddUser onAddUser = {addUserHandler}/>
      <UserList users ={userList}/>
    </div>
  )
}
export default App;