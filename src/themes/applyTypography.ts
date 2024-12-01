import { css, CSSProp } from 'styled-components';
import { TypographyStyleProps } from './ThemeProps';

const applyTypography = (typography: TypographyStyleProps): CSSProp => css`
    font-family: ${typography.fontFamily};
    font-weight: ${typography.fontWeight};
    font-size: ${typography.fontSize};
    line-height: ${typography.lineHeight};
`;

export default applyTypography;
