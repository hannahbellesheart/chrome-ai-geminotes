export interface GeminoteProps {
    id: string;
    title?: string;
    content?: string[];
    tags?: string[];
    sources?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
