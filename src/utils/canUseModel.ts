import { GeminoteApiModelName } from '@geminotes/props';

const canUseModel = async (
    model: GeminoteApiModelName
): Promise<boolean | undefined> => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
    if (!tab || !tab.id || typeof tab.id !== 'number') return;

    return new Promise((resolve) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id as number },
                func: async (model: GeminoteApiModelName) => {
                    const modelStatus = (await window.ai[model].capabilities())
                        .available;
                    let testingSession;

                    switch (modelStatus) {
                        case 'readily':
                            return true;
                        case 'after-download':
                            testingSession = await window.ai[model].create();
                            testingSession.destroy();
                            return true;
                        case 'no':
                        default:
                            return false;
                    }
                },
                args: [model],
            },
            (result) => {
                resolve(result?.[0]?.result);
            }
        );
    });
};

export default canUseModel;
