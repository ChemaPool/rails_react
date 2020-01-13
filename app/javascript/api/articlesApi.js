import axios from 'axios';

class ArticlesApi {

  static getArticlesPaginate(page, perPage = 10) {
    return axios.get(`api/articles?page=${page}&per_page=${perPage}`)
    .then(response => {
      const articlesPaginate = response.data;
      return articlesPaginate;
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

  static deleteArticle(props){
    axios(`api/articles/${props.match.params.id}`, {method: 'DELETE'})
    .then(() => {
      props.history.push("/articles")
    })
    .catch(error => console.log('error', error));
  }
}

export default ArticlesApi;