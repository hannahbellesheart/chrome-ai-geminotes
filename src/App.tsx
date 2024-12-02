import { useState } from 'react';
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

    const handleNoteId = (noteId: string) => {
        setCurrentNoteId(noteId);
    };

    const { notes } = useGeminotes();

    const selectedNote = notes.find((note) => note.id === currentNoteId);

    return (
        <ZustandHydration>
            <ThemeProvider theme={DefaultTheme}>
                <GlobalStyle />
                <GeminoteContainer>
                    {/* Renderiza el toolbar si no hay nota seleccionada */}
                    {!currentNoteId && (
                        <GeminoteMainToolbar onNoteId={handleNoteId} />
                    )}

                    {/* Renderiza el editor si hay una nota seleccionada */}
                    {currentNoteId && selectedNote && (
                        <GeminoteEditor
                            id={selectedNote.id}
                            title={selectedNote.title}
                            tags={selectedNote.tags}
                            content={selectedNote.content}
                            updatedAt={selectedNote.updatedAt}
                        />
                    )}
                </GeminoteContainer>
            </ThemeProvider>
        </ZustandHydration>
    );
}

export default App;
