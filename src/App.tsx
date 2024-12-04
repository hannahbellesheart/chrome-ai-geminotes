import { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import ZustandHydration from '@geminotes/atoms/ZustandHydration';
import DefaultTheme from '@geminotes/themes/DefaultTheme';
import GlobalStyle from '@geminotes/themes/GlobalStyles';
import GeminoteContainer from '@geminotes/atoms/GeminoteContainer';
import GeminoteMainToolbar from '@geminotes/organisms/GeminoteMainToolbar';
import GeminoteEditor from '@geminotes/organisms/GeminoteEditor';
import useGeminotes from '@geminotes/stores/useGeminotes';
import useContent from '@geminotes/stores/useContent';
function App() {
    const [lastNoteId, setLastNoteId] = useState('');

    const { addNote, editNote, setCurrentNote, currentNote } = useGeminotes();
    const handleNoteId = (noteId: string) => {
        setCurrentNote(noteId);
    };
    const { currentTabId, getTabId, executeScript } = useContent();
    // Get Tab Id for the current content store
    getTabId();
    const onSelectTextForNote = () => {
        executeScript(() => {
            const iconUrl = chrome.runtime.getURL(
                '/assets/images/cursor-pointer.png'
            );
            document.body.style.cursor = `url(${iconUrl}), auto`;
        });
        chrome.tabs.sendMessage(
            currentTabId,
            {
                action: 'activeSelect',
                message: currentTabId,
            },
            (selectedText) => {
                // use the recent created one or the selected one
                if (currentNote) {
                    editNote(currentNote.id, {
                        content: [selectedText],
                    });
                }
            }
        );
    };

    const handleOpenMenu = () => {
        setLastNoteId(currentNote?.id || '');
        setCurrentNote('');
    };

    const handleAddNote = () => {
        const newNote = {
            title: 'Untitled',
            content: [],
            tags: [],
            sources: {},
        };
        addNote(newNote.title, newNote.content, newNote.tags, newNote.sources);
    };

    return (
        <ZustandHydration>
            <ThemeProvider theme={DefaultTheme}>
                <GlobalStyle />
                <GeminoteContainer>
                    {!currentNote && (
                        <GeminoteMainToolbar
                            onNoteId={handleNoteId}
                            lastNoteId={lastNoteId}
                        />
                    )}

                    {currentNote && (
                        <GeminoteEditor
                            key={currentNote.id}
                            id={currentNote.id}
                            title={currentNote.title}
                            tags={currentNote.tags}
                            content={currentNote.content}
                            updatedAt={currentNote.updatedAt}
                            onOpenMenu={handleOpenMenu}
                            onAddNote={handleAddNote}
                            onSelectTextForNote={onSelectTextForNote}
                        />
                    )}
                </GeminoteContainer>
            </ThemeProvider>
        </ZustandHydration>
    );
}

export default App;
