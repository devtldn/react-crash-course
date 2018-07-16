import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';

// 'Projects' is the child of the parent 'Component'
class Projects extends Component {
    // Passes id to identify which Project will be deleted
    deleteProject(id) {
        this.props.onDelete(id);
    }

    // Everything that is being rendered must be contained in one script tag set
    render() {
        console.log("PROPS ('Project.js'): ", this.props);

        let projectItems;
        // Test to see if there are any 'projects'
        if (this.props.projects) {
            // We are using '.map' because we have an array ('projects')
            projectItems = this.props.projects.map(project => {
                console.log("projectItems: ", project);

                return (
                    /*
                        'ProjectItem' component to pass in each 'project' as a property

                        It is also being assigned to 'projectItem' variable in the return below

                        Unique "key" prop is needed and must be set for each child in an array or iterator (based on 'projects' array of objects)

                        'onDelete' is being passed from 'ProjectItem.js'
                    */
                    <ProjectItem onDelete={this.deleteProject.bind(this)} key={project.title} project={project} />
                )
            });
        }

        return (
            // 'className' == 'class' in JSX
            // Script tags must always have closing pairing tags
            <div className="Projects">
                <h3>Latest Projects</h3>
                {projectItems}
                <br />
            </div>
        );
    }
}

// Validation for '.props' (properties) using 'prop-types' npm package
Projects.propTypes = {
    projects: PropTypes.array,
    onDelete: PropTypes.func
};

export default Projects;
