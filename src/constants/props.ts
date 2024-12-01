export interface GeminoteProps {
    id: string;
    title?: string;
    content?: string[];
    tags?: string[];
    sources?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

export type GeminoteApiModel = AISummarizer | AIRewriter;
export type GeminoteApiModelName = 'summarizer' | 'rewriter';
export type GeminoteApiModelCreateOptions =
    | AISummarizerCreateOptions
    | AIRewriterCreateOptions;
