import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Projects from './components/Projects';
import AddProject from './components/AddProject';
import Todos from './components/Todos';

// 'App' is the child of the parent 'Component'
class App extends Component {
  // To insert data into our 'state', we create a constructor
  constructor() {
    // 'this' is not allowed without super() when creating constructors
    super();
    this.state = {
      // Creating array of objects to be passed to 'Projects' as a property
      // Data should be immutable--"top-down" approach
      projects: [],
      todos: []

      /*
      projects: [
        {
          title: 'Business Website',
          category: 'Web Design'
        },
        {
          title: 'Social App',
          category: 'Mobile Development'
        },
        {
          title: 'E-Commerce Shopping Cart',
          category: 'Web Development'
        }
      ]

      When you have an array of objects, you'd want to create a separate component for each individual item to map through those projects to output respective components
      */

    }
  }

  // 'getTodos' is accessing a JSONPlaceholder url (fake online REST API for testing and prototyping) to retrieve data
  getTodos() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({todos: data}, function() {
          console.log("AJAX CALLBACK ('App.js'): ", this.state)
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("AJAX ERR ('App.js'): ", err)
      }
    });
  }

  getProjects() {

    /*
      'setState({})' is a request that enqueues changes to component state and tells React that this component and its children need to be re-rendered with the updated state.
        - This is the primary method you use to update the UI in response to event handlers and server responses.

      Each component has its own unique state but 'App.js' contains the main component
    */

    this.setState({
      projects: [
        {
          // New id will be generated with 'uuid' npm package
          id: uuid.v4(),
          title: 'Business Website',
          category: 'Web Design'
        },
        {
          id: uuid.v4(),
          title: 'Social App',
          category: 'Mobile Development'
        },
        {
          id: uuid.v4(),
          title: 'E-Commerce Shopping Cart',
          category: 'Web Development'
        }
      ]
    });
  }

  /*
    In 'this.state', it isn't where you'd want to set the actual data--you do want to define the state and the keys, but not the actual data.

    So, we are going to use the life-cycle method below.

    Ref: https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1

    This is a *life-cycle method, it will fire off everytime a component is rendered.

    If you're fetching data from an AJAX call, you'd want to perform the same actions in a *life-cycle method as well.

    Click the reference link to learn more about life-cycle methods and how/when to use them!
  */

  componentWillMount() {
    this.getProjects();
    this.getTodos();
  }

  componentDidMount() {
    this.getTodos();
  }

  handleAddProject(project) {
    // Data is being passed up to this component from 'AddProject.js' (line 41)
    console.log("handleAddProject ('App.js'): ", project);

    /*
      We also want to add the data to the state of the main component in this file.

      States are immutable--you don't want to change them; you'd want to update them; thus, you want to get everything in a state and push the new 'project' to it and set it again.
    */
    
    // We are grabbing what already exists in 'projects'
    let projects = this.state.projects;
    // Pushes the new 'project' into 'projects' array of objects
    projects.push(project);
    // This will set the newly inputed Project onto the list of existing projects
    this.setState({projects:projects});
  }

  handleDeleteProject(id) {
    // Just like 'handleAddProject', we want to retreive from state, get data from the Project we want, and delete it.
    let projects = this.state.projects;
    // Find all the 'id's and match them to the current 'id' passed in
    let index = projects.findIndex(x => x.id === id);
    // Delete 1 from the index
    projects.splice(index, 1);
    // Set new state
    this.setState({projects:projects});
  }

  handleDeleteTodo(id) {
    // Just like 'handleDeleteProject', we want to retreive from state, get data from the Project we want, and delete it.
    let todos = this.state.todos;
    // Find all the 'id's and match them to the current 'id' passed in
    let index = todos.findIndex(x => x.id === id);
    // Delete 1 from the index
    todos.splice(index, 1);
    // Set new state
    this.setState({ todos: todos });
  }

  // Everything that is being rendered must be contained in one script tag set
  render() {
    return (
      // 'className' == 'class' in JSX
      // Script tags must always have closing pair tags
      <div className="App">

        {/*
          'AddProject.js' will be rendered here

          'addProject' is being called with its data from 'AddProject.js' (line 40) 
          '.bind(this)' this allowing 'handleAddProject' function to know what 'this' is
        */}

        <AddProject addProject={this.handleAddProject.bind(this)} />

        {/*
          'Projects.js' and 'Todos.js' will be rendered here by passing 'projects' and 'todos' as object components
        */}

        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
        <hr />
        <Todos todos={this.state.todos} onDelete={this.handleDeleteTodo.bind(this)}/>
        <br />
      </div>
    );
  }
}

export default App;
