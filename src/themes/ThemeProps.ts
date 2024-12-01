import { CSSProp } from 'styled-components';

export interface TypographyStyleProps {
    fontFamily: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: number;
}

export interface ThemeProps {
    palette: {
        primary: string;
        secondary: string;
        success: string;
        error: string;
        warning: string;
        info: string;
        text: string;
        background: string;
        white: string;
    };
    typography: {
        h1: TypographyStyleProps;
        h2: TypographyStyleProps;
        body1: TypographyStyleProps;
        body2: TypographyStyleProps;
        caption: TypographyStyleProps;
        button: TypographyStyleProps;
    };
    cursor: {
        default: string;
        pointer: string;
    };
    animation: {
        timing: {
            fast: string;
            normal: string;
            slow: string;
        };
        timingFunction: {
            ease: string;
            easeInOut: string;
            easeOut: string;
            linear: string;
            easeIn: string;
        };
    };
    border: {
        radius: string;
        width: string;
    };
    applyTypography: (typography: TypographyStyleProps) => CSSProp;
    spacing: (multiplier: number) => string;
}
