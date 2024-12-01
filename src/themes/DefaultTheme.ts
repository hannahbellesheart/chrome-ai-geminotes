import { ThemeProps } from '@geminotes/themes/ThemeProps';
import applyTypography from '@geminotes/themes/applyTypography';
import spacing from '@geminotes/themes/spacing';
import { CURSOR_DEFAULT, CURSOR_POINTER } from '@geminotes/images';

const palette = {
    primary: '#0078d7',
    secondary: '#6a0dad',
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#666666',
    text: '#333333',
    background: '#f9f9f9',
    white: '#ffffff',
};

// typography props definition with typescript

const typography = {
    h1: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        lineHeight: 1.2,
        fontSize: 'clamp(1.5rem, 5vmin, 2rem)',
    },
    h2: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        lineHeight: 1.2,
        fontSize: 'clamp(1.25rem, 4vmin, 1.5rem)',
    },
    body1: {
        fontFamily: "'Poppins', sans-serif",
        fontSize: 'clamp(0.875rem, 2.5vmin, 1rem)',
        lineHeight: 1.4,
        fontWeight: 400,
    },
    body2: {
        fontFamily: "'Poppins', sans-serif",
        fontSize: 'clamp(0.75rem, 2vmin, 0.875rem)',
        fontWeight: 400,
        lineHeight: 1.6,
    },
    caption: {
        fontFamily: "'Poppins', sans-serif",
        fontSize: 'clamp(1rem, 2.2vmin, 1.25rem)',
        lineHeight: 1.4,
        fontWeight: 400,
    },
    button: {
        fontFamily: "'Poppins', sans-serif",
        fontSize: 'clamp(0.875rem, 2.5vmin, 1rem)',
        lineHeight: 1,
        fontWeight: 700,
    },
};

const cursor = {
    default: `url(${CURSOR_DEFAULT.src}), default`,
    pointer: `url(${CURSOR_POINTER.src}), pointer`,
};

const animation = {
    timing: {
        fast: '0.1s',
        normal: '0.3s',
        slow: '0.5s',
    },
    timingFunction: {
        ease: 'ease',
        easeInOut: 'ease-in-out',
        easeOut: 'ease-out',
        linear: 'linear',
        easeIn: 'ease-in',
    },
};

const border = {
    radius: '12px',
    width: '2px',
};

const theme: ThemeProps = {
    palette,
    typography,
    cursor,
    animation,
    border,
    applyTypography,
    spacing,
};

export default theme;
