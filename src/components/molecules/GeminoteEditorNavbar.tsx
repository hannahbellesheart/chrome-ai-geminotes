import styled from 'styled-components';
import { useState } from 'react';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import GeminoteTooltip from '@geminotes/atoms/GeminoteTooltip';
import GeminoteAlert from '@geminotes/atoms/GeminoteAlert';

interface EditorNavbarProps {
    onOpenMenu?: () => void;
    onSaveNote?: () => void;
    onAddNote?: () => void;
}

const StyledNavbarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing(3)};
`;

const StyledNavbarActionsWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};
`;

const GeminoteEditorNavbar = ({
    onOpenMenu,
    onSaveNote,
    onAddNote,
}: EditorNavbarProps) => {
    const [showSaveAlert, setShowSaveAlert] = useState(false);

    const handleOpenMenu = () => {
        if (onOpenMenu && onSaveNote) {
            onOpenMenu();
            onSaveNote();
        }
    };

    const handleSave = () => {
        if (onSaveNote) {
            onSaveNote();
            setShowSaveAlert(true);
            setTimeout(() => setShowSaveAlert(false), 1000);
        }
    };

    const handleAddNote = () => {
        if (onAddNote) {
            onAddNote();
        }
    };

    return (
        <header>
            <nav>
                <StyledNavbarWrapper>
                    <GeminoteTooltip title={'My Geminotes'} position="bottom">
                        <GeminoteButton
                            color="primary"
                            variant="text"
                            onClick={handleOpenMenu}
                            aria-label="Open menu"
                            style={{ fontSize: '1.25rem' }}
                        >
                            <i className="icon-menu"></i>
                        </GeminoteButton>
                    </GeminoteTooltip>

                    <StyledNavbarActionsWrapper>
                        <GeminoteTooltip title={'Save Note'} position="bottom">
                            <GeminoteButton
                                color="primary"
                                variant="text"
                                onClick={handleSave}
                                aria-label="Save note"
                                style={{ fontSize: '1.25rem' }}
                            >
                                <i className="icon-save"></i>
                            </GeminoteButton>
                        </GeminoteTooltip>
                        {showSaveAlert && (
                            <GeminoteAlert
                                message="¡Geminote Saved!"
                                state="success"
                            />
                        )}
                        <GeminoteTooltip
                            title={'Create Note'}
                            position="bottom"
                        >
                            <GeminoteButton
                                color="primary"
                                variant="text"
                                onClick={handleAddNote}
                                aria-label="Create note"
                                style={{ fontSize: '1.25rem' }}
                            >
                                <i className="icon-add"></i>
                            </GeminoteButton>
                        </GeminoteTooltip>
                    </StyledNavbarActionsWrapper>
                </StyledNavbarWrapper>
            </nav>
        </header>
    );
};

export default GeminoteEditorNavbar;
