import React, { Component } from 'react';
import { Switch, Route , Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import BookDetail from './BookDetailComponent';
import AddBooks from './AddBooksComponent';
import Edit from './EditBookComponent';
import Header from './HeaderComponent';
import Login from './LoginComponent';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { fetchBooks, postBook, removeBook, updateBook, loginUser } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return{
        books: state.books,
        login: state.login
    }
}

const mapDispatchToProps = dispatch => ({
    fetchBooks: () => { dispatch(fetchBooks())},
    postBook: (bookname, author, description, publication, image, price, category, ISBN ) =>  dispatch(postBook(bookname, author, description, publication, image, price, category, ISBN )),
    resetAddBook: () => { dispatch(actions.reset('addbook'))},
    removeBook: (bookId) => { dispatch(removeBook(bookId))},
    updateBook:  (bookId, bookname, author, description, publication, image, price, category, ISBN ) => dispatch(updateBook(bookId, bookname, author, description, publication, image, price, category, ISBN )),
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    resetLogin: () => { dispatch(actions.reset('login'))}
});

class Main extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.fetchBooks();
    }

    render() {
        const BookWithId = ({match}) => {
            
            return(
                <BookDetail book={this.props.books.books.filter((book) => book._id  === match.params.bookId)[0]} />
            )
        }
        
        const EditWithId = ({match}) => {
            
            return(
                <Edit book={this.props.books.books.filter((book) => book._id  === match.params.bookId)[0]} updateBook={this.props.updateBook} resetAddBook={this.props.resetAddBook} />
            )
        }

        return(
            <div>
                <Header/>
                <Switch location={this.props.location}>
                    <Route exact path="/home" component={() => <Home books={this.props.books} />}/>
                    <Route exact path='/menu' component={() => <Menu books={this.props.books} removeBook={this.props.removeBook} />} />
                    <Route exact path='/menu/:bookId' component={BookWithId} />
                    <Route path="/menu/:bookId/edit" component={EditWithId} />
                    <Route exact path='/addbooks' component={() => <AddBooks resetAddBook={this.props.resetAddBook} postBook={this.props.postBook} />} />
                    <Route exact path='/users/login' component={() => <Login loginSuccess={this.props.login.user.success} login={this.props.loginUser} resetLogin={this.props.resetLogin} />} />
                    <Redirect path='/home' />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));