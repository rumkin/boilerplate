
function decorate(Class, decorators) {
    return decorators.reduce((ClassDecorated, decorator) => {
        return decorator(ClassDecorated);
    }, Class);
}

module.exports = decorate;
