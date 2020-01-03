import React, { useState, useEffect } from 'react';
import Form from './Form';
import ArticlesApi from '../../api/articlesApi';

function ArticleEdit(props) {
  const [art, setArticle] = useState({title: '', content: ''});
  let id = props.match.params.id;

  useEffect(() => {
    ArticlesApi.getArticle(id)
    .then(data => {
      setArticle(data)
    })
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    ArticlesApi.patchArticle(id, art, props);
  }

  const handleChange = event => {
    setArticle({
      title: (event.target.name == 'title' ? event.target.value : art.title),
      content: (event.target.name == 'content' ? event.target.value : art.content)
    });
  }

  const handleCancel = () => {
    props.history.push(`/articles/${id}`);
  }

  const article = {
    title: art.title,
    content: art.content
  };

  const settings = {
    handleSubmit: handleSubmit,
    handleChange: handleChange,
    handleCancel: handleCancel,
    actionLabel: 'Update'
  };

  return (
    <div>
      <h1>Edit {art.title}</h1>
      <Form article={article} settings={settings} />
    </div>
  );
}

export default ArticleEdit;