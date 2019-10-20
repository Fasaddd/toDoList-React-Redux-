import * as actionTypes from './actions';

const initialState = {
    users: [{ email: 'test@test.com', password: '123456' }],
    posts: [{ text: 'Test', author: 'test@test.com' }],
    activeUser: null,
    isAuthenticated: false
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATED_USER:
            return {
                ...state,
                activeUser: action.answObj.email,
                isAuthenticated: true
            }
        case actionTypes.REGISTER_USER:
            return {
                ...state,
                activeUser: action.answObj.email,
                isAuthenticated: true,
                users: [...state.users, action.answObj]
            }
        case actionTypes.ADD_TASK:
            return {
                ...state,
                posts: [...state.posts, action.answObj]
            };
        case actionTypes.EDIT_USER:
            return {
                ...state,
                posts: action.answObj
            };
        case actionTypes.LOGOUT_USER:
            return{
                ...state,
                isAuthenticated: false,
                activeUser: null
            }
        default:
            return state;
    };
};

export default reducer;