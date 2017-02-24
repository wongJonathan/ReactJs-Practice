import React, {Component} from "react";
import "./App.css";


class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: props.task,
            date: props.date,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var list = JSON.parse(localStorage.getItem('todoList'));
        var result = [];
        var index = -1;

        if (list !== []) {
            list.map(listEntry => {
                if (this.state.task != listEntry.props.task) {
                    result.push(<Task task={listEntry.props.task} date={listEntry.props.date}/>);
                } else {
                    index = list.indexOf(listEntry);

                }
            })

        }
        //this.props.update(result);
        if (index != -1) {
            this.props.remove(result,index);
        }
    }

    render() {
        return (
            <div className="listObject">
                <li key={"t:" + new Date().toTimeString()}>{this.state.task}</li>
                <li key={"d:" + new Date().toTimeString()}>{this.state.date}</li>
                <button onClick={this.handleChange}> Complete Task </button>
                <p></p>
            </div>
        );
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = {
            list: [],
            entry: ''
        };

        if(localStorage.getItem('todoList') != undefined){
            console.log("Reset");
            this.state.list = JSON.parse(localStorage.getItem('todoList'))
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearTasks = this.clearTasks.bind(this);

    }

    handleChange(event) {
        this.setState({entry: event.target.value});
    }

    handleSubmit(event) {
        var list = <Task task={this.state.entry} date={new Date().toLocaleDateString()}/>;
        this.addToList(list);
        event.preventDefault();
    }

    // Updates the list
    addToList(props) {

        // Gets the current list of tasks
        var oldList = [];
        if(localStorage.getItem('todoList') != undefined){
            oldList = JSON.parse(localStorage.getItem('todoList'))
        }
        // Pushes the new task
        oldList.push(props);
        this.updateList(oldList);
        // Sets the object's list to display it on screen
        this.setState({
            list: this.state.list.concat(props)
        });
    }

    updateList(props) {
        // Saves the new task list
        localStorage.setItem('todoList', JSON.stringify(props))
    }

    removeTask(newList,index) {
        var list = this.state.list;
        var result = [];
        console.log(JSON.stringify(list));
        for(var i = 0; i < index; i++){
            result.push(list[i])
        }
        for(var i = index + 1; i < list.length; i++)
            result.push(list[i])

        console.log(JSON.stringify(result));
        this.updateList(result);
        this.setState({
            list: result
        })
        location.reload();
        console.log(JSON.stringify(this.state.list));
    }

    clearTasks() {
        console.log("Clear");
        localStorage.clear();
        if(this.state.list !== null)
        this.setState({
            list: []
        })
    }

    render() {

        var list = (this.state.list);      // Gets the list of todo tasks
        var result = [];
        // Parses through all the elements and creates a new list entry
        if (list !== []) {
            list.map(function (listEntry) {
                if (listEntry != undefined) {
                    //Entry is pushed to result which will be displaying the Task object
                    (result.push(<Task task={listEntry.props.task} date={listEntry.props.date}
                                       update={this.updateList.bind(this)}
                                       remove={this.removeTask.bind(this)}/>));
                }
            }.bind(this));
        }

        return (
            <div className="Window">
                <div className="list">
                    <h1>To Do List:</h1>
                    <div className="EnterList">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Task:
                                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                            </label>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                    <button onClick={this.clearTasks}> Clear Storage</button>
                    <div className="listEntries">
                        {result}
                        <p></p>
                    </div>
                </div>
            </div>
        );
    }

}
export default App
