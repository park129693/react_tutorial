// useState활용한 Component 관리
import React ,{useReducer} from 'react'

function reducer(state, action) {
    switch(action.type) {
        case 'INCREMENT':
            return state +1;
        case 'DECREMENT':
            return state -1;
        default:
            return state
    }
}


function Counter(){
    // Setter함수로 setNumber를 이용
    // const [number , setNumber] = useState(0)


    const [number, dispatch] = useReducer(reducer,0)
    const onIncrease =()=>{
        // console.log(+1)
        // // setNumber(number+1)
        // setNumber(preNumber=>preNumber+1)
        dispatch({type:'INCREMENT'})

    }

    const onDecrease =()=>{
        // console.log(-1)
        // // setNumber(number-1)
        // // 함수형으로 업데이트
        // setNumber(preNumber=>preNumber-1)
        dispatch({type:'DECREMENT'})
    }
    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>        
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter;