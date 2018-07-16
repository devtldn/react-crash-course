import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 'ProjectItem' is the child of the parent 'Component'
class ProjectItem extends Component {
    // Passes id to identify which Project will be deleted
    deleteProject(id, project) {
        console.log("deleteProject ('ProjectItem.js'): ", project);

        // Data being passed to property
        this.props.onDelete(id);
    }
    // Everything that is being rendered must be contained in one script tag set
    render() {
        console.log("PROPS ('ProjectItem.js'): ", this.props);

        return (
            // 'className' == 'class' in JSX
            // Script tags must always have closing pair tags
            <li className="Projects">
                {/*
                    In 'Project.js' 'project' is being passed as a property; thus, 'this.props' must be prepended to call the values in the objects
                */}
                <strong>{this.props.project.title}</strong>: {this.props.project.category}
                {/*
                    'deleteProject' handler will allow Project deletions

                    '.bind' this allowing 'deleteProject' function to know what 'this' and 'id' are when passed to 'deleteProject(id, project)'

                    Emojis require a '<span role='img' aria-lable='#'></span>' tags to be used properly
                */}
                <a onClick={this.deleteProject.bind(this, this.props.project.id)}><span role="img" aria-label="x">❌</span></a>
            </li>
        );
    }
}

// Validation for '.props' (properties) using 'prop-types' npm package
ProjectItem.propTypes = {
    project: PropTypes.object,
    onDelete: PropTypes.func
};

export default ProjectItem;
