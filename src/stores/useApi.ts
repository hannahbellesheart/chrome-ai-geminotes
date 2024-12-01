import { create } from 'zustand';

import useGeminotes from '@geminotes/stores/useGeminotes';
import cleanContent from '@geminotes/utils/cleanContent';
import canUseModel from '@geminotes/utils/canUseModel';

interface ApiStore {
    loading: boolean;
    summary: string;
    summarize: () => void;
    paraphrased: string;
    paraphrase: () => void;
    keyPoints: string;
    extractKeyPoints: () => void;
}

const useApi = create<ApiStore>((set, get) => ({
    loading: false,
    summary: '',
    paraphrased: '',
    keyPoints: '',

    summarize: async () => {
        if (get().loading) {
            console.log('Already loading');
            return;
        }

        const toSummarize = cleanContent(
            useGeminotes.getState().currentNote?.content
        );

        if (!toSummarize) return;

        set({ loading: true });

        console.log('Reviewing capabilities');
        const modelReady = await canUseModel('summarizer');

        if (!modelReady) {
            set({ loading: false });
            return;
        }

        console.log('Summarizing');
        const session = await window.ai.summarizer.create({
            format: 'plain-text',
            type: 'tl;dr',
            length: 'medium',
        });

        const summary = await session.summarize(toSummarize);

        set({ summary, loading: false });
        session.destroy();
    },
    extractKeyPoints: async () => {
        if (get().loading) {
            console.log('Already loading');
            return;
        }

        const toSummarize = cleanContent(
            useGeminotes.getState().currentNote?.content
        );

        if (!toSummarize) return;

        set({ loading: true });

        console.log('Reviewing capabilities');
        const modelReady = await canUseModel('summarizer');

        if (!modelReady) {
            set({ loading: false });
            return;
        }

        console.log('Extracting key points');
        const session = await window.ai.summarizer.create({
            format: 'plain-text',
            type: 'key-points',
            length: 'medium',
        });

        const keyPoints = await session.summarize(toSummarize);

        set({ keyPoints, loading: false });
        session.destroy();
    },
    paraphrase: () => {},
}));

export default useApi;
