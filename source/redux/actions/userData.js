import ActionTypes from "../constant/index"

export const setUserData = (param) => {
    return {
        type : ActionTypes.Google_Data,
        payload : param
    }
}