import { useState } from 'react';
import styled from 'styled-components';

import GeminoteTypography, {
    GeminoteTypographyProps,
} from '@geminotes/atoms/GeminoteTypography';

interface GeminoteEditableTypographyProps extends GeminoteTypographyProps {
    name: string;
    index?: number | string;
    children?: string;
    onEdit?: (newValue: string) => void;
}

const StyledInput = styled.input<GeminoteTypographyProps>`
    display: block;
    width: 100%;
    background: transparent;

    ${({ theme, variant = 'body1' }) =>
        theme.applyTypography(theme.typography[variant])}

    color: ${({ theme, color = 'text' }) => theme.palette[color]};
    outline: 1px solid ${({ theme }) => theme.palette.info};
    padding: ${({ theme }) => `${theme.spacing(0.4)} ${theme.spacing(0.3)}`};
`;

const GeminoteEditableTypography = ({
    children,
    color,
    variant,
    name,
    index,
    onEdit,
    ...props
}: GeminoteEditableTypographyProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(children || 'Start typing...');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleBlur = () => {
        if (text) {
            onEdit && onEdit(text);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            handleBlur();
        }
    };

    const handleEdition = () => {
        setIsEditing(true);
    };

    if (!isEditing) {
        return (
            <GeminoteTypography
                variant={variant}
                onClick={handleEdition}
                color={color}
                {...props}
            >
                {text}
            </GeminoteTypography>
        );
    } else {
        const composedName = index ? `${name}-${index}` : name;
        return (
            <>
                <label htmlFor={composedName} hidden>
                    {name}
                </label>
                <StyledInput
                    autoFocus
                    color={color}
                    aria-labelledby={composedName}
                    variant={variant}
                    name={composedName}
                    title={composedName}
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    type="text"
                />
            </>
        );
    }
};

export default GeminoteEditableTypography;
