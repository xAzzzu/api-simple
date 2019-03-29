import Config from "../config"

export default class ApiConnector {
    static loginUser(creds) {
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{"login": "${creds.username}", "password": "${creds.password}"}`

        };
        return fetch(Config.apiServer +'/login', config)
            .then(response =>
                response.json()
                    .then(user => ({
                        user,
                        response
                    }))
            ).then(({
                        user,
                        response
                    }) => {
                if (!response.ok) {
                    return Promise.reject(user);
                } else {
                    if(user.success === false){
                        return Promise.reject(user.message);
                    } else {
                        localStorage.setItem('id_token', user.data.token);
                        return Promise.resolve();
                    }
                }
            }).catch(err => {
                console.log("Error: ", err);
                return Promise.reject(err);
            });
    }

    static addArticle(article) {
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('id_token')
            },
            body: `{"title": "${article.title}", "content": "${article.content}"}`

        };
        return fetch(Config.apiServer +'/article', config)
            .then(response =>
                response.json()
                    .then(article => ({
                        article,
                        response
                    }))
            ).then(({
                        article,
                        response
                    }) => {
                if (!response.ok) {
                    return Promise.reject(article);
                } else {
                    return Promise.resolve(article);
                }
            }).catch(err => {
                console.log("Error: ", err);
                return Promise.reject(err);
            });
    }

    static updateArticle(article) {
        let config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('id_token')
            },
            body: `{"title": "${article.title}", "content": "${article.content}"}`
        };
        return fetch(Config.apiServer +'/article/'+article.id, config)
            .then(response =>
                response.json()
                    .then(article => ({
                        article,
                        response
                    }))
            ).then(({
                        article,
                        response
                    }) => {
                if (!response.ok) {
                    return Promise.reject(article);
                } else {
                    return Promise.resolve(article);
                }
            }).catch(err => {
                console.log("Error: ", err);
                return Promise.reject(err);
            });
    }

    static getArticles() {
        let config = {
            method: 'GET'
        };
        return fetch(Config.apiServer +'/article', config)
            .then(response =>
                response.json()
                    .then(articles => ({
                        articles,
                        response
                    }))
            ).then(({
                        articles,
                        response
                    }) => {
                if (!response.ok) {
                    return Promise.reject(articles);
                } else {
                    return Promise.resolve(articles);
                }
            }).catch(err => {
                console.log("Error: ", err);
                return Promise.reject(err);
            });
    }

    static isAuthenticated(){
        return localStorage.getItem('id_token') !== null;
    }
}