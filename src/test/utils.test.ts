
import {uuid} from "../uuid";

describe('Test function UUID', () => {
    it('Sanity of function ', () => {
        const uuidTest = uuid();
        expect(uuidTest).toBe(uuidTest);
    });
    it('UUID return 32 characters', () => {
        const uuidTest = uuid();
        const testCharacter = 36;
        expect(testCharacter).toBe(uuidTest.split('').length);
    });

});


