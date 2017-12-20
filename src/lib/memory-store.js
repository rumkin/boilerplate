class MemoryStore {
    constructor({expire = 0}) {
        this.store = new Map();
        this.expire = expire;
    }

    async get(id) {
        const item = this.store.get(id);

        if (! item) {
            return null;
        }

        if (item.expire && item.expire < new Date()) {
            this.store.delete(id);
            return null;
        }

        return item.value;
    }

    async set(id, value, expire = this.expire) {
        return this.store.set(id, {
            value,
            expire: expire > 0
                ? new Date(Date.now() + expire)
                : null,
        });
    }

    async delete(id) {
        return this.store.delete(id);
    }
}

module.exports = MemoryStore;
