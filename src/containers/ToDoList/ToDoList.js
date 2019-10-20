import React, { Component } from 'react';
import { connect } from 'react-redux';

import Task from '../../components/Task/Task';
import Button from '../../components/UI/Button/Button';
import classes from './ToDoList.module.css';
import * as actionTypes from '../../store/actions';

class ToDoList extends Component {


    state = {
        addedTask: '',
        editMode: false
    }

    componentDidMount() {
        if (!this.props.isAuth) {
            this.props.history.push('/');
        }
    }

    onInputChangeHandler = (event) => {
        this.setState({
            addedTask: event.target.value
        });
    };

    addTaskToTasker = (event) => {
        event.preventDefault();
        if (!this.state.addedTask.match(/[A-Za-z]/ig)) {
            return false;
        }

        let taskText = this.state.addedTask;
        this.setState({
            addedTask: ''
        });
        let taskInfo = {
            text: taskText,
            author: this.props.activeUser
        };
        console.log(taskInfo);
        this.props.onAddingTaskHandler(taskInfo);
    };

    onClickDeleteTask = (index) => {
        console.log(index);
        let posts = [...this.props.posts];
        posts.splice(index, 1);
        this.props.onUpdateTaskHandler(posts);
    };

    onEditTask = (e, index) => {
        console.log(e.target.value);
        let posts = [...this.props.posts];
        posts[index].text = e.target.value;
        this.props.onUpdateTaskHandler(posts);
    };

    changeEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        });
    };

    render() {
        let tasks = [...this.props.posts];
        let formedTasks = tasks.map((el, index) => {

            return <Task
                numberOfTask={index + 1}
                editingTask={(e) => this.onEditTask(e, index)}
                editMode={this.state.editMode}
                clickEdit={this.changeEditMode}
                clickDel={() => this.onClickDeleteTask(index)}
                key={el.author + index}
                author={el.author}
                content={el.text}
            />
        });
        return (
            <div className={classes.ToDoList}>
                <h3>Add your task!</h3>
                <div className={classes.List}>
                    <input type="text"
                        value={this.state.addedTask}
                        onChange={this.onInputChangeHandler}
                        placeholder="Task's text" />
                    <Button
                        clicked={this.addTaskToTasker}
                        btnType="Success">ADD</Button>
                </div>
                <hr />
                {formedTasks}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        posts: state.posts,
        activeUser: state.activeUser,
        isAuth: state.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddingTaskHandler: (newPost) => dispatch({ type: actionTypes.ADD_TASK, answObj: newPost }),
        onUpdateTaskHandler: (posts) => dispatch({ type: actionTypes.EDIT_USER, answObj: posts }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);