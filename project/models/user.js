// default user state
const initialState = {
    login: false,
    token: '',
};
export const USER_LOGIN = 'user/login';
export const USER_LOGOUT = 'user/logout';

export function userLoginAction(user) {
    return {type: USER_LOGIN, user}
}


export default function user(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            // TODO should be async
            const newState = {...state, ...action.user};
            console.log(newState);
            return newState;
        case USER_LOGOUT:
            // TODO should be async
            break;
        default:
            return state;
    }
}