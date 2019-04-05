export default class APIFetch {
    static get(route, config) {
        config = config || {};
        config.method = 'GET';
        return fetch(route, config)
            .then(APIFetch.parseJson)
            .then(APIFetch.handleResponse)
            .catch(err => {console.error("API Fetch Error: ", err)});
    }

    static post(route, config) {
        config = config || {};
        config.method = 'POST';
        return fetch(route, config)
            .then(APIFetch.parseJson)
            .then(APIFetch.handleResponse)
            .catch(err => console.error("API Fetch Error: ", err));
    }

    static put(route, config) {
        config = config || {};
        config.method = 'PUT';
        return fetch(route, config)
            .then(APIFetch.parseJson)
            .then(APIFetch.handleResponse)
            .catch(err => console.error("API Fetch Error: ", err));
    }

    static patch(route, config) {
        config = config || {};
        config.method = 'PATCH';
        return fetch(route, config)
            .then(APIFetch.parseJson)
            .then(APIFetch.handleResponse)
            .catch(err => console.error("API Fetch Error: ", err));
    }

    static delete(route, config) {
        config = config || {};
        config.method = 'DELETE';
        return fetch(route, config)
            .then(APIFetch.parseJson)
            .then(APIFetch.handleResponse)
            .catch(err => console.error("API Fetch Error: ", err));
    }

    static parseJson(response){
        return response.json()
            .then(data => ({
                data,
                response
            })).catch(err => console.error("API Fetch parse error: ", err));
    }

    static handleResponse(data) {
        if (!data.response.ok) {
            return Promise.reject(data.data);
        } else {
            return Promise.resolve(data.data);
        }
    }
}
