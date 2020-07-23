import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateExercise extends Component {

    constructor(props) {
        super (props);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
        this.myRef = React.createRef();
        this.baseUrl = "http://localhost:5000";
    }

    componentDidMount() {
        axios.get(this.baseUrl + '/users/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    })
                }
            })
        this.setState({
            users: ['testuser'],
            username: 'testuser'
        });
    }

    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    
    onChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    onChangeDuration = (event) => {
        this.setState({
            duration: event.target.value
        })
    }
    
    onChangeDate = (date) => {
        this.setState({
            date: date
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post(this.baseUrl + '/exercises/add', exercise)
            .then(res => console.log(res.data))
            .catch(error => console.log(error));

        window.location = "/";
    }

    render() {
        return (
            <>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username: </label>
                        <select ref={this.myRef}
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map((user) => {
                                return <option 
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </>
        )
    }
}