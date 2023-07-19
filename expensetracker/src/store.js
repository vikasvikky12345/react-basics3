import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './reducers/index'
const store = configureStore({
    reducer:{
        counter:counterReducer
    }
})
export default store;