import React, {Fragment} from 'react';
import './App.css';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

function App() {
  return (
      <Fragment>
        <header>
          <Toolbar/>
        </header>
        <Container style={{marginTop: '20px'}}>
          <Switch>
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
          </Switch>
        </Container>
      </Fragment>
  );
}

export default App;
