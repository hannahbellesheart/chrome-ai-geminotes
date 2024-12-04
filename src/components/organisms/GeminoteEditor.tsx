import styled from 'styled-components';
import { useState, useEffect } from 'react';

import GeminoteTypography from '@geminotes/atoms/GeminoteTypography';
import GeminoteEditableTypography from '@geminotes/molecules/GeminoteEditableTypography';
import GeminoteEditableTag from '@geminotes/molecules/GeminoteEditableTag';
import GeminoteTagsInput from '@geminotes/molecules/GeminoteTagsInput';
import GeminotePaper from '@geminotes/atoms/GeminotePaper';
import getFormattedDate from '@geminotes/utils/getFormattedDate';
import GeminoteEditorNavbar from '@geminotes/molecules/GeminoteEditorNavbar';
import GeminoteReference from './GeminoteReference';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import useApi from '@geminotes/stores/useApi';
import { GeminoteProps } from '@geminotes/props';
import { SOURCE_REFERENCE } from '@geminotes/utils/validation';

import useGeminotes from '@geminotes/stores/useGeminotes';

interface GeminoteEditorProps extends Omit<GeminoteProps, 'createdAt'> {
    onOpenMenu?: () => void;
    onAddNote?: () => void;
}

interface EditableContentProps {
    id: `${string}-${string}-${string}-${string}-${string}`;
    text: string;
}

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(4)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledEditorHeader = styled.div`
    padding: 0 ${({ theme }) => theme.spacing(4)};
`;

const StyledEditorContent = styled(GeminotePaper)`
    & p:not(:last-child)) {
        margin-bottom: ${({ theme }) => theme.spacing(1)};
    }
`;

const StyledEditorFooter = styled.div`
    padding: 0 ${({ theme }) => theme.spacing(4)};
`;

const StyledTagsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(1)};
    margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StyledButtonsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(1)};
    margin-top: ${({ theme }) => theme.spacing(3)};
