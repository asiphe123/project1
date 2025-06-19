const { numbersum } = require('./num');
const fetch = require('node-fetch');

jest.mock('node-fetch');

describe('numbersum()', () => {
    const originalArgv = process.argv;

    afterEach(() =>{
        process.argv = originalArgv;
        jest.clearAllMocks();
    });
    test('fetches correct tittle for sum of numbers', async() =>{
        process.argv = ['node','script.js', '2','3'];

        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({title: 'delectus aut autem'})
        });
        const output = await numbersum();
        expect(output).toBe('sum:5, Title: delectus aut autem');
    });
    test('handles non-ok response', async () => {
        process.argv = ['node', 'script.js','1','1'];

        fetch.mockResolvedValue({ok:false});
        const output = await numbersum();
        expect(output).toBe('error: Network response was not ok');
    });
    test('handles fetch error', async() =>{
        process.argv = ['node','script.js','10'];

        fetch.mockRejectedValue(new Error('Network issue'));

        const output = await numbersum();
        expect(output).toBe('error: Network issue');
    });
});