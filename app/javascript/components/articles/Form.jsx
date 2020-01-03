import React from 'react';
import Styled from 'styled-components';

function Form(props) {
  return(
    <div>
      <form onSubmit={props.settings.handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={props.article.title} onChange={props.settings.handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea name="content" rows="5" value={props.article.content} onChange={props.settings.handleChange} className="form-control" />
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-dark">{props.settings.actionLabel}</button>
          <button type="button" onClick={props.settings.handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Form;