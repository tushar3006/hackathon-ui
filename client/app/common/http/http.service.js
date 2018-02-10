let HttpService = ($http, $window, BrandData) => {
    'ngInject';
    const service = {};



    // const domain = 'http://localhost';

    const API_URL = domain + '/api';

    let token;


    service.sendRequest = (resource, method, data) => {
        // let token = LTD.getSid();
        try {
            token = LTD.getSid();
        } catch (e) {
             token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJicmFuZFVzZXJJZCI6MTEwMzE4LCJ1c2VyTW9iaWxlIjoiOTgwNTk4OTk1MSIsImlzYSI6MTQ4NzA1Mzc4MTc2MiwiYnJhbmRJZCI6IjAiLCJ1c2VyRnVsbE5hbWUiOiJUdXNoYXIgSmFndGEiLCJ1c2VyRW1haWwiOiJ0dXNoYXIuamFndGFAbGltZXRyYXkuY29tIiwidG9rZW5UeXBlIjoiaWQiLCJ1c2VySWQiOiI1NjZjZGYwYy00N2E5LTQxZjAtYWQwNy05ZTkwM2FiMzE5NmIifQ.-IP0USsZnJuENYWZVWXpu4wI07TLU0BmS4YWVYayHgc';
        }
        let options = {
            method: method,
            url: `${API_URL}${resource}`
        };

        options.headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
            'x-brandId': BrandData.brandId
        };

        if (data) {
            options.data = data;
        }
        // Timeout
        // options.timeout = 5000;
        console.log(options)
        return $http(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };

    return service;
};

export default HttpService;
