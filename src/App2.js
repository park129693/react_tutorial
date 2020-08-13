import React, { useMemo, useReducer } from 'react';

import UserList from './UserList'
import CreateUser from './CreateUser'

const countActiveUsers = (users) => {
    console.log('활성화 사용자 수를 체크 하는 중')
    return users.filter(user=>user.active).length;
  }

const initialState = {

    users:[
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
    
        ],

        inputs : {
            username:'',
            email:''
        }
}
function reducer(state, action){
    switch(action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                inputs:{
                    ...state.inputs,
                    [action.name]:action.value
                }
            };
        case 'CREATE_USER':
            return {
                inputs:initialState.inputs,
                users:state.users.concat(action.user)
            }
        case 'TOGGLE_USER':
            return {
                ...state,
                users:state.users.map(user=> user.id === action.id ? {...user, active: !user.active}: user)
            }
        
        case 'REMOVE_USER':
            return {
                ...state,
                users:state.users.filter(user=>user.id !== action.id)
            }

        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    function onChangeInput(e){
        const {name, value} = e.target
        // console.log(value)
        dispatch({
            type:'CHANGE_INPUT',
            name,
            value
        },[])
    }

    function onCreate(){
        dispatch({
            type:'CREATE_USER',
            username,
            email
        },[])
    }

    function onToggle(id){
        dispatch({
            type:'TOGGLE_USER',
            id
        },[])
    }

    function onRemove(id) {
        dispatch({
            type:'REMOVE_USER',
            id
        })
    }

    const { users } =state
    const {username, email} = state.inputs
    const count = useMemo(()=>countActiveUsers(users), [users])

    return (
        <>
        <CreateUser user={username} useremail={email} onChange={onChangeInput} onCreate={onCreate}/>
        <UserList users={users} onToggle={onToggle} onRemove={onRemove}/>
        <div> 활성자 수: {count} </div>
        </>

    )
}

export default App;