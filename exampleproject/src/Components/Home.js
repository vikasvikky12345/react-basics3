import React,{useState} from 'react';
import { auth } from '../firebase';

function Home( ) {
  const[user,setUser] = useState({
    name:'',
    email:'',
    village:'',
    district:''
  })
  const {name,email,village,district} = user;
  function changeHandle(e){
    e.preventDefault()
    setUser({...user,[e.target.name]:e.target.value})
  }
  const post = async(e) =>{
    e.preventDefault()
    const res = fetch('https://exampleproject-c0171-default-rtdb.firebaseio.com/formdata.json',{
      method:'post',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        name,
        email,
        village,
        district
      }),
    })
    if(res){
      setUser({
        name:'',
        email:'',
        village:'',
        district:''
      })
      alert('data added succesfully')
    }
  }
  return (
    <>
      <div>
        welcome Home
      </div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
      <form onSubmit={post} autoComplete='off'>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' value={name} onChange={changeHandle}/>
        <label htmlFor='email'>Email</label>
        <input type='text' name='email' value={email} onChange={changeHandle}/>
        <label htmlFor='Village'>Village</label>
        <input type='text' name='village' value={village} onChange={changeHandle}/>
        <label htmlFor='District'>District</label>
        <input type='text' name='district' value={district} onChange={changeHandle}/>
        <button>Submit</button>
      </form>
    </>
  );
}
export default Home;
