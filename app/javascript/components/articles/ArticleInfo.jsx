import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {infoArticle} from '../../actions/articles';

class ArticleInfo extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.showArticle(this.props.match.params.id);
  }

  handleDelete() {
    fetch(`api/articles/${this.props.match.params.id}`, {method: 'DELETE'})
      .then(() => {
        this.props.history.push("/articles")
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div>
        <h2>{this.props.article.id}: {this.props.article.title}</h2>
        <p>{this.props.article.content}</p>
        <p>
          <Link to={`/articles/${this.props.article.id}/edit`} className="btn btn-outline-dark">Edit</Link>
          <button onClick={this.handleDelete} className="btn btn-outline-dark">Delete</button> 
          <Link to="/articles" className="btn btn-outline-dark">Close</Link>
        </p>
        <hr/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    article: state.articlesReducer.article
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showArticle: (id) => dispatch(infoArticle(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleInfo);