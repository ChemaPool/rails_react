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
    setstate({
      title: (event.target.name == 'title' ? event.target.value : art.title),
      content: (event.target.name == 'content' ? event.target.value : art.content)
    });
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