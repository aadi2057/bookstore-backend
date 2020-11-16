import React, { Component } from 'react';
import { LocalForm, Control} from 'react-redux-form';
import { Button, Label, Row, Col} from 'reactstrap';
import { Redirect } from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        alert(JSON.stringify(values));
        // console.log(values.username, values.password);
        this.props.login(values.username, values.password);
        // this.props.history.push('/home');
        this.props.resetLogin();
    }

    render(){
        if(this.props.loginSuccess) {
            return(
                <Redirect to='/home' />
            )
        }
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <LocalForm model="login" onSubmit={(values) => this.handleSubmit(values)}>
                        <Row>
                            <Label md={3} htmlFor="username">Username</Label>
                            <Col md={8}>
                                <Control.text model=".username" id="username" name="username" placeholder="Username" />
                            </Col>
                        </Row>
                        <Row>
                            <Label md={3} htmlFor="password">Password</Label>
                            <Col md={8}>
                                <Control.text model=".password" id="password" name="password" placeholder="Password" />
                            </Col>
                        </Row>
                        <Row>
                            <Button className="mr-3" type="submit" color="primary" >Login</Button>
                            <Button  color="warning">Cancel</Button>
                        </Row>
                    </LocalForm>
                </div>
            </div>
        );
    }
    
}

export default Login;