import Labels from '../../../utils/contants/Labels.json'
import axios from 'axios';
export default class Networking {
    static postApi(url, data = '') {
        let config;
        if (data instanceof FormData) {
            // If data is FormData, set 'multipart/form-data' Content-Type
            config = {
                method: 'post',
                url: url,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': Labels[window.globalConfig.language].token.authToken,
                    'SessionID': localStorage.getItem('SessionID') || '',
                    'Access-Control-Allow-Origin': `${window.globalConfig.domain}`,
                    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
                },
                data: data,
            };
        } else {
            // If data is not FormData, assume JSON and set 'application/json' Content-Type
            config = {
                method: 'post',
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Labels[window.globalConfig.language].token.authToken,
                    'SessionID': localStorage.getItem('SessionID') || '',
                    'Access-Control-Allow-Origin': `${window.globalConfig.domain}`,
                    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
                },
                data: data,
            };
        }

        return axios(config)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 405 || error.response.status === 401) {
                        window.location.href = '/';
                    } else {
                        return {
                            status: error.response.status,
                            message: error.toString(),
                        };
                    }
                }
                console.log(error,'error')
                return { "status": "F", "message": error }
            });
    };

    static getApi(url, data = '') {

        var config = {
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'SessionID':localStorage.getItem('SessionID') || '',
                'Authorization': Labels[window.globalConfig.language].token.authToken,
                'Access-Control-Allow-Origin': `${window.globalConfig.domain}`,
                'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
            },
            data: data
        }

        return axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error, 'error');
                return { "status": "F", "message": error };
                if (error.response) {
                    if (error.response.status === 405 || error.response.status === 401) {
                        window.location.href = '/';
                    } else {
                        return {
                            status: error.response.status,
                            message: error.toString(),

                        };
                    }
                }
                console.log(error,'error')
                return { "status": "F", "message": error }
            });
    }

    static getApi(url, data = '') {

    var config = {
        method: 'get',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Labels[window.globalConfig.language].token.authToken,
            'Access-Control-Allow-Origin': `${window.globalConfig.domain}`,
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
        },
        data: data
    }

    return axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return { "status": "F", "message": error }
        });

};

};
