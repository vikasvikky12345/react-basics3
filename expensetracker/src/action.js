import {useSelector,useDispatch} from 'react-redux';
import { increment,decrement } from './reducers/index.js';
export function Counter(){
    const count = useSelector((state)=>state.counter.value)
    const dispatch = useDispatch()

    return(
        <>
        <div>
            <button onClick={()=>dispatch(increment())}>Increment</button>
            <span>{count}</span>
            <button onClick={()=>dispatch(decrement())}>decrement</button>
        </div>
        </>
    )
}