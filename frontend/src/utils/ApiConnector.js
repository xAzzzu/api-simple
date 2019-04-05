import Config from "../config";
import APIFetch from "./APIFetch";

export default class ApiConnector {
    static loginUser(creds) {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{"login": "${creds.username}", "password": "${creds.password}"}`
        };
        return APIFetch.post(Config.apiServer + '/login', config).then((response) => {
            console.log(response);
            localStorage.setItem('id_token', response.data.token);
        });
    }

    static addArticle(article) {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('id_token')
            },
            body: JSON.stringify(article)
        };
        return APIFetch.post(Config.apiServer + '/article', config);
    }

    static updateArticle(article) {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('id_token')
            },
            body: JSON.stringify(article)
        };
        return APIFetch.patch(Config.apiServer + '/article/' + article.id, config);
    }

    static getArticles() {
        return APIFetch.get(Config.apiServer + '/article');
    }

    static getArticle(id) {
        return APIFetch.get(Config.apiServer + '/article/' +id);
    }

    static deleteArticle(id) {
        let config = {
            headers: {
                'authorization': localStorage.getItem('id_token')
            }
        };
        return APIFetch.delete(Config.apiServer + '/article/' +id, config);
    }

    static isAuthenticated() {
        return localStorage.getItem('id_token') !== null;
    }
}