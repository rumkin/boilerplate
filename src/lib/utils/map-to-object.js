module.exports = function mapToObject(map) {
    const result = {};

    for (const [key, value] of map.entries()) {
        result[key] = value;
    }

    return result;
};
