import { AVAILABLE_SIZES, PROPERTIES } from '../properties';
import {
    compileClasses,
    cssContainsClamp,
    cssContainsClampForProperty,
    cssHasAdUtilityRule,
} from './helpers/compileTailwind';


describe('TailwindClamp plugin integration', () => {
    describe('existing properties', () => {
        it.each(Object.keys(PROPERTIES))(
            'generates clamp CSS for ad-%s',
            async (short) => {
                const className = `ad-${short}-[16-32]`;
                const css = await compileClasses([className]);
                const expected = PROPERTIES[short];
                const properties = Array.isArray(expected)
                    ? expected
                    : [expected];

                expect(cssHasAdUtilityRule(css, className)).toBe(true);

                for (const property of properties) {
                    expect(cssContainsClampForProperty(css, property)).toBe(
                        true,
                    );
                }
            },
        );
    });

    describe('misspelled properties', () => {
        const misspelled = [
            'ad-txt-[16-32]',
            'ad-padding-[16-32]',
            'ad-gapp-[16-32]',
        ];

        it.each(misspelled)(
            'does not generate CSS for misspelled class %s',
            async (className) => {
                const css = await compileClasses([className]);

                expect(cssHasAdUtilityRule(css, className)).toBe(false);
            },
        );
    });

    describe('allowed values', () => {
        describe('listed presets', () => {
            it.each(Object.keys(AVAILABLE_SIZES))(
                'accepts preset size %s',
                async (size) => {
                    const className = `ad-text-${size}`;
                    const css = await compileClasses([className]);

                    expect(cssHasAdUtilityRule(css, className)).toBe(true);
                    expect(cssContainsClampForProperty(css, 'font-size')).toBe(
                        true,
                    );
                },
            );
        });

        describe('custom min-max ranges', () => {
            const custom = [
                'ad-text-[20-40]',
                'ad-w-[17-33]',
                'ad-left-[-100-10]',
            ];

            it.each(custom)(
                'accepts custom range class %s',
                async (className) => {
                    const css = await compileClasses([className]);

                    expect(cssHasAdUtilityRule(css, className)).toBe(true);
                    expect(cssContainsClamp(css)).toBe(true);
                },
            );
        });
    });

    describe('invalid values', () => {
        const invalid = [
            'ad-text-[abcd]',
            'ad-text-abcd',
            'ad-text-[invalid]',
            'ad-text-foo',
            'ad-text-[16]',
            'ad-text-[16-32-48]',
            'ad-text-[]',
        ];

        it.each(invalid)(
            'does not generate CSS for invalid class %s',
            async (className) => {
                const css = await compileClasses([className]);

                expect(cssHasAdUtilityRule(css, className)).toBe(false);
            },
        );
    });
});
