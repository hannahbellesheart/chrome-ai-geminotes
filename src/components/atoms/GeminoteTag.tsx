import styled from 'styled-components';

const GeminoteTag = styled.span<{
    color?: 'primary' | 'secondary' | 'info' | 'text';
}>`
    display: inline-block;
    padding: ${({ theme }) => `${theme.spacing(0.25)} ${theme.spacing(0.5)}`};
    border-radius: ${({ theme }) => theme.border.radius};
    background-color: ${({ theme }) => theme.palette.background};
    color: ${({ theme, color = 'secondary' }) => theme.palette[color]};

    ${({ theme }) => theme.applyTypography(theme.typography.body1)}

    &::before {
        content: '#';
    }
`;

export default GeminoteTag;
