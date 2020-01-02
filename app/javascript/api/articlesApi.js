class ArticlesApi {
  static getArticles() {
    return fetch('api/articles')
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static getArticle(id){
    return fetch(`api/articles/${id}`)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
}

export default ArticlesApi;