import { Sizes, TwOptions } from './types';

export const getProperties = (prop: string | string[], sizes: Sizes) => {
    const { min, max, slope, intercept } = sizes;

    const clamp = `clamp(${min}rem, calc(${slope * 100}vw + ${intercept}rem), ${max}rem)`;

    if (!Array.isArray(prop)) return { [prop]: clamp };

    return Object.fromEntries(prop.map((p) => [p, clamp]));
};

export const calculate = (value: string, options: TwOptions) => {
    /* matches two numbers separated by a hyphen, where each number may be:
        - positive or negative
        - an integer or decimal
    */
    const parts = value.match(/^(-?\d+(?:\.\d+)?)-(-?\d+(?:\.\d+)?)$/);

    if (!parts) return null;

    const [min, max] = [
        +parts[1] / options.baseFontSize,
        +parts[2] / options.baseFontSize,
    ];

    if (isNaN(min) || isNaN(max)) return null;

    const minWidthRem = options.minWidth / options.baseFontSize;
    const maxWidthRem = options.maxWidth / options.baseFontSize;

    const slope = (max - min) / (maxWidthRem - minWidthRem);
    const intercept = min - slope * minWidthRem;

    return { min, max, slope, intercept };
};

export const clamp = (
    value: string,
    prop: string | string[],
    options: TwOptions,
) => {
    const sizes = calculate(value, options);

    if (!sizes) return {};

    const properties = getProperties(prop, sizes);
    return properties;
};
