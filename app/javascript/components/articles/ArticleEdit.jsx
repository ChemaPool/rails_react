import React, { useState, useEffect } from 'react';
import Form from './Form';

function ArticleEdit(props) {
  const [state, setstate] = useState({title: '', content: ''});
  // state.handleChange = state.handleChange;
  // state.handleSubmit = state.handleSubmit;
  // state.handleCancel = state.handleCancel;

  useEffect(() => {
    fetch(`api/articles/${props.match.params.id}`)
      .then(response => response.json())
      .then((data) => {
        setstate(data);
      })
      .catch(error => console.log('error', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`api/articles/${props.match.params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(state),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        props.history.push(`/articles/${state.id}`);
      })
      .catch(error => console.log('error', error));
  }

  const handleChange = (event) => {
    setstate({ [event.target.name]: event.target.value });
  }

  const handleCancel = () => {
    props.history.push(`/articles/${state.id}`);
  }

  const article = {
    title: state.title,
    content: state.content
  };

  const settings = {
    handleSubmit: handleSubmit,
    handleChange: handleChange,
    handleCancel: handleCancel,
    actionLabel: 'Update'
  };

  return (
    <div>
      <h1>Edit {state.title}</h1>
      <Form article={article} settings={settings} />
    </div>
  );


}

// class ArticleEditOLD extends Component {
//   constructor() {
//     super();
//     this.state = {title: '', content: ''};
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleCancel = this.handleCancel.bind(this);
//   }

  // componentDidMount() {
  //   fetch(`api/articles/${this.props.match.params.id}`)
  //     .then(response => response.json())
  //     .then((data) => {
  //       this.setState(data);
  //     })
  //     .catch(error => console.log('error', error));
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   fetch(`api/articles/${this.props.match.params.id}`, {
  //       method: 'PATCH',
  //       body: JSON.stringify(this.state),
  //       headers: { 'Content-Type': 'application/json' }
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       this.props.history.push(`/articles/${this.state.id}`);
  //     })
  //     .catch(error => console.log('error', error));
  // }

  // handleChange(event) {
  //   this.setState({ [event.target.name]: event.target.value });
  // }

  // handleCancel() {
  //   this.props.history.push(`/articles/${this.state.id}`);
  // }

  // render() {
  //   const article = {
  //     title: this.state.title,
  //     content: this.state.content
  //   };
  //   const settings = {
  //     handleSubmit: this.handleSubmit,
  //     handleChange: this.handleChange,
  //     handleCancel: this.handleCancel,
  //     actionLabel: 'Update'
  //   };
  //   return (
  //     <div>
  //       <h1>Edit {this.state.title}</h1>
  //       <Form article={article} settings={settings} />
  //     </div>
  //   );
  // }
// }

export default ArticleEdit;