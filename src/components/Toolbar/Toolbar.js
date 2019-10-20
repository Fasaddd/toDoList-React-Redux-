import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './Toolbar.module.css';
import * as actionTypes from '../../store/actions';
import Button from '../UI/Button/Button';

class Toolbar extends Component {

    onLogOutClickHandler = () => {
        this.props.onClickLogOut();
        this.props.history.push('/');
    };

    render() {

        let logDiv = null;
        if (this.props.isAuth) {
            logDiv = (
                <div className={classes.LogOut}>
                    <div style={{ 'padding': '3px', 'textDecoration': 'underline' }}>
                        <p>Logged as <strong>{this.props.activeUser}</strong></p>
                    </div>
                    <Button
                        btnType='Danger'
                        clicked={this.onLogOutClickHandler}>LogOut</Button>
                </div>
            );
        };
        return (
            <header className={classes.Toolbar}>
                <div><b style={{'fontSize': '22px'}}>ToDoList</b></div>
                {logDiv}
            </header>
        );
    };
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuthenticated,
        activeUser: state.activeUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClickLogOut: () => dispatch({ type: actionTypes.LOGOUT_USER })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Toolbar));