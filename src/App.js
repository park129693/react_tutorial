import React, { useRef , useState, useMemo, useCallback } from 'react';
import Hello from './Hello'
import Wrapper from './Wrapper'
import Counter from './Counter'
import InputSample from './InputSample'
import UserList from './UserList'
import CreateUser from './CreateUser'


function App() {

  const countActiveUsers = useCallback( (users) => {
    console.log('활성화 사용자 수를 체크 하는 중')
    return users.filter(user=>user.active).length;
  })
 
  const [users , setUsers] = useState (
    [
      {
          id:1,
          username:"KIM",
          email:"1@naver.com",
          active:true
      },
      {
          id:2,
          username:"PARK",
          email:"2@naver.com",
          active:false

      },
      {
          id:3,
          username:"SONG",
          email:"3@naver.com",
          active:false
      }
  ]
  )

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
      <>
      <Wrapper>
      <Hello name="John"  color="red" isSpecial={true} />
      <Hello  color="blue" />
      </Wrapper>
      <Counter />
      <InputSample />
      <CreateUser user={username} useremail={email} onChange={onChangeInput}  onCreate={onCreate}/>
      <UserList  users={users} onRemove={onRemove} onToggle={onToggleFunc}/>
      <div>활성자 수: {count}</div>
      </>
  );
}

export default App;
