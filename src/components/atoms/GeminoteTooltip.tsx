import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

interface GeminoteTooltipProps extends ComponentPropsWithRef<'div'> {
    title: string;
    position?: 'top' | 'bottom';
}

const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const TooltipText = styled.div<{ position: 'top' | 'bottom' }>`
    visibility: hidden;
    position: absolute;
    ${({ position }) =>
        position === 'bottom'
            ? 'top: 125%'
            : 'bottom: 125%'}; // Ajusta la posición según la prop
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.palette.text};
    color: ${({ theme }) => theme.palette.white};
    text-align: center;
    padding: ${({ theme }) => theme.spacing(1)};
    z-index: 1;

    ${({ theme }) => theme.applyTypography(theme.typography.body2)}
`;

const TooltipWrapper = styled.div`
    &:hover ${TooltipText} {
        visibility: visible;
    }
`;

const GeminoteTooltip: React.FC<GeminoteTooltipProps> = ({
    title,
    children,
    position = 'top',
    ...props
}) => {
    return (
        <TooltipWrapper {...props}>
            <TooltipContainer>
                {children}{' '}
                <TooltipText position={position}>{title}</TooltipText>
            </TooltipContainer>
        </TooltipWrapper>
    );
};

export default GeminoteTooltip;
