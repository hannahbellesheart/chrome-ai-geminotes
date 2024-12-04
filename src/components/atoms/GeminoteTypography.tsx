import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

export interface GeminoteTypographyProps extends ComponentPropsWithRef<'p'> {
    variant?: 'h1' | 'h2' | 'body1' | 'body2' | 'caption' | 'button';
    color?:
        | 'primary'
        | 'secondary'
        | 'info'
        | 'text'
        | 'error'
        | 'success'
        | 'warning';
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    className?: string;
    component?: keyof JSX.IntrinsicElements; // Use `component` to specify the tag
}
// This component is used to apply typography styles to any HTML element or React component
const StyledTypography = styled.span<GeminoteTypographyProps>`
    color: ${({ theme, color = 'text' }) => theme.palette[color]};
    text-align: ${({ align = 'inherit' }) => align};

    ${({ theme, variant = 'body1' }) =>
        theme.applyTypography(theme.typography[variant])}
`;

const GeminoteTypography: React.FC<GeminoteTypographyProps> = ({
    variant = 'body1',
    component,
    className,
    ...props
}) => {
    // Determine the component to render
    const variantComponent = variant && variant.startsWith('h') ? variant : 'p';
    const Component = component || variantComponent || 'span';

    return (
        <StyledTypography
            as={Component}
            variant={variant}
            className={className}
            {...props}
        >
            {props.children}
        </StyledTypography>
    );
};

export default GeminoteTypography;
