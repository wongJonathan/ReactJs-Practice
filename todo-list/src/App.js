import React, { Component } from 'react';
import './App.css';


class ListEntry extends Component{
    constructor(props){
        super(props);
        this.state={
            task: props.task,
            date: props.date,
            completed: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        var completed = this.state.completed ? false : true;
        var list = JSON.parse(localStorage.getItem('todoList'));
        var result =[];
        if(list !== []) {
            list.map(listEntry => {
                                    console.log(listEntry.props.date);
                console.log(this.state.date);
                console.log(this.state.date != listEntry.props.date )
                if(this.state.task != listEntry.props.task){
                    console.log("Added");
                    console.log(listEntry.props);
                    result.push(<ListEntry task={listEntry.props.task} date={listEntry.props.date}
                                                   completed={listEntry.props.completed}/>);
                }
            })

        }
        this.props.update(result);
        this.setState({completed: completed});
    }

    render(){
        return(
            <div className="listObject">
                <li key={"t:"+new Date().toTimeString()}>{this.state.task}</li>
                <li key={"d:"+new Date().toTimeString()}>{this.state.date}</li>
                    <form>
                        Is Completed:
                        <input
                            name="completed"
                            type="checkbox"
                            checked={this.state.completed}
                            onChange={this.handleChange}/>
                    </form>
                <p></p>
            </div>
        );
    }
}

class App extends Component{

    constructor(){
        super();
        this.state={
            list: JSON.parse(localStorage.getItem('todoList')) || [],
            entry: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){
        this.setState({entry: event.target.value});
    }

    handleSubmit(event){
        var list = <ListEntry task={this.state.entry} date={new Date().toLocaleDateString()}/>;
        this.addToList(list);
        event.preventDefault();
    }

    // Updates the list
    addToList(props){

        // Gets the current list of tasks
        var oldList = JSON.parse(localStorage.getItem('todoList')) || [];
        // Pushes the new task
        oldList.push(props);
        this.updateList(oldList);
        // Sets the object's list to display it on screen
        this.setState({
            list: this.state.list.concat(props)
        });
    }

    updateList(props){
                // Saves the new task list
        localStorage.setItem('todoList',JSON.stringify(props))
    }

    removeTask(index){
        var list = this.state.list;
        list.splice(index,1);
        this.setState({
            list: list
        })
    }

    clearStorage(){
        console.log("Clear");
        localStorage.clear();
    }

    render(){

        var list = (this.state.list);      // Gets the list of todo tasks
        var result =[];
        // Parses through all the elements and creates a new list entry
        if(list !== []) {
            list.map(function(listEntry) {
                if (listEntry != undefined) {
                    console.log(listEntry);
                    //Entry is pushed to result which will be displaying the ListEntry object
                    (result.push(<ListEntry task={listEntry.props.task} date={listEntry.props.date}
                                                   completed={listEntry.props.completed}
                                                   update={this.updateList.bind(this)}
                    remove={this.removeTask.bind(this)}/>));
                }
            }.bind(this));
        }

        return(
        <div className="Window">
            <div className="list">
                <h1>To Do List:</h1>
                <div className="EnterList">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Task:
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
                <button onClick={this.clearStorage}> Clear Storage </button>
                <div className="listEntries">
                    {result}
                    <p> </p>
                </div>
            </div>
        </div>
        );
    }

}
export default App
