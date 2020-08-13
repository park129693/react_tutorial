import React, {useState, useMemo, useCallback, useRef } from 'react'
import { userData } from '../data/userData'
import UserList from '../components/UserList'
import CreateUser from '../components/CreateUser'
 
function UserScreen() {
    const countActiveUsers = useCallback( (users) => {
        console.log('활성화 사용자 수를 체크 하는 중')
        return users.filter(user=>user.active).length;
      })
     
      const [users , setUsers] = useState (userData)
    
      const [inputs , setInputs] = useState({
        username:'',
        email:''
    
       })
    
      const {username , email} = inputs
      const nextId = useRef(4)
    
      const onChangeInput = useCallback( (e)=>{
        // console.log(e.target)
        const {name , value} = e.target
        setInputs({
          ...inputs,
          [name] :value
        });
      })
      const onCreate =useCallback(()=>{
        const user = {
          id:nextId.current,
           username,
           email
        }
        setUsers([...users,user])
        
        setInputs({
          username:'',
          email:''
        })
        nextId.current +=1
      }, [inputs])
    
      const onRemove = (id) =>{
        setUsers(users.filter(user=>user.id !== id))
      }
    
      const onToggleFunc = useCallback((id) =>{
        setUsers(users.map(
          user=>user.id === id ? {...user, active: !user.active} : user
        ))
      }, [users])
    
      const count =useMemo(() => countActiveUsers(users), [users])
    return (
        <div>
        <CreateUser user={username} useremail={email} onChange={onChangeInput}  onCreate={onCreate}/>
        <UserList  users={users} onRemove={onRemove} onToggle={onToggleFunc}/>
        <div>활성자 수: {count}</div>
        </div>
    )
}

export default UserScreen;