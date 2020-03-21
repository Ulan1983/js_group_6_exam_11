import React, {Fragment} from 'react';
import './App.css';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Items from "./containers/Items/Items";
import NewItem from "./containers/NewItem/NewItem";
import SingleItem from "./containers/SingleItem/SingleItem";

function App() {
  return (
      <Fragment>
        <header>
          <Toolbar/>
        </header>
        <Container style={{marginTop: '20px'}}>
          <Switch>
              <Route path='/' exact component={Items} />
              <Route path='/items/:id' exact component={SingleItem} />
              <Route path='/item/new' exact component={NewItem} />
              <Route path='/register' exact component={Register} />
              <Route path='/login' exact component={Login} />
          </Switch>
        </Container>
      </Fragment>
  );
}

export default App;
