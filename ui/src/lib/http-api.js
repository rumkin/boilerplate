import axios from 'axios';
import Error3 from './error3';

function normalizeUrl(url) {
    return url.replace(/^\/+|\/+$/g, '');
}

export default class HttpApi {
    constructor({ssl = true, host = 'localhost', port = ssl ? 443 : 80, base = '', auth = null, credentials = false}) {
        this.protocol = ssl ? 'https' : 'http';
        this.host = host;
        this.port = port;
        this.base = normalizeUrl(base);
        this.auth = auth;
        this.withCredentials = credentials;
        this.defaultHeaders = {};
    }

    // Common methods

    get url() {
        const {protocol, host, port, base} = this;
        return `${protocol}://${host}:${port}/${base}`;
    }

    headers(headers) {
        const defaults = Object.assign({}, this.defaultHeaders);

        if (this.auth) {
            defaults.authorization = this.auth;
        }
        return Object.assign(defaults, headers);
    }

    setDefaultHeader(header, value) {
        this.defaultHeaders[header] = value;
        return this;
    }

    setAuth(auth) {
        this.auth = auth;
    }

    processResponse(res) {
        if (res.status > 299) {
            throw Error3.from(res.data.error);
        }

        return res;
    }

    processOptions({url, headers, ...options} = {}) {
        return {
            baseURL: this.url,
            url: normalizeUrl(url),
            headers: this.headers(headers),
            validateStatus() {
                return true;
            },
            withCredentials: this.withCredentials,
            ...options,
        };
    }

    request(options) {
        return axios.request(this.processOptions(options))
        .then(this.processResponse.bind(this));
    }
};

export function toClass(Class) {
    return function(data) {
        return new Class(data);
    };
}

export function map(desc) {
    return function(data) {
        const result = {};

        for (const [name, mapper] of Object.entries(desc)) {
            const value = data[name];

            if (Array.isArray(value)) {
                result[name] = value.map(mapper);
            }
            else {
                result[name] = mapper(value);
            }
        }

        return {
            ...data,
            ...result,
        };
    };
}
