import { checkForName } from '../nameChecker';

global.alert = jest.fn();
describe('Testing checkForName function', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    test('checkForName is defined', () => {
        expect(checkForName).toBeDefined();
    });

    test('Displays "Welcome, Captain!" for a valid captain name', () => {
        checkForName('Picard');
        expect(global.alert).toHaveBeenCalledWith('Welcome, Captain!');
    });

    test('Displays "Enter a valid captain name" for an invalid name', () => {
        checkForName('Unknown');
        expect(global.alert).toHaveBeenCalledWith('Enter a valid captain name');
    });

    test('Displays "Enter a valid captain name" for an empty input', () => {
        checkForName('');
        expect(global.alert).toHaveBeenCalledWith('Enter a valid captain name');
    });

    test('Does not call alert for null or undefined input', () => {
        checkForName(null);
        checkForName(undefined);
        expect(global.alert).toHaveBeenCalledTimes(2);
        expect(global.alert).toHaveBeenCalledWith('Enter a valid captain name');
    });
});
