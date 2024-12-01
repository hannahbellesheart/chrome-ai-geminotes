import { NEW_LINE, SOURCE_REFERENCE } from '@geminotes/utils/validation';

const cleanContent = (content: string[] | undefined) => {
    if (!content) return undefined;
    return content
        .map((line) => {
            return line.replace(NEW_LINE, '').replace(SOURCE_REFERENCE, '');
        })
        .join('\n');
};

export default cleanContent;
