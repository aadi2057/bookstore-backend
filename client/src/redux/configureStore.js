
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Books } from './books';
import { LoginUser } from './login';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { AddBook} from './forms';
import { createForms } from 'react-redux-form';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            books: Books,
            login: LoginUser,
            ...createForms({
                addbook: AddBook,
                
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}