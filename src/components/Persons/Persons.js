//import React, { Component } from 'react';
import React, { PureComponent } from 'react';
import Person from './Person/Person';

//class Persons extends Component {
class Persons extends PureComponent {
    // static getDerivedStateFromProps(props,state) {
    //     console.log('[Persons.js] getDerivedStateFromProps....');
    //     return state;
    // }

/*  
    Deprecated - no longer used by newer versions of React
    componentWillReceiveProps(props) {
        console.log('[Persons.js] componentWillReceiveProps', props);
    }
 */
    // shouldComponentUpdate() - only available in class based components
    // Save some code by importing PureComponent
/*     shouldComponentUpdate(nextProps, nextState) {
        console.log('Persons.js shouldComponentUpdate');
        if (nextProps.persons !== this.props.persons || 
            nextProps.changed !== this.props.changed || 
            nextProps.clicked !== this.props.clicked) {
            return true;
        } else {
            return false;
        }
        //return true;
    } */

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return { message: 'Snapshot!'};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }


    render() {
        console.log('[Persons.js] rendering....');
        return this.props.persons.map((person, index) => {
            return (
                <Person
                    click={() => this.props.clicked(index)}
                    name={person.name}
                    age={person.age}
                    key={person.id}
                    changed={(event) => this.props.changed(event, person.id)}
                />
            );
        });
    }
}


export default Persons;