const initialState = {
    id: 0,
    username: '',
    profile_pic: ''
}

export const USER_INFO = 'USER_INFO'

export function userInfo(userObj){
    return {
        type: USER_INFO,
        payload: userObj
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case USER_INFO:
            const {id, username, profile_pic} = action.payload
            return {...state, id, username, profile_pic}
        default:
            return state;
    }
}