import { combineReducers } from 'redux';
import UserReducer from "./user"

const appReducer = combineReducers({
    UserReducer
})

const rootReducer = (state,action) => {
    return appReducer(state, action)
}

export default rootReducer