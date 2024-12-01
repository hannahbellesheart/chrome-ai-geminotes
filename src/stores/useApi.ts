import { create } from 'zustand';

import executeModel from '@geminotes/utils/executeModel';

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

        set({ loading: true });

        const result = await executeModel('summarizer', {
            format: 'plain-text',
            type: 'tl;dr',
            length: 'medium',
        });

        set({ loading: false, summary: result });
    },
    extractKeyPoints: async () => {
        if (get().loading) {
            console.log('Already loading');
            return;
        }

        set({ loading: true });

        const result = await executeModel('summarizer', {
            format: 'plain-text',
            type: 'key-points',
            length: 'medium',
        });

        set({ loading: false, keyPoints: result });
    },
    paraphrase: async () => {
        if (get().loading) {
            console.log('Already loading');
            return;
        }

        set({ loading: true });

        const result = await executeModel('rewriter', {
            tone: 'as-is',
            format: 'plain-text',
            length: 'as-is',
        });

        set({ loading: false, paraphrased: result });
    },
}));

export default useApi;
