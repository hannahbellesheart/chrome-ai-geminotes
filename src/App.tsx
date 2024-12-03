import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import ZustandHydration from '@geminotes/atoms/ZustandHydration';
import DefaultTheme from '@geminotes/themes/DefaultTheme';
import GlobalStyle from '@geminotes/themes/GlobalStyles';
import GeminoteContainer from '@geminotes/atoms/GeminoteContainer';
import GeminoteEditor from '@geminotes/organisms/GeminoteEditor';
import GeminoteMainToolbar from '@geminotes/organisms/GeminoteMainToolbar';
import useGeminotes from './stores/useGeminotes';

function App() {
    const [currentNoteId, setCurrentNoteId] = useState('');
    const [lastNoteId, setLastNoteId] = useState('');

    const { addNote } = useGeminotes();

    const handleNoteId = (noteId: string) => {
        setCurrentNoteId(noteId);
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

    const { notes } = useGeminotes();

    const selectedNote = notes.find((note) => note.id === currentNoteId);

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
