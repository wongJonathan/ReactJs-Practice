import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import Task from './App';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

describe('Add a Task',() => {
    const task = shallow(<Task task="Test Task" date="1/2/10"/>)

    it('Add a ask', () => {
        expect(task.unrendered.props.task).toEqual("Test Task")
    })

    it('Add Task to To Do List',() =>{
        const app = shallow(<App />);
        app.instance().addToList(task.unrendered);
        expect(app.state().list[0].props.task).toEqual("Test Task");
        app.instance().clearTasks();
    })
})


describe('Removing Tasks', () => {

    it('Remove a single task', () =>{
        const task = shallow(<Task task="Test Task" date="1/2/10"/>);
        const app = shallow(<App />);
        app.instance().addToList(task.unrendered);
        expect(app.state().list[0].props.task).toEqual("Test Task");
        app.instance().removeTask(app.state().list,0);
        //console.log(app.state.list[0].length)
        expect(app.state.list).toEqual(undefined);
    })

    it('Remove an entire list', () => {
        var app = shallow(<App />);
        var tasks;
        var promises = [];

        for(var i = 0; i < 10; i ++){
            tasks = shallow(<Task task={"task "+i} date="1/2/10"/>);
            app.instance().addToList(tasks.unrendered);
        }
        expect(app.state().list.length).toEqual(10);
        app.instance().clearTasks();
        expect(app.state.list).toEqual(undefined);

    })
})