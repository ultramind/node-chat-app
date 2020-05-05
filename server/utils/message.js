
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

// export generatedMessage
module.exports = {generateMessage};