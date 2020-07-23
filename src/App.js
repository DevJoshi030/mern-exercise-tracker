import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/NavbarComponent';
import ExercisesList from './components/ExercisesListComponent';
import EditExercise from './components/EditExerciseComponent';
import CreateExercise from './components/CreateExerciseComponent';
import CreateUser from './components/CreateUserComponent';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Route path="/" exact component={ ExercisesList } />
        <Route path="/edit/:id" component={ EditExercise } />
        <Route path="/create" component={ CreateExercise } />
        <Route path="/user" component={ CreateUser } />
      </div>
    </Router>
  );
}

export default App;
