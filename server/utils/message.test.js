const expect = require('expect');
var {generateMessage, generateLocation} = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', () =>{
        var from = 'Akachukwu';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

// testing the generateLocation
describe('generateLocation', () => {
    it('Should return the url of the location', () => {
        var from = 'Admin';
        var url = 'https://www.google.com/maps';
        var message = generateLocation(from, url);

        // expect
        expect(message).toInclude({from, url});
    });
})