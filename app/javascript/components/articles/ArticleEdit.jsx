import React, { Component } from 'react';
import Form from './Form';

class ArticleEdit extends Component {
  constructor() {
    super();
    this.state = {title: '', content: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    fetch(`api/articles/${this.props.match.params.id}`)
      .then(response => response.json())
      .then((data) => {
        this.setState(data);
      })
      .catch(error => console.log('error', error));
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`api/articles/${this.props.match.params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(this.state),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        this.props.history.push(`/articles/${this.state.id}`);
      })
      .catch(error => console.log('error', error));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCancel() {
    this.props.history.push(`/articles/${this.state.id}`);
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
      actionLabel: 'Update'
    };
    return (
      <div>
        <h1>Edit {this.state.title}</h1>
        <Form article={article} settings={settings} />
      </div>
    );
  }
}

export default ArticleEdit;