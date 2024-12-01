import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import ZustandHydration from '@geminotes/atoms/ZustandHydration';
import DefaultTheme from '@geminotes/themes/DefaultTheme';
import GlobalStyle from '@geminotes/themes/GlobalStyles';
import GeminoteContainer from '@geminotes/atoms/GeminoteContainer';
import GeminoteButton from '@geminotes/atoms/GeminoteButton';
import GeminoteTypography from '@geminotes/atoms/GeminoteTypography';
import GeminoteTag from '@geminotes/atoms/GeminoteTag';
import GeminoteTooltip from '@geminotes/atoms/GeminoteTooltip';
import GeminoteCard from '@geminotes/organisms/GeminoteCard';
import GeminoteEditor from '@geminotes/organisms/GeminoteEditor';
import useGeminotes from './stores/useGeminotes';
import useApi from './stores/useApi';

function App() {
    const [count, setCount] = useState(0);

    const { summarize, summary, extractKeyPoints, keyPoints } = useApi();
    const { notes } = useGeminotes();

    useEffect(() => {
        if (summary) {
            console.log(summary);
        }
        if (keyPoints) {
            console.log(keyPoints);
        }
    }, [summary, keyPoints]);

    return (
        <ZustandHydration>
            <ThemeProvider theme={DefaultTheme}>
                <GlobalStyle />
                <GeminoteContainer>
                    <GeminoteButton
                        onClick={() => setCount((count) => count + 1)}
                        style={{ width: '100%' }}
                    >
                        count is {count}
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
                    <GeminoteCard
                        id="geminote-1733071416111-p196y9it7"
                        title="Card Title"
                        tags={['hello', 'these', 'are', 'tags']}
                        updatedAt={new Date()}
                        onDelete={(id) => {
                            alert('Deleted ' + id);
                        }}
                    />
                    {notes.length > 0 && (
                        <GeminoteEditor
                            id={notes[0].id}
                            title={notes[0].title}
                            tags={notes[0].tags}
                            content={notes[0].content}
                            updatedAt={notes[0].updatedAt}
                        />
                    )}
                </GeminoteContainer>
                <GeminoteButton onClick={() => summarize()}>
                    Summarize
                </GeminoteButton>
                <GeminoteButton onClick={() => extractKeyPoints()}>
                    Extract key points
                </GeminoteButton>
            </ThemeProvider>
        </ZustandHydration>
    );
}

export default App;
