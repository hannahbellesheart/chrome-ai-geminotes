import styled from 'styled-components';
import { useEffect, useState } from 'react';

import GeminoteTypography from '@geminotes/atoms/GeminoteTypography';
import GeminoteEditableTypography from '@geminotes/molecules/GeminoteEditableTypography';
import GeminoteEditableTag from '@geminotes/molecules/GeminoteEditableTag';
import GeminoteTagsInput from '@geminotes/molecules/GeminoteTagsInput';
import GeminotePaper from '@geminotes/atoms/GeminotePaper';
import { GeminoteProps } from '@geminotes/props';
// import { NEW_LINE, SOURCE_REFERENCE } from '@geminotes/utils/validation';
import getFormattedDate from '@geminotes/utils/getFormattedDate';
import GeminoteEditorNavbar from '@geminotes/molecules/GeminoteEditorNavbar';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import useApi from '@geminotes/stores/useApi';

import useGeminotes from '@geminotes/stores/useGeminotes';

interface GeminoteEditorProps extends Omit<GeminoteProps, 'createdAt'> {
    onSelectTextForNote: () => void;
    onOpenMenu?: () => void;
    onAddNote?: () => void;
}

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(4)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledSpacer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ theme }) => theme.spacing(4)};
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

const GeminoteEditor = ({
    id,
    title,
    tags,
    content,
    updatedAt,
    onSelectTextForNote,
    onOpenMenu,
    onAddNote,
}: GeminoteEditorProps) => {
    const [editableTitle, setEditableTitle] = useState<string>(
        title || 'Untitled'
    );
    const [editableContent, setEditableContent] = useState<string[]>(
        !content ||
            content.length === 0 ||
            (content.length === 1 && content[0] === '')
            ? ['Start typing...']
            : content
    );

    const [editableTags, setEditableTags] = useState<string[]>(tags || []);

    const { editNote, currentNote } = useGeminotes();

    const {
        summarize,
        summary,
        extractKeyPoints,
        keyPoints,
        paraphrase,
        paraphrased,
        loading,
    } = useApi();

    const handleTitleChange = (newTitle: string) => {
        setEditableTitle(newTitle);
    };

    const handleTitleEdit = (newTitle: string) => {
        handleTitleChange(newTitle);
    };

    const handleContentChange = (index: number, newText: string) => {
        const updatedContent = [...editableContent];
        updatedContent[index] = newText;
        setEditableContent(updatedContent);
    };

    const handleContentEdit = (index: number, newText: string) => {
        handleContentChange(index, newText);
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
            // save the most recent changes
            editNote(id, {
                title: editableTitle,
                content: editableContent,
                tags: editableTags,
            });
            onOpenMenu();
        }
    };

    const handleSave = () => {
        editNote(id, {
            title: editableTitle,
            content: editableContent,
            tags: editableTags,
        });
    };

    const handleAddNote = () => {
        if (onAddNote) {
            onAddNote();
        }
    };

    useEffect(() => {
        if (currentNote) {
            setEditableContent(currentNote.content);
        }
    }, [currentNote]);
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
                    <GeminoteButton onClick={() => paraphrase()}>
                        Paraphrase
                    </GeminoteButton>
                    <GeminoteButton onClick={() => summarize()}>
                        Summarize
                    </GeminoteButton>
                    <GeminoteButton onClick={() => extractKeyPoints()}>
                        Extract key points
                    </GeminoteButton>
                    <GeminoteButton onClick={() => onSelectTextForNote()}>
                        Select Text
                    </GeminoteButton>
                </StyledButtonsWrapper>
            </StyledEditorHeader>
            <StyledEditorContent>
                {(loading && 'Generating Text...') || (
                    <>
                        <GeminoteTypography variant="caption" color="info">
                            {paraphrased &&
                                paraphrased !== '' &&
                                'Paraphrased Note: ' + paraphrased}
                        </GeminoteTypography>

                        <StyledSpacer />
                        <GeminoteTypography variant="caption" color="info">
                            {summary &&
                                summary !== '' &&
                                'Summarized Note: ' + summary}
                        </GeminoteTypography>

                        <StyledSpacer />
                        <GeminoteTypography variant="caption" color="info">
                            {keyPoints &&
                                keyPoints !== '' &&
                                'Key Points of the Note: ' + keyPoints}
                        </GeminoteTypography>
                    </>
                )}
                <StyledSpacer />
                {editableContent &&
                    editableContent.map((line, index) => (
                        <GeminoteEditableTypography
                            name="note-content"
                            key={index}
                            index={index}
                            onEdit={(newText) =>
                                handleContentEdit(index, newText)
                            }
                        >
                            {line}
                        </GeminoteEditableTypography>
                    ))}
            </StyledEditorContent>
            <StyledEditorFooter></StyledEditorFooter>
        </StyledWrapper>
    );
};

export default GeminoteEditor;
