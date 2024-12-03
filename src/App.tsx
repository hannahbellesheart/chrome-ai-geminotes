import { ThemeProvider } from 'styled-components';

import ZustandHydration from '@geminotes/atoms/ZustandHydration';
import DefaultTheme from '@geminotes/themes/DefaultTheme';
import GlobalStyle from '@geminotes/themes/GlobalStyles';
import GeminoteContainer from '@geminotes/atoms/GeminoteContainer';
import GeminoteEditor from '@geminotes/organisms/GeminoteEditor';
import GeminoteMainToolbar from '@geminotes/organisms/GeminoteMainToolbar';
import GeminoteTypography from '@geminotes/atoms/GeminoteTypography';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import useGeminotes from './stores/useGeminotes';
import useApi from './stores/useApi';
import useContent from './stores/useContent';
import { useEffect, useState } from 'react';

function App() {
    const [currentSelectedText, setCurrentSelectedText] = useState('');
    const [currentNoteId, setCurrentNoteId] = useState('');

    const handleNoteId = (noteId: string) => {
        setCurrentNoteId(noteId);
    };
    const { summarize, summary, extractKeyPoints, keyPoints } = useApi();
    const { notes, addNote } = useGeminotes();
    const { currentTabId, getTabId, executeScript } = useContent();
    // Get Tab Id for the current content store
    getTabId();
    const onCreateNewNote = async () => {
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
                setCurrentSelectedText(selectedText);
            }
        );
    };

    useEffect(() => {
        if (currentSelectedText != '') {
            addNote('', [currentSelectedText], [], {});
        }
    }, [currentSelectedText]);

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
            </ThemeProvider>
        </ZustandHydration>
    );
}

export default App;
