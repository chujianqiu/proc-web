import React from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import RouterGuard from "./router";

class App extends React.Component {
    render() {
        return <Router><Switch><RouterGuard/></Switch></Router>
    }
}

export default App

