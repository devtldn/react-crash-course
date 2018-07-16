import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 'TodoItem' is the child of the parent 'Component'
class TodoItem extends Component {
    // Passes id to identify which Project will be deleted
    deleteTodo(id, todo) {
        console.log("deleteTodo ('TodoItem.js'): ", todo);

        // Data being passed to property
        this.props.onDelete(id);
    }

    // Everything that is being rendered must be contained in one script tag set
    render() {
        console.log("PROPS ('TodoItem.js'): ", this.props);

        return (
            // 'className' == 'class' in JSX
            // Script tags must always have closing pair tags
            <li className="Todo">
                {/*
                    In 'Todo.js' 'todo' is being passed as a property; thus, 'this.props' must be prepended to call the values in the objects
                */}
                <strong>{this.props.todo.title}</strong>
                {/*
                    Emojis require a '<span role='img' aria-lable='#'></span>' tags to be used properly
                */}
                <a onClick={this.deleteTodo.bind(this, this.props.todo.id)}><span role="img" aria-label="x">❌</span></a>
            </li>
        );
    }
}

// Validation for '.props' (properties) using 'prop-types' npm package
TodoItem.propTypes = {
    todo: PropTypes.object,
    onDelete: PropTypes.func
};

export default TodoItem;
