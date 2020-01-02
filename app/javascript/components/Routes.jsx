import React, { Component } from 'react';
import Home from "./Home";
import ArticleEdit from "./articles/ArticleEdit";
import ArticleList from "./articles/ArticleList";
import ArticleAdd from "./articles/ArticleAdd";
import ArticleInfo from "./articles/ArticleInfo";
import {Route, Switch} from 'react-router-dom'

class Routes extends Component {
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/articles" component={ArticleList} />
        <Route exact path="/articles/new" component={ArticleAdd} />
        <Route exact path="/articles/:id" component={ArticleInfo} />
        <Route exact path="/articles/:id/edit" component={ArticleEdit} />
      </Switch>
    );
  }
}

export default Routes;