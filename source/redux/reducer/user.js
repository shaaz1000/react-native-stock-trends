import ActionTypes from "../constant/index"

const initialState = {
    userData : {}
}

const UserReducer = (state=initialState, action) => {
    switch (action.type) {
        case ActionTypes.Google_Data:
            return Object.assign({},state,{
                userData : action.payload
        })

        default: 
            return state
    }
}

export default UserReducer