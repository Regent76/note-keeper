import React, {Component} from "react";
import "./App.css";
import {Router, Switch, Route} from "react-router-dom";
import {AddNote} from "./notes/AddNoteComponent"
import {Note} from "./notes/NoteComponent";
import {Login} from "./login/";
import {Register} from "./login/RegisterComponent";
import {Home} from "./home/";
import {history} from "./helpers";
import {PrivateRoute} from "./components/PrivateRoute";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <div>
                        <Switch>
                            <PrivateRoute exact path="/add-note" component={AddNote}/>
                            <PrivateRoute exact path="/notes/:id" component={AddNote}/>
                            <PrivateRoute exact path="/home" component={Home}/>
                            <PrivateRoute exact path="/notes" component={Note}/>
                            <Route exact path="/" component={Login}/>
                            <Route exact path="/auth/register" component={Register}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;