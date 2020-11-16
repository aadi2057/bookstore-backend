import * as ActionTypes from './ActionTypes';

export const Books = ( state = {
    isLoading: true,
    errMess: null,
    books: [],
    book: {}
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_BOOKS:
            return {...state, isLoading: false, errMess: null, books: action.payload};

        case ActionTypes.BOOKS_LOADING:
            return {...state, isLoading: true, errMess: null, books: []}

        case ActionTypes.BOOKS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.BOOK_DELETE:
            return {...state, isLoading: false, errMess: null, book: action.payload};

        // case ActionTypes.EDIT_BOOK:
        //     return {...state, isLoading: false, errMess: null, book: action.payload};


        default: 
            return state;
    }
}