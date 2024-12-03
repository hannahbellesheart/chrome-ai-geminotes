import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import ZustandHydration from '@geminotes/atoms/ZustandHydration';
import DefaultTheme from '@geminotes/themes/DefaultTheme';
import GlobalStyle from '@geminotes/themes/GlobalStyles';
import GeminoteContainer from '@geminotes/atoms/GeminoteContainer';
import GeminoteMainToolbar from '@geminotes/organisms/GeminoteMainToolbar';
import useGeminotes from './stores/useGeminotes';
import useApi from './stores/useApi';
import useContent from './stores/useContent';

function App() {
    const [currentNoteId, setCurrentNoteId] = useState('');
    const [lastNoteId, setLastNoteId] = useState('');

    const { addNote } = useGeminotes();

    const handleNoteId = (noteId: string) => {
        setCurrentNoteId(noteId);
    };
    const { summarize, summary, extractKeyPoints, keyPoints } = useApi();
    const { editNote, currentNote, notes } = useGeminotes();
    const { currentTabId, getTabId, executeScript } = useContent();
    // Get Tab Id for the current content store
    getTabId();
    const onSelectTextForNote = async () => {
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
        setLastNoteId(currentNoteId);
        setCurrentNoteId('');
    };

    const handleAddNote = () => {
        const newNote = {
            title: 'Untitled',
            content: [],
            tags: [],
            sources: {},
        };
        const savedNote = addNote(
            newNote.title,
            newNote.content,
            newNote.tags,
            newNote.sources
        );

        setCurrentNoteId(savedNote.id);
    };


    useEffect(() => {
        onSelectTextForNote();
    }, [currentNote]);

    useEffect(() => {
        if (currentNoteId && !selectedNote) {
            console.log(`Note with ID ${currentNoteId} not found.`);
        }
    }, [currentNoteId, selectedNote]);

    return (
        <ZustandHydration>
            <ThemeProvider theme={DefaultTheme}>
                <GlobalStyle />
                <GeminoteContainer>
                    {!currentNoteId && (
                        <GeminoteMainToolbar
                            onNoteId={handleNoteId}
                            lastNoteId={lastNoteId}
                        />
                    )}

                    {currentNoteId && selectedNote && (
                        <GeminoteEditor
                            key={selectedNote.id}
                            id={selectedNote.id}
                            title={selectedNote.title}
                            tags={selectedNote.tags}
                            content={selectedNote.content}
                            updatedAt={selectedNote.updatedAt}
                            onOpenMenu={handleOpenMenu}
                            onAddNote={handleAddNote}
                        />
                    )}
                </GeminoteContainer>
            </ThemeProvider>
        </ZustandHydration>
    );
}

export default App;
