const canUseModel = async (
    model: 'summarizer'
): Promise<boolean | undefined> => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
    if (!tab || !tab.id || typeof tab.id !== 'number') return;

    console.log('Checking model status');
    return new Promise((resolve) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id as number },
                func: async (model: 'summarizer') => {
                    console.log('it somehow works', model);
                    const modelStatus = (await window.ai[model].capabilities())
                        .available;

                    console.log('Model status:', modelStatus);

                    switch (modelStatus) {
                        case 'readily':
                            return true;
                        case 'after-download':
                            console.log('Model is downloading');
                            const testingSession = await window.ai[
                                model
                            ].create();
                            testingSession.destroy();
                            console.log('Model is downloaded');
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
