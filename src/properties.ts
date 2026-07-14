import { Property } from "./types";


export const PROPERTIES: Property = {
    text: 'font-size',
    leading: 'line-height',
    tracking: 'letter-spacing',

    m: 'margin',
    mt: 'margin-top',
    mr: 'margin-right',
    mb: 'margin-bottom',
    ml: 'margin-left',
    mx: 'margin-inline',
    my: 'margin-block',

    p: 'padding',
    pt: 'padding-top',
    pr: 'padding-right',
    pb: 'padding-bottom',
    pl: 'padding-left',
    px: 'padding-inline',
    py: 'padding-block',

    gap: 'gap',
    'gap-x': 'column-gap',
    'gap-y': 'row-gap',

    w: 'width',
    minw: 'min-width',
    maxw: 'max-width',

    h: 'height',
    minh: 'min-height',
    maxh: 'max-height',

    rounded: 'border-radius',
    border: 'border-width',

    top: 'top',
    right: 'right',
    bottom: 'bottom',
    left: 'left',
    inset: 'inset',

    size: ['width', 'height'],
};

export const AVAILABLE_SIZES =  {
                        '[14-16]': '[14-16]',
                        '[16-24]': '[16-24]',
                        '[24-32]': '[24-32]',
                        '[32-48]': '[32-48]',
                        '[48-64]': '[48-64]',
                        '[16-32]': '[16-32]',
                        '[24-48]': '[24-48]',
                        '[32-64]': '[32-64]',
                        '[48-96]': '[48-96]',
                        '[64-128]': '[64-128]',
                    };