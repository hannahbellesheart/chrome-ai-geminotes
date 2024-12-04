import canUseModel from '@geminotes/utils/canUseModel';
import {
    GeminoteApiModelName,
    GeminoteApiModel,
    GeminoteApiModelCreateOptions,
} from '@geminotes/props';

const executeModel = async (
    model: GeminoteApiModelName,
    options: GeminoteApiModelCreateOptions,
    toProcess: string
): Promise<string | undefined> => {
    if (!toProcess) return undefined;

    const modelReady = await canUseModel(model);

    if (!modelReady) return undefined;

    let session: GeminoteApiModel | undefined;
    let result: string | undefined;

    switch (model) {
        case 'summarizer':
            session = await window.ai.summarizer.create(
                options as AISummarizerCreateOptions
            );
            result = await session.summarize(toProcess);
            break;
        case 'rewriter':
            session = await window.ai.rewriter.create(
                options as AIRewriterCreateOptions
            );
            result = await session.rewrite(toProcess);
            break;
    }
    session.destroy();

    if (!result) return undefined;

    return result;
};

export default executeModel;
