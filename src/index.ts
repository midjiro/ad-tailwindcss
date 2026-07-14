import plugin from 'tailwindcss/plugin';

import { AVAILABLE_SIZES, PROPERTIES } from '../src/properties';
import { TwOptions } from '../src/types';
import { clamp } from '../src/utils';

/**
 * Tailwind plugin that automatically generates adaptive (fluid) CSS properties
 * using the `clamp()` function.
 *
 * Example usage in HTML:
 *   <div class="ad-text-[16-32] ad-px-[20-60] ad-gap-[10-40]">
 *     ...
 *   </div>
 *
 * Example usage negative values:
 *   <div class="absolute ad-left-[-100-10] ad-top-[-100--10]">...</div>
 *
 * Options (with defaults):
 *   minWidth: 375  — smallest viewport in px
 *   maxWidth: 1440 — largest viewport in px
 *   baseFontSize: 16 — root font size for rem calculations
 */

const TailwindClamp: ReturnType<typeof plugin.withOptions<Partial<TwOptions>>> =
    plugin.withOptions((options: Partial<TwOptions> = {}) => {
        const { minWidth = 375, maxWidth = 1440, baseFontSize = 16 } = options;

        return function ({ matchUtilities }) {
            const clamped = Object.entries(PROPERTIES).map(([short, prop]) => [
                `ad-${short}`,
                (value: string) =>
                    clamp(value, prop, {
                        minWidth,
                        maxWidth,
                        baseFontSize,
                    }),
            ]);

            matchUtilities(Object.fromEntries(clamped), {
                type: 'any',
                values: AVAILABLE_SIZES,
            });
        };
    });

export default TailwindClamp;
