import { create } from 'zustand';

interface ContentStore {
    currentTabId: number;
    getTabId: () => void;
    executeScript: (fun: () => unknown) => unknown;
}

const useContent = create<ContentStore>((set, get) => ({
    currentTabId: 0,
    getTabId: async () => {
        chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabs) {
                set({
                    currentTabId: tabs[0].id,
                });
            }
        );
    },
    executeScript: async (func: () => unknown) => {
        return await new Promise<unknown>((resolve) => {
            const tabId = get().currentTabId;
            chrome.scripting.executeScript(
                { target: { tabId }, func },
                (result) => {
                    if (result && result[0]?.result) {
                        resolve(result[0].result);
                    } else {
                        resolve(null);
                    }
                }
            );
        });
    },
}));

export default useContent;
