import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super (props);

        this.state = {
            username: ''
        }
        this.myRef = React.createRef();
        this.baseUrl = "http://localhost:5000";
    }

    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        const user = {
            username: this.state.username
        }

        axios.post(this.baseUrl + '/users/add', user)
            .then(res => console.log(res.data))
            .catch(error => console.log(error));

        this.setState({
            username: ''
        });
    }

    render() {
        return (
            <>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </>
        )
    }
}