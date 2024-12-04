import { create } from 'zustand';

import executeModel from '@geminotes/utils/executeModel';

interface ApiStore {
    loading: boolean;
    summary: string;
    summarize: (toProcess: string) => void;
    paraphrased: string;
    paraphrase: (toProcess: string) => void;
    keyPoints: string;
    extractKeyPoints: (toProcess: string) => void;
    clear: () => void;
}

const useApi = create<ApiStore>((set, get) => ({
    loading: false,
    summary: '',
    paraphrased: '',
    keyPoints: '',

    summarize: async (toProcess: string) => {
        if (get().loading) {
            console.log('Already loading');
            return;
        }
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
    extractKeyPoints: async (toProcess: string) => {
        if (get().loading) {
            console.log('Already loading');
            return;
        }
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
    paraphrase: async (toProcess: string) => {
        if (get().loading) {
            console.log('Already loading');
            return;
        }
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
