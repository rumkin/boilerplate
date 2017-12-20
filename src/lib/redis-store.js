class RedisStore {
    constructor({redis, expire = 0}) {
        this.redis = redis;
        this.expire = expire;
    }

    _id(value) {
        if (Array.isArray(value)) {
            return value.join(':');
        }
        else {
            return value;
        }
    }

    set(id_, value, expire = this.expire) {
        const id = this._id(id_);

        let json = JSON.stringify(value, null, false);

        return new Promise((resolve, reject) => {
            const multi = this.redis
            .multi()
            .set(id, json);

            if (this.expire > 0) {
                multi.expire(id, expire);
            }

            multi.exec((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(value);
                }
            });
        });
    }

    get(id_) {
        const id = this._id(id_);

        return new Promise((resolve, reject) => {
            this.redis.get(id, (err, value) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (value === null) {
                    resolve();
                    return;
                }

                try {
                    value = JSON.parse(value);
                }
                catch (err) {
                    reject(err);
                    return;
                }

                resolve(value);
            });
        });
    }

    delete(id_) {
        const id = this._id(id_);

        return new Promise((resolve, reject) => {
            redis.del(id, function(err){
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}

module.exports = RedisStore;
