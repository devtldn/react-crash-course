import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

// 'Todos' is the child of the parent 'Component'
class Todos extends Component {
    // Passes id to identify which Project will be deleted
    deleteTodo(id) {
        this.props.onDelete(id);
    }

    // Everything that is being rendered must be contained in one script tag set
    render() {
        console.log("PROPS ('Project.js'): ", this.props);

        let todoItems;
        // Test to see if there are any 'todos'
        if (this.props.todos) {
            // We are using '.map' because we have an array ('todo')
            todoItems = this.props.todos.map(todo => {
                console.log("todoItems: ", todo);

                return (
                    /*
                        'TodoItem' component to pass in each 'todo' as a property

                        It is also being assigned to 'TodoItem' variable in the return below

                        Unique "key" prop is needed and must be set for each child in an array or iterator (based on 'todo' array of objects)
                    */
                    <TodoItem onDelete={this.deleteTodo.bind(this)} key={todo.title} todo={todo} />
                )
            });
        }

        return (
            // 'className' == 'class' in JSX
            // Script tags must always have closing pairing tags
            <div className="Todos">
                <h3>Todo List</h3>
                {todoItems}
                <br />
            </div>
        );
    }
}

// Validation for '.props' (properties) using 'prop-types' npm package
Todos.propTypes = {
    todos: PropTypes.array,
    onDelete: PropTypes.func
};

export default Todos;
