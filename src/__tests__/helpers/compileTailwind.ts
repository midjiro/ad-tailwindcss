import tailwindcss from '@tailwindcss/postcss';
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';

import { mockHtml } from './mockHtml';

const fixturesDir = path.join(__dirname, '../fixtures');
const pluginPath = path.join(__dirname, '../../index.ts');

export async function compileClasses(classes: string[]): Promise<string> {
    const id = `${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const htmlPath = path.join(fixturesDir, `template-${id}.html`);
    const cssEntryPath = path.join(fixturesDir, `tailwind-${id}.css`);

    fs.writeFileSync(htmlPath, mockHtml(classes), 'utf8');
    fs.writeFileSync(
        cssEntryPath,
        `@import 'tailwindcss' source(none);
@plugin '${pluginPath.replace(/\\/g, '/')}';
@source '${htmlPath.replace(/\\/g, '/')}';
`,
        'utf8',
    );

    try {
        const css = fs.readFileSync(cssEntryPath, 'utf8');
        const result = await postcss([tailwindcss()]).process(css, {
            from: cssEntryPath,
        });

        return result.css;
    } finally {
        fs.rmSync(htmlPath, { force: true });
        fs.rmSync(cssEntryPath, { force: true });
    }
}

export function cssHasAdUtilityRule(
    css: string,
    utilityClass: string,
): boolean {
    const selector = `.${utilityClass.replace(/\[/g, '\\[').replace(/\]/g, '\\]')}`;
    return css.includes(`${selector} {`) || css.includes(`${selector}{`);
}

export function cssContainsClampForProperty(
    css: string,
    property: string,
): boolean {
    const rulePattern = new RegExp(`${property}\\s*:\\s*clamp\\([^)]+\\)`, 'i');

    return rulePattern.test(css);
}

export function cssContainsClamp(css: string): boolean {
    return /clamp\([^)]+\)/.test(css);
}
