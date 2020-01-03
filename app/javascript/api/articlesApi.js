import axios from 'axios';

class ArticlesApi {
  static getArticles() {
    return axios.get('api/articles')
    .then(response => {
      const art = response.data;
      return art;
    })
    .catch(error => {
      return error;
    });
  }

  static getArticle(id){
    return axios.get(`api/articles/${id}`)
    .then(response => {
      const artInfo = response.data;
      return artInfo;
    })
    .catch(error => {
      return error;
    });
  }

  static patchArticle(id, art, props){
    axios(`api/articles/${id}`, {
      method: 'PATCH',
      data: art
    })
    .then( () => {
      props.history.push(`/articles/${id}`);
    })
    .catch(error => console.log('error', error));
  }

  static saveArticle(art, props){
    axios('api/articles', {
      method: 'POST',
      data: art
    })
    .then( response => {
      props.history.push(`/articles/${response.data.id}`);
    })
    .catch(error => console.log('error', error));
  }
}

export default ArticlesApi;