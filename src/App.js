import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ContactList from "./pages/ContactList";
import EditContact from "./pages/EditContact";
import CreateContact from "./pages/CreateContact";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={ContactList} />
          <Route path="/edit/:id" component={EditContact} />
          <Route path="/create" component={CreateContact} />
        </div>
      </Router>
    );
  }
}

export default App;
