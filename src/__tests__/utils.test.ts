import { calculate, clamp, getProperties } from '../utils';

const defaultOptions = {
    minWidth: 375,
    maxWidth: 1440,
    baseFontSize: 16,
};

describe('calculate', () => {
    it('parses a min-max range into rem-based sizes', () => {
        const result = calculate('16-32', defaultOptions);

        expect(result).toEqual({
            min: 1,
            max: 2,
            slope: expect.any(Number),
            intercept: expect.any(Number),
        });
    });

    it('returns null for invalid input', () => {
        expect(calculate('invalid', defaultOptions)).toBeNull();
    });
});

describe('getProperties', () => {
    it('returns a single CSS property', () => {
        const sizes = { min: 1, max: 2, slope: 0.1, intercept: 0.5 };

        expect(getProperties('font-size', sizes)).toEqual({
            'font-size': 'clamp(1rem, calc(10vw + 0.5rem), 2rem)',
        });
    });

    it('returns multiple CSS properties for an array', () => {
        const sizes = { min: 1, max: 2, slope: 0.1, intercept: 0.5 };

        expect(getProperties(['width', 'height'], sizes)).toEqual({
            width: 'clamp(1rem, calc(10vw + 0.5rem), 2rem)',
            height: 'clamp(1rem, calc(10vw + 0.5rem), 2rem)',
        });
    });
});

describe('clamp', () => {
    it('generates clamp CSS for a valid value and property', () => {
        expect(clamp('16-32', 'font-size', defaultOptions)).toEqual({
            'font-size': expect.stringMatching(/^clamp\(/),
        });
    });

    it('returns an empty object for invalid input', () => {
        expect(clamp('invalid', 'font-size', defaultOptions)).toEqual({});
    });
});
