import { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import ZustandHydration from '@geminotes/atoms/ZustandHydration';
import DefaultTheme from '@geminotes/themes/DefaultTheme';
import GlobalStyle from '@geminotes/themes/GlobalStyles';
import GeminoteContainer from '@geminotes/atoms/GeminoteContainer';
import GeminoteMainToolbar from '@geminotes/organisms/GeminoteMainToolbar';
import GeminoteEditor from '@geminotes/organisms/GeminoteEditor';
import useGeminotes from '@geminotes/stores/useGeminotes';
import useApi from './stores/useApi';

function App() {
    const [lastNoteId, setLastNoteId] = useState('');

    const { addNote, setCurrentNote, currentNote } = useGeminotes();

    const { clear } = useApi();
    const handleNoteId = (noteId: string) => {
        setCurrentNote(noteId);
    };

    const handleOpenMenu = () => {
        setLastNoteId(currentNote?.id || '');
        setCurrentNote('');
        clear();
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
                        />
                    )}
                </GeminoteContainer>
            </ThemeProvider>
        </ZustandHydration>
    );
}

export default App;
