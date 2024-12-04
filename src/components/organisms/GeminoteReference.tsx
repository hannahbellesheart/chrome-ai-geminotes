import { useState, useEffect } from 'react';
import styled from 'styled-components';

import GeminoteTypography from '@geminotes/atoms/GeminoteTypography';

export interface GeminoteReferenceProps {
    url: string;
    onDelete: (url: string) => void;
    onClick?: () => void;
    className?: string;
}

const StyledReferenceCard = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
    padding: ${({ theme }) => theme.spacing(2)};
    border: 2px solid ${({ theme }) => theme.palette.secondary};
    border-radius: ${({ theme }) => theme.border.radius};
    background-color: ${({ theme }) => theme.palette.background};
    cursor: ${({ theme }) => theme.cursor.pointer};
    transition: background-color ${({ theme }) => theme.animation.timing.normal}
            ${({ theme }) => theme.animation.timingFunction.ease},
        transform ${({ theme }) => theme.animation.timing.normal}
            ${({ theme }) => theme.animation.timingFunction.ease};

    &:hover {
        background-color: ${({ theme }) => theme.palette.secondary};
        color: ${({ theme }) => theme.palette.white};
        transform: scale(1.02);
    }
`;

const StyledImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    background-color: ${({ theme }) => theme.palette.white};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledActions = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

const StyledDeleteButton = styled.button`
    background: none;
    border: none;
    color: ${({ theme }) => theme.palette.error};
    cursor: ${({ theme }) => theme.cursor.pointer};
    font-size: ${({ theme }) => theme.typography.button.fontSize};
    font-weight: ${({ theme }) => theme.typography.button.fontWeight};
    transition: color ${({ theme }) => theme.animation.timing.normal}
        ${({ theme }) => theme.animation.timingFunction.ease};

    &:hover {
        color: ${({ theme }) => theme.palette.warning};
    }
`;

const GeminoteReference = ({
    url,
    onDelete,
    onClick,
    className,
}: GeminoteReferenceProps) => {
    const [referenceTitle, setReferenceTitle] = useState(url);

    const handleDeletion = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(url);
    };

    useEffect(() => {
        const retrieveTitle = async () => {
            try {
                const response = await fetch(url);
                const text = await response.text();
                const titleMatch = text.match(/<title>(.*?)<\/title>/);
                if (titleMatch) setReferenceTitle(titleMatch[1]);
            } catch (error) {
                console.error(error);
            }
        };

        retrieveTitle();
    }, [url]);

    return (
        <StyledReferenceCard onClick={onClick} className={className}>
            <StyledImage
                src={`https://www.google.com/s2/favicons?domain=${
                    new URL(url).hostname
                }`}
                alt="Favicon"
            />
            <GeminoteTypography variant="body1">
                {referenceTitle}
            </GeminoteTypography>
            <StyledActions>
                <StyledDeleteButton onClick={handleDeletion}>
                    Delete
                </StyledDeleteButton>
            </StyledActions>
        </StyledReferenceCard>
    );
};

export default GeminoteReference;
