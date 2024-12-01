import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

interface GeminoteTooltipProps extends ComponentPropsWithRef<'div'> {
    title: string;
}

const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const TooltipText = styled.div`
    visibility: hidden;
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.palette.text};
    color: ${({ theme }) => theme.palette.white};
    text-align: center;
    padding: ${({ theme }) => theme.spacing(1)};
    z-index: 1;

    ${({ theme }) => theme.applyTypography(theme.typography.body2)}

    &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: ${({ theme }) => theme.palette.text} transparent
            transparent transparent;
    }
`;

const TooltipWrapper = styled.div`
    &:hover ${TooltipText} {
        visibility: visible;
    }
`;

const GeminoteTooltip: React.FC<GeminoteTooltipProps> = ({
    title,
    children,
    ...props
}) => {
    return (
        <TooltipWrapper {...props}>
            <TooltipContainer>
                {children} <TooltipText>{title}</TooltipText>
            </TooltipContainer>
        </TooltipWrapper>
    );
};

export default GeminoteTooltip;
