import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

interface GeminoteButtonProps extends ComponentPropsWithRef<'button'> {
    color?: 'primary' | 'secondary' | 'info' | 'text';
    variant?: 'text' | 'outlined';
    href?: string;
}

const StyledButton = styled.button<{
    color?: 'primary' | 'secondary' | 'info' | 'text';
    variant?: 'text' | 'outlined';
}>`
    display: inline-block;
    padding: ${({ theme, variant = 'outlined' }) =>
        variant === 'text' ? '' : `${theme.spacing(1)} ${theme.spacing(2)}`};
    border: ${({ theme }) => theme.border.width} solid transparent;
    border-radius: ${({ theme }) => theme.border.radius};
    background-color: transparent;
    text-decoration: none;
    cursor: ${({ theme }) => theme.cursor.pointer};
    transition: background-color
        ${({ theme }) =>
            `${theme.animation.timing.normal} ${theme.animation.timingFunction.ease}`};

    ${({ theme }) => theme.applyTypography(theme.typography.button)}

    color: ${({ theme, color = 'primary' }) => theme.palette[color]};
    border-color: ${({ theme, color = 'primary', variant = 'outlined' }) =>
        variant === 'text' ? 'transparent' : theme.palette[color]};

    &:hover {
        ${({ variant, theme, color = 'primary' }) =>
            variant !== 'text' &&
            `
                background-color: ${theme.palette[color]};
                color: ${theme.palette.white};
            `}
    }
`;

const GeminoteButton = ({
    color = 'primary',
    variant = 'outlined',
    href,
    ...props
}: GeminoteButtonProps) => {
    const externalLink =
        href && (href?.startsWith('http') || href?.startsWith('mailto'));
    return (
        <StyledButton
            as={href ? 'a' : 'button'}
            target={externalLink ? '_blank' : undefined}
            color={color}
            variant={variant}
            href={href}
            type="button"
            {...props}
        />
    );
};

export default GeminoteButton;
