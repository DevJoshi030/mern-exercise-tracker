import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )

export default class ExercisesList extends Component {

    constructor(props) {
        super (props);

        this.state = {exercises: []};
        this.baseUrl = "http://localhost:5000";
    }

    componentDidMount() {
        axios.get(this.baseUrl + '/exercises/')
            .then(response => {
                this.setState({ exercises: response.data})
            }).catch(
                error => console.log(error)
            );
    }

    deleteExercise = (id) => {
        axios.delete(this.baseUrl + '/exercises/'+ id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          exercises: this.state.exercises.filter(el => el._id !== id)
        });
    }

    exerciseList = () => {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        });
    }

    render() {
        return (
            <>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.exerciseList()
                        }
                    </tbody>
                </table>
            </>
        )
    }
}