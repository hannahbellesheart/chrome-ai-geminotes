import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

import GeminotePaper from '@geminotes/atoms/GeminotePaper';
import GeminoteTypography from '@geminotes/atoms/GeminoteTypography';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import GeminoteTag from '@geminotes/atoms/GeminoteTag';
import { GeminoteProps } from '@geminotes/props';
import getFormattedDate from '@geminotes/utils/getFormattedDate';

interface GeminoteCardProps
    extends ComponentPropsWithRef<'div'>,
        Omit<GeminoteProps, 'createdAt' | 'content'> {
    id: string;
    title: string;
    onDelete: (noteId: string) => void;
}

const StyledCardWrapper = styled(GeminotePaper)`
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const StyledCardHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

const StyledCardContent = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StyledCardFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const StyledTagsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(0.5)};
`;

const GeminoteCard = ({
    id,
    title,
    tags,
    updatedAt,
    onDelete,
    ...props
}: GeminoteCardProps) => {
    const handleDeletion = () => {
        onDelete(id);
    };

    return (
        <StyledCardWrapper {...props}>
            <StyledCardHeader>
                <GeminoteTypography variant="h2">{title}</GeminoteTypography>
                <GeminoteButton variant="text" onClick={handleDeletion}>
                    Delete
                </GeminoteButton>
            </StyledCardHeader>
            <StyledCardContent>
                <StyledTagsWrapper>
                    {tags?.map((tag) => (
                        <GeminoteTag key={tag}>{tag}</GeminoteTag>
                    ))}
                </StyledTagsWrapper>
            </StyledCardContent>
            <StyledCardFooter>
                <GeminoteTypography color="info">
                    Updated at {getFormattedDate(updatedAt) || 'unknown date'}
                </GeminoteTypography>
            </StyledCardFooter>
        </StyledCardWrapper>
    );
};

export default GeminoteCard;
