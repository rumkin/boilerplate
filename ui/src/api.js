import HttpApi from './lib/http-api';
import config from './config';

function onResponse({data}) {
    return data;
}

export class Api extends HttpApi {
    get() {
        return this.request({
            url: '/',
        })
        .then(onResponse);
    }
}

const api = new Api(config.api);

api.setDefaultHeader('accept', 'application/json');

export default api;
