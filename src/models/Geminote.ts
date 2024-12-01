import { GeminoteProps } from '@geminotes/props';

class Geminote implements GeminoteProps {
    id: string;
    title: string;
    content: string[];
    tags: string[];
    sources: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;

    /**
     * Creates a new Geminote instance.
     *
     * @param {string} [title=""] - The title of the note.
     * @param {string[]} [content=[]] - The content of the note.
     * @param {string[]} [tags=[]] - An array of tags associated with the note.
     * @param {object} [sources={}] - A key-value pair of sources associated with the note.
     * @param {Date} [createdAt=new Date()] - The creation date of the note. Defaults to the current date.
     */
    constructor(
        title: string = '',
        content: string[] = [],
        tags: string[] = [],
        sources: Record<string, any> = {},
        createdAt: Date = new Date()
    ) {
        this.id = this.generateId();
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.sources = sources;
        this.createdAt = createdAt;
        this.updatedAt = createdAt;
    }

    /**
     * Generates a unique ID for the note.
     *
     * @returns {string} - A unique identifier for the note.
     */
    generateId(): string {
        return `geminote-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
    }

    /**
     * Updates the note's properties.
     *
     * @param {object} updates - An object containing the properties to update.
     * @param {string} [updates.title] - The new title of the note.
     * @param {string[]} [updates.content] - The new content of the note.
     * @param {string[]} [updates.tags] - The new tags for the note.
     * @param {object} [updates.sources] - The new sources for the note.
     */
    update({
        title,
        content,
        tags,
        sources,
    }: {
        title?: string;
        content?: string[];
        tags?: string[];
        sources?: Record<string, any>;
    }): void {
        if (title !== undefined) this.title = title;
        if (content !== undefined) this.content = content;
        if (tags !== undefined) this.tags = tags;
        if (sources !== undefined) this.sources = sources;

        // Update the last modified timestamp
        this.updatedAt = new Date();
    }

    /**
     * Converts the note to a JSON-friendly format.
     *
     * @returns {object} - A JSON representation of the note.
     */
    toJSON(): Record<string, any> {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            tags: this.tags,
            sources: this.sources,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    /**
     * Recreates a Geminote object from JSON data.
     *
     * @param {object} data - The JSON data representing the note.
     * @param {string} data.id - The unique identifier of the note.
     * @param {string} data.title - The title of the note.
     * @param {string[]} data.content - The content of the note.
     * @param {string[]} data.tags - The tags associated with the note.
     * @param {object} data.sources - The sources associated with the note.
     * @param {string|Date} data.createdAt - The creation date of the note.
     * @param {string|Date} data.updatedAt - The last update date of the note.
     *
     * @returns {Geminote} - A new instance of `Geminote` based on the provided data.
     */
    static fromJSON(data: GeminoteProps): Geminote {
        const note = new Geminote(
            data.title,
            data.content,
            data.tags,
            data.sources,
            new Date(data.createdAt)
        );

        // Restore the unique ID and last modified timestamp
        note.id = data.id;
        note.updatedAt = new Date(data.updatedAt);

        return note;
    }
}

export default Geminote;
