import * as ActionTypes from './ActionTypes';

export const LoginUser = ( state = {
    
    errMess: null,
    user: [],
    success: false
    
}, action) => {
    switch(action.type){
        case ActionTypes.LOGIN:
            return {...state, success: false, errMess: null, user: action.payload};

        case ActionTypes.LOGIN_SUCCESS:
            return {...state, success: true, errMess: null, user: [] };
        
        case ActionTypes.LOGIN_FAILED:
            return {...state, success: false, errMess: action.payload, user: []};

        // case ActionTypes.BOOK_DELETE:
        //     return {...state, isLoading: false, errMess: null, book: action.payload};

        // case ActionTypes.EDIT_BOOK:
        //     return {...state, isLoading: false, errMess: null, book: action.payload};


        default: 
            return state;
    }
}