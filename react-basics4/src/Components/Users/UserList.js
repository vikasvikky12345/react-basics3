import React from 'react';
import Card from '../UI/Card';
import classes from './UserList.module.css' 
const UserList = ({users}) =>{
    return(
        <Card className={classes.users}>
            <ul>
                {users.map((user)=>(
                    <li key={user.id}>
                        {user.name} ({user.age} is years old and CollegeName is {user.cname})
                    </li>
                ))}
            </ul>
        </Card>
    )
}
export default UserList