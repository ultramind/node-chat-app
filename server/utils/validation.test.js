const expect = require('events');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('Should Validate if is a string', () => {
        var res = isRealString(233);

        expect(res).toBe(false);
    });

    it('should trim all empty space', () => {
        var res =isRealString('              ');
        expect(res).toBe(true);
    })
})