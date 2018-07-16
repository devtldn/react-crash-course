import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

// 'AddProject' is the child of the parent 'Component'
class AddProject extends Component {
    // We want to store form data into state
    constructor() {
        // 'this' is not allowed without super() when creating constructors
        super();
        this.state = {
            newProject: {}
        }
    }
    // We want "category" to be a propety of the 'Component' so we're going to set default properties
    static defaultProps = {
        categories: ['Web Design', 'Mobile Development', 'Web Development']
    }

    // Rendering 'handleSubmit' component in 'onSubmit'
    handleSubmit(event) {
        event.preventDefault();

        // Front-end JS validation
        if (this.refs.title.value === "") {
            alert("Title is required!");
        } else {
            // Setting new state for 'newProject' if vadliation was succesful
            // Each component has its own unique state but 'App.js' contains the main component
            this.setState({
                // Anything in the state will require 'this' for proper referencing
                newProject: {
                    // New id will be generated with 'uuid' npm package
                    id: uuid.v4(),
                    title: this.refs.title.value,
                    category: this.refs.category.value
                }
            // 'setState' can take multiple parameters
            // Inserting a callback function
            }, function(){
                console.log("CALLBACK ('AddProject.js'): ", this.state);

                // Take the data to pass it up to the main component in 'App.js'
                // This allows us to access the 'newProject' in the main component
                this.props.addProject(this.state.newProject);
            })
        }
    }

    // Everything that is being rendered must be contained in one script tag set
    render() {
        // We want to '.map' through 'categories' to output options
        let categoryOptions = this.props.categories.map(category => {
            // Unique "key" prop is needed and must be set for each child in an array or iterator (based on 'categories' array)
            return <option key={category} value={category}>{category}</option>
        });
        return (
            // 'className' == 'class' in JSX
            // Script tags must always have closing pairing tags
            <div>
                <h3>Add Project</h3>
                <br />
                {/*
                    'onSubmit' handler will allow form submission
                    
                    '.bind(this)' this allowing 'handleSubmit' function to know what 'this' is
                */}
                <form autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        {/*
                            'ref' is going to help us get the value when form is submitted

                            '/>' is used because HTML5 syntax will throw an error
                        */}
                        <input type="text" ref="title" placeholder="Enter title" />
                        <br />
                        <select ref="category">
                            {categoryOptions}
                        </select>
                        <br />
                        <input type="submit" value="Submit" />
                        <br />
                    </div>
                </form>
                <br />
            </div>
        );
    }
}

// Validation for '.props' (properties) using 'prop-types' npm package
AddProject.propTypes = {
    categories: PropTypes.array,
    addProject: PropTypes.func
};

export default AddProject;
