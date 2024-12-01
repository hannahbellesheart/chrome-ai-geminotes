import { ComponentPropsWithRef, useRef } from 'react';
import styled from 'styled-components';

import GeminoteTooltip from '@geminotes/atoms/GeminoteTooltip';
import GeminoteEditableTypography from '@geminotes/molecules/GeminoteEditableTypography';

interface GeminoteTagProps extends ComponentPropsWithRef<'div'> {
    children?: string;
    color?: 'primary' | 'secondary' | 'info' | 'text';
    onEdit?: (newValue: string) => void;
    onDelete?: () => void;
}

const StyledWrapper = styled.div<{
    color?: 'primary' | 'secondary' | 'info' | 'text';
}>`
    display: inline-block;
    padding: ${({ theme }) => `${theme.spacing(0.25)} ${theme.spacing(0.5)}`};
    border-radius: ${({ theme }) => theme.border.radius};
    background-color: ${({ theme }) => theme.palette.background};
    color: ${({ theme, color = 'secondary' }) => theme.palette[color]};
`;

const StyledTagText = styled(GeminoteEditableTypography)`
    display: inline-block;
    user-select: none;

    ${({ theme }) => theme.applyTypography(theme.typography.body1)}

    &::before {
        content: '#';
    }
`;

const StyledTagRemoval = styled.button`
    background: none;
    border: none;
    margin-left: ${({ theme }) => theme.spacing(0.5)};
    cursor: ${({ theme }) => theme.cursor.pointer};

    ${({ theme }) => theme.applyTypography(theme.typography.body1)}
`;

const GeminoteEditableTag = ({
    color = 'secondary',
    children,
    onEdit,
    onDelete,
    ...props
}: GeminoteTagProps) => {
    const tagRef = useRef<HTMLDivElement>(null);

    const handleTagRemoval = () => {
        if (tagRef.current) {
            onDelete && onDelete();
        }
    };

    return (
        <StyledWrapper color={color} {...props} ref={tagRef}>
            <StyledTagText name="tag" color={color} onEdit={onEdit}>
                {children}
            </StyledTagText>
            <GeminoteTooltip title="Delete" style={{ display: 'inline' }}>
                <StyledTagRemoval onClick={handleTagRemoval}>
                    x
                </StyledTagRemoval>
            </GeminoteTooltip>
        </StyledWrapper>
    );
};

export default GeminoteEditableTag;
