import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import ZustandHydration from '@geminotes/atoms/ZustandHydration';
import DefaultTheme from '@geminotes/themes/DefaultTheme';
import GlobalStyle from '@geminotes/themes/GlobalStyles';
import GeminoteContainer from '@geminotes/atoms/GeminoteContainer';
import GeminoteMainToolbar from '@geminotes/organisms/GeminoteMainToolbar';
import GeminoteTypography from '@geminotes/atoms/GeminoteTypography';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import useGeminotes from './stores/useGeminotes';
import useApi from './stores/useApi';
import useContent from './stores/useContent';

function App() {
    const [currentNoteId, setCurrentNoteId] = useState('');

    const handleNoteId = (noteId: string) => {
        setCurrentNoteId(noteId);
    };
    const { summarize, summary, extractKeyPoints, keyPoints } = useApi();
    const { editNote, currentNote } = useGeminotes();
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

    useEffect(() => {
        onSelectTextForNote();
    }, [currentNote]);

    return (
        <ZustandHydration>
            <ThemeProvider theme={DefaultTheme}>
                <GlobalStyle />
                <GeminoteContainer>
                    {/* Renderiza el toolbar si no hay nota seleccionada */}
                    {!currentNoteId && (
                        <GeminoteMainToolbar onNoteId={handleNoteId} />
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
