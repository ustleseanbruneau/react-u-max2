import React, { Component } from 'react';
//Lecture 70 - adding class to import App.css
//import './App.css';
import classes from './App.css';
//import Radium, { StyleRoot } from 'radium';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';


class App extends Component {
  // Lecture 42 - useState() example, or React Hooks
  // React 16.8 -> new functionality useState()
  //  first element is always the current state
  //  second element allows update
  state = {
    persons: [
      { id: 'asfa', name: 'Sean', age: 28},
      { id: 'bdsa', name: 'Mary', age: 34 },
      { id: 'cads', name: 'Tom', age: 53 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  // setState - only available in React Components, not in functions
  // Don't do this:  this.state.persons[0].name = 'LeSean';
  // Lecture 44 - adds a dynamic parameter to switchNameHandler
  // switchNameHandler = () => {
  //   this.setState({persons: [
  //     { name: 'LeSean', age: 28 },
  //     { name: 'Mary', age: 34 },
  //     { name: 'Tom', age: 21 }

  //   ]})
  // }

  deletePersonHandler = (personIndex) => {
    // JavaScript - Objects and Arrays are reference types
    // .slice() makes copy of array, rather than point to reference
    //const persons = this.state.persons.slice();
    // spread operator, same as above
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
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

    this.setState( {persons: persons} );

    // this.setState({
    //   persons: [
    //     { name: 'LeSean', age: 28 },
    //     { name: event.target.value, age: 34 },
    //     { name: 'Tom', age: 21 }
    //   ]
    // })    
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    // Lecture 47 - add styling to button
    // Lecture 71 - removing style selector
/*      

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    } 
*/

    let persons = null;
    // Lecture 71 - 
    let btnClass = '';

    // Lecture 53 - turn into list
    if(this.state.showPersons) {
      persons = <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />;

      // Lecture 71 - removing psuedo style selector
      //style.backgroundColor = 'red';
/*       style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
 */
    }

    //let classes = ['red', 'bold'].join(' ');
    // lecture 70 - name conflict with new import, changing classes to assignedClasses
    //let classes = [];


    // JSX Format
    //  Note:  className instead of class - class is a reserve word in React
    //      compiler will translate className to class in HTML DOM
    //  onClick - if you add () to function name, function will execute on page load
    // Lecture 44 - can pass down click handlers to children as a property
    //            - dynamically passing arguments
    // Lecture 65 - basic class assignment
    //        <p className={classes}>This is really working!</p>
    // Lecture 68 - use Radium,       <StyleRoot>        </StyleRoot>

    return (
        //Lecture 70; change className to class defined in import statement 
        //<div className="App">

        // Lecture 71 - Remove psuedo selector style 
        //  <button 
        // style = { style }
        //            onClick = { this.togglePersonsHandler } > Toggle Persons</button >

        <div className={classes.App}>
          <Cockpit 
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler} />
          {persons}
        </div>
    );

    // Other React JavaScript formats for same code above
    //return React.createElement('div', null, 'h1', 'Hi, I\'m a React App!!!');
    //return React.createElement('div', null, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
    //return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Hi, I\'m a React App!!!'));
  }
}

//export default Radium(App);
export default App;
