import React, { Component } from 'react';
//Lecture 70 - adding class to import App.css
//import './App.css';
import classes from './App.css';
//import Radium, { StyleRoot } from 'radium';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
//import WithClass from '../hoc/WithClass';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';


class App extends Component {
  // Lecture 88
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }


  state = {
    persons: [
      { id: 'asfa', name: 'Sean', age: 28},
      { id: 'bdsa', name: 'Mary', age: 34 },
      { id: 'cads', name: 'Tom', age: 53 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    /* properties state - may not be the most current state
    this.setState( {persons: persons, changeCounter: this.state.changeCounter + 1} );
    */
   this.setState((prevState, props) => {
     return {
      persons: persons,
      changeCounter: prevState.changeCounter + 1
     }
   }); 
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    console.log('[App.js] render');
    let persons = null;

    if(this.state.showPersons) {
      persons = (
        <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />
      );
    }

    /*
    return (
        <WithClass classes={classes.App}>
          <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cockpit</button>
          {this.state.showCockpit ? <Cockpit 
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler} 
          /> : null}
          {persons}
        </WithClass>
    );
    */

    return (
        <Aux>
          <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cockpit</button>
          {this.state.showCockpit ? <Cockpit 
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler} 
          /> : null}
          {persons}
        </Aux>
    );

  }
}

//export default App;
export default withClass(App, classes.App);