`;

const destructuredContent = (content: string[] | undefined) => {
    if (
        !content ||
        content.length === 0 ||
        (content.length === 1 && content[0] === '')
    ) {
        return undefined;
    }
    const newContent: EditableContentProps[] = [];

    content.forEach((text) => {
        const match = text.match(SOURCE_REFERENCE);
        if (match) {
            const [fullMatch] = match;
            newContent.push({
                id: crypto.randomUUID(),
                text: text.replace(fullMatch, '').trim(),
            });
            newContent.push({
                id: crypto.randomUUID(),
                text: fullMatch.trim(),
            });
        } else newContent.push({ id: crypto.randomUUID(), text: text.trim() });
    });

    return newContent;
};

const GeminoteEditor = ({
    id,
    title,
    tags,
    sources,
    content,
    updatedAt,
    onOpenMenu,
    onAddNote,
}: GeminoteEditorProps) => {
    const [editableTitle, setEditableTitle] = useState<string>(
        title || 'Untitled'
    );
    const [editableContent, setEditableContent] = useState<
        EditableContentProps[]
    >(
        destructuredContent(content) || [
            { id: crypto.randomUUID(), text: 'Start typing...' },
        ]
    );

    useEffect(() => {
        if (editableContent.length === 0) {
            setEditableContent([
                { id: crypto.randomUUID(), text: 'Start typing...' },
            ]);
        }
    }, [editableContent]);

    const [editableTags, setEditableTags] = useState<string[]>(tags || []);
    const [editableSources, setEditableSources] = useState<
        Record<string, unknown>
    >(sources || {});

    const { editNote } = useGeminotes();

    const { summarize, summary, extractKeyPoints, keyPoints } = useApi();

    const handleTitleChange = (newTitle: string) => {
        setEditableTitle(newTitle);
    };

    const handleTitleEdit = (newTitle: string) => {
        handleTitleChange(newTitle);
    };

    const handleContentEdit = (index: number, newText: string) => {
        const updatedContent = [...editableContent];
        updatedContent[index] = { ...updatedContent[index], text: newText };
        setEditableContent(updatedContent);
    };

    const handleTagAddition = (newTag: string) => {
        const hasTag = editableTags.includes(newTag);
        if (hasTag) return;
        setEditableTags([...editableTags, newTag]);
    };

    const handleTagDeletion = (index: number) => {
        const updatedTags = [...editableTags];
        updatedTags.splice(index, 1);
        setEditableTags(updatedTags);
    };

    const handleTagEdit = (index: number, newTag: string) => {
        const updatedTags = [...editableTags];
        updatedTags[index] = newTag;
        setEditableTags(updatedTags);
    };

    const handleOpenMenu = () => {
        if (onOpenMenu) {
            onOpenMenu();
        }
    };

    const handleSave = () => {
        editNote(id, {
            title: editableTitle,
            content: editableContent.map((line) => line.text),
            tags: editableTags,
        });
    };

    const handleAddNote = () => {
        if (onAddNote) {
            onAddNote();
        }
    };

    const UnwrapComponents = (content: EditableContentProps[]) => {
        if (!content) return null;
        return content.map((line, index) =>
            line.text.match(SOURCE_REFERENCE) ? (
                <GeminoteReference
                    key={
                        Object.entries(editableSources).find(
                            ([_, value]) =>
                                value ===
                                parseInt(
                                    line.text.match(SOURCE_REFERENCE)?.[1] ??
                                        '0',
                                    10
                                )
                        )?.[0]
                    }
                    url={
                        Object.entries(editableSources).find(
                            ([_, value]) =>
                                value ===
                                parseInt(
                                    line.text.match(SOURCE_REFERENCE)?.[1] ??
                                        '0',
                                    10
                                )
                        )?.[0]
                    }
                    onDelete={handleReferenceDeletion}
                />
            ) : (
                <GeminoteEditableTypography
                    name="note-content"
                    key={line.id}
                    index={index}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    onEdit={(newText) => handleContentEdit(index, newText)}
                >
                    {line.text}
                </GeminoteEditableTypography>
            )
        );
    };

    // Detect if 'enter' is pressed, if it is, it adds a new paragraph to editableContent when required
    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (event.key === 'Enter' && event.currentTarget.value !== '') {
            event.preventDefault();
            const updatedContent = [...editableContent];
            updatedContent.splice(index + 1, 0, {
                id: crypto.randomUUID(),
                text: '',
            });
            setEditableContent(updatedContent);
        }
    };

    const handleReferenceDeletion = (url: string) => {
        const updatedSources = { ...editableSources };
        delete updatedSources[url];
        setEditableSources(updatedSources);
    };

    return (
        <StyledWrapper>
            <GeminoteEditorNavbar
                onSaveNote={handleSave}
                onOpenMenu={handleOpenMenu}
                onAddNote={handleAddNote}
            />
            <StyledEditorHeader>
                <GeminoteEditableTypography
                    name="note-title"
                    variant="h1"
                    style={{ marginBottom: '0.5rem ' }}
                    onEdit={handleTitleEdit}
                >
                    {editableTitle}
                </GeminoteEditableTypography>
                <StyledTagsWrapper>
                    {editableTags?.map((tag, index) => (
                        <GeminoteEditableTag
                            key={tag}
                            onEdit={(newTag) => handleTagEdit(index, newTag)}
                            onDelete={() => handleTagDeletion(index)}
                        >
                            {tag}
                        </GeminoteEditableTag>
                    ))}
                    <GeminoteTagsInput onCreate={handleTagAddition} />
                </StyledTagsWrapper>
                <GeminoteTypography variant="body1" color="info">
                    Updated at {getFormattedDate(updatedAt) || 'unknown date'}
                </GeminoteTypography>
                <StyledButtonsWrapper>
                    <GeminoteButton onClick={() => summarize()}>
                        Summarize
                    </GeminoteButton>
                    <GeminoteButton onClick={() => extractKeyPoints()}>
                        Extract key points
                    </GeminoteButton>
                    <GeminoteTypography variant="body1">
                        {summary}
                    </GeminoteTypography>
                    <GeminoteTypography variant="body1">
                        {keyPoints}
                    </GeminoteTypography>
                </StyledButtonsWrapper>
            </StyledEditorHeader>
            <StyledEditorContent>
                {UnwrapComponents(editableContent)}
            </StyledEditorContent>
            <StyledEditorFooter></StyledEditorFooter>
        </StyledWrapper>
    );
};

export default GeminoteEditor;
