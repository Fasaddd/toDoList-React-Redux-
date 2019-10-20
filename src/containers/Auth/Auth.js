import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button.js';
import classes from './Auth.module.css';
import * as actionTypes from '../../store/actions';

class Auth extends Component {

    state = {
        info: {
            email: null,
            password: null
        },
        LogIn: true,
        Error: null,
        emailValid: false,
        passValid: false
    }



    onClickSubmitForm = (e) => {
        e.preventDefault();
        let LoginMode = this.state.LogIn;
        let storeUser = [...this.props.users];
        let loginUser = { ...this.state.info };
        if (LoginMode === true) {
            let temp;
            temp = storeUser.some(el => {
                return el.email.toLowerCase() === loginUser.email.toLowerCase() && el.password === loginUser.password
            });
            if (temp === false) {
                this.setState({ Error: 'Email or password is incorrect! or Account is not exist' });
            } else {
                this.props.history.push('/list');
                this.props.onClickSubmitAuthenticated(loginUser);
            }
        } else if (LoginMode === false) {
            let temp;
            temp = storeUser.some(el => {
                return el.email.toLowerCase() === loginUser.email.toLowerCase()
            });
            if (temp === true) {
                this.setState({ Error: 'Email is exist!' });
            } else {
                this.props.onClickSubmitRegister(loginUser);
                this.props.history.push('/list')
            };
        };
    };

    onHandleInputChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.checkValidation(name, value);
        let resInfo = {
            ...this.state.info,
            [name]: value
        };
        this.setState({
            info: resInfo
        });
    };


    checkValidation = (name, value) => {
        switch (name) {
            case 'email':
                let emailValid = value.match(/\w+@\w+\.\w+/);
                emailValid ? this.setState({ Error: null, emailValid: true }) : this.setState({ Error: 'Invalid enter email', emailValid: false });
                break;
            case 'password':
                let passValid = value.length >= 6
                passValid ? this.setState({ Error: null, passValid: true }) : this.setState({ Error: 'Password is to short', passValid: false });
                break;
            default:
                break;
        };
    }

    onClickChangeSign = () => {
        this.setState({ LogIn: !this.state.LogIn })
    }

    render() {
        let disabledButt = true;
        if (this.state.passValid === true && this.state.emailValid === true) {
            disabledButt = false;
        }
        return (
            <div className={classes.Auth}>
                {this.state.LogIn ? 'LogIn' : 'SignIN'}
                <form>
                    <input type='email' name="email" onChange={this.onHandleInputChange} placeholder='test@test.com' />
                    <input type="password" name="password" onChange={this.onHandleInputChange} placeholder='1234567' />
                    {this.state.Error}
                    <Button
                        disabled={disabledButt}
                        clicked={this.onClickSubmitForm}
                        btnType="Success">Submit</Button>
                </form>
                <Button
                    btnType="Danger"
                    clicked={this.onClickChangeSign}
                >SWITCH TO {this.state.LogIn ? 'SignIN' : 'LogIn'} </Button>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        users: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClickSubmitAuthenticated: (obj) => dispatch({ type: actionTypes.AUTHENTICATED_USER, answObj: obj }),
        onClickSubmitRegister: (obj) => dispatch({ type: actionTypes.REGISTER_USER, answObj: obj })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));