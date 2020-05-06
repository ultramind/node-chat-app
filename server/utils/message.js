const moment = require('moment');
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

var generateLocation = (from, coords) =>{
    return {
        from,
        url: `https://www.google.com/maps?q=${coords.latitude},${coords.logitude}`,
        createdAt: moment().valueOf()
    }
};

// export generatedMessage
module.exports = {generateMessage, generateLocation};