import { create } from 'zustand';

import executeModel from '@geminotes/utils/executeModel';
import useGeminotes from '@geminotes/stores/useGeminotes';
import cleanContent from '@geminotes/utils/cleanContent';

interface ApiStore {
    loading: boolean;
    summary: string;
    summarize: () => void;
    paraphrased: string;
    paraphrase: () => void;
    keyPoints: string;
    extractKeyPoints: () => void;
    clear: () => void;
}

const getStoredContent = () => {
    return cleanContent(useGeminotes.getState().currentNote?.content);
};

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
        const toProcess = getStoredContent();
        if (!toProcess) {
            console.log('No content to summarize');
            return;
        }

        set({ loading: true });

        const result = await executeModel(
            'summarizer',
            {
                format: 'plain-text',
                type: 'tl;dr',
                length: 'medium',
            },
            toProcess
        );

        set({ loading: false, summary: result });
    },
    extractKeyPoints: async () => {
        if (get().loading) {
            console.log('Already loading');
            return;
        }
        const toProcess = getStoredContent();
        if (!toProcess) {
            console.log('No content to extract key points from');
            return;
        }

        set({ loading: true });

        const result = await executeModel(
            'summarizer',
            {
                format: 'plain-text',
                type: 'key-points',
                length: 'medium',
            },
            toProcess
        );

        set({ loading: false, keyPoints: result });
    },
    paraphrase: async () => {
        if (get().loading) {
            console.log('Already loading');
            return;
        }
        const toProcess = getStoredContent();
        if (!toProcess) {
            console.log('No content to paraphrase');
            return;
        }

        set({ loading: true });

        const result = await executeModel(
            'rewriter',
            {
                tone: 'as-is',
                format: 'plain-text',
                length: 'as-is',
            },
            toProcess
        );

        set({ loading: false, paraphrased: result });
    },

    clear: () => {
        set({ summary: '', paraphrased: '', keyPoints: '' });
    },
}));

export default useApi;
