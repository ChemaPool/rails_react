import React, { Component } from 'react';
import Form from './Form';

class ArticleAdd extends Component {
  constructor() {
    super();
    this.state = { title: '', content: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('api/articles', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        this.props.history.push(`/articles/${data.id}`);
      })
      .catch(error => console.log('error', error));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCancel() {
    this.props.history.push("/articles");
  }

  render() {
    const article = {
      title: this.state.title,
      content: this.state.content
    };
    const settings = {
      handleSubmit: this.handleSubmit,
      handleChange: this.handleChange,
      handleCancel: this.handleCancel,
      actionLabel: 'Create'
    };
    return (
      <div>
        <h1>{this.state.title}</h1>
        <Form article={article} settings={settings}/>
      </div>
    );
  }
}

export default ArticleAdd;