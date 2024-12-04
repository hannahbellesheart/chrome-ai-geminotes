import { ComponentPropsWithRef, useState } from 'react';
import styled from 'styled-components';

interface GeminoteTagsInputProps extends ComponentPropsWithRef<'input'> {
    onCreate: (value: string) => void;
}

const StyledInput = styled.input`
    display: block;
    width: 100%;
    background: transparent;
    color: ${({ theme }) => theme.palette.text};
    outline: none;
    padding: ${({ theme }) => `${theme.spacing(0.4)} ${theme.spacing(0.3)}`};

    &:focus {
        outline: 1px solid ${({ theme }) => theme.palette.secondary};
    }
`;

const GeminoteTagsInput = ({ onCreate, ...props }: GeminoteTagsInputProps) => {
    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleBlur = () => {
        if (text) {
            onCreate(text.trim().toLowerCase());
            setText('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            handleBlur();
        }
    };

    return (
        <StyledInput
            type="text"
            placeholder="Add a tag"
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            {...props}
        />
    );
};
export default GeminoteTagsInput;
