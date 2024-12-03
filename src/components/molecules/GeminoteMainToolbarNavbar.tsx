import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import GeminoteTooltip from '@geminotes/atoms/GeminoteTooltip';
import applyTypography from '@geminotes/themes/applyTypography';
import useGeminotes from '@geminotes/stores/useGeminotes'; // Asegúrate de que este hook esté correctamente implementado

interface MainToolbarNavbarProps {
    currentNoteId?: string;
    onNoteId?: (value: string) => void;
}

const StyledNavbarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(2)};
    width: 100%;
`;

const StyledTitle = styled.h1`
    color: ${({ theme }) => theme.palette.text};
    font-size: ${({ theme }) => applyTypography(theme.typography.h1)};
    text-align: center;
    margin: 0 auto;
    flex-grow: 1;
`;

const GeminoteMainToolbarNavbar = ({
    currentNoteId,
    onNoteId,
}: MainToolbarNavbarProps) => {
    const { notes } = useGeminotes(); // Obtener las notas de estado global
    const [currentTitle, setCurrentTitle] = useState<string>('');

    useEffect(() => {
        if (currentNoteId) {
            const selectedNote = notes.find(
                (note) => note.id === currentNoteId
            );
            if (selectedNote) {
                setCurrentTitle(selectedNote.title);
            }
        }
    }, [currentNoteId, notes]); // Se ejecuta cada vez que cambia `currentNoteId` o las `notes`

    const handleGoBack = () => {
        if (onNoteId && currentNoteId) {
            onNoteId(currentNoteId);
        }
    };

    return (
        <header>
            <nav>
                <StyledNavbarWrapper>
                    {currentNoteId && (
                        <GeminoteTooltip title={currentTitle} position="bottom">
                            <GeminoteButton
                                color="primary"
                                variant="text"
                                onClick={handleGoBack}
                                aria-label="Clear search"
                                style={{ fontSize: '1.25rem' }}
                            >
                                <i className="icon-back"></i>
                            </GeminoteButton>
                        </GeminoteTooltip>
                    )}
                    <StyledTitle>My Geminotes</StyledTitle>
                </StyledNavbarWrapper>
            </nav>
        </header>
    );
};

export default GeminoteMainToolbarNavbar;
