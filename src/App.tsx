import { ThemeProvider } from 'styled-components';

import ZustandHydration from '@geminotes/atoms/ZustandHydration';
import DefaultTheme from '@geminotes/themes/DefaultTheme';
import GlobalStyle from '@geminotes/themes/GlobalStyles';
import GeminoteContainer from '@geminotes/atoms/GeminoteContainer';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import GeminoteTypography from '@geminotes/atoms/GeminoteTypography';
import GeminoteTag from '@geminotes/atoms/GeminoteTag';
import GeminoteTooltip from '@geminotes/atoms/GeminoteTooltip';
import GeminoteEditor from '@geminotes/organisms/GeminoteEditor';
import useGeminotes from './stores/useGeminotes';
import useApi from './stores/useApi';
import useContent from './stores/useContent';
import { useEffect, useState } from 'react';

function App() {
    const [currentSelectedText, setCurrentSelectedText] = useState('');
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

    return (
        <ZustandHydration>
            <ThemeProvider theme={DefaultTheme}>
                <GlobalStyle />
                <GeminoteContainer>
                    <GeminoteButton
                        onClick={() => onCreateNewNote()}
                        style={{ width: '100%' }}
                    >
                        New Note
                    </GeminoteButton>
                    <GeminoteButton color="secondary" href="/assets">
                        Texto de tipo link
                    </GeminoteButton>
                    <GeminoteTypography variant="h1" align="center">
                        Hello, world!
                    </GeminoteTypography>
                    <GeminoteTypography variant="body1" align="center">
                        This is a Geminotes app.
                    </GeminoteTypography>
                    <GeminoteTag color="text">Text</GeminoteTag>
                    <GeminoteTag color="primary">Primary</GeminoteTag>
                    <GeminoteTag>Secondary</GeminoteTag>
                    <GeminoteTag color="info">Info</GeminoteTag>
                    <GeminoteTooltip title="Tooltip">
                        <GeminoteButton>Hover me!</GeminoteButton>
                    </GeminoteTooltip>
                    {notes.length > 0 &&
                        notes.map((note) => (
                            <GeminoteEditor
                                id={note.id}
                                title={note.title}
                                tags={note.tags}
                                content={note.content}
                                updatedAt={note.updatedAt}
                            />
                        ))}
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
