import React, { useState } from 'react';
import Form from './Form';
import ArticlesApi from '../../api/articlesApi';

function ArticleAdd(props) {
  const [art, setstate] = useState({ title: '', content: '' });

  const handleSubmit = event => {
    event.preventDefault();
    ArticlesApi.saveArticle(art, props);
  }

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const title = (name == 'title' ? value : art.title);
    const content = (name == 'content' ? value : art.content);
    setstate({title: title, content: content});
  }
  const handleCancel = () => {
    props.history.push("/articles");
  }

  const article = {
    title: art.title,
    content: art.content
  };

  const settings = {
    handleSubmit: handleSubmit,
    handleChange: handleChange,
    handleCancel: handleCancel,
    actionLabel: 'Create'
  };

  return (
    <div>
      <h1>{art.title}</h1>
      <Form article={article} settings={settings}/>
    </div>
  );
}

export default ArticleAdd;