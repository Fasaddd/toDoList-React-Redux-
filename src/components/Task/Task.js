import React from 'react';

import Button from '../UI/Button/Button';
import classes from './Task.module.css'

const task = (props) => {

    let inputField = props.content
    if(props.editMode){
        inputField = <input onChange={props.editingTask} type="text" value={props.content}/>
    }

    return (
        <div className={classes.Task}>
           <p>Task#{props.numberOfTask}: {inputField}</p>
            <p>Author: {props.author}</p>
            <div>
                <Button btnType="Danger" clicked={props.clickDel}>Delete Task</Button>
                <Button btnType="Edit" clicked={props.clickEdit}>{props.editMode ? 'Confirm' : 'Edit Task'}</Button>
            </div>
             
        </div>
    );
};

export default task;