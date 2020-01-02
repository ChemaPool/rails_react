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
}

export default ArticlesApi;