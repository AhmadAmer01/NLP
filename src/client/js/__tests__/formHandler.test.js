/**
 * @jest-environment jsdom
 */

import { handleSubmit } from '../formHandler';

describe('handleSubmit function', () => {
    beforeAll(() => {
        console.log('Setting up real server for testing...');
    });

    beforeEach(() => {
       
        document.body.innerHTML = `
            <form id="urlForm">
                <input type="text" id="name" value="https://example.com" />
                <button type="submit">Submit</button>
            </form>
            <div id="results"></div>
        `;

        const form = document.getElementById('urlForm');
        form.addEventListener('submit', handleSubmit);
    });

    test('should make an API call with valid input', async () => {
        // Arrange
        const event = { preventDefault: jest.fn() };
        const validUrl = 'https://valid-url.com';
        document.getElementById('name').value = validUrl;

 
        await handleSubmit(event);

    
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:8000/api', 
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ url: validUrl }),
                headers: { 'Content-Type': 'application/json' },
            })
        );
    });

    test('should alert for invalid URL', async () => {
        
        const event = { preventDefault: jest.fn() };
        const invalidUrl = 'invalid-url';
        document.getElementById('name').value = invalidUrl;

        await handleSubmit(event);

        
        expect(global.alert).toHaveBeenCalledWith('Please enter a valid URL.');
    });

    test('should handle errors gracefully when fetching data', async () => {
   
        const errorMessage = 'Network error';
        global.fetch.mockRejectedValueOnce(new Error(errorMessage));

        const event = { preventDefault: jest.fn() };
        const validUrl = 'https://valid-url.com';
        document.getElementById('name').value = validUrl;

     
        await handleSubmit(event);

        
        expect(global.alert).toHaveBeenCalledWith('An error occurred while processing your request.');
    });

    afterAll(() => {
        console.log('Cleaning up after tests...');
    });
});
